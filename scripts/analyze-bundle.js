#!/usr/bin/env node

/**
 * Bundle Analysis Script for Astro Technical SEO Starter
 * Provides detailed bundle size analysis and optimization recommendations
 */

import { readdirSync, statSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class BundleAnalyzer {
  constructor(distPath = '../dist') {
    this.distPath = join(__dirname, distPath);
    this.results = {
      total: 0,
      js: 0,
      css: 0,
      images: 0,
      other: 0,
      files: [],
      recommendations: []
    };
  }

  analyze() {
    console.log('🔍 Analyzing bundle size...\n');
    
    if (!this.pathExists(this.distPath)) {
      console.log('❌ Build output not found. Run "pnpm build" first.');
      return;
    }

    this.analyzeDirectory(this.distPath);
    this.generateRecommendations();
    this.printResults();
  }

  analyzeDirectory(dir, prefix = '') {
    const files = readdirSync(dir);
    
    for (const file of files) {
      const fullPath = join(dir, file);
      const stat = statSync(fullPath);
      
      if (stat.isDirectory()) {
        this.analyzeDirectory(fullPath, `${prefix}${file}/`);
      } else {
        this.analyzeFile(fullPath, `${prefix}${file}`, stat.size);
      }
    }
  }

  analyzeFile(path, relativePath, size) {
    const ext = extname(path).toLowerCase();
    const sizeKB = Math.round(size / 1024 * 100) / 100;
    
    this.results.total += size;
    this.results.files.push({ path: relativePath, size: sizeKB, type: ext });
    
    switch (ext) {
      case '.js':
      case '.mjs':
        this.results.js += size;
        break;
      case '.css':
        this.results.css += size;
        break;
      case '.jpg':
      case '.jpeg':
      case '.png':
      case '.gif':
      case '.webp':
      case '.avif':
      case '.svg':
        this.results.images += size;
        break;
      default:
        this.results.other += size;
    }
  }

  generateRecommendations() {
    const { files } = this.results;
    
    // Find large JS bundles
    const largeJS = files
      .filter(f => f.type === '.js' && f.size > 100)
      .sort((a, b) => b.size - a.size);
    
    if (largeJS.length > 0) {
      this.results.recommendations.push({
        type: 'warning',
        message: `Large JavaScript bundles detected (${largeJS.length} files > 100KB)`,
        files: largeJS.slice(0, 3).map(f => `${f.path} (${f.size}KB)`)
      });
    }

    // Find large CSS files
    const largeCSS = files
      .filter(f => f.type === '.css' && f.size > 50)
      .sort((a, b) => b.size - a.size);
    
    if (largeCSS.length > 0) {
      this.results.recommendations.push({
        type: 'info',
        message: `CSS optimization opportunity`,
        files: largeCSS.slice(0, 3).map(f => `${f.path} (${f.size}KB)`)
      });
    }

    // Check for unoptimized images
    const largeImages = files
      .filter(f => ['.jpg', '.jpeg', '.png'].includes(f.type) && f.size > 200)
      .sort((a, b) => b.size - a.size);
    
    if (largeImages.length > 0) {
      this.results.recommendations.push({
        type: 'warning',
        message: `Unoptimized images detected`,
        files: largeImages.slice(0, 3).map(f => `${f.path} (${f.size}KB)`)
      });
    }

    // Performance budget check
    const totalKB = Math.round(this.results.total / 1024);
    if (totalKB > 1000) {
      this.results.recommendations.push({
        type: 'error',
        message: `Bundle size exceeds recommended budget (${totalKB}KB > 1000KB)`
      });
    } else if (totalKB > 500) {
      this.results.recommendations.push({
        type: 'warning',
        message: `Bundle size approaching budget limit (${totalKB}KB)`
      });
    } else {
      this.results.recommendations.push({
        type: 'success',
        message: `Bundle size within optimal range (${totalKB}KB)`
      });
    }
  }

  printResults() {
    const formatSize = (bytes) => {
      const kb = Math.round(bytes / 1024 * 100) / 100;
      return `${kb}KB`;
    };

    console.log('📊 Bundle Analysis Results');
    console.log('═'.repeat(50));
    console.log(`Total Bundle Size: ${formatSize(this.results.total)}`);
    console.log(`JavaScript: ${formatSize(this.results.js)}`);
    console.log(`CSS: ${formatSize(this.results.css)}`);
    console.log(`Images: ${formatSize(this.results.images)}`);
    console.log(`Other: ${formatSize(this.results.other)}`);
    console.log();

    // Top 10 largest files
    const topFiles = this.results.files
      .sort((a, b) => b.size - a.size)
      .slice(0, 10);

    console.log('📋 Largest Files:');
    console.log('─'.repeat(50));
    topFiles.forEach((file, i) => {
      console.log(`${i + 1}. ${file.path} (${file.size}KB)`);
    });
    console.log();

    // Recommendations
    console.log('💡 Optimization Recommendations:');
    console.log('─'.repeat(50));
    this.results.recommendations.forEach(rec => {
      const icon = {
        success: '✅',
        info: 'ℹ️',
        warning: '⚠️',
        error: '❌'
      }[rec.type];
      
      console.log(`${icon} ${rec.message}`);
      if (rec.files) {
        rec.files.forEach(file => console.log(`   - ${file}`));
      }
    });
  }

  pathExists(path) {
    try {
      statSync(path);
      return true;
    } catch {
      return false;
    }
  }
}

// Run analysis
const analyzer = new BundleAnalyzer();
analyzer.analyze();
