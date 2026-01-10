import { Link } from '@inertiajs/react';
import React from 'react';
import { NewsItem } from './types';

interface Props {
    item: NewsItem;
    height?: string;
}

const OverlayCard: React.FC<Props> = ({ item, height = 'h-64' }) => (
    <Link href={item.sub_category ? `/${item.category?.slug}/${item.sub_category?.slug}/${item.slug}` : `/${item.category?.slug}/${item.slug}`} className={`group relative block overflow-hidden rounded-2xl ${height} w-full shadow-lg transition-all hover:shadow-2xl`}>
        {item.thumbnail_url ? <img src={item.thumbnail_url} alt={item.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" /> : <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5 text-xl font-bold text-primary">No Image</div>}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-7">
            <span className="mb-3 inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-bold tracking-wider text-primary-foreground uppercase shadow-xl">{item.category?.name || 'Berita'}</span>
            <h3 className="line-clamp-3 font-serif text-2xl leading-tight font-bold text-white transition-colors group-hover:text-primary-foreground sm:text-3xl md:text-3xl">{item.title}</h3>
            <div className="mt-3 flex items-center gap-2 text-xs text-white/70">
                <span>{new Date(item.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</span>
                <span>•</span>
                <span>{item.views} views</span>
            </div>
        </div>
    </Link>
);

export default OverlayCard;
