import { Link } from '@inertiajs/react';
import React from 'react';
import { NewsItem } from './types';

interface Props {
    item: NewsItem;
}

const ListCard: React.FC<Props> = ({ item }) => (
    <Link href={item.sub_category ? `/${item.category?.slug}/${item.sub_category?.slug}/${item.slug}` : `/${item.category?.slug}/${item.slug}`} className="group mb-6 flex cursor-pointer items-start gap-4 border-b border-gray-100 pb-6 transition-colors last:border-0 last:pb-0 dark:border-gray-800">
        <div className="relative aspect-[16/9] w-1/3 shrink-0 overflow-hidden rounded-sm bg-gray-100 dark:bg-gray-900">
            {item.thumbnail_url ? <img src={item.thumbnail_url} alt={item.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" /> : <div className="flex h-full w-full items-center justify-center bg-gray-200 text-xs font-bold text-gray-400 uppercase dark:bg-gray-800">No Image</div>}
        </div>
        <div className="flex w-2/3 flex-col gap-1.5">
            <span className="text-[11px] font-black tracking-wider text-primary uppercase">
                {item.category?.name || 'Berita'}
                {item.sub_category && <span className="ml-1 font-medium text-gray-400 dark:text-gray-500"> | {item.sub_category.name}</span>}
            </span>
            <h3 className="line-clamp-2 text-[15px] leading-tight font-extrabold text-gray-900 transition-colors group-hover:text-primary md:text-lg dark:text-gray-100 dark:group-hover:text-primary">{item.title}</h3>
            <span className="text-[11px] font-medium tracking-tight text-gray-400 uppercase dark:text-gray-500">{new Date(item.published_at).toLocaleDateString('id-ID')}</span>
        </div>
    </Link>
);

export default ListCard;
