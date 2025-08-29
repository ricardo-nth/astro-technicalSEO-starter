import { defineCollection, z } from 'astro:content';

// Define the SEO schema for type safety
const seoCollection = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    keywords: z.array(z.string()).optional(),
    ogImage: z.string().optional(),
    robots: z.string().optional(),
    canonical: z.string().optional(),
    author: z.string().optional(),
    datePublished: z.string().optional(),
    dateModified: z.string().optional(),
    articleSection: z.string().optional(),
    tags: z.array(z.string()).optional(),
    schema: z.object({
      type: z.enum(['webpage', 'article', 'service', 'product', 'faq', 'about', 'contact']).default('webpage'),
      breadcrumbs: z.array(z.object({
        name: z.string(),
        url: z.string().optional(),
      })).optional(),
      faqs: z.array(z.object({
        question: z.string(),
        answer: z.string(),
      })).optional(),
      services: z.array(z.object({
        name: z.string(),
        description: z.string(),
        serviceType: z.string().optional(),
        category: z.string().optional(),
      })).optional(),
      products: z.array(z.object({
        name: z.string(),
        description: z.string(),
        category: z.string().optional(),
        sku: z.string().optional(),
      })).optional(),
    }).optional(),
  }),
});

// Define pages collection for content
const pagesCollection = defineCollection({
  type: 'data',
  schema: z.object({
    hero: z.object({
      heading: z.string(),
      subheading: z.string().optional(),
      description: z.string().optional(),
    }),
  }),
});

// Global content collections for reusable business data
const companyCollection = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    tagline: z.string().optional(),
    description: z.string(),
    founded: z.number().optional(),
    teamSize: z.string().optional(),
    location: z.string().optional(),
    mission: z.string().optional(),
    vision: z.string().optional(),
    values: z.array(z.string()).optional(),
  }),
});

const contactCollection = defineCollection({
  type: 'data',
  schema: z.object({
    email: z.string().email().optional(),
    phone: z.string().optional(),
    address: z.object({
      street: z.string(),
      city: z.string(),
      state: z.string().optional(),
      zip: z.string().optional(),
      country: z.string(),
    }).optional(),
    hours: z.object({
      monday: z.string().optional(),
      tuesday: z.string().optional(),
      wednesday: z.string().optional(),
      thursday: z.string().optional(),
      friday: z.string().optional(),
      saturday: z.string().optional(),
      sunday: z.string().optional(),
    }).optional(),
    social: z.object({
      twitter: z.string().optional(),
      linkedin: z.string().optional(),
      facebook: z.string().optional(),
      instagram: z.string().optional(),
      youtube: z.string().optional(),
    }).optional(),
  }),
});

const faqsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    categories: z.array(z.object({
      name: z.string(),
      questions: z.array(z.object({
        question: z.string(),
        answer: z.string(),
      })),
    })),
  }),
});

const servicesCollection = defineCollection({
  type: 'data',
  schema: z.object({
    services: z.array(z.object({
      id: z.string(),
      name: z.string(),
      description: z.string(),
      features: z.array(z.string()),
      icon: z.string().optional(),
      category: z.string().optional(),
      popular: z.boolean().optional(),
    })),
  }),
});

const pricingCollection = defineCollection({
  type: 'data',
  schema: z.object({
    plans: z.array(z.object({
      id: z.string(),
      name: z.string(),
      description: z.string(),
      price: z.object({
        monthly: z.number().optional(),
        yearly: z.number().optional(),
      }),
      features: z.array(z.string()),
      popular: z.boolean().optional(),
      cta: z.string().optional(),
    })),
  }),
});

const testimonialsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    testimonials: z.array(z.object({
      id: z.string(),
      name: z.string(),
      role: z.string().optional(),
      company: z.string().optional(),
      content: z.string(),
      rating: z.number().min(1).max(5).optional(),
      avatar: z.string().optional(),
      featured: z.boolean().optional(),
    })),
  }),
});

// Global site configuration collection
const globalCollection = defineCollection({
  type: 'data',
  schema: z.object({
    organization: z.object({
      name: z.string(),
      url: z.string().url(),
      logo: z.string().url().optional(),
      description: z.string().optional(),
      email: z.string().email().optional(),
      telephone: z.string().optional(),
      address: z.object({
        streetAddress: z.string(),
        addressLocality: z.string(),
        addressRegion: z.string(),
        postalCode: z.string(),
        addressCountry: z.string(),
      }).optional(),
      socialMedia: z.array(z.string().url()).optional(),
      foundingDate: z.string().optional(),
      numberOfEmployees: z.string().optional(),
      areaServed: z.union([z.string(), z.array(z.string())]).optional(),
    }).optional(),
    website: z.object({
      name: z.string(),
      description: z.string(),
      url: z.string().url(),
      inLanguage: z.string().default('en-US'),
      copyrightYear: z.number().optional(),
    }).optional(),
    defaultAuthor: z.object({
      name: z.string(),
      url: z.string().url().optional(),
      image: z.string().url().optional(),
      jobTitle: z.string().optional(),
      email: z.string().email().optional(),
      telephone: z.string().optional(),
    }).optional(),
    business: z.object({
      type: z.enum(['LocalBusiness', 'Organization', 'Corporation', 'ProfessionalService']).default('Organization'),
      openingHours: z.array(z.string()).optional(),
      priceRange: z.string().optional(),
      paymentAccepted: z.array(z.string()).optional(),
      geo: z.object({
        latitude: z.number(),
        longitude: z.number(),
      }).optional(),
    }).optional(),
  }),
});

// Export collections
export const collections = {
  seo: seoCollection,
  pages: pagesCollection,
  company: companyCollection,
  contact: contactCollection,
  faqs: faqsCollection,
  services: servicesCollection,
  pricing: pricingCollection,
  testimonials: testimonialsCollection,
  global: globalCollection,
};
