import { createClient } from '@supabase/supabase-js';
import type { DbCategory, DbTopic } from '../../types/database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase credentials missing. Please check your .env.local file.');
}

export const supabase = createClient(
    supabaseUrl || '',
    supabaseAnonKey || ''
);

/**
 * Fetch all categories ordered by sort_order and name.
 */
export async function fetchCategories(): Promise<DbCategory[]> {
    const { data, error } = await supabase
        .from('categories')
        .select('id, name, slug, tag_color, sort_order')
        .order('sort_order', { ascending: true })
        .order('name', { ascending: true });

    if (error) throw error;
    return data || [];
}

/**
 * Fetch topics for a list of category IDs.
 */
export async function fetchTopicsByCategoryIds(
    categoryIds: string[]
): Promise<DbTopic[]> {
    if (categoryIds.length === 0) return [];

    const { data, error } = await supabase
        .from('topics')
        .select('id, category_id, name, slug, sort_order')
        .in('category_id', categoryIds)
        .order('sort_order', { ascending: true })
        .order('name', { ascending: true });

    if (error) throw error;
    return data || [];
}
