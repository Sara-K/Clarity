export const NEWS_CONFIG = {
    // Default query parameters
    DEFAULT_LIMIT: 20,
    MAX_LIMIT: 50,
    DEFAULT_SINCE_HOURS: 120, // 5 days for better topic coverage

    // Caching settings (in milliseconds)
    CACHE: {
        STALE_TIME: 5 * 60 * 1000,    // 5 minutes
        GC_TIME: 10 * 60 * 1000,       // 10 minutes
    },

    // Retry settings
    RETRY: {
        COUNT: 2,
        DELAY: 1000,               // 1 second base delay
        MAX_DELAY: 10000,          // 10 seconds max
    },

} as const;
