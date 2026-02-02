import type { DbCategory, DbTopic } from '../types/database';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.warn('Supabase credentials missing. Check .env.local');
}

const BASE_URL = `${SUPABASE_URL}/rest/v1`;

const headers = {
    apikey: SUPABASE_ANON_KEY || '',
    Authorization: `Bearer ${SUPABASE_ANON_KEY || ''}`,
    'Content-Type': 'application/json',
};

async function fetchApi<T>(endpoint: string): Promise<T> {
    const res = await fetch(`${BASE_URL}${endpoint}`, { headers });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`API Error ${res.status}: ${text}`);
    }
    return res.json();
}

// GET categories ordered by sort_order, then name
export async function fetchCategories(): Promise<DbCategory[]> {
    return fetchApi<DbCategory[]>(
        '/categories?select=id,name,slug,sort_order&order=sort_order.asc,name.asc'
    );
}

// GET topics for multiple category IDs
export async function fetchTopicsByCategoryIds(
    categoryIds: string[]
): Promise<DbTopic[]> {
    if (categoryIds.length === 0) return [];

    // PostgREST "in" filter
    const inFilter = `in.(${categoryIds.join(',')})`;
    return fetchApi<DbTopic[]>(
        `/topics?select=id,category_id,name,slug,sort_order&category_id=${inFilter}&order=sort_order.asc,name.asc`
    );
}
