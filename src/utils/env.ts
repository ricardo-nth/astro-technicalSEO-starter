/**
 * Environment configuration utilities
 * Provides type-safe access to environment variables
 */

export const ENV = {
  // Site configuration
  SITE_URL: import.meta.env.SITE_URL || 'http://localhost:4321',
  NODE_ENV: import.meta.env.NODE_ENV || 'development',
  
  // Analytics
  GTM_ID: import.meta.env.GTM_ID || '',
  GA_ID: import.meta.env.GA_ID || '',
  CLARITY_ID: import.meta.env.CLARITY_ID || '',
  
  // Site verification
  GOOGLE_SITE_VERIFICATION: import.meta.env.GOOGLE_SITE_VERIFICATION || '',
  BING_SITE_VERIFICATION: import.meta.env.BING_SITE_VERIFICATION || '',
  PINTEREST_SITE_VERIFICATION: import.meta.env.PINTEREST_SITE_VERIFICATION || '',
  
  // Error monitoring
  SENTRY_DSN: import.meta.env.SENTRY_DSN || '',
  
  // Security
  CSP_REPORT_URI: import.meta.env.CSP_REPORT_URI || '',
  
  // Feature flags
  ENABLE_ANALYTICS: import.meta.env.ENABLE_ANALYTICS === 'true',
  ENABLE_VALIDATION_UI: import.meta.env.ENABLE_VALIDATION_UI !== 'false',
  ENABLE_PERFORMANCE_MONITORING: import.meta.env.ENABLE_PERFORMANCE_MONITORING !== 'false',
} as const;

export const isProduction = ENV.NODE_ENV === 'production';
export const isStaging = ENV.NODE_ENV === 'staging';
export const isDevelopment = ENV.NODE_ENV === 'development';

export function getBaseUrl() {
  return ENV.SITE_URL.replace(/\/$/, '');
}

export function shouldEnableAnalytics() {
  return isProduction || (isStaging && ENV.ENABLE_ANALYTICS);
}

export function shouldShowValidationUI() {
  return isDevelopment && ENV.ENABLE_VALIDATION_UI;
}

export function shouldEnablePerformanceMonitoring() {
  return ENV.ENABLE_PERFORMANCE_MONITORING;
}
