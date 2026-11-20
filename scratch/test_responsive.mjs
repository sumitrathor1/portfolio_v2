import fs from 'fs';
import path from 'path';

const distDir = 'c:/Users/Sumit/Desktop/Project/portfolio_v2/dist';
const html = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');

console.log('--- RESPONSIVE AUDIT CHECKS ---');

// 1. Check viewport meta tag
const hasViewport = html.includes('name="viewport"') && html.includes('width=device-width');
console.log('[Check 1] Viewport meta tag present & correct:', hasViewport ? 'PASS' : 'FAIL');

// 2. Check CSS files
const assets = fs.readdirSync(path.join(distDir, 'assets'));
const cssFile = assets.find(f => f.endsWith('.css'));
if (cssFile) {
  const css = fs.readFileSync(path.join(distDir, 'assets', cssFile), 'utf8');
  
  // Check critical media queries
  const hasSmallMobile = css.includes('max-width:360px') || css.includes('max-width: 360px');
  const hasStandardMobile = css.includes('max-width:767.98px') || css.includes('max-width: 767.98px') || css.includes('max-width:768px');
  const hasTablet = css.includes('max-width:991.98px') || css.includes('max-width: 991.98px') || css.includes('max-width:992px');
  
  console.log('[Check 2] Small mobile (360px) media queries in bundle:', hasSmallMobile ? 'PASS' : 'FAIL');
  console.log('[Check 3] Mobile phone (<768px) media queries in bundle:', hasStandardMobile ? 'PASS' : 'FAIL');
  console.log('[Check 4] Tablet (<992px) media queries in bundle:', hasTablet ? 'PASS' : 'FAIL');

  // Check 16px input font size rule
  const hasInput16px = css.includes('16px!important') || css.includes('16px !important');
  console.log('[Check 5] 16px iOS auto-zoom prevention rule in bundle:', hasInput16px ? 'PASS' : 'FAIL');

  // Check 100dvh for mobile chatbot
  const has100dvh = css.includes('100dvh');
  console.log('[Check 6] 100dvh mobile viewport unit for chatbot in bundle:', has100dvh ? 'PASS' : 'FAIL');

  // Check safe-area-inset
  const hasSafeArea = css.includes('safe-area-inset');
  console.log('[Check 7] Safe area insets (notches/home bar) in bundle:', hasSafeArea ? 'PASS' : 'FAIL');
}

console.log('--- AUDIT CHECKS FINISHED ---');
