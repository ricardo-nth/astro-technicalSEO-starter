import { getEntry } from 'astro:content';
import type { MetaData, SchemaData } from '@/types/seo';

/**
 * Merge global SEO data with page-specific data
 * @param pageSeoData - Page-specific SEO data
 * @returns Merged metadata and schema
 */
export async function mergeSeoData(pageKey: string) {
  try {
    // Get global and page-specific SEO data
    const globalSeo = await getEntry('seo', 'global');
    const pageSeo = await getEntry('seo', pageKey);
    
    if (!globalSeo?.data) {
      throw new Error('Global SEO data not found');
    }

    // Merge metadata (page overrides global)
    const mergedMeta: MetaData = {
      title: globalSeo.data.title,
      description: globalSeo.data.description,
      keywords: globalSeo.data.keywords?.join(', '),
      image: globalSeo.data.ogImage,
      robots: globalSeo.data.robots,
      url: globalSeo.data.canonical,
      author: globalSeo.data.author,
      // Page-specific overrides
      ...(pageSeo?.data ? {
        title: pageSeo.data.title || globalSeo.data.title,
        description: pageSeo.data.description || globalSeo.data.description,
        keywords: pageSeo.data.keywords?.join(', ') || globalSeo.data.keywords?.join(', '),
        image: pageSeo.data.ogImage || globalSeo.data.ogImage,
        robots: pageSeo.data.robots || globalSeo.data.robots,
        url: pageSeo.data.canonical || globalSeo.data.canonical,
        author: pageSeo.data.author || globalSeo.data.author,
      } : {})
    };

    // Merge schema (global first, then page-specific)
    const mergedSchema: SchemaData[] = [
      ...(globalSeo.data.schema ? [globalSeo.data.schema] : []),
      ...(pageSeo?.data?.schema ? [pageSeo.data.schema] : [])
    ];

    return {
      metadata: mergedMeta,
      schemaData: mergedSchema
    };
  } catch (error) {
    console.error(`Error loading SEO data for page: ${pageKey}`, error);
    
    // Return minimal fallback data
    return {
      metadata: {
        title: "Page Not Found",
        description: "SEO data could not be loaded"
      },
      schemaData: []
    };
  }
}
