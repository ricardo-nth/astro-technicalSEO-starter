// Global SEO configuration
export default {
  meta: {
    image: "https://pipefix.co.uk/og-image.jpg",
    robots: "index, follow",
    author: "PipeFix Experts",
    publisher: "Vertex Platform Solutions", 
    keywords: "plumbing, emergency plumber, Manchester, PipeFix",
    ogType: "website",
    siteName: "PipeFix Experts",
    twitterCard: "summary_large_image",
    twitterCreator: "@PipeFixExperts",
    themeColor: "#1867c0"
  },
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "PipeFix Experts",
      "url": "https://pipefix.co.uk",
      "logo": "https://pipefix.co.uk/logo.png",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "123 High St",
        "addressLocality": "Manchester",
        "postalCode": "M1 2AB",
        "addressCountry": "UK"
      },
      "telephone": "+44 1234 567890",
      "openingHours": "Mo-Su 08:00-20:00"
    }
  ]
};
