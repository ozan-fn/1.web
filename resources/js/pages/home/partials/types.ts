export interface Category {
    id: number;
    name: string;
    slug: string;
    news?: NewsItem[];
}

export interface NewsItem {
    id: number;
    category: Category;
    category_id: number;
    sub_category?: Category | null;
    user?: {
        name: string;
    };
    title: string;
    slug: string;
    thumbnail: string | null;
    thumbnail_url: string | null;
    content: string;
    published_at: string;
    timestamp?: string; // For mock/display if needed
    views?: number;
}

export interface VideoItem {
    id: number;
    title: string;
    thumbnail: string;
}
