/**
 * Google Analytics 4 (GA4) & Conversion Event Tracking Utility
 * 
 * Works with VITE_GA_MEASUREMENT_ID environment variable or window.GA_MEASUREMENT_ID.
 * Respects adblockers and privacy; fails silently when unconfigured without throwing errors.
 */

export const GA_MEASUREMENT_ID =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_GA_MEASUREMENT_ID) ||
  (typeof window !== 'undefined' && window.GA_MEASUREMENT_ID) ||
  '';

let isInitialized = false;

/**
 * Initializes Google Analytics 4 if a valid measurement ID is provided.
 */
export function initGA() {
  if (typeof window === 'undefined' || isInitialized || !GA_MEASUREMENT_ID) {
    return;
  }

  try {
    // Inject gtag.js script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
      anonymize_ip: true,
      send_page_view: true
    });

    isInitialized = true;
  } catch (err) {
    // Fail silently in development/sandboxed environments
  }
}

/**
 * Sends a custom conversion event to Google Analytics.
 * @param {string} eventName 
 * @param {Record<string, any>} params 
 */
export function trackEvent(eventName, params = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    try {
      window.gtag('event', eventName, params);
    } catch (e) {
      // Ignore tracking errors
    }
  }
}

/**
 * Track resume download conversions
 */
export function trackResumeDownload() {
  trackEvent('download_resume', {
    event_category: 'engagement',
    event_label: 'Sumit Rathor Resume PDF',
    value: 1
  });
}

/**
 * Track social profile link clicks (LinkedIn, GitHub, LeetCode, Email)
 * @param {string} platform 
 */
export function trackSocialClick(platform) {
  trackEvent('click_social', {
    event_category: 'social',
    event_label: platform
  });
}

/**
 * Track project engagement (Live Demo, GitHub Code, Case Study)
 * @param {string} projectTitle 
 * @param {'github' | 'live' | 'details'} actionType 
 */
export function trackProjectClick(projectTitle, actionType) {
  trackEvent('click_project', {
    event_category: 'project_engagement',
    project_name: projectTitle,
    action_type: actionType
  });
}

/**
 * Track contact form conversions
 */
export function trackContactSubmit() {
  trackEvent('contact_form_submit', {
    event_category: 'lead',
    event_label: 'Contact Form Inquiry',
    value: 5
  });
}
