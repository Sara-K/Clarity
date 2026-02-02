export interface CategoryCardProps {
    category: Category;
    isSelected: boolean;
    onToggle: (id: string) => void;
}

export interface Category {
    id: string;
    label: string;
    image?: string;
    color?: string;
    gradient?: string;
}