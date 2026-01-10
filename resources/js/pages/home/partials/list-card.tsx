import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import React from 'react';
import { NewsItem } from './types';

interface Props {
    item: NewsItem;
}

const ListCard: React.FC<Props> = ({ item }) => (
    <Link href={item.sub_category ? `/${item.category?.slug}/${item.sub_category?.slug}/${item.slug}` : `/${item.category?.slug}/${item.slug}`} className="group flex flex-col gap-0 border-2 border-foreground bg-background transition-all duration-300 hover:bg-foreground hover:text-background">
        <div className="relative aspect-[16/6] w-full overflow-hidden border-b-2 border-foreground bg-muted">
            {item.thumbnail ? <img src={`/storage/${item.thumbnail}`} alt={item.title} className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0" /> : <div className="flex h-full w-full items-center justify-center bg-muted text-xs font-black text-foreground/20 uppercase italic">[ NO_THUMBNAIL ]</div>}

            <div className="absolute top-0 left-0 bg-primary px-3 py-1 text-[9px] font-black tracking-[0.3em] text-background uppercase italic">{item.category?.name || 'LOG'}</div>
        </div>

        <div className="flex flex-col p-6">
            <div className="mb-4 flex items-center justify-between">
                <span className="text-[10px] font-black tracking-widest uppercase italic opacity-60 group-hover:opacity-100">{item.published_at}</span>
                <span className="h-2 w-2 bg-primary"></span>
            </div>

            <h3 className="line-clamp-2 text-xl leading-[1.1] font-black tracking-tighter uppercase group-hover:text-primary md:text-2xl">{item.title}</h3>

            <div className="mt-8 flex items-center justify-end border-t border-foreground/10 pt-4 group-hover:border-background/20">
                <div className="flex items-center gap-2 text-[10px] font-black tracking-widest uppercase">
                    <span>REVIEW REPORT</span>
                    <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-2" />
                </div>
            </div>
        </div>
    </Link>
);

export default ListCard;
