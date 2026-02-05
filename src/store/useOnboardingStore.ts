import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { fetchTopicsByCategoryIds } from '../lib/api';

interface OnboardingState {
    selectedCategoryIds: string[];
    selectedTopicIds: string[];
    toggleCategory: (id: string) => Promise<void>;
    toggleTopic: (id: string) => void;
    reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
    persist(
        (set, get) => ({
            selectedCategoryIds: [],
            selectedTopicIds: [],

            toggleCategory: async (id) => {
                const isSelected = get().selectedCategoryIds.includes(id);

                if (isSelected) {
                    set((state) => ({
                        selectedCategoryIds: state.selectedCategoryIds.filter((c) => c !== id),
                    }));
                    try {
                        const topics = await fetchTopicsByCategoryIds([id]);
                        const topicIdsToRemove = topics.map((t) => t.id);
                        set((state) => ({
                            selectedTopicIds: state.selectedTopicIds.filter(
                                (tid) => !topicIdsToRemove.includes(tid)
                            ),
                        }));
                    } catch (error) {
                        console.error('Failed to sync topics on category deselection:', error);
                    }
                } else {
                    set((state) => ({
                        selectedCategoryIds: [...get().selectedCategoryIds, id],
                    }));
                }
            },

            toggleTopic: (id) => set((state) => {
                const isSelected = state.selectedTopicIds.includes(id);
                const newIds = isSelected
                    ? state.selectedTopicIds.filter((t) => t !== id)
                    : [...state.selectedTopicIds, id];
                return { selectedTopicIds: newIds };
            }),

            reset: () => set({ selectedCategoryIds: [], selectedTopicIds: [] }),
        }),
        {
            name: 'clarity-onboarding-storage',
        }
    )
);
