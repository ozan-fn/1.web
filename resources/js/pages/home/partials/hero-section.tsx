import React from 'react';
import OverlayCard from './overlay-card';
import SectionHeader from './section-header';
import { NewsItem } from './types';

interface Props {
    heroNews: NewsItem;
    sideHeroNews: NewsItem[];
}

const HeroSection: React.FC<Props> = ({ heroNews, sideHeroNews }) => (
    <section className="mb-20">
        <SectionHeader title="DIBERITAKAN" />
        <div className="grid grid-cols-1 gap-6 lg:h-[650px] lg:grid-cols-12 lg:grid-rows-2">
            {/* Main Feature - Spans 8 columns and 2 rows */}
            <div className="h-[450px] lg:col-span-8 lg:row-span-2 lg:h-full">
                <OverlayCard item={heroNews} height="h-full" />
            </div>

            {/* Sub Features - Stacked on the right */}
            {sideHeroNews.slice(0, 2).map((item, index) => (
                <div key={item.id} className="h-[250px] lg:col-span-4 lg:row-span-1 lg:h-full">
                    <OverlayCard item={item} height="h-full" />
                </div>
            ))}
        </div>
    </section>
);

export default HeroSection;
