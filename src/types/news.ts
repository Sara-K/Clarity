export interface ArticleLink {
    id: string;
    title: string;
    url: string;
    source: string;
    publishedAt?: string;
    imageUrl?: string;
    topicIds: string[];
}

export interface NewsQueryParams {
    categoryIds: string[];
    topicIds: string[];
    limit?: number;
    sinceHours?: number;
}

export interface NewsResponse {
    provider: string;
    query: {
        keywords: string[];
        timeRange: string;
    };
    items: ArticleLink[];
    fetchedAt: string;
}

export interface GDELTArticle {
    url: string;
    url_mobile?: string;
    title: string;
    seendate: string;
    socialimage?: string;
    domain: string;
    language?: string;
    sourcecountry?: string;
}

export interface GDELTResponse {
    articles?: GDELTArticle[];
}
