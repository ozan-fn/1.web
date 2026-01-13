import { Link } from '@inertiajs/react';
import { ArrowUpRight, Maximize2 } from 'lucide-react';
import React from 'react';
import { NewsItem } from './types';

interface Props {
    item: NewsItem;
}

const ListCard: React.FC<Props> = ({ item }) => (
    <Link
        href={item.sub_category ? `/${item.category?.slug}/${item.sub_category?.slug}/${item.slug}` : `/${item.category?.slug}/${item.slug}`}
        className="group relative flex flex-col items-center gap-6 border-2 border-foreground bg-background p-4 transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sm:gap-8 sm:border-4 sm:p-6 sm:hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] md:flex-row dark:border-foreground dark:bg-background dark:hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] sm:dark:hover:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)]"
    >
        {/* Large Decorative Category Text in background of card */}
        <div className="pointer-events-none absolute top-2 right-2 text-2xl leading-none font-black text-foreground/[0.04] uppercase italic select-none sm:right-4 sm:text-4xl dark:text-foreground/[0.08]">{item.category?.name?.substring(0, 3)}</div>

        {/* Thumbnail with Heavy Border */}
        <div className="relative aspect-square w-full shrink-0 overflow-hidden border-2 border-foreground bg-foreground sm:border-4 md:w-32 lg:w-48 dark:border-foreground dark:bg-foreground">
            {item.thumbnail_url ? <img src={item.thumbnail_url} alt={item.title} className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-110 group-hover:grayscale-0" /> : <div className="flex h-full w-full items-center justify-center text-[8px] font-black tracking-widest text-background uppercase italic sm:text-[10px] dark:text-background">[ NO_SIGNAL ]</div>}
            <div className="absolute top-1 right-1 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100 sm:top-2 sm:right-2">
                <div className="bg-primary p-1 text-background dark:bg-primary dark:text-background">
                    <Maximize2 className="h-2 w-2 sm:h-3 sm:w-3" />
                </div>
            </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-1 flex-col gap-3 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3">
                <span className="bg-primary px-2 py-1 text-[8px] font-black tracking-widest text-background uppercase italic sm:px-3 sm:text-[10px] dark:bg-primary dark:text-background">{item.category?.name || 'LOG'}</span>
                <div className="h-px flex-1 bg-foreground/10 dark:bg-foreground/10"></div>
                <ArrowUpRight className="h-3 w-3 text-primary opacity-40 transition-opacity group-hover:opacity-100 sm:h-4 sm:w-4 dark:text-primary" />
            </div>

            <h3 className="line-clamp-2 text-lg leading-tight font-black tracking-tighter text-foreground uppercase italic transition-colors group-hover:text-primary sm:text-xl md:text-xl lg:text-2xl xl:text-3xl dark:text-foreground dark:group-hover:text-primary">{item.title}</h3>

            <div className="flex items-center justify-between border-t-2 border-foreground/5 pt-3 sm:pt-4 dark:border-foreground/5">
                <div className="flex flex-col">
                    <span className="text-[8px] font-black uppercase opacity-40 sm:text-[10px]">PUBLISH_ID</span>
                    <span className="text-[10px] font-black text-foreground uppercase sm:text-xs dark:text-foreground">{new Date(item.published_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-[8px] font-black uppercase opacity-40 sm:text-[10px]">VIEW_LOGS</span>
                    <span className="text-[10px] font-black text-primary italic sm:text-xs dark:text-primary">{(item.views || 0).toLocaleString()} ACC</span>
                </div>
            </div>
        </div>
    </Link>
);

export default ListCard;
