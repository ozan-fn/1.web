import { Link } from '@inertiajs/react';
import React from 'react';
import { NewsItem } from './types';

interface Props {
    item: NewsItem;
}

const ListCard: React.FC<Props> = ({ item }) => (
    <Link 
        href={item.sub_category ? `/${item.category?.slug}/${item.sub_category?.slug}/${item.slug}` : `/${item.category?.slug}/${item.slug}`} 
        className="group flex cursor-pointer items-start gap-5 border-b border-border/60 py-6 transition-all hover:bg-muted/30 last:border-0"
    >
        <div className="relative aspect-[4/3] w-40 shrink-0 overflow-hidden rounded-md bg-muted shadow-sm">
            {item.thumbnail_url ? (
                <img 
                    src={item.thumbnail_url} 
                    alt={item.title} 
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
            ) : (
                <div className="flex h-full w-full items-center justify-center bg-muted text-xs font-semibold text-muted-foreground">
                    No Image
                </div>
            )}
        </div>
        <div className="flex flex-1 flex-col gap-2">
            <span className="text-xs font-bold tracking-wide text-primary uppercase">
                {item.category?.name || 'Berita'}
                {item.sub_category && <span className="ml-2 font-normal text-muted-foreground">• {item.sub_category.name}</span>}
            </span>
            <h3 className="font-serif text-lg font-bold leading-snug text-foreground transition-colors line-clamp-3 group-hover:text-primary">
                {item.title}
            </h3>
            <time className="text-xs font-medium text-muted-foreground">
                {new Date(item.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
            </time>
        </div>
    </Link>
);

export default ListCard;
