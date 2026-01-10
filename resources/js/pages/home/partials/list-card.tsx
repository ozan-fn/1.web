import { Link } from '@inertiajs/react';
import React from 'react';
import { NewsItem } from './types';

interface Props {
    item: NewsItem;
}

const ListCard: React.FC<Props> = ({ item }) => (
    <Link href={item.sub_category ? `/${item.category?.slug}/${item.sub_category?.slug}/${item.slug}` : `/${item.category?.slug}/${item.slug}`} className="group flex cursor-pointer items-start gap-4 rounded-xl p-4 transition-all hover:bg-muted/50">
        <div className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-xl bg-muted shadow-md">{item.thumbnail_url ? <img src={item.thumbnail_url} alt={item.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110" /> : <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5 text-xs font-semibold text-primary">No Image</div>}</div>
        <div className="flex flex-1 flex-col gap-2">
            <span className="inline-flex w-fit items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary">
                {item.category?.name || 'Berita'}
            </span>
            <h3 className="line-clamp-2 font-serif text-base font-bold leading-snug text-foreground transition-colors group-hover:text-primary">{item.title}</h3>
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                <time>{new Date(item.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</time>
                <span>•</span>
                <span>{item.views} views</span>
            </div>
        </div>
    </Link>
);

export default ListCard;
