import { Link } from '@inertiajs/react';
import React from 'react';
import { NewsItem } from './types';

interface Props {
    item: NewsItem;
    height?: string;
}

const OverlayCard: React.FC<Props> = ({ item, height = 'h-64' }) => (
    <Link href={item.sub_category ? `/${item.category?.slug}/${item.sub_category?.slug}/${item.slug}` : `/${item.category?.slug}/${item.slug}`} className={`group relative block overflow-hidden rounded-lg ${height} w-full`}>
        {item.thumbnail_url ? <img src={item.thumbnail_url} alt={item.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" /> : <div className="flex h-full w-full items-center justify-center bg-gray-200 text-xl font-bold text-gray-400 uppercase">No Image</div>}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-4 md:p-6">
            <span className="mb-2 inline-block text-[12px] font-bold text-white uppercase">{item.category?.name || 'Berita'}</span>
            <h3 className="cursor-pointer text-lg leading-tight font-bold text-white transition-colors group-hover:text-gray-200 sm:text-xl md:text-2xl">{item.title}</h3>
        </div>
    </Link>
);

export default OverlayCard;
