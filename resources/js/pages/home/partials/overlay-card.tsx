import React from 'react';
import { NewsItem } from './types';

interface Props {
    item: NewsItem;
    height?: string;
}

const OverlayCard: React.FC<Props> = ({ item, height = 'h-64' }) => (
    <div
        className={`group relative overflow-hidden rounded-lg ${height} w-full shadow-md`}
    >
        <img
            src={item.imageUrl}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-4 md:p-6">
            <span className="mb-2 inline-block rounded bg-[#3357a7] px-2 py-1 text-[10px] font-bold tracking-widest text-white uppercase">
                {item.category}
            </span>
            <h3 className="cursor-pointer font-['Roboto'] text-lg leading-snug font-bold text-white hover:underline md:text-xl">
                {item.title}
            </h3>
        </div>
    </div>
);

export default OverlayCard;
