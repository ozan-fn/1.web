import { Link } from '@inertiajs/react';
import React from 'react';
import { NewsItem } from './types';

interface Props {
    item: NewsItem;
}

const ListCard: React.FC<Props> = ({ item }) => (
    <Link href={item.sub_category ? `/${item.category?.slug}/${item.sub_category?.slug}/${item.slug}` : `/${item.category?.slug}/${item.slug}`} className="group flex gap-4 border-b border-border py-6 first:pt-0 last:border-0">
        <div className="relative aspect-[16/10] w-32 shrink-0 overflow-hidden rounded-lg bg-muted md:w-52">{item.thumbnail_url ? <img src={item.thumbnail_url} alt={item.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /> : <div className="flex h-full w-full items-center justify-center text-[10px] font-bold text-muted-foreground uppercase">No Image</div>}</div>
        <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-blue-700 uppercase">{item.category?.name || 'Berita'}</span>
                <span className="text-[10px] text-muted-foreground">|</span>
                <span className="text-[10px] font-medium text-muted-foreground">{new Date(item.published_at).toLocaleDateString('id-ID')}</span>
            </div>
            <h3 className="line-clamp-2 text-sm leading-snug font-bold transition-colors group-hover:text-blue-700 md:text-lg">{item.title}</h3>
        </div>
    </Link>
);

export default ListCard;
