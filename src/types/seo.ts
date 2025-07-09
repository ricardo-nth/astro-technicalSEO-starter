export interface MetaData {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  robots?: string;
  author?: string;
  publisher?: string;
  keywords?: string;
  ogType?: string;
  siteName?: string;
  twitterCard?: string;
  twitterCreator?: string;
  themeColor?: string;
}

export type SchemaData = Record<string, any> | Array<Record<string, any>>;
