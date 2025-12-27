# Roy's Portfolio

A modern, responsive portfolio website with bilingual support (Korean/English). Built with vanilla JavaScript, this portfolio showcases professional experience, projects, and skills in an elegant, user-friendly interface.

## Features

### 1. Bilingual Support (Korean/English)
- Toggle between Korean and English with a single click
- Language preference is automatically saved to browser storage
- All content seamlessly switches between languages

### 2. Modern Sidebar Navigation
- Fixed left sidebar with profile information
- Smooth scrolling navigation with active section highlighting
- Quick access to About, Experience, and Projects sections
- Social media links (Email, GitHub, LinkedIn, Instagram)

### 3. Responsive Design
- Fully optimized for mobile, tablet, and desktop
- Clean, professional UI/UX
- Interactive mouse lantern effect for visual appeal
- Smooth animations and transitions

### 4. Content Security
- Copy/paste protection
- Context menu disabled
- Drag prevention
- `robots.txt` configured to prevent search engine indexing

### 5. Dynamic Content Loading
- Markdown-based content management
- Easy content updates without modifying HTML
- Separate language files for internationalization

## Project Structure

```
root/
├── index.html                  # Main HTML file
├── assets/
│   ├── css/
│   │   └── styles.css         # Main stylesheet
│   ├── js/
│   │   ├── script.js          # Main application logic
│   │   ├── i18n.js            # Internationalization system
│   │   └── markdown-loader.js # Markdown parser and loader
│   ├── resume/
│   │   ├── resume_ko.pdf      # Korean resume
│   │   └── resume_en.pdf      # English resume
│   └── portfolio/
│       ├── portfolio_ko.pdf   # Korean portfolio
│       └── portfolio_en.pdf   # English portfolio
├── robots.txt                  # Search engine crawler settings
└── README.md                   # This file
```

## Getting Started

### Local Development

Since the project loads markdown files, you'll need to run a local HTTP server (CORS policy):

```bash
# Using Python 3 (recommended)
python -m http.server 8000

# Using Node.js
npx http-server

# Then open http://localhost:8000 in your browser
```

### Customization

#### 1. Update Profile Information

Edit the profile section in [index.html](index.html):

```html
<div class="profile-section">
    <h1 class="profile-name">Your Name</h1>
    <p class="profile-position">Your Title</p>
    <p class="profile-intro">Your Tagline</p>
</div>
```

#### 2. Update Social Links

Modify the footer links in [index.html](index.html):

```html
<a href="mailto:your@email.com" class="footer-link">
    <i class="fas fa-envelope"></i>
</a>
<a href="https://github.com/yourusername" class="footer-link">
    <i class="fab fa-github"></i>
</a>
<!-- Add more social links as needed -->
```

#### 3. Customize Colors

Edit CSS variables in [assets/css/styles.css](assets/css/styles.css):

```css
:root {
    --primary-color: #2c3e50;      /* Main text color */
    --secondary-color: #3498db;    /* Accent color */
    --background-color: #0a0e27;   /* Background color */
    /* Customize other colors as needed */
}
```

#### 4. Update Content

The content is loaded dynamically via JavaScript. Edit the content sections in [assets/js/script.js](assets/js/script.js) and the corresponding translation strings in [assets/js/i18n.js](assets/js/i18n.js).

#### 5. Add/Update Resume and Portfolio PDFs

Replace the PDF files in:
- `assets/resume/resume_ko.pdf` (Korean resume)
- `assets/resume/resume_en.pdf` (English resume)
- `assets/portfolio/portfolio_ko.pdf` (Korean portfolio)
- `assets/portfolio/portfolio_en.pdf` (English portfolio)

## Key Sections

### 1. About
- Professional introduction
- Career highlights
- Personal interests and hobbies

### 2. Experience
- Work history displayed chronologically
- Link to detailed resume (PDF)

### 3. Projects
- Grid layout showcasing key projects
- Link to complete portfolio (PDF)

### 4. Footer
- Credits and deployment information

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with custom properties
- **Vanilla JavaScript** - No framework dependencies
- **Font Awesome** - Icon library
- **Google Fonts** - Inter font family

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Deployment

### GitHub Pages

1. Create a GitHub repository
2. Push your files to the repository
3. Go to Settings > Pages
4. Select your branch and save
5. Access your site at `https://yourusername.github.io/repository-name`

### Netlify

1. Sign up at [Netlify](https://netlify.com)
2. Connect your repository or drag and drop files
3. Deploy automatically

### Vercel

1. Sign up at [Vercel](https://vercel.com)
2. Import your repository
3. Deploy automatically

### Cloudflare Pages

1. Sign up at [Cloudflare Pages](https://pages.cloudflare.com)
2. Connect your Git repository
3. Configure build settings
4. Deploy automatically via GitHub Actions

## Performance Features

- Preconnect to Google Fonts for faster loading
- Font display swap for better perceived performance
- Lazy loading spinner while content loads
- Optimized CSS animations

## Security Features

- Meta tag to prevent search engine indexing
- Content protection (no copy/paste, no right-click)
- robots.txt to block all crawlers

## Accessibility

- Semantic HTML structure
- ARIA labels where appropriate
- Keyboard navigation support
- Responsive font sizing

## License

This portfolio template is free to use, modify, and distribute.

## Credits

- Built with [Claude Code](https://claude.ai/claude-code)
- Deployed via GitHub Actions to Cloudflare Pages
- Font Awesome for icons
- Google Fonts for typography

## Support

If you encounter any issues or have questions:
1. Check the browser console (F12) for JavaScript errors
2. Ensure all files are properly uploaded
3. Verify that you're running a local HTTP server for development
4. Check that all file paths are correct

## Future Enhancements

- [ ] Dark/Light theme toggle
- [ ] Blog section integration
- [ ] Contact form with backend
- [ ] Analytics integration
- [ ] SEO optimization option
- [ ] Progressive Web App (PWA) support

---

**Made with Claude Code | Deployed to Cloudflare Pages**
