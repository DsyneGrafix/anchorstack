// src/utils/analytics.ts - Simple tracking without external dependencies
export const trackEvent = (eventName, properties) => {
    // Simple console tracking for now - can upgrade to GA/Mixpanel later
    if (import.meta.env.DEV) {
        console.log('📊 Event:', eventName, properties);
    }
    // Store events in localStorage for basic analytics
    try {
        const events = JSON.parse(localStorage.getItem('anchorstack_events') || '[]');
        events.push({
            event: eventName,
            properties,
            timestamp: new Date().toISOString(),
            url: window.location.pathname
        });
        // Keep only last 100 events
        localStorage.setItem('anchorstack_events', JSON.stringify(events.slice(-100)));
    }
    catch (error) {
        // Fail silently
    }
};
export const trackVaultClick = (productId, productTitle, tier) => {
    trackEvent('vault_product_clicked', {
        product_id: productId,
        product_title: productTitle,
        tier,
        category: 'vault_engagement'
    });
};
export const trackDownload = (filename, tier) => {
    trackEvent('file_downloaded', {
        filename,
        tier,
        category: 'content_consumption'
    });
};
export const trackFocusSession = (duration, completed) => {
    trackEvent('focus_session', {
        duration_minutes: Math.round(duration / 60),
        completed,
        category: 'productivity'
    });
};
export const trackPageView = (page) => {
    trackEvent('page_view', {
        page,
        category: 'navigation'
    });
};
// Export analytics data for manual review
export const getAnalyticsData = () => {
    try {
        return JSON.parse(localStorage.getItem('anchorstack_events') || '[]');
    }
    catch {
        return [];
    }
};
