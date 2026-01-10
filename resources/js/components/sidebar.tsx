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
        <aside className="space-y-24">
            {/* Widget: Terpopuler (Extreme Numbered) */}
            <div>
                <div className="mb-10 flex items-center justify-between border-b-4 border-foreground pb-4">
                    <h3 className="text-3xl font-black tracking-tighter uppercase italic">
                        TOP <span className="text-primary">CHARTS</span>
                    </h3>
                </div>
                <div className="flex flex-col">
                    {trendingNews?.map((item, i) => (
                        <Link key={item.id} href={item.sub_category ? `/${item.category?.slug}/${item.sub_category?.slug}/${item.slug}` : `/${item.category?.slug}/${item.slug}`} className="group relative border-b border-foreground/10 py-8 transition-all hover:translate-x-4">
                            <div className="flex items-start gap-6">
                                <div className="shrink-0 text-[60px] leading-none font-black text-foreground/5 italic tabular-nums transition-colors select-none group-hover:text-primary">{i + 1}</div>
                                <div className="flex flex-col">
                                    <Link key={`cat-${item.id}`} href={`/${item.category?.slug}`} className="mb-2 text-[10px] font-black tracking-[0.2em] text-primary uppercase">
                                        {item.category?.name}
                                    </Link>
                                    <h4 className="text-lg leading-[1.1] font-black text-foreground uppercase decoration-2 group-hover:underline">{item.title}</h4>
                                    <div className="mt-3 text-[9px] font-black tracking-widest text-foreground/40 uppercase">{item.published_at}</div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Widget: Terbaru (Industrial Archive) */}
            <div className="bg-foreground p-10 text-background">
                <div className="mb-10 flex items-center justify-between">
                    <h3 className="text-2xl font-black tracking-widest uppercase italic">LATEST_LOG</h3>
                    <div className="animate-spin-slow h-6 w-6 border-2 border-background"></div>
                </div>
                <div className="flex flex-col gap-12">
                    {latestNews?.slice(0, 5).map((item) => (
                        <Link key={item.id} href={item.sub_category ? `/${item.category?.slug}/${item.sub_category?.slug}/${item.slug}` : `/${item.category?.slug}/${item.slug}`} className="group flex flex-col gap-4">
                            <div className="relative h-[1px] w-full bg-background/20 group-hover:bg-primary"></div>
                            <div className="flex flex-col gap-2">
                                <h4 className="text-sm leading-tight font-black text-background uppercase transition-colors group-hover:text-primary">{item.title}</h4>
                                <div className="flex items-center gap-4 text-[9px] font-black tracking-[0.2em] uppercase opacity-40">
                                    <span>#{item.category?.name}</span>
                                    <span>{item.published_at}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                <Link href="/latest" className="mt-16 block border-2 border-primary py-4 text-center text-[10px] font-black tracking-[0.5em] text-primary uppercase transition-all hover:bg-primary hover:text-background">
                    ACCESS_FULL_ARCHIVE
                </Link>
            </div>

            {/* Advertising / Placeholder Branding */}
            <div className="border border-dashed border-foreground/30 p-10 text-center">
                <div className="mb-2 text-[40px] font-black text-foreground/10 italic">24/7</div>
                <p className="text-[10px] font-black tracking-[0.2em] uppercase opacity-40">Continuous Digital Coverage</p>
            </div>
        </aside>
    );
};

export default Sidebar;
