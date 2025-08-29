import { getEntry } from 'astro:content';

/**
 * Utility functions to access global content collections
 * These functions provide easy access to reusable business data
 */

export async function getCompanyInfo() {
  const company = await getEntry('company', 'company');
  return company?.data;
}

export async function getContactInfo() {
  const contact = await getEntry('contact', 'contact');
  return contact?.data;
}

export async function getFAQs() {
  const faqs = await getEntry('faqs', 'faqs');
  return faqs?.data;
}

export async function getServices() {
  const services = await getEntry('services', 'services');
  return services?.data;
}

export async function getPricing() {
  const pricing = await getEntry('pricing', 'pricing');
  return pricing?.data;
}

export async function getTestimonials() {
  const testimonials = await getEntry('testimonials', 'testimonials');
  return testimonials?.data;
}

export async function getNavigation() {
  const navigation = await getEntry('navigation', 'navigation');
  return navigation?.data;
}

// Helper functions for filtered data
export async function getFeaturedTestimonials() {
  const testimonials = await getTestimonials();
  return testimonials?.testimonials.filter(t => t.featured);
}

export async function getPopularServices() {
  const services = await getServices();
  return services?.services.filter(s => s.popular);
}

export async function getServicesByCategory(category: string) {
  const services = await getServices();
  return services?.services.filter(s => s.category === category);
}

export async function getFAQsByCategory(category: string) {
  const faqs = await getFAQs();
  return faqs?.categories.find(c => c.name === category);
}
