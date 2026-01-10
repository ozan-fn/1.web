import { Link } from '@inertiajs/react';
import { Activity, TrendingUp, Zap } from 'lucide-react';
import React from 'react';
import { NewsItem } from '../pages/home/partials/types';

interface SidebarProps {
    trendingNews?: NewsItem[];
    latestNews?: NewsItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ trendingNews = [], latestNews = [] }) => {
    return (
        <aside className="space-y-16 will-change-transform">
            {/* Widget: Trending - Industrial List */}
            <div className="relative">
                <div className="mb-8 flex items-center justify-between border-b-4 border-foreground pb-4">
                    <h3 className="flex items-center gap-2 text-xl font-black tracking-tighter uppercase italic">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        TR_LEVEL_10
                    </h3>
                    <span className="text-[10px] font-black opacity-30">HOT_FEEDS</span>
                </div>

                <div className="flex flex-col gap-1">
                    {trendingNews?.map((item, i) => (
                        <Link key={item.id} href={item.sub_category ? `/${item.category?.slug}/${item.sub_category?.slug}/${item.slug}` : `/${item.category?.slug}/${item.slug}`} className="group relative flex items-start gap-6 border-b-2 border-foreground/5 px-4 py-6 transition-all duration-300 ease-in-out hover:bg-foreground hover:text-background">
                            <span className="text-4xl leading-none font-black text-primary italic transition-colors duration-300 group-hover:text-background">{String(i + 1).padStart(2, '0')}</span>
                            <div className="flex flex-col gap-2">
                                <h4 className="text-base leading-tight font-black tracking-tighter uppercase">{item.title}</h4>
                                <div className="flex items-center gap-2 text-[9px] font-black opacity-40 transition-opacity duration-300 group-hover:opacity-100">
                                    <span className="bg-primary px-2 py-0.5 text-background italic">{item.category?.name}</span>
                                    <span>// DATA_INDEX_{item.id}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Widget: Latest - Fragmented Cards */}
            <div className="relative">
                <div className="mb-8 flex items-center justify-between border-b-4 border-foreground pb-4">
                    <h3 className="flex items-center gap-2 text-xl font-black tracking-tighter uppercase italic">
                        <Zap className="h-5 w-5 text-primary" />
                        LT_STREAM
                    </h3>
                    <div className="h-2 w-2 animate-ping bg-primary"></div>
                </div>

                <div className="flex flex-col gap-10">
                    {latestNews?.map((item) => (
                        <Link key={item.id} href={item.sub_category ? `/${item.category?.slug}/${item.sub_category?.slug}/${item.slug}` : `/${item.category?.slug}/${item.slug}`} className="group flex flex-col gap-4 border-2 border-foreground p-4 transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
                            <div className="relative aspect-video w-full overflow-hidden border-2 border-foreground bg-foreground">
                                {item.thumbnail_url ? <img src={item.thumbnail_url} className="h-full w-full object-cover grayscale transition-all duration-500 ease-in-out group-hover:scale-110 group-hover:grayscale-0" alt={item.title} /> : <div className="flex h-full w-full items-center justify-center text-[10px] font-black text-background uppercase italic">NULL_SIGNAL</div>}
                                <div className="absolute top-0 right-0 bg-foreground px-2 py-1 text-[8px] font-black tracking-widest text-background uppercase transition-colors duration-300 group-hover:bg-primary">{item.category?.name}</div>
                            </div>
                            <h4 className="text-sm leading-snug font-black tracking-tight uppercase transition-colors duration-300 group-hover:text-primary">{item.title}</h4>
                            <div className="flex items-center justify-between text-[9px] font-black uppercase italic opacity-40">
                                <span>{item.user?.name || 'SYS_ADM'}</span>
                                <span>{new Date(item.published_at).toLocaleTimeString('id-id', { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Decoration Plate */}
            <div className="pt-10">
                <div className="border-4 border-foreground bg-foreground p-8 text-background">
                    <div className="mb-4 flex items-center gap-4">
                        <Activity className="h-6 w-6 text-primary" />
                        <span className="text-xl font-black tracking-tighter uppercase italic">SYSTEM_LOAD</span>
                    </div>
                    <div className="space-y-2">
                        <div className="h-2 w-full overflow-hidden bg-background/20">
                            <div className="h-full w-[85%] bg-primary"></div>
                        </div>
                        <div className="flex justify-between text-[10px] font-black opacity-60">
                            <span>RESOURCES_ALLOCATED</span>
                            <span>85%</span>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
