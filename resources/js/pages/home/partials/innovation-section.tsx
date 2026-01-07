import React from 'react';
import ListCard from './list-card';
import OverlayCard from './overlay-card';
import SectionHeader from './section-header';
import { NewsItem } from './types';

interface Props {
    news: NewsItem[];
}

const InnovationSection: React.FC<Props> = ({ news }) => {
    if (news.length === 0) return null;

    const featured = news[0];
    const others = news.slice(1, 4);

    return (
        <div>
            <SectionHeader title="Prestasi & Inovasi" />
            <div className="flex flex-col gap-6 md:flex-row">
                <div className="h-80 md:h-auto md:w-2/3">
                    <OverlayCard item={featured} height="h-full" />
                </div>
                <div className="flex flex-col gap-2 md:w-1/3">
                    {others.map((item) => (
                        <ListCard key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InnovationSection;
