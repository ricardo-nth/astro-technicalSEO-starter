/**
 * Advanced caching and performance utilities
 * Provides cache headers, preloading strategies, and performance budgets
 */

/**
 * Cache header configurations for different asset types
 */
export const CacheConfig = {
  // Static assets (images, fonts, etc.) - Long term caching
  staticAssets: {
    'Cache-Control': 'public, max-age=31536000, immutable', // 1 year
    'Vary': 'Accept-Encoding',
  },
  
  // CSS and JS bundles - Long term with revisions
  bundles: {
    'Cache-Control': 'public, max-age=31536000, immutable', // 1 year
    'Vary': 'Accept-Encoding',
  },
  
  // HTML pages - Short term with revalidation
  pages: {
    'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400', // 1 hour fresh, 1 day stale
    'Vary': 'Accept-Encoding',
  },
  
  // API responses - Medium term with revalidation
  api: {
    'Cache-Control': 'public, max-age=300, stale-while-revalidate=3600', // 5 min fresh, 1 hour stale
    'Vary': 'Accept-Encoding',
  },
  
  // Sitemap and robots - Medium term
  seo: {
    'Cache-Control': 'public, max-age=86400', // 1 day
    'Vary': 'Accept-Encoding',
  },
};

/**
 * Performance budgets configuration
 */
export const PerformanceBudgets = {
  // Bundle size budgets (in KB)
  bundles: {
    javascript: 250, // 250KB total JS
    css: 50,         // 50KB total CSS
    images: 500,     // 500KB total images per page
    fonts: 100,      // 100KB total fonts
  },
  
  // Runtime performance budgets (in ms)
  metrics: {
    FCP: 1800,       // First Contentful Paint
    LCP: 2500,       // Largest Contentful Paint
    FID: 100,        // First Input Delay
    CLS: 0.1,        // Cumulative Layout Shift
    TTFB: 600,       // Time to First Byte
  },
  
  // Lighthouse score budgets
  lighthouse: {
    performance: 90,
    accessibility: 100,
    bestPractices: 100,
    seo: 100,
  },
};

/**
 * Resource hints for critical resources
 */
export interface ResourceHint {
  href: string;
  as?: 'script' | 'style' | 'font' | 'image' | 'fetch' | 'document';
  type?: string;
  crossorigin?: 'anonymous' | 'use-credentials';
  media?: string;
}

/**
 * Generate resource hints for critical assets
 */
export function generateResourceHints(): ResourceHint[] {
  return [
    // Preconnect to external domains
    { href: 'https://fonts.googleapis.com', as: undefined },
    { href: 'https://fonts.gstatic.com', as: undefined, crossorigin: 'anonymous' },
    { href: 'https://www.googletagmanager.com', as: undefined },
    
    // Preload critical fonts
    { 
      href: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZJhjp-Ek-_EeA.woff2',
      as: 'font',
      type: 'font/woff2',
      crossorigin: 'anonymous'
    },
  ];
}

/**
 * Critical CSS inlining strategy
 */
export const CriticalCSS = {
  // Inline critical CSS for above-the-fold content
  inline: [
    'layout', 'typography', 'hero', 'navigation'
  ],
  
  // Defer non-critical CSS
  defer: [
    'animations', 'interactions', 'below-fold'
  ],
};

/**
 * Service Worker configuration for caching
 */
export const ServiceWorkerConfig = {
  // Cache strategies
  strategies: {
    // Cache first for static assets
    staticAssets: 'CacheFirst',
    
    // Network first for HTML
    pages: 'NetworkFirst',
    
    // Stale while revalidate for API
    api: 'StaleWhileRevalidate',
  },
  
  // Runtime caching rules
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts-stylesheets',
        expiration: {
          maxEntries: 10,
          maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
        },
      },
    },
    {
      urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts-webfonts',
        expiration: {
          maxEntries: 30,
          maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
        },
      },
    },
  ],
};

/**
 * Build optimization configuration
 */
export const BuildOptimization = {
  // Rollup bundle optimization
  rollup: {
    output: {
      manualChunks: {
        // Vendor chunks
        'vendor-astro': ['astro'],
        'vendor-web-vitals': ['web-vitals'],
        
        // Utility chunks
        'utils': ['/src/utils/seo', '/src/utils/content', '/src/utils/vitals'],
        
        // Component chunks
        'components-seo': ['/src/components/seo'],
        'components-analytics': ['/src/components/analytics'],
      },
    },
  },
  
  // Vite optimization
  vite: {
    build: {
      cssCodeSplit: true,
      sourcemap: false, // Disable in production for smaller builds
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true, // Remove console.log in production
          drop_debugger: true,
        },
      },
    },
    
    // Dependency optimization
    optimizeDeps: {
      include: ['web-vitals'],
      exclude: ['@astrojs/vercel'],
    },
  },
};

/**
 * Compression configuration
 */
export const CompressionConfig = {
  gzip: {
    threshold: 1024, // Only compress files > 1KB
    level: 9,        // Maximum compression
    extensions: ['html', 'css', 'js', 'json', 'xml', 'svg'],
  },
  
  brotli: {
    threshold: 1024,
    quality: 11,     // Maximum quality
    extensions: ['html', 'css', 'js', 'json', 'xml', 'svg'],
  },
};

/**
 * Prefetch strategy for navigation
 */
export function initPrefetchStrategy() {
  if (typeof window === 'undefined') return;

  // Prefetch links on hover (for fast navigation)
  const prefetchOnHover = (link: HTMLAnchorElement) => {
    if (link.hostname !== window.location.hostname) return;
    
    const linkElement = document.createElement('link');
    linkElement.rel = 'prefetch';
    linkElement.href = link.href;
    document.head.appendChild(linkElement);
  };

  // Add hover listeners to internal links
  document.addEventListener('mouseover', (event) => {
    const target = event.target as HTMLElement;
    if (target.tagName === 'A') {
      prefetchOnHover(target as HTMLAnchorElement);
    }
  });

  // Prefetch links in viewport
  if ('IntersectionObserver' in window) {
    const linkObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const link = entry.target as HTMLAnchorElement;
          prefetchOnHover(link);
          linkObserver.unobserve(link);
        }
      });
    });

    // Observe all internal links
    document.querySelectorAll('a[href^="/"]').forEach((link) => {
      linkObserver.observe(link);
    });
  }
}

/**
 * Critical resource loading
 */
export function loadCriticalResources() {
  if (typeof window === 'undefined') return;

  // Preload critical images
  const criticalImages = [
    '/hero-image.webp',
    '/logo.svg',
  ];

  criticalImages.forEach((src) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = src;
    link.as = 'image';
    document.head.appendChild(link);
  });

  // Preload critical CSS
  const criticalCSS = document.querySelectorAll('link[rel="stylesheet"][data-critical]');
  criticalCSS.forEach((link) => {
    (link as HTMLLinkElement).rel = 'preload';
  });
}
