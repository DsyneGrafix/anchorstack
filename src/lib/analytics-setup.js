// src/utils/analytics.ts - Simple tracking system
export const trackEvent = (eventName, properties) => {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, properties);
    }
    // Simple Analytics (privacy-friendly alternative)
    if (typeof sa_event !== 'undefined') {
        sa_event(eventName, properties);
    }
    // Console log for development
    if (import.meta.env.DEV) {
        console.log('Analytics Event:', eventName, properties);
    }
};
// Track download events
export const trackDownload = (fileName, category) => {
    trackEvent('download', {
        file_name: fileName,
        category: category,
        timestamp: new Date().toISOString()
    });
};
// Track vault product clicks
export const trackVaultClick = (productId, productTitle, tier) => {
    trackEvent('vault_product_click', {
        product_id: productId,
        product_title: productTitle,
        tier: tier,
        timestamp: new Date().toISOString()
    });
};
// Track focus sessions
export const trackFocusSession = (duration, completed) => {
    trackEvent('focus_session', {
        duration_minutes: Math.round(duration / 60),
        completed: completed,
        timestamp: new Date().toISOString()
    });
};
// Track page views
export const trackPageView = (pageName) => {
    trackEvent('page_view', {
        page_name: pageName,
        timestamp: new Date().toISOString()
    });
};
