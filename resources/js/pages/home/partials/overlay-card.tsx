import { Link } from '@inertiajs/react';
import React from 'react';
import { NewsItem } from './types';

interface Props {
    item: NewsItem;
    height?: string;
}

const OverlayCard: React.FC<Props> = ({ item, height = 'h-[350px]' }) => {
    const categorySlug = item.category?.slug || 'news';
    const postSlug = item.slug || '#';
    const subCategorySlug = item.sub_category?.slug;

    const href = subCategorySlug ? `/${categorySlug}/${subCategorySlug}/${postSlug}` : `/${categorySlug}/${postSlug}`;

    return (
        <Link href={href} className={`group relative block overflow-hidden rounded-[40px] ${height} w-full shadow-2xl ring-1 shadow-black/5 ring-border`}>
            {item.thumbnail_url ? <img src={item.thumbnail_url} alt={item.title} className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" /> : <div className="flex h-full w-full items-center justify-center bg-muted text-xs font-black tracking-widest text-muted-foreground uppercase">No Image</div>}

            {/* Floating Accent */}
            <div className="absolute top-6 left-6 z-10">
                <div className="rounded-full bg-background/90 px-4 py-2 shadow-lg backdrop-blur-md">
                    <span className="text-[10px] font-black tracking-widest text-primary uppercase">{item.category?.name || 'News'}</span>
                </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity group-hover:opacity-90"></div>

            <div className="absolute bottom-0 left-0 w-full p-8 md:p-10">
                <h3 className="line-clamp-3 text-2xl leading-tight font-black text-white transition-all group-hover:text-primary sm:text-3xl md:text-4xl lg:text-[32px]">{item.title}</h3>
                <div className="mt-4 flex items-center gap-3 text-xs font-bold text-white/60">
                    <span className="uppercase">{new Date(item.published_at).toLocaleDateString()}</span>
                    <span className="h-1 w-1 rounded-full bg-primary"></span>
                    <span className="uppercase">{item.user?.name || 'Staff'}</span>
                </div>
            </div>
        </Link>
    );
};

export default OverlayCard;
