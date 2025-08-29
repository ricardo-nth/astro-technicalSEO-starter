/**
 * Enhanced Schema.org types for technical SEO
 * Provides type-safe structured data generation
 */

// Base schema types
export interface BaseSchema {
  '@context': string;
  '@type': string;
  '@id'?: string;
}

// Organization Schema
export interface OrganizationSchema extends BaseSchema {
  '@type': 'Organization';
  name: string;
  url: string;
  logo?: string;
  address?: PostalAddress;
  contactPoint?: ContactPoint[];
  sameAs?: string[];
  description?: string;
  email?: string;
  telephone?: string;
  foundingDate?: string;
  numberOfEmployees?: string;
  areaServed?: string | string[];
}

// Person Schema
export interface PersonSchema extends BaseSchema {
  '@type': 'Person';
  name: string;
  url?: string;
  image?: string;
  jobTitle?: string;
  worksFor?: OrganizationSchema;
  sameAs?: string[];
  email?: string;
  telephone?: string;
  address?: PostalAddress;
}

// Website Schema
export interface WebSiteSchema extends BaseSchema {
  '@type': 'WebSite';
  name: string;
  url: string;
  description?: string;
  publisher?: OrganizationSchema;
  potentialAction?: SearchAction;
  inLanguage?: string;
  copyrightYear?: number;
  copyrightHolder?: OrganizationSchema;
}

// WebPage Schema
export interface WebPageSchema extends BaseSchema {
  '@type': 'WebPage' | 'AboutPage' | 'ContactPage' | 'FAQPage' | 'CollectionPage';
  name: string;
  url: string;
  description?: string;
  isPartOf?: WebSiteSchema;
  author?: PersonSchema | OrganizationSchema;
  publisher?: OrganizationSchema;
  datePublished?: string;
  dateModified?: string;
  inLanguage?: string;
  breadcrumb?: BreadcrumbList;
  mainEntity?: any;
  speakable?: any;
}

// Article Schema
export interface ArticleSchema extends BaseSchema {
  '@type': 'Article' | 'BlogPosting' | 'NewsArticle' | 'TechArticle';
  headline: string;
  description?: string;
  image?: string | ImageObject[];
  author?: PersonSchema | OrganizationSchema;
  publisher?: OrganizationSchema;
  datePublished: string;
  dateModified?: string;
  url: string;
  mainEntityOfPage?: string;
  articleSection?: string;
  wordCount?: number;
  keywords?: string[];
  inLanguage?: string;
}

// Service Schema
export interface ServiceSchema extends BaseSchema {
  '@type': 'Service';
  name: string;
  description: string;
  provider: OrganizationSchema;
  areaServed?: string | string[];
  serviceType?: string;
  offers?: Offer[];
  url?: string;
  image?: string;
  category?: string;
}

// FAQ Schema
export interface FAQPageSchema extends BaseSchema {
  '@type': 'FAQPage';
  mainEntity: Question[];
}

export interface Question extends BaseSchema {
  '@type': 'Question';
  name: string;
  acceptedAnswer: Answer;
}

export interface Answer extends BaseSchema {
  '@type': 'Answer';
  text: string;
}

// Product Schema
export interface ProductSchema extends BaseSchema {
  '@type': 'Product' | 'SoftwareApplication';
  name: string;
  description: string;
  image?: string | ImageObject[];
  brand?: OrganizationSchema;
  manufacturer?: OrganizationSchema;
  offers?: Offer[];
  aggregateRating?: AggregateRating;
  review?: Review[];
  sku?: string;
  mpn?: string;
  gtin?: string;
  category?: string;
  url?: string;
}

// Review Schema
export interface ReviewSchema extends BaseSchema {
  '@type': 'Review';
  reviewBody: string;
  reviewRating: Rating;
  author: PersonSchema;
  itemReviewed: ProductSchema | ServiceSchema | OrganizationSchema;
  datePublished?: string;
}

// Local Business Schema
export interface LocalBusinessSchema extends BaseSchema {
  '@type': 'LocalBusiness' | 'Restaurant' | 'Store' | 'MedicalBusiness';
  name: string;
  address: PostalAddress;
  telephone: string;
  url: string;
  image?: string;
  description?: string;
  openingHours?: string[];
  priceRange?: string;
  servesCuisine?: string[];
  paymentAccepted?: string[];
  currenciesAccepted?: string[];
  geo?: GeoCoordinates;
  aggregateRating?: AggregateRating;
  review?: Review[];
}

// Supporting types
export interface PostalAddress {
  '@type': 'PostalAddress';
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
}

export interface ContactPoint {
  '@type': 'ContactPoint';
  telephone: string;
  contactType: string;
  email?: string;
  url?: string;
  areaServed?: string[];
  availableLanguage?: string[];
}

export interface SearchAction {
  '@type': 'SearchAction';
  target: {
    '@type': 'EntryPoint';
    urlTemplate: string;
  };
  'query-input': string;
}

export interface BreadcrumbList {
  '@type': 'BreadcrumbList';
  itemListElement: ListItem[];
}

export interface ListItem {
  '@type': 'ListItem';
  position: number;
  name: string;
  item?: string;
}

export interface ImageObject {
  '@type': 'ImageObject';
  url: string;
  width?: number;
  height?: number;
  caption?: string;
}

export interface Offer {
  '@type': 'Offer';
  price: string;
  priceCurrency: string;
  availability: string;
  validFrom?: string;
  validThrough?: string;
  url?: string;
  seller?: OrganizationSchema;
}

export interface AggregateRating {
  '@type': 'AggregateRating';
  ratingValue: number;
  reviewCount: number;
  bestRating?: number;
  worstRating?: number;
}

export interface Rating {
  '@type': 'Rating';
  ratingValue: number;
  bestRating?: number;
  worstRating?: number;
}

export interface Review {
  '@type': 'Review';
  reviewBody: string;
  reviewRating: Rating;
  author: PersonSchema;
  datePublished?: string;
}

export interface GeoCoordinates {
  '@type': 'GeoCoordinates';
  latitude: number;
  longitude: number;
}

// Utility type for any schema
export type AnySchema = 
  | OrganizationSchema
  | PersonSchema
  | WebSiteSchema
  | WebPageSchema
  | ArticleSchema
  | ServiceSchema
  | FAQPageSchema
  | ProductSchema
  | ReviewSchema
  | LocalBusinessSchema
  | BreadcrumbList;

// Schema configuration
export interface SchemaConfig {
  organization?: Partial<OrganizationSchema>;
  website?: Partial<WebSiteSchema>;
  defaultAuthor?: Partial<PersonSchema>;
  breadcrumbs?: boolean;
  enableLocalBusiness?: boolean;
  enableFAQ?: boolean;
  enableReviews?: boolean;
}
