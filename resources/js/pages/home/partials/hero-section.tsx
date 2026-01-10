import { Link } from '@inertiajs/react';
import React from 'react';
import { NewsItem } from './types';

interface Props {
    heroNews: NewsItem;
    sideHeroNews: NewsItem[];
}

const HeroSection: React.FC<Props> = ({ heroNews, sideHeroNews }) => (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Main Headline */}
        <div className="lg:col-span-8">
            <Link href={heroNews.sub_category ? `/${heroNews.category?.slug}/${heroNews.sub_category?.slug}/${heroNews.slug}` : `/${heroNews.category?.slug}/${heroNews.slug}`} className="group block overflow-hidden">
                <div className="relative aspect-video w-full overflow-hidden rounded-md">
                    <img src={heroNews.thumbnail ? `/storage/${heroNews.thumbnail}` : heroNews.thumbnail_url} alt={heroNews.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-0 p-6 text-white">
                        <span className="mb-2 inline-block bg-blue-600 px-3 py-1 text-xs font-bold uppercase">{heroNews.category?.name}</span>
                        <h2 className="text-2xl leading-tight font-black lg:text-4xl">{heroNews.title}</h2>
                    </div>
                </div>
            </Link>
        </div>

        {/* Side Headline List */}
        <div className="flex flex-col gap-4 lg:col-span-4">
            <div className="mb-2 flex items-center gap-2 border-b-2 border-blue-600 pb-1">
                <span className="text-sm font-black tracking-tighter text-blue-700 uppercase">Terpopuler</span>
            </div>
            {sideHeroNews.slice(0, 4).map((item, index) => (
                <Link key={item.id} href={item.sub_category ? `/${item.category?.slug}/${item.sub_category?.slug}/${item.slug}` : `/${item.category?.slug}/${item.slug}`} className="group flex gap-4 border-b border-border pb-4 last:border-0">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xl font-black text-blue-700">{index + 1}</span>
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-blue-700 uppercase">{item.category?.name}</span>
                        <h3 className="line-clamp-2 text-sm leading-snug font-bold group-hover:text-blue-700">{item.title}</h3>
                    </div>
                </Link>
            ))}
        </div>
    </div>
);

export default HeroSection;
