// Contact page SEO configuration
export default {
  meta: {
    title: "Contact PipeFix Experts | Get in Touch",
    description: "Contact us for plumbing services in Manchester.",
    url: "https://pipefix.co.uk/contact",
    keywords: "contact, plumbing, Manchester"
  },
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact PipeFix Experts",
      "url": "https://pipefix.co.uk/contact",
      "mainEntity": {
        "@type": "Organization",
        "name": "PipeFix Experts",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+44 1234 567890",
          "contactType": "Customer Service"
        }
      }
    }
  ]
};
