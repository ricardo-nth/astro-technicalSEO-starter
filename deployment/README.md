# Production Deployment Guide

This guide covers deploying your Astro Technical SEO Starter to production with enterprise-grade features.

## 🚀 Quick Start

1. **Copy environment template**
   ```bash
   cp .env.example .env
   ```

2. **Configure environment variables** (see Environment Setup below)

3. **Choose deployment platform** (Netlify, Vercel, or custom)

4. **Set up GitHub repository secrets**

5. **Push to main branch** - automatic deployment will trigger

## 📋 Environment Setup

### Required Variables

```bash
# Site Configuration
SITE_URL=https://yourdomain.com
NODE_ENV=production

# Analytics (optional but recommended)
GTM_ID=GTM-XXXXXXX
GA_ID=G-XXXXXXXXXX
```

### Optional Enhancements

```bash
# Error Monitoring (recommended for production)
SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx

# Site Verification
GOOGLE_SITE_VERIFICATION=your-verification-code
BING_SITE_VERIFICATION=your-verification-code

# Performance Monitoring
LHCI_GITHUB_APP_TOKEN=your-lighthouse-token
```

## 🌐 Platform Deployment

### Netlify Deployment

1. **Connect repository** to Netlify
2. **Set environment variables** in Netlify dashboard
3. **Configure build settings**:
   - Build command: `pnpm run build`
   - Publish directory: `dist`
   - Node version: `18`

### Vercel Deployment

1. **Connect repository** to Vercel
2. **Set environment variables** in Vercel dashboard  
3. **Build settings** are auto-configured via `vercel.json`

### GitHub Pages

1. **Enable GitHub Pages** in repository settings
2. **Set up GitHub Secrets** (see below)
3. **Push to main branch** - workflow will deploy automatically

## 🔐 GitHub Secrets Setup

Add these secrets in your GitHub repository settings:

### Required for All Platforms
```
SITE_URL=https://yourdomain.com
GTM_ID=GTM-XXXXXXX
GA_ID=G-XXXXXXXXXX
```

### For Netlify
```
NETLIFY_AUTH_TOKEN=your-netlify-token
NETLIFY_SITE_ID=your-site-id
NETLIFY_STAGING_SITE_ID=your-staging-site-id
```

### For Vercel
```
VERCEL_TOKEN=your-vercel-token
VERCEL_ORG_ID=your-org-id
VERCEL_PROJECT_ID=your-project-id
```

### For Error Monitoring
```
SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
SENTRY_AUTH_TOKEN=your-sentry-token
```

## 🔧 CI/CD Workflows

### Automatic Deployments

- **Production**: Deploys on push to `main` branch
- **Staging**: Deploys on pull requests to `main`
- **Quality Gates**: TypeScript check, build verification, Lighthouse CI

### Performance Budgets

Lighthouse CI enforces these performance standards:
- Performance Score: ≥ 90
- Accessibility Score: ≥ 90
- SEO Score: ≥ 90
- LCP: ≤ 2.5s
- CLS: ≤ 0.1

## 🛡️ Security Features

### Automatically Enabled

- Content Security Policy (CSP)
- HTTPS enforcement with HSTS
- XSS and clickjacking protection
- Secure caching headers
- Vulnerability scanning

### Optional Enhancements

- Sentry error monitoring
- Advanced performance monitoring
- Real user monitoring (RUM)

## 📊 Monitoring & Analytics

### Built-in Monitoring

- Core Web Vitals tracking
- Performance monitoring
- Error tracking (if Sentry configured)
- Analytics integration (GTM/GA)

### Production Health Checks

Access these endpoints to verify deployment:
- `/.well-known/health` - Health check endpoint
- `/sitemap-index.xml` - SEO sitemap
- Performance metrics via Web Vitals API

## 🔧 Optional Dependencies

Add these for enhanced features:

```bash
# Error Monitoring
pnpm add @sentry/browser

# Advanced Performance Monitoring  
pnpm add web-vitals

# Security Headers Validation
pnpm add @netlify/plugin-lighthouse
```

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version (requires 18+)
   - Verify all environment variables
   - Review TypeScript compilation errors

2. **Performance Budget Failures**
   - Check Lighthouse CI results
   - Review Core Web Vitals metrics
   - Optimize images and assets

3. **Security Header Issues**
   - Review CSP configuration
   - Check external script domains
   - Verify HTTPS configuration

### Support

- Review GitHub Actions logs for deployment issues
- Check platform-specific documentation (Netlify/Vercel)
- Monitor Sentry for runtime errors (if configured)

## 📈 Production Optimization

### Recommended Practices

1. **Enable all analytics** in production
2. **Set up error monitoring** with Sentry
3. **Configure performance budgets** 
4. **Monitor Core Web Vitals** regularly
5. **Review security headers** periodically

### Performance Monitoring

The starter includes comprehensive performance monitoring:
- Real-time Web Vitals tracking
- Performance budget enforcement
- Automated regression detection
- Production performance dashboards

---

**Next Steps**: After deployment, monitor your site's performance and consider implementing additional business-specific optimizations based on real user data.
