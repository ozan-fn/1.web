import { Link } from '@inertiajs/react';
import React from 'react';
import { NewsItem } from './types';

interface Props {
    item: NewsItem;
}

const ListCard: React.FC<Props> = ({ item }) => {
    const categorySlug = item.category?.slug || 'news';
    const postSlug = item.slug || '#';
    const subCategorySlug = item.sub_category?.slug;

    const href = subCategorySlug ? `/${categorySlug}/${subCategorySlug}/${postSlug}` : `/${categorySlug}/${postSlug}`;

    return (
        <Link href={href} className="group flex flex-col transition-all duration-300">
            <div className="relative aspect-[16/10] w-full overflow-hidden border border-foreground/5 bg-muted">
                {item.thumbnail_url ? <img src={item.thumbnail_url} alt={item.title} className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0" /> : <div className="flex h-full w-full items-center justify-center font-mono text-[9px] font-bold tracking-[0.4em] text-muted-foreground uppercase opacity-20">Blank Canvas</div>}
            </div>

            <div className="flex flex-col pt-6">
                <div className="mb-4 flex items-center gap-4">
                    <span className="font-mono text-[9px] font-bold tracking-[0.3em] text-primary uppercase">{item.category?.name || 'GENRE'}</span>
                    <div className="h-[1px] flex-1 bg-foreground/5" />
                </div>

                <h3 className="line-clamp-2 text-xl leading-[1.2] font-bold tracking-tighter text-foreground transition-colors group-hover:text-primary">{item.title}</h3>

                <div className="mt-6 flex items-center gap-6 opacity-40 transition-opacity group-hover:opacity-100">
                    <span className="font-mono text-[9px] font-bold tracking-widest uppercase">{new Date(item.published_at).toLocaleDateString()}</span>
                    <div className="h-6 w-[1px] bg-foreground/10" />
                    <span className="font-mono text-[9px] font-bold tracking-widest uppercase">BY {item.user?.name || 'STAFF'}</span>
                </div>
            </div>
        </Link>
    );
};

export default ListCard;
