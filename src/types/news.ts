export type NewsArticle = {
    id: string;
    title: string;
    url: string;
    source: string;
    publishedAt?: string;
    imageUrl?: string;
    topicIds: string[];
    isTrusted?: boolean;
};

export type NewsResponse = {
    provider: string;
    query: Record<string, unknown>;
    items: NewsArticle[];
    fetchedAt: string;
};

export type NewsQueryParams = {
    categoryIds: string[];
    topicIds: string[];
    limit?: number;
    sinceHours?: number;
};