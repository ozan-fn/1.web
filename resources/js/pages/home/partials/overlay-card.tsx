import { Link } from '@inertiajs/react';
import React from 'react';
import { NewsItem } from './types';

interface Props {
    item: NewsItem;
    height?: string;
}

const OverlayCard: React.FC<Props> = ({ item, height = 'h-64' }) => (
    <Link 
        href={item.sub_category ? `/${item.category?.slug}/${item.sub_category?.slug}/${item.slug}` : `/${item.category?.slug}/${item.slug}`} 
        className={`group relative block overflow-hidden rounded-lg ${height} w-full shadow-md transition-shadow hover:shadow-xl`}
    >
        {item.thumbnail_url ? (
            <img 
                src={item.thumbnail_url} 
                alt={item.title} 
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
        ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted text-xl font-bold text-muted-foreground">
                No Image
            </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-8">
            <span className="mb-3 inline-block rounded-sm bg-primary px-3 py-1.5 text-xs font-bold tracking-wide text-primary-foreground uppercase shadow-lg">
                {item.category?.name || 'Berita'}
            </span>
            <h3 className="font-serif text-2xl font-bold leading-tight text-white transition-colors line-clamp-3 group-hover:text-primary/90 sm:text-3xl md:text-4xl">
                {item.title}
            </h3>
        </div>
    </Link>
);

export default OverlayCard;
