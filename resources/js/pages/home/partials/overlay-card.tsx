import { Link } from '@inertiajs/react';
import React from 'react';
import { NewsItem } from './types';

interface Props {
    item: NewsItem;
    height?: string;
}

const OverlayCard: React.FC<Props> = ({ item, height = 'h-64' }) => (
    <Link
        href={
            item.sub_category
                ? `/${item.category?.slug}/${item.sub_category?.slug}/${item.slug}`
                : `/${item.category?.slug}/${item.slug}`
        }
        className={`group relative block overflow-hidden rounded-sm ${height} w-full shadow-sm`}
    >
        {item.thumbnail_url ? (
            <img
                src={item.thumbnail_url}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
        ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-200 text-xl font-bold text-gray-400 uppercase">
                No Image
            </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-5 md:p-8">
            <span className="mb-3 inline-block bg-red-600 px-2 py-1 text-[10px] font-black tracking-widest text-white uppercase sm:text-[11px]">
                {item.category?.name || 'Berita'}
            </span>
            <h3 className="cursor-pointer text-xl leading-tight font-black text-white transition-colors group-hover:text-red-100 sm:text-2xl md:text-3xl">
                {item.title}
            </h3>
        </div>
    </Link>
);

export default OverlayCard;
