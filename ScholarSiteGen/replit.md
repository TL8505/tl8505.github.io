# Overview

This is a fully functional static academic website built with Eleventy (11ty) designed for PhD students and academic professionals. The site provides a comprehensive platform for showcasing research publications, teaching experience, blog posts, and professional information. It features a clean, accessible design with dark mode support and privacy-first architecture.

**Status**: Complete and ready for customization. All core features have been implemented including responsive design, publications management, blog system, teaching sections, contact forms with email obfuscation, RSS feeds, and comprehensive security measures.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Static Site Generation
The site uses Eleventy (11ty) as the static site generator, chosen for its flexibility and performance. Content is written in Markdown with YAML front matter for metadata. The build process generates optimized HTML, CSS, and JavaScript files for deployment.

## Content Management Structure
Content is organized in a clear directory structure under `/content/` with separate folders for different content types (posts, teaching materials, etc.). Publications data can be managed either through JSON format or BibTeX files, with automatic parsing and formatting. The system supports dynamic collection generation for posts and teaching materials.

## Theme System
Implements a CSS custom properties-based theming system supporting light and dark modes. Theme preferences are stored in localStorage and automatically applied on page load. The design follows mobile-first responsive principles with accessibility in mind (WCAG 2.1 AA compliance).

## Publication Management
Publications are handled through a flexible data system that supports both JSON and BibTeX formats. The Citation.js library provides automatic citation formatting and BibTeX parsing. Publications include metadata for filtering, searching, and citation copying functionality.

## Security and Privacy
The architecture emphasizes privacy and security with no cookies, optional analytics integration (Plausible/Umami), email obfuscation, and comprehensive Content Security Policy implementation. Security headers are documented for various hosting platforms.

## Performance Optimization
CSS and JavaScript assets are minified for production. Images and static assets are passed through for optimization. The site is designed to achieve Lighthouse scores of 95+ across all metrics through optimized markup and asset delivery.

# External Dependencies

## Core Framework
- **Eleventy (@11ty/eleventy)**: Static site generator for building and deploying the website
- **@11ty/eleventy-navigation**: Provides navigation structure and breadcrumb functionality
- **@11ty/eleventy-plugin-rss**: Generates RSS feeds for blog posts

## Content Processing
- **markdown-it**: Core Markdown processor with extensions for anchors and syntax highlighting
- **markdown-it-anchor**: Automatic heading anchor generation
- **markdown-it-prism**: Syntax highlighting for code blocks
- **js-yaml**: YAML parsing for configuration and front matter

## Citation Management
- **@citation-js/core**: Citation processing and formatting
- **@citation-js/plugin-bibtex**: BibTeX file parsing and citation generation

## Asset Optimization
- **clean-css**: CSS minification for production builds
- **terser**: JavaScript minification and optimization
- **prismjs**: Syntax highlighting theme delivery via CDN

## Security and Content Safety
- **sanitize-html**: HTML sanitization for user-generated content protection

## External CDN Services
- **Prism.js CDN**: Delivers syntax highlighting CSS themes
- **Optional Analytics**: Supports Plausible.io or Umami for privacy-first analytics (configured but not required)