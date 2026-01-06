import React from 'react';
import ListCard from './list-card';
import OverlayCard from './overlay-card';
import SectionHeader from './section-header';
import { NewsItem } from './types';

interface Props {
    news: NewsItem[];
}

const InnovationSection: React.FC<Props> = ({ news }) => (
    <div>
        <SectionHeader title="Prestasi & Inovasi" />
        <div className="flex flex-col gap-6 md:flex-row">
            <div className="h-80 md:h-auto md:w-2/3">
                <OverlayCard
                    item={{
                        id: 99,
                        category: 'Teknologi',
                        title: 'Mahasiswa Teknik Ciptakan Robot Pemilah Sampah Otomatis',
                        imageUrl: 'https://placehold.co/600x400',
                    }}
                    height="h-full"
                />
            </div>
            <div className="flex flex-col gap-2 md:w-1/3">
                {news.slice(0, 3).map((item) => (
                    <ListCard
                        key={item.id}
                        item={{
                            ...item,
                            category: 'Sains',
                        }}
                    />
                ))}
            </div>
        </div>
    </div>
);

export default InnovationSection;
