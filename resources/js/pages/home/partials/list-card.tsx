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
        <Link href={href} className="group relative flex flex-col overflow-hidden rounded-[32px] bg-card p-3 shadow-sm ring-1 ring-border transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 hover:ring-primary/20">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[24px] bg-muted">
                {item.thumbnail_url ? <img src={item.thumbnail_url} alt={item.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" /> : <div className="flex h-full w-full items-center justify-center bg-muted text-[10px] font-black tracking-widest text-muted-foreground uppercase">No Image</div>}
                <div className="absolute top-4 left-4">
                    <span className="inline-block rounded-full bg-background/90 px-3 py-1.5 text-[9px] font-black tracking-widest text-primary uppercase shadow-sm backdrop-blur-md">{item.category?.name || 'News'}</span>
                </div>
            </div>

            <div className="flex flex-1 flex-col justify-between p-4">
                <div>
                    <h3 className="line-clamp-2 text-base leading-tight font-black text-foreground transition-colors group-hover:text-primary md:text-lg">{item.title}</h3>
                    {/* Optional description placeholder if needed */}
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                    <span className="text-[10px] font-bold tracking-tight text-muted-foreground uppercase">{new Date(item.published_at).toLocaleDateString()}</span>
                    <span className="text-[10px] font-black tracking-tighter text-primary uppercase italic">Read More →</span>
                </div>
            </div>
        </Link>
    );
};
export default ListCard;
