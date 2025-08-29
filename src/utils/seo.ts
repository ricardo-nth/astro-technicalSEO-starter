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
      ...globalSeo.data.meta,
      ...(pageSeo?.data?.meta || {})
    };

    // Merge schema (global first, then page-specific)
    const mergedSchema: SchemaData[] = [
      ...(globalSeo.data.schema || []),
      ...(pageSeo?.data?.schema || [])
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
