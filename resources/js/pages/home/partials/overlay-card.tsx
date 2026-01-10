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
        <Link href={href} className={`group relative block overflow-hidden ${height} w-full`}>
            {item.thumbnail_url ? <img src={item.thumbnail_url} alt={item.title} className="h-full w-full object-cover transition-all duration-1000 group-hover:scale-105" /> : <div className="flex h-full w-full items-center justify-center bg-muted font-mono text-[10px] font-bold text-muted-foreground uppercase opacity-20">NO_SRC</div>}

            <div className="absolute inset-x-0 bottom-0 z-20 translate-y-full transition-transform duration-500 group-hover:translate-y-0">
                <div className="bg-primary p-6">
                    <span className="font-mono text-[9px] font-black tracking-[0.4em] text-white uppercase">Read Full Story</span>
                </div>
            </div>

            <div className="absolute inset-0 bg-black/40 mix-blend-multiply transition-opacity group-hover:opacity-20"></div>

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-10 pt-20">
                <div className="mb-4 inline-block border border-white/40 px-3 py-1">
                    <span className="text-[9px] font-bold tracking-[0.3em] text-white uppercase">{item.category?.name || 'GENRE'}</span>
                </div>
                <h3 className="line-clamp-2 text-3xl leading-[1.1] font-bold tracking-tighter text-white transition-all sm:text-4xl md:text-5xl">{item.title}</h3>
            </div>
        </Link>
    );
};

export default OverlayCard;
