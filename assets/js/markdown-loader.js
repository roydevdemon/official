// markdown-loader.js - Markdown Parser and Loader
// This module parses markdown files with YAML front matter (Jekyll-style)

class MarkdownLoader {
    constructor() {
        this.cache = {};
    }

    // Parse YAML front matter and markdown content
    parseMarkdown(content) {
        const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
        const match = content.match(frontMatterRegex);

        if (!match) {
            return {
                frontMatter: {},
                content: content
            };
        }

        const frontMatter = this.parseYAML(match[1]);
        const markdownContent = match[2];

        // Add markdown content as description to frontMatter (without HTML conversion)
        frontMatter.description = markdownContent.trim();

        return {
            frontMatter,
            content: this.convertMarkdownToHTML(markdownContent)
        };
    }

    // Simple YAML parser (supports basic key-value pairs and arrays)
    parseYAML(yamlString) {
        const result = {};
        const lines = yamlString.split('\n');
        let currentKey = null;
        let inArray = false;

        for (let line of lines) {
            line = line.trim();
            if (!line) continue;

            // Array item
            if (line.startsWith('- ')) {
                if (inArray && currentKey) {
                    result[currentKey].push(line.substring(2).trim());
                }
                continue;
            }

            // Key-value pair
            const colonIndex = line.indexOf(':');
            if (colonIndex > -1) {
                const key = line.substring(0, colonIndex).trim();
                const value = line.substring(colonIndex + 1).trim();

                if (value === '') {
                    // Start of array or object
                    result[key] = [];
                    currentKey = key;
                    inArray = true;
                } else if (value.startsWith('[') && value.endsWith(']')) {
                    // Inline array
                    result[key] = value.slice(1, -1).split(',').map(v => v.trim().replace(/['"]/g, ''));
                    inArray = false;
                } else {
                    // Simple value
                    result[key] = value.replace(/^["']|["']$/g, '');
                    inArray = false;
                }
            }
        }

        return result;
    }

    // Convert markdown to HTML (basic conversion)
    convertMarkdownToHTML(markdown) {
        let html = markdown;

        // Headers
        html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
        html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
        html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

        // Bold
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        html = html.replace(/__(.*?)__/g, '<strong>$1</strong>');

        // Italic
        html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
        html = html.replace(/_(.*?)_/g, '<em>$1</em>');

        // Links
        html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

        // Code blocks
        html = html.replace(/```([^`]+)```/g, '<pre><code>$1</code></pre>');

        // Inline code
        html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

        // Line breaks
        html = html.replace(/\n\n/g, '</p><p>');
        html = html.replace(/\n/g, '<br>');

        // Wrap in paragraphs
        html = '<p>' + html + '</p>';

        // Clean up empty paragraphs
        html = html.replace(/<p><\/p>/g, '');
        html = html.replace(/<p><h/g, '<h');
        html = html.replace(/<\/h([1-6])><\/p>/g, '</h$1>');

        return html;
    }

    // Load a markdown file
    async loadFile(path) {
        if (this.cache[path]) {
            return this.cache[path];
        }

        try {
            const response = await fetch(path);
            if (!response.ok) {
                throw new Error(`Failed to load ${path}: ${response.status}`);
            }
            const content = await response.text();
            const parsed = this.parseMarkdown(content);
            this.cache[path] = parsed;
            return parsed;
        } catch (error) {
            console.error(`Error loading markdown file ${path}:`, error);
            return null;
        }
    }

    // Load all files from a directory
    async loadDirectory(directoryPath, fileList) {
        const files = [];

        for (const fileName of fileList) {
            const filePath = `${directoryPath}/${fileName}`;
            const parsed = await this.loadFile(filePath);
            if (parsed) {
                files.push({
                    fileName,
                    ...parsed
                });
            }
        }

        return files;
    }

    // Load profile data
    async loadProfile(lang) {
        const profilePath = `assets/content/profile/${lang}.md`;
        return await this.loadFile(profilePath);
    }

    // Load all projects
    async loadProjects(projectFiles) {
        return await this.loadDirectory('assets/content/projects', projectFiles);
    }

    // Clear cache
    clearCache() {
        this.cache = {};
    }
}

// Initialize markdown loader
const markdownLoader = new MarkdownLoader();
