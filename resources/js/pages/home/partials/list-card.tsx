import { Link } from '@inertiajs/react';
import React from 'react';
import { NewsItem } from './types';

interface Props {
    item: NewsItem;
}

const ListCard: React.FC<Props> = ({ item }) => (
    <Link href={item.sub_category ? `/${item.category?.slug}/${item.sub_category?.slug}/${item.slug}` : `/${item.category?.slug}/${item.slug}`} className="group mb-6 flex cursor-pointer items-start gap-4 border-b border-gray-100 pb-6 transition-colors last:border-0 last:pb-0 dark:border-gray-800">
        <div className="relative aspect-[16/9] w-[140px] shrink-0 overflow-hidden rounded-lg bg-gray-100 md:w-[200px] dark:bg-gray-900">
            {item.thumbnail_url ? <img src={item.thumbnail_url} alt={item.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /> : <div className="flex h-full w-full items-center justify-center bg-gray-200 text-xs font-bold text-gray-400 uppercase dark:bg-gray-800">No Image</div>}
        </div>
        <div className="flex flex-grow flex-col gap-1.5">
            <span className="text-[11px] font-bold text-[#0455A4] uppercase">{item.category?.name || 'Berita'}</span>
            <h3 className="line-clamp-2 text-base leading-tight font-bold text-gray-900 transition-colors group-hover:text-[#0455A4] md:text-lg dark:text-gray-100">{item.title}</h3>
            <span className="text-[11px] text-gray-500 dark:text-gray-400">
                {new Date(item.published_at).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                })}
            </span>
        </div>
    </Link>
);

export default ListCard;
