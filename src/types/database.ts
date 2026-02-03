export interface DbCategory {
    id: string;
    name: string;
    slug: string;
    tag_color?: string;
    sort_order: number;
    created_at?: string;
}

export interface DbTopic {
    id: string;
    category_id: string;
    name: string;
    slug: string;
    sort_order: number;
    created_at?: string;
}
