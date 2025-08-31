# Astro Technical SEO Starter - AI Agent Guide

## 🤖 **Repository Overview for AI Agents**
This document provides a technical, machine-readable guide for AI coding assistants to understand and interact with this repository.

### **Project Objective**
A production-ready Astro template focused on technical SEO excellence, performance, and extensibility. The Community Edition is a free, open-source foundation for premium, niche-specific versions.

### **Key Metrics**
- **Performance Score**: 100/100 (Lighthouse)
- **SEO Score**: 100/100 (Lighthouse)
- **Bundle Size**: ~628KB
- **TypeScript**: Strict mode, 0 compilation errors

---

## 🏗️ **Technical Architecture**

### **Technology Stack**
- **Framework**: Astro 5.x
- **Language**: TypeScript (strict mode)
- **Package Manager**: pnpm
- **Styling**: Vanilla CSS with optional framework integration via cascade layers
- **Deployment**: Vercel, Netlify, GitHub Pages (CI/CD automated)

### **Layout Hierarchy**
1.  `BaseLayout.astro`: Core SEO, analytics, performance monitoring
2.  `SiteLayout.astro`: Global UI components (Navigation, Footer)
3.  **Page Components**: Individual page content (`src/pages/*.astro`)

### **Extensibility Points**
- **Plugin System**: `src/utils/plugins.ts` - Tier-based feature activation
- **Asset System**: `src/utils/assets.ts` - Multi-format image optimization
- **Security System**: `src/utils/security/csp.ts` - Enterprise-grade CSP
- **Marketing Templates**: `src/templates/` - Conversion-optimized layouts

---

## 🗺️ **File System Map**

```
/
├── .github/workflows/      # CI/CD automation (build, test, deploy)
├── deployment/             # Production deployment guides
├── dist/                   # Build output (gitignored)
├── public/                 # Static assets (robots.txt, favicons)
├── scripts/                # Node.js scripts (bundle analysis)
├── src/
│   ├── assets/             # Images, styles, fonts
│   ├── components/         # Reusable Astro components
│   │   ├── analytics/      # Tracking scripts (GTM, Clarity)
│   │   ├── layout/         # Global layout components
│   │   ├── sections/       # Page content blocks
│   │   └── seo/            # SEO meta components
│   ├── content/            # Astro content collections (JSON, MD)
│   │   ├── config.ts       # Content collection schemas (Zod)
│   │   └── ...             # Individual content files
│   ├── layouts/            # Core page layouts (BaseLayout, SiteLayout)
│   ├── pages/              # Site pages (index.astro, about.astro)
│   ├── templates/          # Marketing landing page templates
│   └── utils/              # Utility functions (TS)
│       ├── assets.ts       # Image optimization
│       ├── content.ts      # Content collection getters
│       ├── plugins.ts      # Plugin system
│       └── security/       # CSP, headers, monitoring
├── astro.config.mjs        # Astro configuration
├── package.json            # Project dependencies and scripts
└── tsconfig.json           # TypeScript configuration
```

---

## ⚙️ **Available Commands & Scripts**

- `pnpm dev`: Start development server
- `pnpm build`: Build for production
- `pnpm preview`: Preview production build
- `pnpm check`: Run TypeScript type checking
- `pnpm analyze`: Analyze production bundle size
- `pnpm audit`: Run security audit and type checking
- `pnpm lighthouse`: Run Lighthouse performance audit
- `pnpm test:accessibility`: Run accessibility tests
- `pnpm format`: Format code with Prettier
- `pnpm lint`: Lint code with ESLint

---

## 📝 **Common Development Tasks**

### **Adding a New Page**
1.  Create a new `.astro` file in `src/pages/`.
2.  Use the `SiteLayout` component for consistent structure.
3.  Add content using components from `src/components/sections/`.
4.  Add a new entry to `src/content/navigation/navigation.json` to include it in the main navigation.

### **Adding a New Component**
1.  Create a new `.astro` file in the appropriate `src/components/` subfolder.
2.  Follow the modular architecture (e.g., UI components in `ui/`, page sections in `sections/`).
3.  Use vanilla CSS for styling.
4.  Ensure the component is accessible (WCAG 2.1 AA).

### **Adding a New Content Collection**
1.  Create a new folder in `src/content/`.
2.  Define the schema in `src/content/config.ts` using Zod.
3.  Add content files (JSON or Markdown).
4.  Create a getter function in `src/utils/content.ts` to access the data.

### **Activating a Premium Feature**
1.  Locate the relevant utility file (e.g., `src/utils/plugins.ts`).
2.  Uncomment or implement the premium feature configuration.
3.  Follow the documentation in the file for specific instructions.
4.  Example: Enable multi-format image generation in `src/utils/assets.ts`.

---

## 🔒 **Security & Deployment**

- **CI/CD**: Managed by GitHub Actions in `.github/workflows/`.
- **Deployment**: Automated to Vercel or Netlify.
- **Security Headers**: Configured in `src/utils/security/csp.ts`.
- **Environment Variables**: Managed via GitHub repository secrets and variables. See `deployment/README.md` for a full list.

This guide provides all the necessary technical context for an AI assistant to effectively understand, modify, and extend this repository.
