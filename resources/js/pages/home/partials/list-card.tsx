import { Link } from '@inertiajs/react';
import { ArrowUpRight, Maximize2 } from 'lucide-react';
import React from 'react';
import { NewsItem } from './types';

interface Props {
    item: NewsItem;
}

const ListCard: React.FC<Props> = ({ item }) => (
    <Link href={item.sub_category ? `/${item.category?.slug}/${item.sub_category?.slug}/${item.slug}` : `/${item.category?.slug}/${item.slug}`} className="group relative flex flex-col items-center gap-8 border-4 border-foreground bg-background p-6 transition-all hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] md:flex-row dark:hover:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)]">
        {/* Large Decorative Category Text in background of card */}
        <div className="pointer-events-none absolute top-2 right-4 text-4xl leading-none font-black text-foreground/[0.04] uppercase italic select-none">{item.category?.name?.substring(0, 3)}</div>

        {/* Thumbnail with Heavy Border */}
        <div className="relative aspect-square w-full shrink-0 overflow-hidden border-4 border-foreground bg-foreground md:w-48">
            {item.thumbnail_url ? <img src={item.thumbnail_url} alt={item.title} className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-110 group-hover:grayscale-0" /> : <div className="flex h-full w-full items-center justify-center text-[10px] font-black tracking-widest text-background uppercase italic">[ NO_SIGNAL ]</div>}
            <div className="absolute top-2 right-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                <div className="bg-primary p-1 text-background">
                    <Maximize2 className="h-3 w-3" />
                </div>
            </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-1 flex-col gap-4">
            <div className="flex items-center gap-3">
                <span className="bg-primary px-3 py-1 text-[10px] font-black tracking-widest text-background uppercase italic">{item.category?.name || 'LOG'}</span>
                <div className="h-px flex-1 bg-foreground/10"></div>
                <ArrowUpRight className="h-4 w-4 text-primary opacity-40 transition-opacity group-hover:opacity-100" />
            </div>

            <h3 className="line-clamp-2 text-xl leading-tight font-black tracking-tighter text-foreground uppercase italic transition-colors group-hover:text-primary md:text-2xl lg:text-3xl">{item.title}</h3>

            <div className="flex items-center justify-between border-t-2 border-foreground/5 pt-4">
                <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase opacity-40">PUBLISH_ID</span>
                    <span className="text-xs font-black uppercase">{new Date(item.published_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-[10px] font-black uppercase opacity-40">VIEW_LOGS</span>
                    <span className="text-xs font-black text-primary italic">{(item.views || 0).toLocaleString()} ACC</span>
                </div>
            </div>
        </div>
    </Link>
);

export default ListCard;
