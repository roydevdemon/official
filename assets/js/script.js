// script.js - Main Application Logic
let isEditMode = false;
let originalData = null;
let currentData = null;

// Project file configuration
const projectFiles = {
    ko: ['ecommerce-ko.md', 'chat-app-ko.md', 'project-manager-ko.md'],
    en: ['ecommerce-en.md', 'chat-app-en.md', 'project-manager-en.md']
};

// Prevent copy, cut, and context menu
document.addEventListener('copy', (e) => e.preventDefault());
document.addEventListener('cut', (e) => e.preventDefault());
document.addEventListener('contextmenu', (e) => e.preventDefault());

// Prevent drag start
document.addEventListener('dragstart', (e) => e.preventDefault());

// Hide loading spinner
function hideLoadingSpinner() {
    const spinner = document.getElementById('loadingSpinner');
    if (spinner) {
        spinner.classList.add('hidden');
        setTimeout(() => {
            spinner.style.display = 'none';
        }, 300);
    }
}

// Mouse lantern effect
document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    document.body.style.setProperty('--mouse-x', `${x}%`);
    document.body.style.setProperty('--mouse-y', `${y}%`);
    document.body.classList.add('mouse-active');
});

document.addEventListener('mouseleave', () => {
    document.body.classList.remove('mouse-active');
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', async () => {
    try {
        await loadData();
        initializeEventListeners();
        hideLoadingSpinner();
    } catch (error) {
        console.error('Error initializing page:', error);
        hideLoadingSpinner();
    }
});

// Event Listeners
function initializeEventListeners() {
    // Language toggle buttons
    const koBtn = document.getElementById('koBtn');
    const enBtn = document.getElementById('enBtn');

    if (koBtn) {
        koBtn.addEventListener('click', () => {
            if (i18n.getCurrentLanguage() !== 'ko') {
                i18n.setLanguage('ko');
                loadData();
            }
        });
    }

    if (enBtn) {
        enBtn.addEventListener('click', () => {
            if (i18n.getCurrentLanguage() !== 'en') {
                i18n.setLanguage('en');
                loadData();
            }
        });
    }

    // Edit mode buttons
    const editBtn = document.getElementById('editBtn');
    if (editBtn) {
        editBtn.addEventListener('click', toggleEditMode);
    }

    const saveBtn = document.getElementById('saveBtn');
    if (saveBtn) {
        saveBtn.addEventListener('click', saveChanges);
    }

    const cancelBtn = document.getElementById('cancelBtn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', cancelEdit);
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;

            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('.content-section');
    const navItems = document.querySelectorAll('.nav-item');

    window.addEventListener('scroll', () => {
        let current = 'about'; // Default to about

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const scrollPosition = window.pageYOffset + 200;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // Scroll to top button
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    if (scrollToTopBtn) {
        // Show/hide button on scroll
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });

        // Scroll to top on click
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Load data from markdown files
async function loadData() {
    try {
        const lang = i18n.getCurrentLanguage();
        console.log('Loading data for language:', lang);

        // Load profile
        const profile = await markdownLoader.loadProfile(lang);
        console.log('Profile loaded:', profile);

        if (!profile || !profile.frontMatter) {
            console.warn('Profile not loaded, falling back to JSON');
            throw new Error('Profile loading failed');
        }

        // Load projects
        const projects = await markdownLoader.loadProjects(projectFiles[lang]);
        console.log('Projects loaded:', projects);

        // Filter by language and sort by date
        const filteredProjects = (projects || [])
            .filter(p => p && p.frontMatter && p.frontMatter.lang === lang)
            .sort((a, b) => {
                const dateA = new Date(a.frontMatter.date || '2000-01-01');
                const dateB = new Date(b.frontMatter.date || '2000-01-01');
                return dateB - dateA;
            });

        currentData = {
            profile,
            projects: filteredProjects
        };

        renderContent();
    } catch (error) {
        console.error('Error loading data:', error);
        loadDataFromJSON();
    }
}

// Fallback: Load data from JSON
async function loadDataFromJSON() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        const lang = i18n.getCurrentLanguage();

        currentData = {
            profile: {
                frontMatter: data[lang].cover,
                content: ''
            },
            projects: data[lang].projects.map(p => ({
                frontMatter: {
                    ...p,
                    lang
                }
            }))
        };

        renderContent();
    } catch (error) {
        console.error('Error loading JSON data:', error);
    }
}

// Render all content
function renderContent() {
    renderIntro();
    renderAbout();
    renderExperience();
    renderProjects();
}

