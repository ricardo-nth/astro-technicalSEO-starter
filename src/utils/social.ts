/**
 * Enhanced Social Media Integration
 * Provides advanced social sharing and engagement features
 */

export interface SocialShareConfig {
  url: string;
  title: string;
  description: string;
  image?: string;
  via?: string; // Twitter handle
  hashtags?: string[];
}

export interface SocialPlatform {
  name: string;
  icon: string;
  shareUrl: string;
  color: string;
  bgColor: string;
}

/**
 * Generate social sharing URLs for various platforms
 */
export function generateSocialShareUrls(config: SocialShareConfig) {
  const { url, title, description, image, via, hashtags } = config;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);
  const encodedImage = image ? encodeURIComponent(image) : '';
  const hashtagString = hashtags?.join(',') || '';

  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}${via ? `&via=${via}` : ''}${hashtagString ? `&hashtags=${hashtagString}` : ''}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&media=${encodedImage}&description=${encodedTitle}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    reddit: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
    hackernews: `https://news.ycombinator.com/submitlink?u=${encodedUrl}&t=${encodedTitle}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`
  };
}

/**
 * Social platform configurations with branding
 */
export const socialPlatforms: Record<string, SocialPlatform> = {
  facebook: {
    name: 'Facebook',
    icon: 'facebook',
    shareUrl: 'facebook',
    color: '#1877F2',
    bgColor: 'bg-blue-600 hover:bg-blue-700'
  },
  twitter: {
    name: 'Twitter',
    icon: 'twitter',
    shareUrl: 'twitter',
    color: '#1DA1F2',
    bgColor: 'bg-sky-500 hover:bg-sky-600'
  },
  linkedin: {
    name: 'LinkedIn',
    icon: 'linkedin',
    shareUrl: 'linkedin',
    color: '#0A66C2',
    bgColor: 'bg-blue-700 hover:bg-blue-800'
  },
  pinterest: {
    name: 'Pinterest',
    icon: 'pinterest',
    shareUrl: 'pinterest',
    color: '#E60023',
    bgColor: 'bg-red-600 hover:bg-red-700'
  },
  whatsapp: {
    name: 'WhatsApp',
    icon: 'whatsapp',
    shareUrl: 'whatsapp',
    color: '#25D366',
    bgColor: 'bg-green-500 hover:bg-green-600'
  },
  telegram: {
    name: 'Telegram',
    icon: 'telegram',
    shareUrl: 'telegram',
    color: '#0088CC',
    bgColor: 'bg-blue-500 hover:bg-blue-600'
  },
  reddit: {
    name: 'Reddit',
    icon: 'reddit',
    shareUrl: 'reddit',
    color: '#FF4500',
    bgColor: 'bg-orange-600 hover:bg-orange-700'
  },
  email: {
    name: 'Email',
    icon: 'mail',
    shareUrl: 'email',
    color: '#6B7280',
    bgColor: 'bg-gray-600 hover:bg-gray-700'
  }
};

/**
 * Generate structured data for social media
 */
export function generateSocialStructuredData(config: SocialShareConfig) {
  const { url, title, description, image } = config;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    image: image ? {
      '@type': 'ImageObject',
      url: image,
      width: 1200,
      height: 630
    } : undefined,
    publisher: {
      '@type': 'Organization',
      name: 'Your Company Name',
      logo: {
        '@type': 'ImageObject',
        url: '/logo.png'
      }
    }
  };
}

/**
 * Track social sharing events for analytics
 */
export function trackSocialShare(platform: string, url: string) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'share', {
      method: platform,
      content_type: 'article',
      item_id: url
    });
  }
}

/**
 * Copy URL to clipboard functionality
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof navigator === 'undefined' || !navigator.clipboard) {
    return false;
  }
  
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}

/**
 * Generate Open Graph meta tags for enhanced social sharing
 */
export function generateOpenGraphTags(config: SocialShareConfig) {
  const { url, title, description, image } = config;
  
  return {
    'og:url': url,
    'og:type': 'article',
    'og:title': title,
    'og:description': description,
    'og:image': image || '/og-default.jpg',
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:image:alt': title,
    'og:site_name': 'Your Site Name',
    
    // Twitter Card tags
    'twitter:card': 'summary_large_image',
    'twitter:site': '@yourhandle',
    'twitter:creator': '@yourhandle',
    'twitter:title': title,
    'twitter:description': description,
    'twitter:image': image || '/twitter-default.jpg',
    'twitter:image:alt': title
  };
}
