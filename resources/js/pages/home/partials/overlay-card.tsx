import { Link } from '@inertiajs/react';
import React from 'react';
import { NewsItem } from './types';

interface Props {
    item: NewsItem;
    height?: string;
}

const OverlayCard: React.FC<Props> = ({ item, height = 'h-64' }) => (
    <Link href={item.sub_category ? `/${item.category?.slug}/${item.sub_category?.slug}/${item.slug}` : `/${item.category?.slug}/${item.slug}`} className={`group relative block overflow-hidden rounded-2xl ${height} w-full`}>
        {item.thumbnail_url ? <img src={item.thumbnail_url} alt={item.title} className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110" /> : <div className="flex h-full w-full items-center justify-center bg-muted text-xl font-bold text-muted-foreground uppercase">No Image</div>}

        {/* Modern Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 group-hover:via-black/50"></div>

        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
            <div className="translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                <div className="mb-4 flex items-center gap-2">
                    <span className="rounded-full border border-primary/30 bg-primary/20 px-3 py-1 text-[10px] font-black tracking-widest text-primary-foreground uppercase backdrop-blur-md">{item.category?.name || 'Berita'}</span>
                    <span className="h-1 w-1 rounded-full bg-white/40"></span>
                    <span className="text-[10px] font-medium tracking-widest text-white/70 uppercase">{new Date(item.published_at).toLocaleDateString('id-ID', { month: 'short', day: 'numeric' })}</span>
                </div>
                <h3 className="text-xl leading-tight font-black text-white decoration-primary/50 underline-offset-4 group-hover:underline md:text-2xl lg:text-3xl">{item.title}</h3>
            </div>
        </div>

        {/* Subtle Hover Glow */}
        <div className="absolute inset-0 ring-4 ring-primary/0 transition-all duration-300 ring-inset group-hover:ring-primary/20"></div>
    </Link>
);

export default OverlayCard;
