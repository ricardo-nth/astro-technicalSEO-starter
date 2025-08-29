# VPS Astro Technical SEO Starter
// Still in progress

**The technical SEO-first Astro boilerplate for real projects, agencies, and solo devs.**

---

## 🚀 Features

- **Ultra-modular SEO:** Per-page meta & schema, clean types, no SEO plugin lock-in.
- **Ready-to-swap analytics:** Google Analytics, Clarity, GTM, PartyTown, all as modular components.
- **Data-driven:** Meta/schema/analytics in per-page folders for instant clarity and maintainability.
- **No forced styling:** Add Tailwind, Preline, DaisyUI, or nothing—your choice.
- **Full technical SEO:** robots.txt, sitemap, favicons, site verification, humans.txt included.
- **Easy to extend:** Just add your own components and data in the same modular structure.

---

## 🛠️ Getting Started

1. **Clone the repo:**
   ```sh
   git clone https://github.com/yourname/astro-techinicalSEO-starter.git
   cd astro-starterSEO-starter
   pnpm install # or yarn/npm install

2.  Set your domain in `astro.config.mjs`:

    Edit the `site` property in your `astro.config.mjs` file to use your domain:

    ```js
    site: "https://yourdomain.com"
    ```

3. Edit meta & schema data

- See `/src/data/index/seo.ts`
- For new pages, create `/src/data/[your-page]/seo.ts` and `/src/data/[your-page]/content.ts`

4. Choose your styling

- Use Vanilla CSS, Tailwind, Preline, DaisyUI, WindUI, or none—it’s up to you.
- You can add Tailwind and UI kits at any time.

5. Build and run locally

```sh
pnpm dev     # Start local development server
pnpm build   # Build for production


## 📚 Philosophy

> “SEO and analytics should be easy, maintainable, and never block the next launch.”

This boilerplate is built to _never get in your way_, and to give clients and devs a real system they’ll understand and want to extend.

---

## 📄 Example Pages & Schemas

This starter includes demo pages to show how page-specific meta and schema work in practice.

- `/` (Home): Uses LocalBusiness schema.
- `/about`: Uses Organization or Person schema.

See each page's `/src/data/[page]/meta.ts` and `/src/data/[page]/schema.ts` for how to plug in per-page SEO and structured data.


## 🤝 Credits

- Made by [Rick @ VPS](https://vertexplatformsolutions.com)

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src
│   ├── assets
│   │   └── astro.svg
│   ├── components
│   │   └── Welcome.astro
│   │   └── Favicons.astro
│   │   └── seo
│   │   │    └── CommonMeta.astro
│   │   │    └── Meta.astro
│   │   │    └── Schema.astro
│   │   └── analytics
│   │   │    └── Clarity.astro
│   │   │    └── GoogleAnalytics.astro
│   │   │    └── SiteVerification.astro
│   │   │    └── TagManager.astro
│   ├── data
│   │   └── about
│   │   │    └── seo.ts
│   │   │    └── content.ts
│   │   └── contact
│   │   │    └── seo.ts
│   │   │    └── content.ts
│   │   └── global
│   │   │    └── seo.ts
│   │   │    └── content.ts
│   │   └── index
│   │   │    └── seo.ts
│   │   │    └── content.ts
│   ├── layouts
│   │   └── BaseLayout.astro
│   └── pages
│   │   └── index.astro
│   │   └── about.astro
│   │   └── contact.astro
│   └── types
│   │   └── seo.ts
└── package.json
```

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
