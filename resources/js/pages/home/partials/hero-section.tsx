import { Link } from '@inertiajs/react';
import React from 'react';
import OverlayCard from './overlay-card';
import { NewsItem } from './types';

interface Props {
    heroNews: NewsItem;
    sideHeroNews: NewsItem[];
}

const HeroSection: React.FC<Props> = ({ heroNews, sideHeroNews }) => (
    <section className="mb-16">
        <div className="flex flex-col gap-8">
            {/* Top Main Headline: 1 Big Card */}
            <div className="w-full">
                <OverlayCard item={heroNews} height="h-[350px] md:h-[500px]" />
            </div>

            {/* Below Headlines: Grid 3 Cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {sideHeroNews.slice(0, 3).map((item) => (
                    <Link key={item.id} href={item.sub_category ? `/${item.category?.slug}/${item.sub_category?.slug}/${item.slug}` : `/${item.category?.slug}/${item.slug}`} className="group flex flex-col gap-3 overflow-hidden rounded-lg bg-gray-50 p-2 transition-all hover:bg-white hover:shadow-md dark:bg-gray-900/50 dark:hover:bg-gray-900">
                        <div className="aspect-video w-full overflow-hidden rounded-lg">{item.thumbnail_url ? <img src={item.thumbnail_url} alt={item.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" /> : <div className="flex h-full w-full items-center justify-center bg-gray-200 text-xs font-bold text-gray-400 uppercase">No Image</div>}</div>
                        <div className="px-2 pb-2">
                            <span className="text-[11px] font-bold text-[#0455A4] uppercase">{item.category?.name}</span>
                            <h4 className="mt-1 line-clamp-2 text-sm leading-tight font-bold text-gray-900 transition-colors group-hover:text-[#0455A4] dark:text-gray-100">{item.title}</h4>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    </section>
);

export default HeroSection;
