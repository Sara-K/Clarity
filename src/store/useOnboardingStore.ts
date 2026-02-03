import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface OnboardingState {
    selectedCategoryIds: string[];
    selectedTopicIds: string[];
    toggleCategory: (id: string) => void;
    toggleTopic: (id: string) => void;
    reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
    persist(
        (set) => ({
            selectedCategoryIds: [],
            selectedTopicIds: [],

            toggleCategory: (id) => set((state) => {
                const isSelected = state.selectedCategoryIds.includes(id);
                const newIds = isSelected
                    ? state.selectedCategoryIds.filter((c) => c !== id)
                    : [...state.selectedCategoryIds, id];
                return { selectedCategoryIds: newIds };
            }),

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
