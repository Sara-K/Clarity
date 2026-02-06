import type { ArticleLink } from '../../../types/news';

export interface FeedCardProps {
    article: ArticleLink;
    tag: string;
    tagColor?: string;
}
