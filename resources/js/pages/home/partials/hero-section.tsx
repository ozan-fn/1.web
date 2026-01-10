import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import React from 'react';
import OverlayCard from './overlay-card';
import { NewsItem } from './types';

interface Props {
    heroNews: NewsItem;
    sideHeroNews: NewsItem[];
}

const HeroSection: React.FC<Props> = ({ heroNews, sideHeroNews }) => (
    <section className="mb-24 flex flex-col gap-10">
        <div className="grid grid-cols-1 border-y border-foreground/10 lg:grid-cols-12">
            {/* Main Feature (Kiri) */}
            <div className="border-foreground/10 lg:col-span-9 lg:border-r">
                <OverlayCard item={heroNews} height="aspect-[16/9] lg:h-[650px] w-full" />
            </div>

            {/* Sub Features (Kanan) */}
            <div className="flex flex-col lg:col-span-3">
                {sideHeroNews.map((item, idx) => (
                    <div key={item.id} className={cn('flex-1 border-b border-foreground/10 p-10 transition-colors hover:bg-muted', idx === sideHeroNews.length - 1 && 'border-b-0')}>
                        <Link href={`/${item.category?.slug}/${item.slug}`} className="group flex flex-col gap-4">
                            <span className="font-mono text-[9px] font-bold tracking-[0.4em] text-primary uppercase">{item.category?.name || 'FEATURED'}</span>
                            <h3 className="line-clamp-3 text-lg leading-tight font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">{item.title}</h3>
                            <div className="mt-2 h-[2px] w-8 bg-foreground/10 transition-all group-hover:w-full group-hover:bg-primary" />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default HeroSection;
