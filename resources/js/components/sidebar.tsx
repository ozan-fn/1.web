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
        <aside className="space-y-12 will-change-transform sm:space-y-16">
            {/* Widget: Trending - Industrial List */}
            <div className="relative">
                <div className="mb-6 flex items-center justify-between border-b-2 border-foreground pb-3 sm:mb-8 sm:border-b-4 sm:pb-4 dark:border-foreground">
                    <h3 className="flex items-center gap-2 text-lg font-black tracking-tighter text-foreground uppercase italic sm:text-xl dark:text-foreground">
                        <TrendingUp className="h-4 w-4 text-primary sm:h-5 sm:w-5 dark:text-primary" />
                        TR_LEVEL_10
                    </h3>
                    <span className="text-[8px] font-black opacity-30 sm:text-[10px]">HOT_FEEDS</span>
                </div>

                <div className="flex flex-col gap-1">
                    {trendingNews?.map((item, i) => (
                        <Link
                            key={item.id}
                            href={item.sub_category ? `/${item.category?.slug}/${item.sub_category?.slug}/${item.slug}` : `/${item.category?.slug}/${item.slug}`}
                            className="group relative flex items-start gap-4 border-b-2 border-foreground/5 px-3 py-4 transition-all duration-300 ease-in-out hover:bg-foreground hover:text-background sm:gap-6 sm:px-4 sm:py-6 dark:border-foreground/5 dark:hover:bg-foreground dark:hover:text-background"
                        >
                            <span className="text-2xl leading-none font-black text-primary italic transition-colors duration-300 group-hover:text-background sm:text-4xl dark:text-primary dark:group-hover:text-background">{String(i + 1).padStart(2, '0')}</span>
                            <div className="flex flex-col gap-2">
                                <h4 className="text-sm leading-tight font-black tracking-tighter text-foreground uppercase group-hover:text-background sm:text-base dark:text-foreground dark:group-hover:text-background">{item.title}</h4>
                                <div className="flex items-center gap-2 text-[8px] font-black opacity-40 transition-opacity duration-300 group-hover:opacity-100 sm:text-[9px]">
                                    <span className="bg-primary px-2 py-0.5 text-background italic dark:bg-primary dark:text-background">{item.category?.name}</span>
                                    <span className="hidden sm:inline">// DATA_INDEX_{item.id}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Widget: Latest - Fragmented Cards */}
            <div className="relative">
                <div className="mb-6 flex items-center justify-between border-b-2 border-foreground pb-3 sm:mb-8 sm:border-b-4 sm:pb-4 dark:border-foreground">
                    <h3 className="flex items-center gap-2 text-lg font-black tracking-tighter text-foreground uppercase italic sm:text-xl dark:text-foreground">
                        <Zap className="h-4 w-4 text-primary sm:h-5 sm:w-5 dark:text-primary" />
                        LT_STREAM
                    </h3>
                    <div className="h-2 w-2 animate-ping bg-primary dark:bg-primary"></div>
                </div>

                <div className="flex flex-col gap-6 sm:gap-10">
                    {latestNews?.map((item) => (
                        <Link
                            key={item.id}
                            href={item.sub_category ? `/${item.category?.slug}/${item.sub_category?.slug}/${item.slug}` : `/${item.category?.slug}/${item.slug}`}
                            className="group flex flex-col gap-3 border-2 border-foreground p-3 transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:gap-4 sm:p-4 sm:hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:border-foreground dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] sm:dark:hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]"
                        >
                            <div className="relative aspect-video w-full overflow-hidden border-2 border-foreground bg-foreground dark:border-foreground dark:bg-foreground">
                                {item.thumbnail_url ? <img src={item.thumbnail_url} className="h-full w-full object-cover grayscale transition-all duration-500 ease-in-out group-hover:scale-110 group-hover:grayscale-0" alt={item.title} /> : <div className="flex h-full w-full items-center justify-center text-[8px] font-black text-background uppercase italic sm:text-[10px] dark:text-background">NULL_SIGNAL</div>}
                                <div className="absolute top-0 right-0 bg-foreground px-1 py-1 text-[6px] font-black tracking-widest text-background uppercase transition-colors duration-300 group-hover:bg-primary sm:px-2 sm:text-[8px] dark:bg-foreground dark:text-background dark:group-hover:bg-primary">{item.category?.name}</div>
                            </div>
                            <h4 className="text-xs leading-snug font-black tracking-tight text-foreground uppercase transition-colors duration-300 group-hover:text-primary sm:text-sm dark:text-foreground dark:group-hover:text-primary">{item.title}</h4>
                            <div className="flex items-center justify-between text-[8px] font-black uppercase italic opacity-40 sm:text-[9px]">
                                <span>{item.user?.name || 'SYS_ADM'}</span>
                                <span>{new Date(item.published_at).toLocaleTimeString('id-id', { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Decoration Plate */}
            <div className="pt-6 sm:pt-10">
                <div className="border-2 border-foreground bg-foreground p-4 text-background sm:border-4 sm:p-8 dark:border-foreground dark:bg-foreground dark:text-background">
                    <div className="mb-3 flex items-center gap-3 sm:mb-4 sm:gap-4">
                        <Activity className="h-5 w-5 text-primary sm:h-6 sm:w-6 dark:text-primary" />
                        <span className="text-lg font-black tracking-tighter uppercase italic sm:text-xl">SYSTEM_LOAD</span>
                    </div>
                    <div className="space-y-2">
                        <div className="h-2 w-full overflow-hidden bg-background/20 dark:bg-background/20">
                            <div className="h-full w-[85%] bg-primary dark:bg-primary"></div>
                        </div>
                        <div className="flex justify-between text-[8px] font-black opacity-60 sm:text-[10px]">
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
