import { Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import React from 'react';
import { NewsItem } from './types';

interface Props {
    item: NewsItem;
    height?: string;
}

const OverlayCard: React.FC<Props> = ({ item, height = 'h-64' }) => (
    <Link href={item.sub_category ? `/${item.category?.slug}/${item.sub_category?.slug}/${item.slug}` : `/${item.category?.slug}/${item.slug}`} className={`group relative block overflow-hidden transition-all duration-500 ${height} w-full border-4 border-foreground bg-foreground`}>
        {item.thumbnail ? (
            <img src={`/storage/${item.thumbnail}`} alt={item.title} className="h-full w-full object-cover opacity-80 mix-blend-luminosity grayscale transition-all duration-700 group-hover:scale-105 group-hover:opacity-100 group-hover:mix-blend-normal group-hover:grayscale-0" />
        ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted text-xl font-black text-muted-foreground uppercase italic">Image Missing</div>
        )}

        {/* Aggressive Industrial Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/20 to-transparent"></div>

        <div className="absolute bottom-0 left-0 w-full p-8 md:p-10">
            <div className="mb-6 flex flex-wrap gap-4">
                <span className="bg-primary px-4 py-1 text-[10px] font-black tracking-[0.3em] text-background uppercase italic">{item.category?.name || 'EDITORIAL'}</span>
                {item.sub_category && <span className="border-b-2 border-primary px-1 text-[10px] font-black tracking-[0.3em] text-white uppercase italic">{item.sub_category.name}</span>}
            </div>

            <h3 className="line-clamp-3 text-3xl leading-[0.9] font-black tracking-tighter text-white transition-all group-hover:text-primary md:text-5xl">{item.title}</h3>

            <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
                <div className="flex items-center gap-4 text-[11px] font-black tracking-widest text-white/50 uppercase">
                    <span>{item.published_at}</span>
                    <span className="h-1 w-1 bg-primary"></span>
                    <span>{item.user?.name || 'REDAKSI'}</span>
                </div>
                <div className="hidden h-10 w-10 items-center justify-center border-2 border-white/20 text-white transition-all group-hover:border-primary group-hover:bg-primary group-hover:text-background lg:flex">
                    <ChevronRight className="h-6 w-6" />
                </div>
            </div>
        </div>

        {/* Diagonal Ribbon for Trending/Impact */}
        <div className="absolute top-6 right-6 flex h-12 w-12 items-center justify-center border-2 border-white/20 bg-background/10 backdrop-blur-sm">
            <span className="text-xs font-black text-white italic">#</span>
        </div>
    </Link>
);

export default OverlayCard;
