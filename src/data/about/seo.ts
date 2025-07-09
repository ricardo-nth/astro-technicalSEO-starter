// /src/data/about/seo.ts
import { globalMeta, globalSchema } from '../global/seo';

export const aboutMeta = {
  ...globalMeta,
  title: "About our agency - PipeFix Experts | Plumbing Services",
  description: "Manchester's reliable plumbers.",
  url: "https://pipefix.co.uk/about",
  keywords: "about us, team, plumbing experts, Manchester"
};

export const aboutSchema = [
  ...globalSchema, // Inject global schema first
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Do you offer emergency callouts?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we offer 24/7 emergency callouts."
        }
      },
      {
        "@type": "Question",
        "name": "Are your plumbers certified?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "All PipeFix plumbers are fully certified and insured."
        }
      },
      {
        "@type": "Question",
        "name": "Which areas do you cover?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We cover all of Manchester and the surrounding areas."
        }
      }
    ]
  },
  {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "About PipeFix Experts",
  "description": "Learn about PipeFix Experts, Manchester’s leading plumbing company. Our story, values, and the team behind our top-rated plumbing services.",
  "url": "https://pipefix.co.uk/about",
  "mainEntity": {
    "@type": "Organization",
    "name": "PipeFix Experts",
    "url": "https://pipefix.co.uk",
    "logo": "https://pipefix.co.uk/logo.png",
    "description": "Professional plumbing services in Manchester, focused on reliability and customer care.",
    "sameAs": [
      "https://facebook.com/pipefixexperts",
      "https://twitter.com/PipeFixExperts",
      "https://www.instagram.com/pipefixexperts"
    ],
    "founder": {
      "@type": "Person",
      "name": "Ricardo PipeFix"
    },
    "foundingDate": "2012-01-15",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 High St",
      "addressLocality": "Manchester",
      "postalCode": "M1 2AB",
      "addressCountry": "UK"
    }
  }
}
];