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
                    className="group cursor-pointer rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                >
                    <div className="relative mb-4 h-48 overflow-hidden rounded-lg">
                        <img
                            src={item.imageUrl}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            alt={item.title}
                        />
                        <span className="absolute top-2 left-2 rounded bg-[#3357a7] px-2 py-1 text-[10px] font-bold text-white shadow">
                            {item.category}
                        </span>
                    </div>
                    <h3 className="mb-2 text-lg leading-snug font-bold text-gray-800 transition-colors group-hover:text-[#3357a7]">
                        {item.title}
                    </h3>
                    <div className="flex items-center text-xs text-gray-400">
                        <span>📅 {item.timestamp}</span>
                    </div>
                </div>
            ))}
        </div>

        {/* Pagination */}
        <div className="mt-10 flex items-center justify-center gap-2">
            <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2196f3] text-sm font-bold text-white shadow-lg shadow-blue-200">
                1
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-sm font-bold text-gray-600 transition hover:bg-gray-50">
                2
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-sm font-bold text-gray-600 transition hover:bg-gray-50">
                3
            </button>
            <span className="text-gray-400">...</span>
        </div>
    </div>
);

export default CommunitySection;
