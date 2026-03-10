// Google Analytics 4 event tracking utility
// Replace G-PLACEHOLDER with your actual GA4 Measurement ID

export const GA_MEASUREMENT_ID = 'G-PLACEHOLDER';

export const trackEvent = (eventName, params = {}) => {
    if (typeof window.gtag === 'function') {
        window.gtag('event', eventName, params);
    }
};

// Pre-defined events
export const trackSignup = (method = 'email') => trackEvent('user_signup', { method });
export const trackExpenseAdded = (category, amount) => trackEvent('expense_added', { category, amount });
export const trackGoalCreated = (category) => trackEvent('goal_created', { category });
export const trackAIInsightGenerated = (type) => trackEvent('ai_insight_generated', { insight_type: type });
export const trackReportExported = (format) => trackEvent('report_exported', { format });
