import { Link } from '@inertiajs/react';
import React from 'react';
import { NewsItem } from '../pages/home/partials/types';

interface SidebarProps {
    // Gunakan opsional (?) agar tidak crash jika data belum ada
    trendingNews?: NewsItem[];
    latestNews?: NewsItem[];
}

const Sidebar: React.FC<SidebarProps> = ({
    trendingNews = [], // Berikan default value array kosong
    latestNews = [],
}) => {
    return (
        <aside className="space-y-10 lg:col-span-4 lg:pl-4">
            {/* Widget: Terpopuler (Numbered) */}
            <div className="bg-background">
                <div className="mb-6 flex items-center justify-between border-b-2 border-red-600 pb-2">
                    <h3 className="text-lg font-black tracking-tighter text-foreground uppercase">Terpopuler</h3>
                </div>
                <div className="flex flex-col">
                    {/* Optional chaining ?.map digunakan untuk keamanan ekstra */}
                    {trendingNews?.map((item, i) => (
                        <Link key={item.id} href={item.sub_category ? `/${item.category?.slug}/${item.sub_category?.slug}/${item.slug}` : `/${item.category?.slug}/${item.slug}`} className="group flex cursor-pointer items-start gap-4 border-b border-border py-4 transition last:border-0 hover:bg-muted/50">
                            {/* Nomor urut menggunakan muted-foreground agar sinkron di dark mode */}
                            <div className="text-3xl leading-none font-black text-muted-foreground/30 italic transition-colors group-hover:text-red-600">{i + 1}</div>
                            <div className="flex flex-col gap-1">
                                <h4 className="text-[14px] leading-snug font-black text-foreground transition-colors group-hover:text-red-600">{item.title}</h4>
                                <span className="text-[11px] font-black tracking-tight text-red-600 uppercase">{item.category?.name}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Widget: Terbaru (Cards) */}
            <div>
                <div className="mb-6 flex items-center justify-between border-b-2 border-red-600 pb-2">
                    <h3 className="text-lg font-black tracking-tighter text-foreground uppercase">Terbaru</h3>
                </div>
                <div className="flex flex-col gap-6">
                    {latestNews?.map((item) => (
                        <Link key={item.id} href={item.sub_category ? `/${item.category?.slug}/${item.sub_category?.slug}/${item.slug}` : `/${item.category?.slug}/${item.slug}`} className="group flex cursor-pointer flex-col gap-3">
                            <div className="relative aspect-video w-full overflow-hidden rounded-sm bg-muted">
                                {item.thumbnail_url ? <img src={item.thumbnail_url} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" alt={item.title} /> : <div className="flex h-full w-full items-center justify-center bg-muted text-xs font-bold text-muted-foreground uppercase">No Image</div>}
                                <span className="absolute bottom-2 left-2 bg-red-600 px-2 py-0.5 text-[10px] font-black tracking-widest text-white uppercase">{item.category?.name}</span>
                            </div>
                            <h4 className="line-clamp-2 text-base leading-tight font-black text-foreground transition-colors group-hover:text-red-600">{item.title}</h4>
                            <div className="flex items-center gap-2 text-[11px] font-medium tracking-tighter text-muted-foreground uppercase">
                                <span>{item.user?.name || 'Redaksi'}</span>
                                <span className="h-1 w-1 rounded-full bg-border"></span>
                                <span>
                                    {new Date(item.published_at).toLocaleDateString('id-ID', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric',
                                    })}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
