import { Link } from '@inertiajs/react';
import React from 'react';
import { NewsItem } from './types';

interface Props {
    item: NewsItem;
}

const ListCard: React.FC<Props> = ({ item }) => (
    <Link href={item.sub_category ? `/${item.category?.slug}/${item.sub_category?.slug}/${item.slug}` : `/${item.category?.slug}/${item.slug}`} className="group relative flex flex-col gap-5 rounded-2xl border border-transparent p-4 transition-all duration-300 hover:border-border hover:bg-card hover:shadow-xl dark:hover:bg-muted/50">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-muted shadow-inner">
            {item.thumbnail_url ? <img src={item.thumbnail_url} alt={item.title} className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105" /> : <div className="flex h-full w-full items-center justify-center bg-muted text-xs font-bold text-muted-foreground uppercase">No Image</div>}
            <div className="absolute top-3 left-3">
                <span className="rounded-full bg-white/90 px-3 py-1 text-[9px] font-black tracking-widest text-primary uppercase shadow-sm backdrop-blur-sm dark:bg-black/90">{item.category?.name || 'Berita'}</span>
            </div>
        </div>

        <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                <span>{new Date(item.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                {item.sub_category && (
                    <>
                        <span className="h-1 w-1 rounded-full bg-border"></span>
                        <span className="text-primary">{item.sub_category.name}</span>
                    </>
                )}
            </div>

            <h3 className="line-clamp-2 text-lg leading-snug font-black tracking-tight text-foreground transition-colors group-hover:text-primary">{item.title}</h3>

            <p className="line-clamp-2 text-sm leading-relaxed font-medium text-muted-foreground">{item.excerpt || item.content?.replace(/<[^>]*>/g, '').substring(0, 100)}...</p>

            <div className="mt-2 flex -translate-x-2 items-center gap-2 text-[10px] font-black tracking-tighter text-primary uppercase opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                Baca Selengkapnya
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            </div>
        </div>
    </Link>
);

export default ListCard;
