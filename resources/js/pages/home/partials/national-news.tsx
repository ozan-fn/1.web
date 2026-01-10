import React from 'react';
import ListCard from './list-card';
import SectionHeader from './section-header';
import { NewsItem } from './types';

interface Props {
    news: NewsItem[];
}

const NationalNews: React.FC<Props> = ({ news }) => (
    <div className="my-16">
        <SectionHeader title="Warta Nasional" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {news.map((item) => (
                <ListCard key={item.id} item={item} />
            ))}
        </div>
    </div>
);

export default NationalNews;
