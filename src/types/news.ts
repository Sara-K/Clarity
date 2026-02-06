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
