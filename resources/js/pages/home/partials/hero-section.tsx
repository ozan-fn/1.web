import React from 'react';
import OverlayCard from './overlay-card';
import SectionHeader from './section-header';
import { NewsItem } from './types';

interface Props {
    heroNews: NewsItem;
    sideHeroNews: NewsItem[];
}

const HeroSection: React.FC<Props> = ({ heroNews, sideHeroNews }) => (
    <section className="mb-12">
        <SectionHeader title="FOKUS UTAMA" />
        <div className="grid h-auto grid-cols-1 gap-6 lg:h-[500px] lg:grid-cols-12">
            {/* Main Feature (Kiri) */}
            <div className="h-[400px] lg:col-span-8 lg:h-full">
                <OverlayCard item={heroNews} height="h-full" />
            </div>

            {/* Sub Features (Kanan) */}
            <div className="flex h-full flex-col gap-6 lg:col-span-4">
                {sideHeroNews.map((item) => (
                    <OverlayCard key={item.id} item={item} height="h-full" />
                ))}
            </div>
        </div>
    </section>
);

export default HeroSection;
