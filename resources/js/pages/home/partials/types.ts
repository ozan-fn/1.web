export interface NewsItem {
    id: number;
    category: string;
    title: string;
    imageUrl: string;
    timestamp?: string;
}

export interface VideoItem {
    id: number;
    title: string;
    thumbnail: string;
}
