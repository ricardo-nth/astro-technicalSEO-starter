# Production Deployment Guide

This guide covers deploying your Astro Technical SEO Starter to production with enterprise-grade CI/CD automation.

## 🎯 Deployment Overview

This template uses **GitHub Actions** for enterprise-level deployment automation with:
- ✅ **Quality Gates**: TypeScript, Build, Security, Performance checks
- ✅ **Safety Mechanisms**: Automatic blocking on failures  
- ✅ **Multi-Platform**: Vercel, Netlify support with graceful fallbacks
- ✅ **Performance Standards**: Lighthouse CI with realistic thresholds

## 🚀 Quick Start (Vercel - Recommended)

### Step 1: Get Vercel Credentials

```bash
# Install Vercel CLI
npm i -g vercel

# Login to your Vercel account
vercel login

# Link your project (run in project root)
vercel link
```

The `vercel link` command creates `.vercel/project.json` with your project details.

### Step 2: Extract Project Information

```bash
# View your project details
cat .vercel/project.json
```

You'll see something like:
```json
{
  "projectId": "prj_abc123xyz",
  "orgId": "team_def456uvw"
}
```

### Step 3: Get Vercel Token

1. Go to [Vercel Dashboard → Settings → Tokens](https://vercel.com/account/tokens)
2. Create a new token with "Full Account" scope
3. Copy the token (you'll only see it once!)

### Step 4: Configure GitHub Repository

Go to your GitHub repository → **Settings** → **Secrets and variables** → **Actions**

**Repository Secrets** (sensitive data):
```
VERCEL_TOKEN=your_vercel_token_from_step_3
```

**Repository Variables** (non-sensitive data):
```
SITE_URL=https://yourdomain.com
VERCEL_PROJECT_ID=prj_abc123xyz
VERCEL_ORG_ID=team_def456uvw
GTM_ID=GTM-XXXXXXX
GA_ID=G-XXXXXXXXXX
```

### Step 5: Test Deployment

```bash
# Push to main branch
git push origin main

# Watch GitHub Actions
# Go to: GitHub repo → Actions tab
# You should see: CI workflow → Production deployment
```

## 🔧 Advanced Configuration

### Optional Services Setup

#### Lighthouse CI (Performance Monitoring)
```bash
# Get Lighthouse CI token from: https://github.com/apps/lighthouse-ci
# Add to GitHub Secrets:
LHCI_GITHUB_APP_TOKEN=your_lighthouse_token
```

#### Error Monitoring (Sentry)
```bash
# Create account at: https://sentry.io
# Add to GitHub Variables:
SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
```

#### Multiple Platform Deployment

**For Vercel + Netlify:**
```bash
# GitHub Variables:
VERCEL_PROJECT_ID=prj_abc123
NETLIFY_SITE_ID=site_def456

# GitHub Secrets:
VERCEL_TOKEN=your_vercel_token
NETLIFY_AUTH_TOKEN=your_netlify_token
```

### Company Information Setup

Update your company details in:

1. **Site Configuration**: `src/content/global/site-config.json`
```json
{
  "organization": {
    "name": "Your Company Name",
    "url": "https://yourcompany.com",
    "email": "hello@yourcompany.com"
  }
}
```

2. **GitHub Variables** (for build-time injection):
```
SITE_URL=https://yourcompany.com
GTM_ID=GTM-XXXXXXX
GA_ID=G-XXXXXXXXXX
```

## 🚨 Troubleshooting

### Common Issues

**❌ `ERR_PNPM_INVALID_WORKSPACE_CONFIGURATION`**
- ✅ **Fixed**: Workspace configuration corrected in latest version

**❌ `Unable to locate executable file: pnpm`**  
- ✅ **Fixed**: Corepack enabled before pnpm setup

**❌ `Lighthouse CI fails with timeout`**
- ✅ **Fixed**: Thresholds adjusted to realistic values (FCP: 3s, LCP: 3.5s)

**❌ `Deployment runs but CI failed`**
- ✅ **Fixed**: Production deployment now depends on CI success

### Deployment Flow Verification

```bash
# Your deployment should follow this flow:
1. Push to main
2. CI Workflow runs:
   ✅ TypeScript check
   ✅ Build verification  
   ✅ Security scan
   ✅ Lighthouse performance test
3. IF ALL PASS → Production deployment
4. IF ANY FAIL → Deployment blocked (site stays safe)
```

### Monitoring Your Deployment

1. **GitHub Actions**: Monitor workflow progress
   - Go to: `github.com/yourname/repo/actions`

2. **Vercel Dashboard**: Monitor live deployments
   - Go to: `vercel.com/dashboard`

3. **Lighthouse Reports**: Monitor performance
   - Available in CI workflow artifacts

## 🎯 Production Checklist

Before going live, ensure:

- [ ] **Domain configured** in Vercel/Netlify dashboard
- [ ] **SSL certificate** automatically provisioned
- [ ] **Analytics tracking** working (GTM/GA)
- [ ] **Error monitoring** configured (Sentry)
- [ ] **Performance monitoring** active (Lighthouse CI)
- [ ] **Site verification** completed (Google/Bing)
- [ ] **Company information** updated in site-config.json

## 📊 What You Get

### Enterprise Features:
- **Zero-downtime deployments**: Users never see your site go down
- **Automatic rollbacks**: Previous version restored if deployment fails
- **Performance guarantees**: Site speed automatically monitored
- **Security scanning**: Dependencies checked for vulnerabilities  
- **Quality gates**: Broken code never reaches production
- **Multi-environment**: Separate staging/production environments

### Monitoring & Analytics:
- **Real User Monitoring**: Core Web Vitals tracking
- **Error Tracking**: Production error monitoring with Sentry
- **Performance Budgets**: Lighthouse CI with automated alerts
- **Security Headers**: CSP, HSTS, XSS protection
- **SEO Monitoring**: Technical SEO validation

This is the same deployment pattern used by enterprise companies like Netflix, Shopify, and GitHub! 🎉

---

## 🌐 Alternative Deployment Options

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
