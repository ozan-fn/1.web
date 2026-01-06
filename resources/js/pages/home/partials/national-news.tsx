import React from 'react';
import ListCard from './list-card';
import SectionHeader from './section-header';
import { NewsItem } from './types';

interface Props {
    news: NewsItem[];
}

const NationalNews: React.FC<Props> = ({ news }) => (
    <div>
        <SectionHeader title="Kabar Kampus & Nasional" />
        <div className="grid grid-cols-1 gap-x-6 gap-y-2 md:grid-cols-2">
            {news.map((item) => (
                <ListCard key={item.id} item={item} />
            ))}
        </div>
    </div>
);

export default NationalNews;
