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
        <aside className="space-y-12 lg:pl-4">
            {/* Widget: Headlines / Latest (Re-styled) */}
            <div className="relative overflow-hidden rounded-[2rem] border border-border bg-muted/30 p-8">
                <div className="mb-8 flex items-center justify-between">
                    <h3 className="text-sm font-black tracking-[0.2em] text-foreground uppercase italic">FLASH NEWS</h3>
                    <div className="h-1.5 w-1.5 animate-ping rounded-full bg-primary"></div>
                </div>

                <div className="flex flex-col gap-8">
                    {latestNews?.slice(0, 3).map((item) => (
                        <Link key={item.id} href={item.sub_category ? `/${item.category?.slug}/${item.sub_category?.slug}/${item.slug}` : `/${item.category?.slug}/${item.slug}`} className="group flex flex-col gap-3">
                            <div className="flex items-center gap-2 text-[10px] font-black tracking-widest text-primary uppercase">
                                <span>{item.category?.name}</span>
                                <span className="h-0.5 w-4 bg-primary/30"></span>
                            </div>
                            <h4 className="line-clamp-2 text-[17px] leading-tight font-black text-foreground transition-colors group-hover:text-primary">{item.title}</h4>
                            <span className="text-[10px] font-medium tracking-tighter text-muted-foreground uppercase">
                                {new Date(item.published_at).toLocaleDateString('id-ID', { hour: '2-digit', minute: '2-digit' })} • {item.user?.name || 'Redaksi'}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Widget: Most Viral (Numbered Cards) */}
            <div>
                <div className="mb-10 flex items-center gap-4">
                    <div className="h-px flex-1 bg-border"></div>
                    <h3 className="bg-background px-4 text-[11px] font-black tracking-[0.3em] text-muted-foreground uppercase">TOP OF THE WEEK</h3>
                    <div className="h-px flex-1 bg-border"></div>
                </div>

                <div className="flex flex-col gap-2">
                    {trendingNews?.map((item, i) => (
                        <Link key={item.id} href={item.sub_category ? `/${item.category?.slug}/${item.sub_category?.slug}/${item.slug}` : `/${item.category?.slug}/${item.slug}`} className="group flex items-center gap-6 rounded-2xl p-4 transition-all hover:bg-muted/50">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-muted font-black text-muted-foreground italic transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">{i + 1}</div>
                            <div className="flex flex-col gap-1">
                                <h4 className="line-clamp-2 text-sm leading-snug font-bold text-foreground transition-colors group-hover:text-primary">{item.title}</h4>
                                <div className="flex items-center gap-2">
                                    <span className="text-[9px] font-black tracking-widest text-primary uppercase">{item.category?.name}</span>
                                    <span className="text-[9px] text-muted-foreground uppercase opacity-50">{item.views || 0} views</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* New Banner Widget */}
            <div className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-[2rem] border-2 border-dashed border-primary/20 bg-primary/10 p-8">
                <div className="absolute top-8 left-8">
                    <div className="text-[10px] font-black tracking-[0.3em] text-primary uppercase">SPONSORED</div>
                </div>
                <div className="relative z-10">
                    <h3 className="text-2xl leading-tight font-black tracking-tight text-foreground italic">Membangun Masa Depan Swara Indonesia</h3>
                    <p className="mt-4 text-xs leading-relaxed font-medium text-muted-foreground">Dukung jurnalisme independen dan tepercaya untuk bangsa yang lebih cerdas.</p>
                    <button className="mt-8 w-full rounded-2xl bg-foreground py-4 text-[10px] font-black tracking-widest text-background uppercase transition-transform group-hover:scale-[1.05]">Dukung Sekarang</button>
                </div>
                <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-primary/20 blur-3xl transition-all group-hover:bg-primary/40"></div>
            </div>
        </aside>
    );
};

export default Sidebar;
