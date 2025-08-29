# VPS Astro Technical SEO Starter
**The technical SEO-first Astro boilerplate for real projects, agencies, and solo devs.**

---

## 🚀 Features

- **Content Collections SEO:** Leverages Astro's Content Collections for type-safe SEO data management
- **Single Source of Truth:** All content (SEO, schema, page data) centralized in `/src/content/`
- **GTM-Only Analytics:** Professional analytics setup with Google Tag Manager + PartyTown
- **Optional Site Verification:** Supports both meta tags and DNS verification methods
- **Data-driven Architecture:** JSON-based content structure for easy editing and version control
- **No forced styling:** Add Tailwind, Preline, DaisyUI, or nothing—your choice
- **Full technical SEO:** robots.txt, sitemap, favicons, site verification, humans.txt included
- **Easy to extend:** Modular structure with TypeScript support

---

## 🛠️ Getting Started

1. **Clone the repo:**
   ```sh
   git clone https://github.com/yourname/astro-techinicalSEO-starter.git
   cd astro-starterSEO-starter
   pnpm install # or yarn/npm install
   ```

2. **Set your domain in `astro.config.mjs`:**
   ```js
   site: "https://yourdomain.com"
   ```

3. **Configure SEO & Content:**
   - Edit global SEO: `/src/content/seo/global.json`
   - Edit page SEO: `/src/content/seo/[page].json`
   - Edit page content: `/src/content/pages/[page].json`

4. **Setup Analytics (Optional):**
   - Configure GTM: `/src/content/analytics.ts`
   - Note: Google Analytics should be configured within GTM for better performance

5. **Configure Site Verification (Optional):**
   - For meta tags: Add codes to `/src/content/verification.ts`
   - For DNS verification: Leave codes empty and add TXT records to your DNS

6. **Build and run:**
   ```sh
   pnpm dev     # Start local development server
   pnpm build   # Build for production
   ```

---

## 📁 Content Structure

```
src/content/
├── config.ts              # Content Collections schemas
├── seo/                   # SEO metadata & schema
│   ├── global.json        # Global SEO defaults
│   ├── index.json         # Homepage SEO
│   ├── about.json         # About page SEO
│   └── contact.json       # Contact page SEO
├── pages/                 # Page content data
│   ├── index.json         # Homepage content
│   ├── about.json         # About page content
│   └── contact.json       # Contact page content
├── analytics.ts           # GTM configuration
└── verification.ts        # Site verification codes
```

## 🔧 Key Improvements

### Content Collections Integration
- **Type Safety:** Full TypeScript validation for all content
- **Better DX:** Automatic type generation and IntelliSense
- **Centralized:** All content in one logical location

### GTM-Only Analytics
- **Better Performance:** Single analytics script instead of multiple
- **More Flexible:** Configure GA4, conversion tracking, and custom events in GTM
- **Professional Setup:** Industry standard approach

### Optional Site Verification
- **DNS Preferred:** Supports DNS TXT record verification
- **Meta Tag Fallback:** Optional meta tag verification for quick setup
- **Cleaner HTML:** Only outputs meta tags when codes are provided

---

## 📋 Adding New Pages

1. **Create SEO data:**
   ```json
   // src/content/seo/new-page.json
   {
     "meta": {
       "title": "Your Page Title",
       "description": "Your page description",
       "url": "https://yourdomain.com/new-page"
     },
     "schema": [/* Your schema.org data */]
   }
   ```

2. **Create page content:**
   ```json
   // src/content/pages/new-page.json
   {
     "hero": {
       "heading": "Page Heading",
       "subheading": "Page subheading"
     }
   }
   ```

3. **Create the page:**
   ```astro
   ---
   // src/pages/new-page.astro
   import BaseLayout from '@/layouts/BaseLayout.astro';
   import { mergeSeoData } from '@/utils/seo';
   import { getEntry } from 'astro:content';

   const { metadata, schemaData } = await mergeSeoData('new-page');
   const pageContent = await getEntry('pages', 'new-page');
   ---
   <BaseLayout metadata={metadata} schemaData={schemaData}>
     <!-- Your page content -->
   </BaseLayout>
   ```

---

## 🎯 SEO Features Included

✅ **Meta Tags:** Title, description, robots, keywords, author  
✅ **Open Graph:** Facebook, LinkedIn sharing optimization  
✅ **Twitter Cards:** Twitter sharing optimization  
✅ **Schema.org:** JSON-LD structured data  
✅ **Canonical URLs:** Proper URL canonicalization  
✅ **Favicons:** Complete favicon implementation  
✅ **Robots.txt:** Auto-generated robots.txt  
✅ **Sitemap:** Auto-generated XML sitemap  
✅ **Site Verification:** Google, Bing, Pinterest support  
✅ **Humans.txt:** Developer credits  

---

## 🔧 Analytics Setup

### Google Tag Manager Configuration:
1. Create a GTM container
2. Add your GTM ID to `/src/content/analytics.ts`
3. Configure GA4 within GTM (recommended approach)
4. Set up custom events and conversion tracking in GTM interface

### Performance Benefits:
- PartyTown integration moves scripts to web workers
- Single analytics entry point reduces script loading
- Professional setup preferred by enterprises

---

## 🚀 Project Structure

```text
/
├── public/
│   ├── favicon.svg
│   └── humans.txt
├── src/
│   ├── assets/
│   │   ├── astro.svg
│   │   ├── background.svg
│   │   ├── favicons/
│   │   └── styles/
│   │       └── global.css
│   ├── components/
│   │   ├── Hero.astro
│   │   ├── Steps.astro
│   │   ├── ChooseUs.astro
│   │   ├── Welcome.astro
│   │   ├── Favicons.astro
│   │   ├── analytics/
│   │   │   ├── Clarity.astro
│   │   │   ├── SiteVerification.astro
│   │   │   └── TagManager.astro
│   │   └── seo/
│   │       ├── CommonMeta.astro
│   │       ├── Meta.astro
│   │       └── Schema.astro
│   ├── content/
│   │   ├── config.ts
│   │   ├── analytics.ts
│   │   ├── verification.ts
│   │   ├── seo/
│   │   │   ├── global.json
│   │   │   ├── index.json
│   │   │   ├── about.json
│   │   │   └── contact.json
│   │   └── pages/
│   │       ├── index.json
│   │       ├── about.json
│   │       └── contact.json
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   └── contact.astro
│   ├── types/
│   │   └── seo.ts
│   └── utils/
│       └── seo.ts
└── package.json
```

---

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `pnpm install`             | Installs dependencies                            |
| `pnpm dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm build`           | Build your production site to `./dist/`          |
| `pnpm preview`         | Preview your build locally, before deploying     |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Get help using the Astro CLI                     |

---

## 🌟 Why This Approach?

- **Astro-Idiomatic:** Uses Content Collections as intended
- **Performance First:** GTM + PartyTown for optimal loading
- **Developer Friendly:** TypeScript validation and IntelliSense
- **Scalable:** Easy to add new pages and content types
- **Professional:** Industry standard analytics and SEO practices

---

## 🤝 Credits

Made with ❤️ by [Rick @ VPS](https://vertexplatformsolutions.com) for the web development community
