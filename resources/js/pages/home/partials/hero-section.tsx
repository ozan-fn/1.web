import { Link } from '@inertiajs/react';
import { ChevronRight, Maximize2 } from 'lucide-react';
import React from 'react';
import { NewsItem } from './types';

interface Props {
    heroNews: NewsItem;
    sideHeroNews: NewsItem[];
}

const HeroSection: React.FC<Props> = ({ heroNews, sideHeroNews }) => (
    <section className="group relative overflow-visible">
        {/* TOP DECORATIVE BAR */}
        <div className="mb-6 flex items-center justify-between border-t border-b-2 border-foreground py-2 sm:mb-10 dark:border-foreground">
            <span className="text-[8px] font-black tracking-[0.3em] text-primary uppercase sm:text-[10px] sm:tracking-[0.5em] dark:text-primary">HEADLINE_CORE_SYSTEM</span>
            <div className="flex gap-2 text-[8px] font-black italic opacity-40 sm:gap-4 sm:text-[9px]">
                <span>REC_00:12:44:09</span>
                <span className="hidden sm:inline">CH_01_FEED</span>
            </div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:gap-12 lg:grid-cols-12">
            {/* MAIN HERO - Fragmented Layout */}
            <div className="relative lg:col-span-8">
                <div className="relative flex flex-col lg:flex-row">
                    {/* Image Block */}
                    <div className="relative h-[250px] w-full overflow-hidden border-2 border-foreground sm:h-[400px] sm:border-4 lg:h-[500px] lg:w-4/5 xl:h-[600px] dark:border-foreground">
                        <img src={heroNews.thumbnail ? `/storage/${heroNews.thumbnail}` : heroNews.thumbnail_url || '/placeholder.jpg'} alt={heroNews.title} className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-primary/20 opacity-60 mix-blend-multiply transition-opacity group-hover:opacity-0 dark:bg-primary/20"></div>

                        {/* Vertical Overlay Text */}
                        <div className="absolute top-0 right-2 hidden h-full py-6 [writing-mode:vertical-rl] sm:right-4 sm:py-10 lg:block">
                            <span className="text-[8px] font-black tracking-[0.4em] text-white/40 uppercase sm:text-[9px] sm:tracking-[0.5em]">FRONTLINE_REPORTING</span>
                        </div>
                    </div>

                    {/* Meta Bar - Vertically Stacked beside image */}
                    <div className="mt-4 flex flex-col justify-end sm:mt-8 lg:mt-0 lg:w-1/5 lg:pl-4 xl:pl-8">
                        <div className="border-l-2 border-primary pl-3 sm:border-l-4 sm:pl-4 dark:border-primary">
                            <span className="block text-[8px] font-black tracking-widest text-primary uppercase sm:text-[10px] dark:text-primary">{heroNews.published_at}</span>
                            <span className="mt-2 block text-[10px] font-black text-foreground uppercase sm:text-xs dark:text-foreground">BY {heroNews.user?.name || 'REDAKSI'}</span>
                        </div>
                    </div>
                </div>

                {/* OVERLAPPING TITLE BOX - Breaking the Grid */}
                <div className="relative z-10 -mt-12 self-start border-2 border-foreground bg-background p-4 transition-transform duration-500 hover:translate-x-2 hover:-translate-y-2 sm:-mt-20 sm:border-4 sm:p-8 md:-mt-24 md:ml-6 md:max-w-xl lg:-mt-32 lg:ml-12 lg:max-w-2xl lg:p-12 dark:border-foreground dark:bg-background">
                    <div className="mb-3 flex gap-2 sm:mb-4">
                        <span className="bg-primary px-2 py-0.5 text-[8px] font-black text-background uppercase italic sm:px-3 sm:text-[9px] dark:bg-primary dark:text-background">{heroNews.category?.name}</span>
                        <Maximize2 className="h-3 w-3 opacity-20 sm:h-4 sm:w-4" />
                    </div>
                    <Link href={heroNews.sub_category ? `/${heroNews.category?.slug}/${heroNews.sub_category?.slug}/${heroNews.slug}` : `/${heroNews.category?.slug}/${heroNews.slug}`}>
                        <h1 className="text-2xl leading-[0.9] font-black tracking-tighter text-foreground uppercase decoration-primary hover:underline sm:text-4xl md:text-4xl lg:text-6xl dark:text-foreground dark:decoration-primary">{heroNews.title}</h1>
                    </Link>
                    <div className="mt-6 flex h-1 w-12 bg-primary sm:mt-8 sm:w-20 dark:bg-primary"></div>
                </div>
            </div>

            {/* SIDE FEATURES - High Contrast Minimal Cards */}
            <div className="lg:col-span-4 lg:pt-0">
                <div className="mb-4 border-b-2 border-foreground pb-2 sm:mb-6 sm:border-b-4 dark:border-foreground">
                    <span className="text-xs font-black tracking-tighter text-foreground uppercase italic sm:text-sm dark:text-foreground">SUPPLEMENTARY_LOGS</span>
                </div>

                <div className="flex flex-col gap-6 sm:gap-8">
                    {sideHeroNews.slice(0, 3).map((item, index) => (
                        <Link
                            key={item.id}
                            href={item.sub_category ? `/${item.category?.slug}/${item.sub_category?.slug}/${item.slug}` : `/${item.category?.slug}/${item.slug}`}
                            className="group/side relative flex items-start gap-3 border-b border-foreground/10 p-3 pb-6 transition-all hover:bg-foreground hover:text-background sm:gap-4 sm:p-4 sm:pb-8 dark:border-foreground/10 dark:hover:bg-foreground dark:hover:text-background"
                        >
                            <span className="text-2xl font-black text-primary italic transition-colors group-hover/side:text-background sm:text-3xl dark:text-primary dark:group-hover/side:text-background">0{index + 1}</span>
                            <div className="flex flex-col">
                                <span className="text-[8px] font-black tracking-widest uppercase opacity-60 group-hover/side:opacity-80 sm:text-[9px]">[{item.category?.name}]</span>
                                <h3 className="mt-2 text-sm leading-tight font-black tracking-tighter text-foreground uppercase group-hover/side:text-background sm:text-lg dark:text-foreground dark:group-hover/side:text-background">{item.title}</h3>
                                <div className="mt-3 flex items-center justify-between sm:mt-4">
                                    <span className="text-[8px] font-bold opacity-40 sm:text-[10px]">READ_TIME: 4M</span>
                                    <ChevronRight className="h-3 w-3 transform transition-transform group-hover/side:translate-x-2 sm:h-4 sm:w-4" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Visual Archive Plate */}
                <div className="mt-8 border-2 border-dashed border-foreground/30 px-4 py-6 text-center sm:mt-12 sm:px-6 sm:py-8 dark:border-foreground/30">
                    <div className="text-[30px] leading-none font-black text-foreground/5 italic sm:text-[40px] dark:text-foreground/10">DATABASE</div>
                    <p className="mt-2 text-[8px] font-black tracking-[0.2em] uppercase opacity-40 sm:text-[9px] sm:tracking-[0.3em]">Click to enter storage_v2</p>
                </div>
            </div>
        </div>

        {/* Floating Page Label */}
        <div className="pointer-events-none absolute top-1/2 -right-8 -rotate-90 text-[60px] font-black text-foreground/[0.02] uppercase select-none sm:-right-16 sm:text-[100px] dark:text-foreground/[0.04]">FRONT_HUB</div>
    </section>
);

export default HeroSection;
