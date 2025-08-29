/**
 * Security headers configuration
 * Implements enterprise-grade security best practices
 */

import { ENV, isProduction } from '../env.js';

export interface SecurityHeaders {
  [key: string]: string;
}

export function getSecurityHeaders(): SecurityHeaders {
  return {
    // Content Security Policy
    'Content-Security-Policy': getContentSecurityPolicy(),
    
    // HTTPS enforcement
    'Strict-Transport-Security': isProduction 
      ? 'max-age=63072000; includeSubDomains; preload'
      : 'max-age=0',
    
    // Frame protection
    'X-Frame-Options': 'DENY',
    
    // Content type protection
    'X-Content-Type-Options': 'nosniff',
    
    // XSS protection
    'X-XSS-Protection': '1; mode=block',
    
    // Referrer policy
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    
    // Permissions policy
    'Permissions-Policy': [
      'camera=()',
      'microphone=()',
      'geolocation=()',
      'interest-cohort=()'
    ].join(', '),
    
    // Cross-origin policies
    'Cross-Origin-Embedder-Policy': 'unsafe-none',
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Cross-Origin-Resource-Policy': 'same-origin',
  };
}

export function getContentSecurityPolicy(): string {
  const policies = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://pagead2.googlesyndication.com https://www.clarity.ms",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https: blob:",
    "media-src 'self' data: https:",
    "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://www.clarity.ms https://c.clarity.ms",
    "frame-src 'self' https://www.google.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests"
  ];
  
  // Add report URI in production
  if (isProduction && ENV.CSP_REPORT_URI) {
    policies.push(`report-uri ${ENV.CSP_REPORT_URI}`);
  }
  
  return policies.join('; ');
}

export function getCacheHeaders(isAsset: boolean = false): SecurityHeaders {
  if (isAsset) {
    return {
      // Static assets caching
      'Cache-Control': 'public, max-age=31536000, immutable',
    };
  }
  
  return {
    // HTML caching
    'Cache-Control': isProduction 
      ? 'public, max-age=3600, must-revalidate'
      : 'no-cache, no-store, must-revalidate',
  };
}
