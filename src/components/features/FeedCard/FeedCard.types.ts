import type { NewsArticle } from '../../../types/news';

export interface FeedCardProps {
    article: NewsArticle;
    tag: string;
    tagColor?: string;
}
