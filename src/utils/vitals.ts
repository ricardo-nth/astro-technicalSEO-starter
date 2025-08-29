/**
 * Web Vitals tracking and performance monitoring utilities
 * Tracks Core Web Vitals and sends data to analytics
 */

export interface WebVital {
  name: 'FCP' | 'LCP' | 'CLS' | 'FID' | 'TTFB' | 'INP';
  value: number;
  id: string;
  attribution?: any;
  delta?: number;
  entries?: any[];
}

export interface AnalyticsConfig {
  gtmId?: string;
  enabled: boolean;
  debug: boolean;
}

/**
 * Track Core Web Vitals and send to analytics
 */
export function trackWebVitals(metric: WebVital, config: AnalyticsConfig = { enabled: true, debug: false }) {
  if (!config.enabled) return;

  if (config.debug) {
    console.log('🔍 Web Vital:', metric);
  }

  // Send to Google Tag Manager if available
  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as any).gtag('event', metric.name, {
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      metric_id: metric.id,
      metric_value: metric.value,
      metric_delta: metric.delta || 0,
      non_interaction: true,
      custom_map: {
        metric_name: metric.name
      }
    });
  }

  // Send to custom analytics endpoint if configured
  if (config.enabled && typeof window !== 'undefined') {
    sendToAnalytics(metric);
  }
}

/**
 * Send metric data to custom analytics endpoint
 */
async function sendToAnalytics(metric: WebVital) {
  const body = JSON.stringify({
    ...metric,
    url: window.location.href,
    userAgent: navigator.userAgent,
    timestamp: Date.now(),
  });

  const url = '/api/analytics/vitals'; // Can be configured

  try {
    // Use sendBeacon if available for reliability
    if (navigator.sendBeacon) {
      navigator.sendBeacon(url, body);
    } else {
      // Fallback to fetch with keepalive
      fetch(url, {
        method: 'POST',
        body,
        headers: { 'Content-Type': 'application/json' },
        keepalive: true
      }).catch(() => {
        // Silently fail - analytics shouldn't break the site
      });
    }
  } catch (error) {
    // Silently fail - analytics shouldn't break the site
    if (typeof window !== 'undefined' && 'console' in window) {
      console.warn('Failed to send analytics:', error);
    }
  }
}

/**
 * Initialize performance observer for custom metrics
 */
export function initPerformanceMonitoring() {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
    return;
  }

  // Monitor Long Tasks (tasks > 50ms)
  try {
    const longTaskObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration > 50) {
          trackWebVitals({
            name: 'TTFB', // Using TTFB type for custom metrics
            value: entry.duration,
            id: `long-task-${Date.now()}`,
          });
        }
      }
    });
    longTaskObserver.observe({ type: 'longtask', buffered: true });
  } catch (e) {
    // PerformanceObserver not supported
  }

  // Monitor Navigation Timing
  try {
    const navigationObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const navEntry = entry as PerformanceNavigationTiming;
        
        // Time to First Byte
        const ttfb = navEntry.responseStart - navEntry.requestStart;
        trackWebVitals({
          name: 'TTFB',
          value: ttfb,
          id: `ttfb-${Date.now()}`,
        });
      }
    });
    navigationObserver.observe({ type: 'navigation', buffered: true });
  } catch (e) {
    // PerformanceObserver not supported
  }
}

/**
 * Track custom performance metrics
 */
export function trackCustomMetric(name: string, value: number, context?: Record<string, any>) {
  const metric: WebVital = {
    name: 'FCP', // Using FCP type for custom metrics
    value,
    id: `custom-${name}-${Date.now()}`,
    attribution: { ...context, customMetric: name }
  };

  trackWebVitals(metric);
}

/**
 * Performance budget monitoring
 */
export function checkPerformanceBudget() {
  if (typeof window === 'undefined' || !('performance' in window)) {
    return;
  }

  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  if (!navigation) return;

  const budgets = {
    domContentLoaded: 1500, // 1.5s
    loadComplete: 3000,     // 3s
    firstByte: 200,         // 200ms
  };

  const metrics = {
    domContentLoaded: navigation.domContentLoadedEventEnd - navigation.fetchStart,
    loadComplete: navigation.loadEventEnd - navigation.fetchStart,
    firstByte: navigation.responseStart - navigation.requestStart,
  };

  for (const [metric, value] of Object.entries(metrics)) {
    const budget = budgets[metric as keyof typeof budgets];
    if (value > budget) {
      console.warn(`⚠️ Performance Budget Exceeded: ${metric} took ${Math.round(value)}ms (budget: ${budget}ms)`);
      
      trackCustomMetric(`budget-exceeded-${metric}`, value, {
        budget,
        exceeded: value - budget
      });
    }
  }
}
