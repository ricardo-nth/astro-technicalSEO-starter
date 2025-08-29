/**
 * Asset optimization utilities using Astro's built-in astro:assets
 * Provides optimized image handling and asset management
 */

import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';

export interface ImageOptions {
  width?: number;
  height?: number;
  format?: 'webp' | 'avif' | 'png' | 'jpg' | 'jpeg';
  quality?: number;
  sizes?: string;
  alt: string;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'auto' | 'sync';
}

export interface ResponsiveImageOptions extends ImageOptions {
  widths: number[];
  sizes: string;
  fallbackWidth?: number;
}

/**
 * Generate optimized image with multiple formats and sizes
 */
export async function getOptimizedImage(
  src: ImageMetadata | string,
  options: ImageOptions
) {
  const {
    width = 800,
    height,
    format = 'webp',
    quality = 80,
    alt,
    loading = 'lazy',
    decoding = 'async'
  } = options;

  try {
    const optimizedImage = await getImage({
      src,
      width,
      height,
      format,
      quality,
    });

    return {
      ...optimizedImage,
      alt,
      loading,
      decoding,
    };
  } catch (error) {
    console.warn('Failed to optimize image:', error);
    
    // Fallback for string URLs or when optimization fails
    if (typeof src === 'string') {
      return {
        src,
        width,
        height,
        alt,
        loading,
        decoding,
      };
    }
    
    throw error;
  }
}

/**
 * Generate responsive image set with multiple widths and formats
 */
export async function getResponsiveImage(
  src: ImageMetadata | string,
  options: ResponsiveImageOptions
) {
  const {
    widths,
    sizes,
    format = 'webp',
    quality = 80,
    fallbackWidth = Math.max(...widths),
    alt,
    loading = 'lazy',
    decoding = 'async'
  } = options;

  try {
    // Generate images for each width
    const imageVariants = await Promise.all(
      widths.map(async (width) => {
        const image = await getImage({
          src,
          width,
          format,
          quality,
        });
        return `${image.src} ${width}w`;
      })
    );

    // Generate fallback image
    const fallbackImage = await getImage({
      src,
      width: fallbackWidth,
      format,
      quality,
    });

    return {
      src: fallbackImage.src,
      srcset: imageVariants.join(', '),
      sizes,
      width: fallbackWidth,
      height: fallbackImage.attributes?.height || undefined,
      alt,
      loading,
      decoding,
    };
  } catch (error) {
    console.warn('Failed to generate responsive image:', error);
    
    // Fallback for string URLs or when optimization fails
    if (typeof src === 'string') {
      return {
        src,
        srcset: '',
        sizes,
        width: fallbackWidth,
        alt,
        loading,
        decoding,
      };
    }
    
    throw error;
  }
}

/**
 * Generate modern image formats with fallbacks
 */
export async function getModernImage(src: ImageMetadata | string, options: ImageOptions) {
  const { width = 800, height, quality = 80, alt, loading = 'lazy' } = options;

  try {
    // Generate AVIF (most modern)
    const avifImage = await getImage({
      src,
      width,
      height,
      format: 'avif',
      quality,
    });

    // Generate WebP (widely supported)
    const webpImage = await getImage({
      src,
      width,
      height,
      format: 'webp',
      quality,
    });

    // Generate JPEG fallback
    const jpegImage = await getImage({
      src,
      width,
      height,
      format: 'jpg',
      quality,
    });

    return {
      avif: avifImage,
      webp: webpImage,
      fallback: jpegImage,
      alt,
      loading,
      width,
      height: jpegImage.attributes?.height || height,
    };
  } catch (error) {
    console.warn('Failed to generate modern image formats:', error);
    
    // Return fallback
    return await getOptimizedImage(src, options);
  }
}

/**
 * Asset collection schema for content collections
 */
export const AssetSchema = {
  image: {
    src: 'string',
    alt: 'string',
    width: 'number?',
    height: 'number?',
    caption: 'string?',
    credit: 'string?',
  },
  video: {
    src: 'string',
    poster: 'string?',
    width: 'number?',
    height: 'number?',
    caption: 'string?',
  },
  document: {
    src: 'string',
    title: 'string',
    type: 'string',
    size: 'string?',
  }
};

/**
 * Preload critical images for better LCP
 */
export function preloadImage(src: string, options?: { as?: string; type?: string }) {
  if (typeof document === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = src;
  link.as = options?.as || 'image';
  
  if (options?.type) {
    link.type = options.type;
  }

  document.head.appendChild(link);
}

/**
 * Generate optimized Open Graph image
 */
export async function getOGImage(
  src: ImageMetadata | string,
  options?: Partial<ImageOptions>
) {
  return await getOptimizedImage(src, {
    width: 1200,
    height: 630,
    format: 'jpg', // Better compatibility for social platforms
    quality: 85,
    alt: options?.alt || 'Open Graph Image',
    loading: 'eager',
    ...options,
  });
}

/**
 * Generate favicon set from source image
 */
export async function getFaviconSet(src: ImageMetadata | string) {
  const sizes = [16, 32, 48, 64, 128, 256];
  
  try {
    const favicons = await Promise.all(
      sizes.map(async (size) => {
        const favicon = await getImage({
          src,
          width: size,
          height: size,
          format: 'png',
          quality: 100,
        });
        
        return {
          size,
          src: favicon.src,
          type: 'image/png',
        };
      })
    );

    // Generate Apple touch icon
    const appleTouchIcon = await getImage({
      src,
      width: 180,
      height: 180,
      format: 'png',
      quality: 100,
    });

    return {
      favicons,
      appleTouchIcon: {
        src: appleTouchIcon.src,
        sizes: '180x180',
      },
    };
  } catch (error) {
    console.warn('Failed to generate favicon set:', error);
    return { favicons: [], appleTouchIcon: null };
  }
}
