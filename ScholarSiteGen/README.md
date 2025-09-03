# PhD Student Academic Website

A fast, accessible, and privacy-first static website built with [Eleventy](https://11ty.dev) for academic professionals.

## ✨ Features

- 📱 **Responsive Design**: Mobile-first, accessible (WCAG 2.1 AA)
- 🌙 **Dark Mode**: Automatic theme switching with user preference
- 📚 **Publications**: BibTeX/JSON import with filtering and citation copying
- 📝 **Blog**: Markdown posts with syntax highlighting and RSS feed
- 👨‍🏫 **Teaching**: Course materials and documentation
- 🔒 **Privacy-First**: No cookies, optional analytics (Plausible/Umami)
- ⚡ **Performance**: Optimized for Lighthouse scores ≥95
- 🔐 **Security**: Strict CSP, email obfuscation, security headers

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```
   Site will be available at `http://localhost:5000`

3. **Build for production**:
   ```bash
   npm run build
   ```
   Output will be in the `public/` directory

## 📁 Project Structure

```
├── content/                    # All editable content
│   ├── site.yaml              # Site configuration
│   ├── about.md               # About page content
│   ├── contact.md             # Contact page content
│   ├── cv.md                  # CV page content
│   ├── publications.json      # Publications data (JSON format)
│   ├── publications.bib       # Publications data (BibTeX format)
│   ├── posts/                 # Blog posts (Markdown)
│   │   └── welcome.md
│   └── teaching/              # Teaching materials (Markdown)
│       └── course1.md
├── src/                       # Eleventy source files
│   ├── _data/                 # Data files
│   ├── _includes/             # Reusable components
│   ├── _layouts/              # Page layouts
│   ├── assets/                # CSS, JS, images
│   └── *.njk                  # Page templates
├── security/                  # Security documentation
│   └── headers.md
└── public/                    # Generated site (build output)
```

## 🎨 Customization

### Site Configuration

Edit `content/site.yaml` to customize:

```yaml
title: "Dr. [Your Name]"
description: "PhD Student in [Field] at [University]"
email: "your.email@university.edu"
orcid: "0000-0000-0000-0000"

# Enable analytics (optional)
analytics:
  enabled: true
  provider: "plausible"  # or "umami"
  domain: "yoursite.com"
```

### Publications

You can manage publications in two formats:

**JSON format** (`content/publications.json`):
```json
[
  {
    "title": "Your Paper Title",
    "authors": ["Your Name", "Co-Author"],
    "venue": "Conference Name",
    "year": 2024,
    "type": "conference",
    "doi": "10.1000/sample.doi",
    "url": "https://example.com/paper.pdf",
    "abstract": "Paper abstract...",
    "tags": ["machine learning", "AI"]
  }
]
```

**BibTeX format** (`content/publications.bib`):
```bibtex
@article{yourname2024title,
  title={Your Paper Title},
  author={Your Name and Co-Author},
  journal={Journal Name},
  year={2024},
  doi={10.1000/sample.doi}
}
```

### Blog Posts

Create new posts in `content/posts/` with this frontmatter:

```markdown
---
title: "Post Title"
date: 2024-09-02
tags: ["research", "tutorial"]
excerpt: "Brief description..."
---

Your content here...
```

### Teaching Materials

Add courses in `content/teaching/`:

```markdown
---
title: "Course Name"
course_code: "CS 101"
semester: "Fall 2024"
role: "Teaching Assistant"
---

Course description and materials...
```

## 🎯 Content Management

### Adding Content

1. **Pages**: Edit existing `.md` files in `content/`
2. **Blog Posts**: Create new `.md` files in `content/posts/`
3. **Teaching**: Create new `.md` files in `content/teaching/`
4. **Publications**: Update `content/publications.json` or `content/publications.bib`

### CV PDF

Place your CV PDF at `content/cv/cv.pdf` - it will be automatically copied to the build.

### Images and Assets

- Add images to `src/assets/images/`
- Add other assets to `src/assets/`
- Reference with `/assets/path/to/file`

## 🚀 Deployment

### Static Hosting (Recommended)

The site works with any static hosting provider:

- **Netlify**: Connect your repo, set build command to `npm run build`
- **Vercel**: Import project, build command `npm run build`, output directory `public`
- **GitHub Pages**: Use GitHub Actions with the build output from `public/`
- **Cloudflare Pages**: Connect repo, build command `npm run build`

### Build Settings

- **Build command**: `npm run build`
- **Output directory**: `public`
- **Node version**: 18+ (specify in `.nvmrc` if needed)

### Environment Variables (Optional)

For analytics or other features, set:
- `SITE_URL`: Your production URL
- `ANALYTICS_DOMAIN`: For Plausible/Umami analytics

## 🔧 Development

### Available Commands

```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run clean   # Clean build directory
```

### Adding New Features

1. **New Page Types**: Create layouts in `src/_layouts/`
2. **Custom Components**: Add to `src/_includes/`
3. **Styling**: Edit `src/assets/css/main.css`
4. **Scripts**: Edit `src/assets/js/main.js`

### Plugins and Extensions

The site uses these Eleventy plugins:
- `@11ty/eleventy-navigation` - Navigation
- `@11ty/eleventy-plugin-rss` - RSS feeds
- `markdown-it-prism` - Syntax highlighting
- `@citation-js/core` - BibTeX processing

## 🔒 Security

Security headers and CSP are documented in `security/headers.md`. Key features:

- Strict Content Security Policy
- Email obfuscation
- No cookies by default
- Optional privacy-first analytics

## 📊 Performance

The site is optimized for:
- **Lighthouse scores ≥95**
- **Minimal JavaScript** (progressive enhancement)
- **Optimized CSS** (no frameworks)
- **Fast builds** with Eleventy

## 🆘 Troubleshooting

### Common Issues

**Build fails with publication errors**:
- Check JSON syntax in `content/publications.json`
- Validate BibTeX format in `content/publications.bib`

**Styles not loading**:
- Ensure `src/assets/css/main.css` exists
- Check build output in `public/assets/`

**Analytics not working**:
- Verify settings in `content/site.yaml`
- Check domain configuration

### Development Tips

- Use `npm run dev` for hot reloading
- Check browser console for JavaScript errors
- Validate HTML with [W3C Validator](https://validator.w3.org/)

## 📄 License

MIT License - feel free to use for your academic website.

## 🤝 Contributing

This is a template for academic websites. Feel free to fork and customize for your needs.

---

Built with ❤️ using [Eleventy](https://11ty.dev)