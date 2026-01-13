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
        <div className="mb-6 sm:mb-10 flex items-center justify-between border-t border-b-2 border-foreground dark:border-foreground py-2">
            <span className="text-[8px] sm:text-[10px] font-black tracking-[0.3em] sm:tracking-[0.5em] text-primary dark:text-primary uppercase">HEADLINE_CORE_SYSTEM</span>
            <div className="flex gap-2 sm:gap-4 text-[8px] sm:text-[9px] font-black italic opacity-40">
                <span>REC_00:12:44:09</span>
                <span className="hidden sm:inline">CH_01_FEED</span>
            </div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:gap-12 lg:grid-cols-12">
            {/* MAIN HERO - Fragmented Layout */}
            <div className="relative lg:col-span-8">
                <div className="relative flex flex-col lg:flex-row">
                    {/* Image Block */}
                    <div className="relative h-[250px] sm:h-[400px] w-full overflow-hidden border-2 sm:border-4 border-foreground dark:border-foreground lg:h-[500px] xl:h-[600px] lg:w-4/5">
                        <img src={heroNews.thumbnail ? `/storage/${heroNews.thumbnail}` : heroNews.thumbnail_url || '/placeholder.jpg'} alt={heroNews.title} className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-primary/20 dark:bg-primary/20 opacity-60 mix-blend-multiply transition-opacity group-hover:opacity-0"></div>

                        {/* Vertical Overlay Text */}
                        <div className="absolute top-0 right-2 sm:right-4 hidden h-full py-6 sm:py-10 [writing-mode:vertical-rl] lg:block">
                            <span className="text-[8px] sm:text-[9px] font-black tracking-[0.4em] sm:tracking-[0.5em] text-white/40 uppercase">FRONTLINE_REPORTING</span>
                        </div>
                    </div>

                    {/* Meta Bar - Vertically Stacked beside image */}
                    <div className="mt-4 sm:mt-8 flex flex-col justify-end lg:mt-0 lg:w-1/5 lg:pl-4 xl:pl-8">
                        <div className="border-l-2 sm:border-l-4 border-primary dark:border-primary pl-3 sm:pl-4">
                            <span className="block text-[8px] sm:text-[10px] font-black tracking-widest text-primary dark:text-primary uppercase">{heroNews.published_at}</span>
                            <span className="mt-2 block text-[10px] sm:text-xs font-black text-foreground dark:text-foreground uppercase">BY {heroNews.user?.name || 'REDAKSI'}</span>
                        </div>
                    </div>
                </div>

                {/* OVERLAPPING TITLE BOX - Breaking the Grid */}
                <div className="relative z-10 -mt-12 sm:-mt-20 self-start border-2 sm:border-4 border-foreground dark:border-foreground bg-background dark:bg-background p-4 sm:p-8 transition-transform duration-500 hover:translate-x-2 hover:-translate-y-2 md:-mt-24 lg:-mt-32 md:ml-6 lg:ml-12 md:max-w-xl lg:max-w-2xl lg:p-12">
                    <div className="mb-3 sm:mb-4 flex gap-2">
                        <span className="bg-primary dark:bg-primary px-2 sm:px-3 py-0.5 text-[8px] sm:text-[9px] font-black text-background dark:text-background uppercase italic">{heroNews.category?.name}</span>
                        <Maximize2 className="h-3 w-3 sm:h-4 sm:w-4 opacity-20" />
                    </div>
                    <Link href={heroNews.sub_category ? `/${heroNews.category?.slug}/${heroNews.sub_category?.slug}/${heroNews.slug}` : `/${heroNews.category?.slug}/${heroNews.slug}`}>
                        <h1 className="text-2xl sm:text-4xl leading-[0.9] font-black tracking-tighter text-foreground dark:text-foreground uppercase decoration-primary dark:decoration-primary hover:underline md:text-4xl lg:text-6xl">{heroNews.title}</h1>
                    </Link>
                    <div className="mt-6 sm:mt-8 flex h-1 w-12 sm:w-20 bg-primary dark:bg-primary"></div>
                </div>
            </div>

            {/* SIDE FEATURES - High Contrast Minimal Cards */}
            <div className="lg:col-span-4 lg:pt-0">
                <div className="mb-4 sm:mb-6 border-b-2 sm:border-b-4 border-foreground dark:border-foreground pb-2">
                    <span className="text-xs sm:text-sm font-black tracking-tighter uppercase italic text-foreground dark:text-foreground">SUPPLEMENTARY_LOGS</span>
                </div>

                <div className="flex flex-col gap-6 sm:gap-8">
                    {sideHeroNews.slice(0, 3).map((item, index) => (
                        <Link key={item.id} href={item.sub_category ? `/${item.category?.slug}/${item.sub_category?.slug}/${item.slug}` : `/${item.category?.slug}/${item.slug}`} className="group/side relative flex items-start gap-3 sm:gap-4 border-b border-foreground/10 dark:border-foreground/10 p-3 sm:p-4 pb-6 sm:pb-8 transition-all hover:bg-foreground dark:hover:bg-foreground hover:text-background dark:hover:text-background">
                            <span className="text-2xl sm:text-3xl font-black text-primary dark:text-primary italic transition-colors group-hover/side:text-background dark:group-hover/side:text-background">0{index + 1}</span>
                            <div className="flex flex-col">
                                <span className="text-[8px] sm:text-[9px] font-black tracking-widest uppercase opacity-60 group-hover/side:opacity-80">[{item.category?.name}]</span>
                                <h3 className="mt-2 text-sm sm:text-lg leading-tight font-black tracking-tighter uppercase text-foreground dark:text-foreground group-hover/side:text-background dark:group-hover/side:text-background">{item.title}</h3>
                                <div className="mt-3 sm:mt-4 flex items-center justify-between">
                                    <span className="text-[8px] sm:text-[10px] font-bold opacity-40">READ_TIME: 4M</span>
                                    <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 transform transition-transform group-hover/side:translate-x-2" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Visual Archive Plate */}
                <div className="mt-8 sm:mt-12 border-2 border-dashed border-foreground/30 dark:border-foreground/30 px-4 sm:px-6 py-6 sm:py-8 text-center">
                    <div className="text-[30px] sm:text-[40px] leading-none font-black text-foreground/5 dark:text-foreground/10 italic">DATABASE</div>
                    <p className="mt-2 text-[8px] sm:text-[9px] font-black tracking-[0.2em] sm:tracking-[0.3em] uppercase opacity-40">Click to enter storage_v2</p>
                </div>
            </div>
        </div>

        {/* Floating Page Label */}
        <div className="pointer-events-none absolute top-1/2 -right-8 sm:-right-16 -rotate-90 text-[60px] sm:text-[100px] font-black text-foreground/[0.02] dark:text-foreground/[0.04] uppercase select-none">FRONT_HUB</div>
    </section>
);

export default HeroSection;
