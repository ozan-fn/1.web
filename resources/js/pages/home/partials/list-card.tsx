import React from 'react';
import { NewsItem } from './types';

interface Props {
    item: NewsItem;
}

const ListCard: React.FC<Props> = ({ item }) => (
    <div className="group mb-4 flex cursor-pointer items-start gap-4 rounded-lg border border-transparent bg-white p-2 transition-all hover:border-gray-100 hover:shadow-sm">
        <div className="relative aspect-[4/3] w-1/3 shrink-0 overflow-hidden rounded-md">
            <img
                src={item.imageUrl}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
        </div>
        <div className="flex h-full w-2/3 flex-col justify-between">
            <div>
                <span className="mb-1 block text-[10px] font-bold tracking-widest text-[#3357a7] uppercase">
                    {item.category}
                </span>
                <h3 className="line-clamp-3 font-['Roboto'] text-sm leading-snug font-semibold text-gray-800 transition-colors group-hover:text-[#3357a7]">
                    {item.title}
                </h3>
            </div>
            {item.timestamp && (
                <span className="mt-2 flex items-center text-[10px] text-gray-400">
                    <span className="mr-1 h-1.5 w-1.5 rounded-full bg-gray-300"></span>
                    {item.timestamp}
                </span>
            )}
        </div>
    </div>
);

export default ListCard;
