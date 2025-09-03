# Security Headers Documentation

This document outlines the Content Security Policy (CSP) and other security headers implemented for the PhD student website.

## Content Security Policy (CSP)

The following CSP is recommended for production deployment:

```
Content-Security-Policy: default-src 'self'; 
  script-src 'self' 'unsafe-inline' plausible.io *.plausible.io; 
  style-src 'self' 'unsafe-inline' cdn.jsdelivr.net; 
  img-src 'self' data: https:; 
  font-src 'self' data:; 
  connect-src 'self' plausible.io *.plausible.io; 
  frame-ancestors 'none'; 
  base-uri 'self'; 
  form-action 'self'
```

### Directive Explanations

- `default-src 'self'`: Only allow resources from the same origin by default
- `script-src 'self' 'unsafe-inline' plausible.io *.plausible.io`: Allow scripts from same origin, inline scripts (needed for theme toggle), and Plausible analytics
- `style-src 'self' 'unsafe-inline' cdn.jsdelivr.net`: Allow styles from same origin, inline styles, and Prism.js CDN
- `img-src 'self' data: https:`: Allow images from same origin, data URLs, and any HTTPS source
- `font-src 'self' data:`: Allow fonts from same origin and data URLs
- `connect-src 'self' plausible.io *.plausible.io`: Allow network requests to same origin and Plausible
- `frame-ancestors 'none'`: Prevent the site from being embedded in frames
- `base-uri 'self'`: Restrict base tag URLs to same origin
- `form-action 'self'`: Only allow form submissions to same origin

## Additional Security Headers

### For Static Site Hosting (Netlify, Vercel, etc.)

Add to `_headers` file:

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=()
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' plausible.io *.plausible.io; style-src 'self' 'unsafe-inline' cdn.jsdelivr.net; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' plausible.io *.plausible.io; frame-ancestors 'none'; base-uri 'self'; form-action 'self'
```

### For Apache (.htaccess)

```apache
<IfModule mod_headers.c>
    Header always set X-Frame-Options "DENY"
    Header always set X-Content-Type-Options "nosniff"
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
    Header always set Permissions-Policy "geolocation=(), microphone=(), camera=()"
    Header always set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' plausible.io *.plausible.io; style-src 'self' 'unsafe-inline' cdn.jsdelivr.net; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' plausible.io *.plausible.io; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"
</IfModule>
```

### For Nginx

```nginx
add_header X-Frame-Options "DENY" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' plausible.io *.plausible.io; style-src 'self' 'unsafe-inline' cdn.jsdelivr.net; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' plausible.io *.plausible.io; frame-ancestors 'none'; base-uri 'self'; form-action 'self'" always;
```

## Privacy Considerations

1. **No Cookies**: The site doesn't use cookies by default
2. **Optional Analytics**: Analytics is disabled by default and can be enabled via `content/site.yaml`
3. **Email Obfuscation**: Email addresses are obfuscated with JavaScript to prevent harvesting
4. **External Resources**: Limited to essential CDNs (Prism.js for syntax highlighting)

## HTTPS Enforcement

Ensure your hosting provider enforces HTTPS. For additional security, implement HTTP Strict Transport Security (HSTS):

```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

## Security Testing

Use tools like:
- [Mozilla Observatory](https://observatory.mozilla.org)
- [Security Headers](https://securityheaders.com)
- [OWASP ZAP](https://owasp.org/www-project-zap/)

## Regular Updates

- Keep dependencies updated
- Monitor security advisories for Node.js and npm packages
- Review CSP regularly as site features evolve