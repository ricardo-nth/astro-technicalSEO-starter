import { getEntry, getCollection } from 'astro:content';

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

// SEO content getters
export async function getGlobalSEO() {
  const seo = await getEntry('seo', 'global');
  return seo?.data;
}

export async function getPageSEO(page: string) {
  try {
    const seo = await getEntry('seo', page);
    return seo?.data;
  } catch {
    // Return null if SEO config doesn't exist for this page
    return null;
  }
}

export async function getBlogSEO() {
  const seo = await getEntry('seo', 'blog');
  return seo?.data;
}

// New content collection getters
export async function getAllAuthors() {
  return await getCollection('authors');
}

export async function getAuthor(id: string) {
  const author = await getEntry('authors', id);
  return author?.data;
}

export async function getAllTeamMembers() {
  return await getCollection('team');
}

export async function getFeaturedTeamMembers() {
  const team = await getCollection('team');
  return team.filter(member => member.data.featured);
}

export async function getTeamMembersByDepartment(department: string) {
  const team = await getCollection('team');
  return team.filter(member => member.data.department === department);
}

export async function getAllCaseStudies() {
  return await getCollection('case-studies');
}

export async function getFeaturedCaseStudies() {
  const caseStudies = await getCollection('case-studies');
  return caseStudies.filter(study => study.data.featured);
}

export async function getCaseStudiesByService(serviceId: string) {
  const caseStudies = await getCollection('case-studies');
  return caseStudies.filter(study => study.data.services.includes(serviceId));
}

export async function getAllBlogPosts() {
  return await getCollection('blog', ({ data }) => data.published);
}

export async function getFeaturedBlogPosts() {
  const posts = await getCollection('blog', ({ data }) => data.published && data.featured);
  return posts.sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime());
}

export async function getBlogPostsByCategory(category: string) {
  const posts = await getCollection('blog', ({ data }) => data.published && data.category === category);
  return posts.sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime());
}

export async function getBlogPostsByTag(tag: string) {
  const posts = await getCollection('blog', ({ data }) => data.published && data.tags.includes(tag));
  return posts.sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime());
}

export async function getAllLegalPages() {
  return await getCollection('legal');
}

export async function getAllPressItems() {
  return await getCollection('press');
}

export async function getFeaturedPressItems() {
  const press = await getCollection('press');
  return press.filter(item => item.data.featured).sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime());
}

export async function getPressByType(type: string) {
  const press = await getCollection('press');
  return press.filter(item => item.data.type === type).sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime());
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
