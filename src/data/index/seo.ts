// /src/data/about/seo.ts
import { globalMeta, globalSchema } from '../global/seo';

export const homeMeta = {
  ...globalMeta,
  title: "PipeFix Experts | Plumbing Services",
  description: "Manchester's reliable plumbers.",
  url: "https://pipefix.co.uk",
  keywords: "plumbing, emergency plumber, Manchester, PipeFix"
  // Optionally, override OG image, etc, if you want:
  // image: "https://pipefix.co.uk/custom-home-og.jpg"
};

export const homeSchema = [
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
      }
    ]
  }
];
