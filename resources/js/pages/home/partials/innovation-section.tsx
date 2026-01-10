import { Link } from '@inertiajs/react';
import React from 'react';
import OverlayCard from './overlay-card';
import SectionHeader from './section-header';
import { NewsItem } from './types';

interface Props {
    news: NewsItem[];
}

const InnovationSection: React.FC<Props> = ({ news }) => {
    if (news.length === 0) return null;

    const featured = news[0];
    const others = news.slice(1, 5);

    return (
        <div className="my-20">
            <SectionHeader title="Prestasi & Inovasi" />
            <div className="flex flex-col gap-10 lg:flex-row">
                <div className="h-[400px] lg:h-auto lg:w-3/5">
                    <OverlayCard item={featured} height="h-full" />
                </div>
                <div className="grid grid-cols-1 gap-6 lg:w-2/5">
                    {others.map((item) => (
                        <div key={item.id} className="border-l-4 border-primary bg-card p-4 transition-all hover:translate-x-2">
                            <Link href={item.sub_category ? `/${item.category?.slug}/${item.sub_category?.slug}/${item.slug}` : `/${item.category?.slug}/${item.slug}`} className="group">
                                <span className="mb-2 block text-[10px] font-black tracking-[0.2em] text-primary uppercase">{item.category.name}</span>
                                <h4 className="line-clamp-2 text-lg leading-tight font-black transition-colors group-hover:text-primary">{item.title}</h4>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InnovationSection;
