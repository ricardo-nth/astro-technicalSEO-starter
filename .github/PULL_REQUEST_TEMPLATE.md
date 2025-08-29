## 📋 Pull Request Checklist

Please ensure your PR meets these requirements before requesting review:

### ✅ Code Quality
- [ ] TypeScript compilation passes without errors
- [ ] All new functions have proper type annotations
- [ ] Code follows existing patterns and conventions
- [ ] No console.log statements left in production code

### 🧪 Testing
- [ ] Build completes successfully (`pnpm run build`)
- [ ] Development server runs without errors (`pnpm run dev`)
- [ ] All content collections validate properly
- [ ] New content types have sample data

### 🎨 Content & UI
- [ ] New components follow modular architecture
- [ ] Content collections use proper schemas
- [ ] SEO metadata is properly configured
- [ ] Responsive design is maintained

### ⚡ Performance
- [ ] No performance regressions introduced
- [ ] Images are optimized and properly sized
- [ ] Web Vitals metrics remain within budget
- [ ] Bundle size impact is minimal

### 🛡️ Security
- [ ] No sensitive data exposed in client code
- [ ] External dependencies are from trusted sources
- [ ] Security headers remain properly configured
- [ ] CSP policies don't break functionality

### 📚 Documentation
- [ ] README updated if needed
- [ ] New features are documented
- [ ] Environment variables added to `.env.example`
- [ ] Deployment guide updated if needed

## 📝 Description

<!-- Describe what this PR does and why -->

## 🔄 Type of Change

- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Refactoring (no functional changes)

## 🖼️ Screenshots (if applicable)

<!-- Add screenshots for UI changes -->

## 🔗 Related Issues

<!-- Link any related issues -->
Closes #

## 🧪 Testing Instructions

<!-- How to test this change -->

1. Check out this branch
2. Run `pnpm install` and `pnpm run dev`
3. Navigate to...
4. Verify that...

## 📊 Performance Impact

<!-- If this change affects performance -->

- Bundle size impact: [increase/decrease/no change]
- Web Vitals impact: [LCP/FID/CLS measurements]
- Build time impact: [faster/slower/no change]

## 🎯 Reviewer Notes

<!-- Any specific areas you'd like reviewers to focus on -->

---

**By submitting this PR, I confirm that:**
- [ ] I have tested this change thoroughly
- [ ] This change maintains the high-quality standards of the project
- [ ] I understand this change will be deployed to production