// Render intro section
function renderIntro() {
    const profile = currentData.profile;
    if (!profile || !profile.frontMatter) return;

    const fm = profile.frontMatter;
    const lang = i18n.getCurrentLanguage();

    // Name
    const nameEl = document.querySelector('.profile-name a.name-link');
    if (nameEl && fm.name) {
        nameEl.textContent = fm.name;
    }

    // Position
    const positionEl = document.querySelector('.profile-position');
    if (positionEl) {
        positionEl.textContent = lang === 'ko' ? '백엔드 개발자' : 'Backend Developer';
    }

    // Tagline
    const taglineEl = document.querySelector('.profile-intro');
    if (taglineEl && fm.tagline) {
        taglineEl.innerHTML = fm.tagline;
    }
}

// Render about section
function renderAbout() {
    const profile = currentData.profile;
    if (!profile || !profile.frontMatter) return;

    const fm = profile.frontMatter;

    // Value 1
    const value1TitleEl = document.querySelector('[data-key="about.value1.keyword"]');
    const value1TextEl = document.querySelector('[data-key="about.value1.description"]');
    if (value1TitleEl && fm.value1_keyword) {
        value1TitleEl.textContent = fm.value1_keyword;
    }
    if (value1TextEl && fm.value1_description) {
        value1TextEl.textContent = fm.value1_description;
    }

    // Value 2
    const value2TitleEl = document.querySelector('[data-key="about.value2.keyword"]');
    const value2TextEl = document.querySelector('[data-key="about.value2.description"]');
    if (value2TitleEl && fm.value2_keyword) {
        value2TitleEl.textContent = fm.value2_keyword;
    }
    if (value2TextEl && fm.value2_description) {
        value2TextEl.textContent = fm.value2_description;
    }

    // Value 3
    const value3TitleEl = document.querySelector('[data-key="about.value3.keyword"]');
    const value3TextEl = document.querySelector('[data-key="about.value3.description"]');
    if (value3TitleEl && fm.value3_keyword) {
        value3TitleEl.textContent = fm.value3_keyword;
    }
    if (value3TextEl && fm.value3_description) {
        value3TextEl.textContent = fm.value3_description;
    }
}

