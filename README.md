# 🚀 Astro Technical SEO Starter
**The most advanced technical SEO-first Astro template with enterprise-grade performance optimization.**

[![Performance](https://img.shields.io/badge/Performance-A+-green)](https://pagespeed.web.dev/)
[![SEO](https://img.shields.io/badge/SEO-100%25-brightgreen)](https://lighthouse-ci.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue)](https://www.typescriptlang.org/)

---

## ✨ Key Features

### 🎯 **Advanced Technical SEO**
- **Content Collections Integration:** Type-safe SEO data management with Astro's Content Collections
- **Comprehensive Schema.org:** 400+ lines of utilities generating Organization, WebSite, WebPage, Article, FAQ, Service, and Product schemas
- **Content Quality Validation:** Development-time validation with real-time feedback for SEO optimization
- **Complete Meta Management:** Open Graph, Twitter Cards, canonical URLs, robots directives

### ⚡ **Performance Optimization**
- **Core Web Vitals Tracking:** Real-time LCP, FID, CLS, INP, TTFB monitoring with Google Analytics integration
- **Advanced Caching:** Manual chunking, compression (gzip + brotli), resource hints
- **Image Optimization:** Astro's native image processing with WebP/AVIF support
- **Performance Budgets:** Automatic warnings for poor performance metrics

### 🔧 **Developer Experience**
- **TypeScript First:** Full type safety with automatic type generation
- **Interactive Validation:** Development UI showing content quality issues in real-time
- **Modular Architecture:** Easy to extend with clean separation of concerns
- **Professional Analytics:** GTM + PartyTown integration for enterprise-grade tracking

### 📊 **Built-in Analytics & Monitoring**
- **Google Tag Manager Integration:** Professional analytics setup with PartyTown
- **Web Vitals Dashboard:** Core Web Vitals tracking and budget monitoring
- **Custom Performance Metrics:** Navigation timing, interaction tracking
- **Optional Analytics:** Supports Google Analytics, Clarity, and custom solutions

---

## 🛠️ Quick Start

1. **Clone and Install:**
   ```bash
   git clone https://github.com/ricardo-nth/astro-technicalSEO-starter.git
   cd astro-technicalSEO-starter
   pnpm install
   ```

2. **Configure Your Site:**
   ```js
   // astro.config.mjs
   site: "https://yourdomain.com"
   ```

3. **Set Up Content:**
   ```bash
   # Edit global SEO settings
   src/content/seo/global.json

   # Edit page-specific SEO
   src/content/seo/index.json
   src/content/seo/about.json

   # Edit page content
   src/content/pages/index.json
   ```

4. **Configure Analytics (Optional):**
   ```typescript
   // src/content/analytics.ts
   export const analytics = {
     gtm: {
       id: 'GTM-XXXXXXX', // Your GTM container ID
       enabled: true
     }
   }
   ```

5. **Run Development Server:**
   ```bash
   pnpm dev  # Visit http://localhost:4321
   ```

---

## 📚 Interactive Content Management

### 🎨 **Content Collections Structure**
All content is managed through Astro's Content Collections for full type safety:

```
src/content/
├── config.ts              # Content schemas & validation
├── seo/                   # SEO metadata for each page
│   ├── global.json        # Global SEO settings & defaults
│   ├── index.json         # Homepage SEO configuration
│   ├── about.json         # About page SEO
│   └── contact.json       # Contact page SEO
├── pages/                 # Page-specific content data  
│   ├── index.json         # Homepage content
│   ├── about.json         # About page content
│   └── contact.json       # Contact page content
├── analytics.ts           # Analytics configuration
└── verification.ts        # Site verification codes
```

### ✏️ **Editing Content**

#### **Global SEO Settings** (`src/content/seo/global.json`):
```json
{
  "site": {
    "name": "Your Company Name",
    "description": "Your company description",
    "url": "https://yourdomain.com",
    "logo": "/logo.png",
    "image": "/og-image.jpg"
  },
  "social": {
    "twitter": "@yourhandle",
    "facebook": "yourcompany",
    "linkedin": "company/yourcompany"
  },
  "contact": {
    "email": "hello@yourdomain.com",
    "phone": "+1-555-0123",
    "address": {
      "street": "123 Main St",
      "city": "Your City",
      "state": "CA",
      "zip": "12345",
      "country": "US"
    }
  }
}
```

#### **Page SEO Configuration** (`src/content/seo/index.json`):
```json
{
  "meta": {
    "title": "Your Page Title | Company Name",
    "description": "Compelling page description for search results",
    "keywords": ["keyword1", "keyword2", "keyword3"],
    "robots": "index, follow",
    "canonical": "https://yourdomain.com/",
    "openGraph": {
      "type": "website",
      "image": "/og-homepage.jpg",
      "imageAlt": "Homepage preview image"
    }
  },
  "schema": {
    "type": "WebPage",
    "breadcrumbs": [],
    "organization": true,
    "website": true
  }
}
```

#### **Page Content** (`src/content/pages/index.json`):
```json
{
  "hero": {
    "heading": "Welcome to Our Company",
    "subheading": "We deliver exceptional results",
    "ctaText": "Get Started",
    "ctaUrl": "/contact"
  },
  "features": [
    {
      "title": "Feature Name",
      "description": "Feature description",
      "icon": "icon-name"
    }
  ]
}
```

### 🔧 **Development Validation**

The template includes a **real-time validation system** that appears during development:

- ✅ **SEO Validation**: Title length, meta description, keywords count
- ✅ **Content Quality**: Word count, readability, heading structure  
- ✅ **Schema Validation**: Required fields, type-specific validation
- ✅ **Performance**: Image optimization, loading attributes

**View validation in development:**
```bash
pnpm dev
# Visit any page - validation report appears at bottom
```

---

## 🏗️ Adding New Pages

### 1. **Create SEO Configuration**
```json
// src/content/seo/new-page.json
{
  "meta": {
    "title": "New Page Title | Your Company",
    "description": "Compelling description for search results (120-160 chars)",
    "keywords": ["relevant", "keywords", "here"],
    "robots": "index, follow",
    "canonical": "https://yourdomain.com/new-page",
    "openGraph": {
      "type": "website", 
      "image": "/og-new-page.jpg",
      "imageAlt": "Page preview description"
    }
  },
  "schema": {
    "type": "WebPage", // or "Article", "Service", "Product"
    "breadcrumbs": [
      { "name": "Home", "url": "/" },
      { "name": "New Page", "url": "/new-page" }
    ]
  }
}
```

### 2. **Create Page Content**
```json
// src/content/pages/new-page.json
{
  "hero": {
    "heading": "New Page Heading",
    "subheading": "Compelling subheading text",
    "ctaText": "Call to Action",
    "ctaUrl": "/contact"
  },
  "sections": [
    {
      "title": "Section Title",
      "content": "Section content here...",
      "image": {
        "src": "/images/section-image.jpg",
        "alt": "Descriptive alt text"
      }
    }
  ]
}
```

### 3. **Create the Page File**
```astro
---
// src/pages/new-page.astro
import BaseLayout from '@/layouts/BaseLayout.astro';
import { mergeSeoData } from '@/utils/seo';
import { generateSchemas } from '@/utils/schema';
import { getEntry } from 'astro:content';

// Get SEO data and content
const { metadata, schemaData } = await mergeSeoData('new-page');
const pageContent = await getEntry('pages', 'new-page');

// Generate structured data
const schemas = await generateSchemas(schemaData, metadata);
---

<BaseLayout metadata={metadata} schemas={schemas}>
  <main>
    <section class="hero">
      <h1>{pageContent.data.hero.heading}</h1>
      <p>{pageContent.data.hero.subheading}</p>
      <a href={pageContent.data.hero.ctaUrl}>
        {pageContent.data.hero.ctaText}
      </a>
    </section>
    
    <!-- Add your page content here -->
  </main>
</BaseLayout>
```

---

## 🎯 Technical SEO Features

### ✅ **Complete SEO Implementation**
- **Meta Tags**: Title, description, robots, keywords, author
- **Open Graph**: Facebook, LinkedIn sharing optimization  
- **Twitter Cards**: Twitter sharing with proper card types
- **Schema.org**: Automatic JSON-LD structured data generation
- **Canonical URLs**: Proper URL canonicalization across all pages
- **Favicons**: Complete favicon implementation with all sizes
- **Robots.txt**: Auto-generated robots.txt with sitemap reference
- **Sitemap**: Auto-generated XML sitemap with proper priorities
- **Site Verification**: Google, Bing, Pinterest verification support

### ⚡ **Performance Optimization**
- **Core Web Vitals**: Real-time LCP, FID, CLS, INP tracking
- **Performance Budgets**: Automatic warnings for poor metrics
- **Image Optimization**: WebP/AVIF generation, lazy loading, responsive images
- **Compression**: Gzip + Brotli compression for all assets
- **Caching**: Manual chunking, content hashing, cache-busting
- **Resource Hints**: DNS prefetch, preconnect, preload directives

### � **Analytics & Monitoring**
- **Google Tag Manager**: Professional analytics setup with PartyTown
- **Web Vitals Dashboard**: Performance monitoring and reporting
- **Custom Events**: Navigation timing, interaction tracking
- **Development Analytics**: Performance debugging in dev mode

---

## 🔧 Advanced Configuration

### **Schema.org Customization**
The template automatically generates rich structured data:

```typescript
// Supported schema types:
- Organization Schema (business info, contact details)
- WebSite Schema (with site search functionality)  
- WebPage Schema (with breadcrumbs, author info)
- Article Schema (for blog posts and articles)
- Service Schema (for service pages)
- FAQ Schema (structured Q&A data)
- Product Schema (for e-commerce pages)
- LocalBusiness Schema (for location-based businesses)
```

### **Performance Monitoring Setup**
```typescript
// src/content/analytics.ts
export const analytics = {
  gtm: {
    id: 'GTM-XXXXXXX',
    enabled: true,
    partytown: true  // Moves scripts to web workers
  },
  webVitals: {
    enabled: true,
    debug: false,    // Set to true in development
    budgets: {
      lcp: 2500,     // Largest Contentful Paint (ms)
      fid: 100,      // First Input Delay (ms)  
      cls: 0.1       // Cumulative Layout Shift
    }
  }
}
```

### **Content Validation Rules**
```typescript
// Custom validation rules
const validationRules = {
  title: { min: 30, max: 60 },           // Characters
  description: { min: 120, max: 160 },   // Characters  
  keywords: { max: 10 },                 // Count
  content: { min: 300 },                 // Characters
  headings: { required: ['h1'] },        // Required heading levels
  images: { requireAlt: true }           // Alt text required
}
```

---

## � Project Structure

```text
/
├── public/
│   ├── favicon.svg                    # Main favicon
│   └── humans.txt                     # Developer credits
├── src/
│   ├── assets/                        # Optimized assets
│   │   ├── favicons/                  # Complete favicon set
│   │   └── styles/
│   │       └── global.css             # Global styles
│   ├── components/                    
│   │   ├── analytics/                 # Analytics components
│   │   │   ├── WebVitals.astro       # Core Web Vitals tracking
│   │   │   ├── TagManager.astro      # GTM integration
│   │   │   ├── Clarity.astro         # Microsoft Clarity
│   │   │   └── SiteVerification.astro # Site verification
│   │   ├── dev/                       # Development tools
│   │   │   └── ValidationReport.astro # Content validation UI
│   │   ├── performance/               # Performance optimization
│   │   │   └── Performance.astro     # Performance hints & optimization
│   │   ├── seo/                       # SEO components
│   │   │   ├── Meta.astro            # Meta tags
│   │   │   ├── Schema.astro          # Schema.org structured data
│   │   │   └── CommonMeta.astro      # Common meta elements
│   │   └── ui/                        # UI components
│   │       ├── Hero.astro            # Hero section
│   │       ├── Steps.astro           # Process steps
│   │       ├── ChooseUs.astro        # Features section
│   │       └── Welcome.astro         # Welcome section
│   ├── content/                       # Content Collections
│   │   ├── config.ts                 # Content schemas
│   │   ├── analytics.ts              # Analytics configuration
│   │   ├── verification.ts           # Site verification codes
│   │   ├── seo/                      # SEO metadata
│   │   │   ├── global.json           # Global SEO settings
│   │   │   ├── index.json            # Homepage SEO
│   │   │   ├── about.json            # About page SEO
│   │   │   └── contact.json          # Contact page SEO
│   │   └── pages/                    # Page content
│   │       ├── index.json            # Homepage content
│   │       ├── about.json            # About page content
│   │       └── contact.json          # Contact page content
│   ├── layouts/
│   │   └── BaseLayout.astro          # Main layout with SEO
│   ├── pages/                        # Route pages
│   │   ├── index.astro               # Homepage
│   │   ├── about.astro               # About page
│   │   └── contact.astro             # Contact page
│   ├── types/                        # TypeScript definitions
│   │   ├── seo.ts                    # SEO types
│   │   └── schema.ts                 # Schema.org types
│   └── utils/                        # Utility functions
│       ├── seo.ts                    # SEO utilities
│       ├── schema.ts                 # Schema generation (400+ lines)
│       ├── validation.ts             # Content validation (500+ lines)
│       ├── vitals.ts                 # Web Vitals utilities
│       └── assets.ts                 # Asset optimization
└── package.json
```

---

## 🧞 Commands

| Command | Action |
|:--------|:-------|
| `pnpm install` | Install dependencies |
| `pnpm dev` | Start dev server at `localhost:4321` |
| `pnpm build` | Build production site to `./dist/` |
| `pnpm preview` | Preview build locally |
| `pnpm astro ...` | Run Astro CLI commands |
| `pnpm astro check` | Type check and validate |

---

## 🚀 Deployment

### **Build Output**
The template produces optimized builds with:
- **Compressed Assets**: Gzip + Brotli compression
- **Chunked JavaScript**: Optimized loading with manual chunks
- **Optimized Images**: WebP/AVIF generation with responsive sizes
- **Performance Budget**: Automatic validation of Core Web Vitals

```bash
# Production build
pnpm build

# Preview production build
pnpm preview
```

### **Vercel Deployment** (Recommended)
```bash
# Deploy to Vercel
npx vercel

# Or connect your GitHub repo to Vercel for automatic deployments
```

### **Other Platforms**
The template works with any static hosting platform:
- Netlify
- Cloudflare Pages  
- GitHub Pages
- AWS S3 + CloudFront

---

## � Why This Template?

### **🏆 Performance First**
- **Core Web Vitals Optimized**: Real-time monitoring and budget enforcement
- **Enterprise-Grade Caching**: Manual chunking and compression strategies
- **Image Optimization**: Automatic WebP/AVIF generation with responsive sizing

### **🔍 SEO Excellence**
- **Schema.org Mastery**: 400+ lines of structured data utilities
- **Content Quality Assurance**: Real-time validation with actionable feedback
- **Technical SEO Complete**: Meta tags, sitemaps, robots.txt, canonical URLs

### **👨‍💻 Developer Experience**
- **TypeScript Strict Mode**: Full type safety with auto-generated types
- **Content Collections**: Type-safe content management with validation
- **Interactive Development**: Real-time SEO and performance feedback

### **📈 Production Ready**
- **Analytics Integration**: GTM + PartyTown for professional tracking
- **Quality Validation**: Automated content and SEO validation
- **Scalable Architecture**: Easy to extend and maintain

---

## 📚 Learn More

- [Astro Documentation](https://docs.astro.build)
- [Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Schema.org Documentation](https://schema.org)
- [Core Web Vitals](https://web.dev/vitals/)
- [Google Tag Manager](https://tagmanager.google.com)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🌟 Credits

Made with ❤️ by [Rick @ VPS](https://vertexplatformsolutions.com) for the web development community.

**Built with:**
- [Astro](https://astro.build) - The web framework for content-driven websites
- [TypeScript](https://www.typescriptlang.org) - Type-safe JavaScript
- [web-vitals](https://github.com/GoogleChrome/web-vitals) - Core Web Vitals tracking
- [PartyTown](https://partytown.builder.io) - Web worker analytics
