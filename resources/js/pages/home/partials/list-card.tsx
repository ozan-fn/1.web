import { Link } from '@inertiajs/react';
import React from 'react';
import { NewsItem } from './types';

interface Props {
    item: NewsItem;
}

const ListCard: React.FC<Props> = ({ item }) => (
    <Link
        href={
            item.sub_category
                ? `/${item.category?.slug}/${item.sub_category?.slug}/${item.slug}`
                : `/${item.category?.slug}/${item.slug}`
        }
        className="group mb-6 flex cursor-pointer items-start gap-4 border-b border-gray-100 pb-6 last:border-0 last:pb-0"
    >
        <div className="relative aspect-[16/9] w-1/3 shrink-0 overflow-hidden rounded-sm bg-gray-100">
            {item.thumbnail ? (
                <img
                    src={`/storage/${item.thumbnail}`}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
            ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-200 text-xs font-bold text-gray-400 uppercase">
                    No Image
                </div>
            )}
        </div>
        <div className="flex w-2/3 flex-col gap-1.5">
            <span className="text-[11px] font-black tracking-wider text-red-600 uppercase">
                {item.category?.name || 'Berita'}
            </span>
            <h3 className="line-clamp-2 text-[15px] leading-tight font-extrabold text-gray-900 transition-colors group-hover:text-red-700 md:text-lg">
                {item.title}
            </h3>
            <span className="text-[11px] font-medium tracking-tight text-gray-400 uppercase">
                {new Date(item.published_at).toLocaleDateString('id-ID')}
            </span>
        </div>
    </Link>
);

export default ListCard;
