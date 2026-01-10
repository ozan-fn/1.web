import { Link } from '@inertiajs/react';
import { Layers } from 'lucide-react';
import React from 'react';
import { NewsItem } from './types';

interface Props {
    item: NewsItem;
    height?: string;
}

const OverlayCard: React.FC<Props> = ({ item, height = 'h-[450px]' }) => (
    <Link href={item.sub_category ? `/${item.category?.slug}/${item.sub_category?.slug}/${item.slug}` : `/${item.category?.slug}/${item.slug}`} className={`group relative block overflow-hidden border-4 border-foreground bg-foreground ${height} w-full transition-all hover:-translate-y-2 hover:shadow-[16px_16px_0px_0px_rgba(var(--primary-rgb),1)]`}>
        {/* Massive Decorative Background Identifier */}
        <div className="pointer-events-none absolute -top-10 -left-10 z-0 text-[200px] leading-none font-black text-background/[0.07] uppercase italic select-none">{item.category?.name?.substring(0, 1) || 'B'}</div>

        {/* Hard-edge Image Mask */}
        {item.thumbnail_url ? <img src={item.thumbnail_url} alt={item.title} className="h-full w-full object-cover brightness-50 grayscale transition-all duration-1000 group-hover:scale-105 group-hover:brightness-75 group-hover:grayscale-0" /> : <div className="flex h-full w-full items-center justify-center bg-foreground text-4xl font-black text-background italic">[ NO_VISUAL ]</div>}

        {/* Industrial Info Blocks */}
        <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 lg:p-12">
            <div className="mb-6 flex items-center gap-4">
                <span className="bg-primary px-4 py-1.5 text-xs font-black tracking-[0.3em] text-background uppercase italic">{item.category?.name || 'LOG_ENTRY'}</span>
                <div className="h-1 flex-1 bg-background/20 transition-colors group-hover:bg-primary"></div>
                <Layers className="h-5 w-5 text-background opacity-40" />
            </div>

            <h3 className="text-3xl leading-[0.9] font-black tracking-tighter text-background uppercase italic transition-transform duration-500 group-hover:-translate-y-2 md:text-5xl lg:text-6xl">{item.title}</h3>

            <div className="mt-8 flex items-center gap-6 border-t border-background/20 pt-6">
                <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-background/50 uppercase">STREAM_ORIGIN</span>
                    <span className="text-xs font-black text-background uppercase underline decoration-primary decoration-2 underline-offset-4">@{item.user?.name || 'SYSTEM'}</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-background/50 uppercase">TRAFFIC</span>
                    <span className="text-xs font-black text-primary italic">{(item.views || 0).toLocaleString()} RECS</span>
                </div>
            </div>
        </div>

        {/* Decorative Industrial Border Lines on corners */}
        <div className="absolute top-0 right-0 h-10 w-10 border-t-4 border-r-4 border-primary opacity-0 transition-opacity group-hover:opacity-100"></div>
        <div className="absolute bottom-0 left-0 h-10 w-10 border-b-4 border-l-4 border-primary opacity-0 transition-opacity group-hover:opacity-100"></div>
    </Link>
);

export default OverlayCard;
