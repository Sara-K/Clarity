export interface TopicCardProps {
    topic: Topic;
    isSelected: boolean;
    onToggle: (id: string) => void;
}

export interface Topic {
    id: string;
    label: string;
    image?: string;
    color?: string;
    gradient?: string;
}