// Render experience section
function renderExperience() {
    const experienceList = document.getElementById('experienceList');
    if (!experienceList) return;

    const lang = i18n.getCurrentLanguage();

    // Hard-coded experience data (could be moved to markdown in future)
    const experiences = {
        ko: [
            {
                company: '파워테스크',
                title: '백엔드 개발자',
                period: '2023.11 - 2025.09',
                website: 'https://outcode.biz',
                description: `기존 1인 기업 및 소상공인을 타겟으로 하던 서비스를 대기업 고객으로 확장하게 되면서, 백엔드 중심의 모놀로식 아키텍처를 MSA로 마이그레이션 업무에 참여하였습니다. 또한 임베디드 환경에서 손쉽게 서비스를 연동할 수 있도록 Open API 서버 제작의 모든 과정에 참여하며, 더 많은 기업이 안정적이고 편리하게 활용할 수 있는 기반을 마련했습니다.

TypeScript, NestJS, TypeORM, MySQL, MongoDB, Redis, GCP, Sentry, Docker, Kubernetes, Github`
            },
            {
                company: '빅거츠',
                title: '풀스택 개발자',
                period: '2022.06 - 2023.09',
                website: 'https://app.coachdot.kr',
                description: `풀스택 개발자로서 기존 레거시 백엔드(Spring Boot)를 NestJS로 전환하고, 비즈니스 요구사항에 맞춘 DB 테이블 모델링 최적화 및 데이터 마이그레이션을 주도했습니다. 동시에 어드민 대시보드와 고객용 웹 애플리케이션(React)을 1인 개발로 담당하며 서비스를 성공적으로 런칭했습니다.

고객 피드백을 빠르게 반영하여 UI/UX 컴포넌트를 지속 개선하고, 레거시 비즈니스 로직을 리팩토링해 코드의 유지보수성과 성능을 크게 향상시켰습니다.

Google Calendar, Meet API 등 외부 데이터를 통합하여 일정 관련 수동 작업을 완전 자동화하여 본질적인 코칭에만 몰입할 수 있는 최적의 환경을 제공했습니다.

TypeScript, NestJS, TypeORM, MySQL, Google APIs, AWS, Code Deploy, Github`
            },
            {
                company: '파라바라',
                title: '풀스택 개발자',
                period: '2020.02 - 2021.04',
                description: `기존 MVP에서 앱 연동과 고도화된 자판기 클라이언트 개발에 참여했습니다. ExpressJS를 활용해 앱과 자판기 간 API 서버를 구축하고, React로 자판기 관리 백오피스와 운영자 대시보드를 개발했습니다.

Socket.io를 도입하여 자판기 상태(재고, 거래 진행 상황 등)를 실시간으로 갱신하고 원격 관리할 수 있도록 시스템을 개선했습니다.

또한 React Native로 모바일 앱의 UI/UX 컴포넌트를 제작하고 백엔드 API와 연동하여, 사용자가 언제 어디서나 안전하고 편리하게 비대면 중고거래를 할 수 있는 완성도 높은 서비스 환경을 제공했습니다.

TypeScript, Express, React Native, TypeORM, Socket.io, MySQL, AWS, Cloudfront, Firebase, Github`
            },
            {
                company: '플래누리',
                title: '풀스택 개발자 (SI)',
                period: '2019.08 - 2020.01',
                description: `스마트 반려동물 배변판 연동 앱의 UI/UX 설계와 백엔드 API 연동을 담당하였으며 무인 독서실 자동화 시스템의 내부 비즈니스 로직 리팩토링과 DB 쿼리 최적화를 통해 시스템 안정성과 성능을 개선했습니다.

TypeScript, React Native, MySQL, AWS, Amplify`
            },
            {
                company: '일에프육공디',
                title: '풀스택 개발자',
                period: '2018.09 - 2019.03',
                description: `크리에이터들이 오프라인 모임을 쉽게 생성하고 참여할 수 있는 소셜 플랫폼으로, API 설계부터 개발, 배포, 운영까지 전 과정을 1인 개발로 담당하며 실제 사용자들에게 서비스를 성공적으로 제공했습니다.

JavaScript, Express, Vue.js, MariaDB, AWS`
            }
        ],
        en: [
            {
                company: 'Powertask Inc',
                title: 'Backend Developer',
                period: '2023.11 - 2025.09',
                website: 'https://outcode.biz',
                description: `Outcode is a no-code service that enables users to build data pipelines and implement automation by simply connecting data sources without coding.

As the service expanded from targeting solo entrepreneurs and small businesses to enterprise customers, I participated in migrating the backend-centric monolithic architecture to MSA. I also participated in all stages of creating an Open API server to enable seamless service integration in embedded environments, establishing a foundation for more companies to utilize the service stably and conveniently.

TypeScript, NestJS, TypeORM, MySQL, MongoDB, Redis, GCP, Sentry, Docker, Kubernetes, Github`
            },
            {
                company: 'Bigguts',
                title: 'Full-stack Developer',
                period: '2022.06 - 2023.09',
                website: 'https://app.coachdot.kr',
                description: `As a full-stack developer, I led the transition of the legacy backend (Spring Boot) to NestJS, optimized DB table modeling based on business requirements, and drove data migration. Simultaneously, I single-handedly developed both the admin dashboard and customer-facing web application (React), successfully launching the service.

I continuously improved UI/UX components by rapidly incorporating customer feedback, and significantly enhanced code maintainability and performance through refactoring of legacy business logic.

Integrated external data including Google Calendar and Meet APIs to fully automate schedule-related manual tasks, providing an optimal environment to focus solely on the essence of coaching.

TypeScript, NestJS, TypeORM, MySQL, Google APIs, AWS, Code Deploy, Github`
            },
            {
                company: 'Parabara',
                title: 'Full-stack Developer',
                period: '2020.02 - 2021.04',
                description: `Participated in app integration and advanced vending machine client development from the existing MVP. Built an API server between the app and vending machines using ExpressJS, and developed a vending machine management back-office and operator dashboard with React.

Improved the system by introducing Socket.io to update vending machine status (inventory, transaction progress, etc.) in real-time and enable remote management.

Additionally, created mobile app UI/UX components with React Native and integrated them with backend APIs, providing a complete service environment where users can safely and conveniently conduct contactless secondhand trading anytime, anywhere.

TypeScript, Express, React Native, TypeORM, Socket.io, MySQL, AWS, Cloudfront, Firebase, Github`
            },
            {
                company: 'Planuri',
                title: 'Full-stack Developer (SI)',
                period: '2019.08 - 2020.01',
                description: `Responsible for UI/UX design and backend API integration for smart pet toilet sensor-connected app, and improved system stability and performance through internal business logic refactoring and DB query optimization for unmanned reading room automation system.

TypeScript, React Native, MySQL, AWS, Amplify`
            },
            {
                company: '1F60D',
                title: 'Full-stack Developer',
                period: '2018.09 - 2019.03',
                description: `A social platform where creators can easily create and participate in offline meetups. As a solo developer, I handled the entire process from API design to development, deployment, and operation, successfully delivering the service to actual users.

JavaScript, Express, Vue.js, MariaDB, AWS`
            }
        ]
    };

    const expList = experiences[lang] || experiences.ko;

    experienceList.innerHTML = expList.map(exp => {
        // Split description into main content and tech stack
        const descLines = exp.description.split('\n');
        const lastLine = descLines[descLines.length - 1];

        // Check if last line contains tech stack (comma-separated without bullets)
        const techStackMatch = lastLine.match(/^[A-Za-z0-9\s,\(\)\.]+$/);
        let mainDescription = exp.description;
        let techStack = null;

        if (techStackMatch && lastLine.includes(',')) {
            // Last line is tech stack
            mainDescription = descLines.slice(0, -1).join('\n');
            techStack = lastLine.split(',').map(tech => tech.trim());
        }

        const cardContent = `
            <div class="experience-header">
                <div>
                    <div class="experience-company">
                        ${exp.company}
                        ${exp.website ? '<i class="fas fa-external-link-alt"></i>' : ''}
                    </div>
                    <div class="experience-title">${exp.title}</div>
                </div>
                <div class="experience-period">${exp.period}</div>
            </div>
            <div class="experience-description">${mainDescription}</div>
            ${techStack ? `
                <div class="tech-stack">
                    ${techStack.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
                </div>
            ` : ''}
        `;

        return exp.website
            ? `<a href="${exp.website}" target="_blank" rel="noopener noreferrer" class="experience-item experience-item-link">${cardContent}</a>`
            : `<div class="experience-item">${cardContent}</div>`;
    }).join('');
}

// Render projects section
function renderProjects() {
    const projects = currentData.projects;
    const projectsGrid = document.getElementById('projectsGrid');

    if (!projectsGrid || !projects) return;

    projectsGrid.innerHTML = projects.map(project => {
        const fm = project.frontMatter;

        // Check if there's a link (demo or code)
        const hasLink = fm.demo || fm.code;
        const linkUrl = fm.demo || fm.code;

        // Render image or icon
        const imageContent = fm.image
            ? `<img src="${fm.image}" alt="${fm.title || 'Project'}" class="project-img" />`
            : `<i class="fas fa-folder-open project-icon"></i>`;

        const cardContent = `
            <div class="project-image">
                ${imageContent}
            </div>
            <div class="project-info">
                <h3 class="project-title">
                    ${fm.title || 'Untitled'}
                    ${hasLink ? '<i class="fas fa-external-link-alt"></i>' : ''}
                </h3>
                <p class="project-description">${fm.description || ''}</p>
            </div>
        `;

        return hasLink
            ? `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer" class="project-card project-card-link">${cardContent}</a>`
            : `<div class="project-card">${cardContent}</div>`;
    }).join('');

    // Re-translate after rendering
    i18n.translatePage();
}

// Toggle edit mode
function toggleEditMode() {
    isEditMode = !isEditMode;
    const editBtn = document.getElementById('editBtn');
    const savePanel = document.getElementById('savePanel');
    const editables = document.querySelectorAll('.editable');

    if (isEditMode) {
        // Enter edit mode
        originalData = JSON.parse(JSON.stringify(currentData));
        editables.forEach(el => el.setAttribute('contenteditable', 'true'));
        if (savePanel) savePanel.style.display = 'flex';
        if (editBtn) editBtn.textContent = '편집 종료';
    } else {
        // Exit edit mode
        editables.forEach(el => el.setAttribute('contenteditable', 'false'));
        if (savePanel) savePanel.style.display = 'none';
        if (editBtn) editBtn.textContent = '편집';
    }
}

// Save changes
async function saveChanges() {
    try {
        // Collect all editable content
        const editables = document.querySelectorAll('.editable[data-key]');
        const updates = {};

        editables.forEach(el => {
            const key = el.getAttribute('data-key');
            const value = el.textContent.trim();
            updates[key] = value;
        });

        // Save to localStorage (temporary solution)
        localStorage.setItem('portfolio_edits', JSON.stringify(updates));

        alert('Changes saved successfully!');
        toggleEditMode();
    } catch (error) {
        console.error('Error saving changes:', error);
        alert('Failed to save changes. Please try again.');
    }
}

// Cancel edit
function cancelEdit() {
    if (originalData) {
        currentData = originalData;
        renderContent();
    }
    toggleEditMode();
}

// Load saved edits on startup
window.addEventListener('load', () => {
    try {
        const savedEdits = localStorage.getItem('portfolio_edits');
        if (savedEdits) {
            const updates = JSON.parse(savedEdits);
            Object.entries(updates).forEach(([key, value]) => {
                const el = document.querySelector(`[data-key="${key}"]`);
                if (el) {
                    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                        el.value = value;
                    } else {
                        el.textContent = value;
                    }
                }
            });
        }
    } catch (error) {
        console.error('Error loading saved edits:', error);
    }
});
