// News Provider Configuration

export const NEWS_CONFIG = {
    // Default query parameters
    DEFAULT_LIMIT: 20,
    MAX_LIMIT: 50,
    DEFAULT_SINCE_HOURS: 24,

    // GDELT API settings
    GDELT: {
        BASE_URL: 'https://api.gdeltproject.org/api/v2/doc/doc',
        // DOC 2.0 query modes
        MODE: 'ArtList',           // Returns article list
        FORMAT: 'json',
        SORT: 'hybridrel',       // Hybrid relevance/recency sort
        MAX_RECORDS: 50,           // GDELT's max per request
        DEFAULT_LANGUAGE: 'eng',   // Filter for English articles
    },

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
