import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { NewsArticle } from '../types/news';

export type SavedArticle = NewsArticle & {
    savedAt: string;
};

interface VaultState {
    savedArticles: SavedArticle[];
    saveArticle: (article: NewsArticle) => void;
    removeArticle: (articleId: string) => void;
    toggleSaved: (article: NewsArticle) => void;
    isSaved: (articleId: string) => boolean;
    clearVault: () => void;
}

export const useVaultStore = create<VaultState>()(
    persist(
        (set, get) => ({
            savedArticles: [],

            saveArticle: (article) => {
                const alreadySaved = get().savedArticles.some((a) => a.id === article.id);
                if (alreadySaved) return;

                set((state) => ({
                    savedArticles: [
                        {
                            ...article,
                            savedAt: new Date().toISOString(),
                        },
                        ...state.savedArticles,
                    ],
                }));
            },

            removeArticle: (articleId) => {
                set((state) => ({
                    savedArticles: state.savedArticles.filter((a) => a.id !== articleId),
                }));
            },

            toggleSaved: (article) => {
                const alreadySaved = get().savedArticles.some((a) => a.id === article.id);
                if (alreadySaved) {
                    get().removeArticle(article.id);
                    return;
                }
                get().saveArticle(article);
            },

            isSaved: (articleId) => get().savedArticles.some((a) => a.id === articleId),

            clearVault: () => set({ savedArticles: [] }),
        }),
        {
            name: 'clarity-vault-storage',
        }
    )
);
