import { Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import React from 'react';
import { NewsItem } from './types';

interface Props {
    heroNews: NewsItem;
    sideHeroNews: NewsItem[];
}

const HeroSection: React.FC<Props> = ({ heroNews, sideHeroNews }) => (
    <section className="relative mb-32">
        <div className="grid grid-cols-1 gap-0 lg:grid-cols-12">
            {/* Main Feature - Magazine Layout */}
            <div className="group relative flex flex-col border-4 border-foreground lg:col-span-8">
                <div className="flex bg-foreground px-6 py-4">
                    <span className="text-xl font-black tracking-tighter text-background uppercase italic">Feature Editorial / {heroNews.category?.name}</span>
                </div>

                <div className="flex flex-col lg:flex-row">
                    <div className="relative order-1 h-[400px] w-full overflow-hidden lg:order-2 lg:h-[600px] lg:w-3/5">
                        <img src={heroNews.thumbnail ? `/storage/${heroNews.thumbnail}` : heroNews.thumbnail_url || '/placeholder.jpg'} alt={heroNews.title} className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0" />
                        <div className="absolute inset-0 bg-primary/10 mix-blend-multiply transition-opacity group-hover:opacity-0"></div>
                    </div>

                    <div className="order-2 flex flex-1 flex-col justify-between p-8 lg:order-1">
                        <div>
                            <span className="text-xs font-black tracking-[0.3em] text-primary uppercase">{heroNews.published_at}</span>
                            <Link href={heroNews.sub_category ? `/${heroNews.category?.slug}/${heroNews.sub_category?.slug}/${heroNews.slug}` : `/${heroNews.category?.slug}/${heroNews.slug}`}>
                                <h1 className="mt-6 text-4xl leading-[0.9] font-black tracking-tighter text-foreground uppercase md:text-6xl">{heroNews.title}</h1>
                            </Link>
                            <div className="prose prose-sm mt-8 line-clamp-4 text-sm leading-relaxed font-medium text-foreground/70" dangerouslySetInnerHTML={{ __html: heroNews.content.substring(0, 300) + '...' }} />
                        </div>

                        <div className="mt-8 flex items-center justify-between border-t border-foreground/10 pt-8">
                            <span className="text-[10px] font-black tracking-widest text-foreground uppercase">Author: {heroNews.user?.name || 'Redaksi'}</span>
                            <Link href={heroNews.sub_category ? `/${heroNews.category?.slug}/${heroNews.sub_category?.slug}/${heroNews.slug}` : `/${heroNews.category?.slug}/${heroNews.slug}`} className="group/btn flex items-center gap-3 bg-foreground px-4 py-2 text-[10px] font-semibold text-background transition-all hover:bg-primary">
                                BACA SELENGKAPNYA
                                <ChevronRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sub Features - High Contrast Stack */}
            <div className="lg:col-span-4 lg:pt-0 lg:pl-12">
                <div className="mb-4 flex items-center justify-between border-b-2 border-foreground pb-2">
                    <span className="text-xs font-black tracking-[0.2em] text-foreground uppercase">Edisi Terkini</span>
                    <span className="block h-2 w-2 animate-pulse bg-primary"></span>
                </div>

                <div className="flex flex-col gap-10">
                    {sideHeroNews.slice(0, 3).map((item, index) => (
                        <div key={item.id} className="group flex flex-col gap-4">
                            <div className="flex items-start gap-4">
                                <span className="text-4xl font-black text-foreground/10 italic tabular-nums transition-colors group-hover:text-primary">0{index + 1}</span>
                                <div className="flex-1">
                                    <Link key={`cat-${item.id}`} href={`/${item.category?.slug}`} className="text-[10px] font-black tracking-widest text-primary uppercase hover:underline">
                                        {item.category?.name}
                                    </Link>
                                    <Link href={item.sub_category ? `/${item.category?.slug}/${item.sub_category?.slug}/${item.slug}` : `/${item.category?.slug}/${item.slug}`}>
                                        <h3 className="mt-1 text-lg leading-tight font-black tracking-tight text-foreground uppercase group-hover:underline">{item.title}</h3>
                                    </Link>
                                </div>
                            </div>
                            <div className="relative h-[120px] overflow-hidden border border-foreground/10 grayscale transition-all duration-500 group-hover:grayscale-0">
                                <img src={item.thumbnail ? `/storage/${item.thumbnail}` : item.thumbnail_url || '/placeholder.jpg'} className="h-full w-full object-cover" />
                                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background to-transparent opacity-50"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Dynamic Background Element */}
        <div className="pointer-events-none absolute top-40 -left-20 -z-10 -rotate-90 text-[300px] leading-none font-black text-foreground/[0.03] uppercase select-none">FRONT</div>
    </section>
);

export default HeroSection;
