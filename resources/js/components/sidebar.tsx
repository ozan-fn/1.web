import { Link } from '@inertiajs/react';
import React from 'react';
import { NewsItem } from '../pages/home/partials/types';

interface SidebarProps {
    // Gunakan opsional (?) agar tidak crash jika data belum ada
    trendingNews?: NewsItem[];
    latestNews?: NewsItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ trendingNews = [], latestNews = [] }) => {
    return (
        <aside className="space-y-12">
            {/* Widget: Terpopuler */}
            <div>
                <div className="mb-6 border-b-2 border-blue-700 pb-2">
                    <h3 className="text-lg font-black text-foreground uppercase">Terpopuler</h3>
                </div>
                <div className="flex flex-col gap-4">
                    {trendingNews?.slice(0, 5).map((item, i) => (
                        <Link key={item.id} href={item.sub_category ? `/${item.category?.slug}/${item.sub_category?.slug}/${item.slug}` : `/${item.category?.slug}/${item.slug}`} className="group flex gap-4 border-b border-border pb-4 last:border-0">
                            <span className="text-2xl font-black text-blue-700 italic opacity-40 transition-opacity group-hover:opacity-100">{i + 1}</span>
                            <div className="flex flex-col gap-1">
                                <h4 className="line-clamp-2 text-sm leading-snug font-bold transition-colors group-hover:text-blue-700">{item.title}</h4>
                                <span className="text-[10px] font-bold text-blue-700 uppercase">{item.category?.name}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Widget: Terbaru */}
            <div>
                <div className="mb-6 border-b-2 border-blue-700 pb-2">
                    <h3 className="text-lg font-black text-foreground uppercase">Terbaru</h3>
                </div>
                <div className="flex flex-col gap-6">
                    {latestNews?.slice(0, 5).map((item) => (
                        <Link key={item.id} href={item.sub_category ? `/${item.category?.slug}/${item.sub_category?.slug}/${item.slug}` : `/${item.category?.slug}/${item.slug}`} className="group flex flex-col gap-2 border-b border-border pb-4 last:border-b-0">
                            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">{item.thumbnail_url ? <img src={item.thumbnail_url} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" alt={item.title} /> : <div className="flex h-full w-full items-center justify-center text-[10px] font-bold text-muted-foreground uppercase">No Image</div>}</div>
                            <h4 className="line-clamp-2 text-sm leading-tight font-bold transition-colors group-hover:text-blue-700">{item.title}</h4>
                            <div className="flex items-center gap-2 text-[10px] font-medium text-muted-foreground uppercase">
                                <span>{item.category?.name}</span>
                                <span>•</span>
                                <span>{new Date(item.published_at).toLocaleDateString('id-ID')}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
