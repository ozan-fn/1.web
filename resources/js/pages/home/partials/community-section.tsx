import React from 'react';
import SectionHeader from './section-header';
import { NewsItem } from './types';

interface Props {
    news: NewsItem[];
}

const CommunitySection: React.FC<Props> = ({ news }) => (
    <div>
        <SectionHeader title="Pengabdian" />
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {news.map((item) => (
                <div key={item.id} className="group cursor-pointer transition-colors">
                    <div className="relative mb-4 aspect-video overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-100 dark:border-gray-800">
                        <img src={item.thumbnail_url || ''} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" alt={item.title} />
                        <span className="absolute top-3 left-3 bg-[#0455A4] px-2 py-0.5 text-[10px] font-bold text-white uppercase">{item.category.name}</span>
                    </div>
                    <h3 className="line-clamp-2 text-lg font-bold text-gray-900 transition-colors group-hover:text-[#0455A4] dark:text-gray-100 leading-tight">{item.title}</h3>
                    <div className="mt-2 flex items-center gap-2 text-[11px] text-gray-500 uppercase">
                        <span>Redaksi</span>
                        <span className="h-1 w-1 rounded-full bg-gray-300"></span>
                        <span>{new Date(item.published_at).toLocaleDateString('id-ID')}</span>
                    </div>
                </div>
            ))}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex items-center justify-center gap-2">
            <button className="flex h-10 w-10 items-center justify-center rounded bg-[#0455A4] text-[13px] font-bold text-white transition-colors">1</button>
            <button className="flex h-10 w-10 items-center justify-center rounded border border-gray-200 bg-white text-[13px] font-bold text-gray-800 transition-colors hover:border-[#0455A4] hover:text-[#0455A4]">2</button>
            <button className="flex h-10 w-10 items-center justify-center rounded border border-gray-200 bg-white text-[13px] font-bold text-gray-800 transition-colors hover:border-[#0455A4] hover:text-[#0455A4]">3</button>
            <span className="text-gray-400">...</span>
        </div>
    </div>
);

export default CommunitySection;
