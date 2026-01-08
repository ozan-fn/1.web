import React from 'react';
import SectionHeader from './section-header';
import { NewsItem } from './types';

interface Props {
    news: NewsItem[];
}

const CommunitySection: React.FC<Props> = ({ news }) => (
    <div>
        <SectionHeader title="Pengabdian Masyarakat" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {news.map((item) => (
                <div
                    key={item.id}
                    className="group cursor-pointer border-r border-gray-100 pr-6 transition-colors last:border-0 last:pr-0 hover:bg-gray-50/50"
                >
                    <div className="relative mb-4 aspect-video overflow-hidden rounded-sm bg-gray-100">
                        <img
                            src={item.thumbnail_url || ''}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            alt={item.title}
                        />
                        <span className="absolute top-3 left-3 bg-red-600 px-2 py-1 text-[10px] font-black tracking-widest text-white uppercase sm:text-[11px]">
                            {item.category.name}
                        </span>
                    </div>
                    <h3 className="line-clamp-2 text-lg leading-tight font-black text-gray-900 transition-colors group-hover:text-red-700">
                        {item.title}
                    </h3>
                    <div className="mt-3 flex items-center gap-2 text-[11px] font-medium tracking-tight text-gray-400 uppercase">
                        <span>News Portal</span>
                        <span className="h-1 w-1 rounded-full bg-gray-200"></span>
                        <span>{item.timestamp}</span>
                    </div>
                </div>
            ))}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex items-center justify-center gap-2">
            <button className="flex h-10 w-10 items-center justify-center rounded-sm bg-red-600 text-[13px] font-black text-white transition-colors hover:bg-black">
                1
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-sm border border-gray-200 bg-white text-[13px] font-black text-gray-800 transition-colors hover:border-red-600 hover:text-red-600">
                2
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-sm border border-gray-200 bg-white text-[13px] font-black text-gray-800 transition-colors hover:border-red-600 hover:text-red-600">
                3
            </button>
            <span className="text-gray-400">...</span>
        </div>
    </div>
);

export default CommunitySection;
