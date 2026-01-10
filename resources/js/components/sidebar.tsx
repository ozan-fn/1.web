import { Link } from '@inertiajs/react';
import React from 'react';
import { NewsItem } from '../pages/home/partials/types';

interface SidebarProps {
    // Gunakan opsional (?) agar tidak crash jika data belum ada
    trendingNews?: NewsItem[];
    latestNews?: NewsItem[];
}

const Sidebar: React.FC<SidebarProps> = ({
    trendingNews = [], // Berikan default value array kosong
    latestNews = [],
}) => {
    return (
        <aside className="space-y-10 lg:col-span-4 lg:pl-4">
            {/* Widget: Terpopuler (Numbered) */}
            <div className="bg-background">
                <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-2">
                    <h3 className="text-lg font-bold text-[#0455A4] uppercase">Terpopuler</h3>
                </div>
                <div className="flex flex-col">
                    {trendingNews?.map((item, i) => (
                        <Link key={item.id} href={item.sub_category ? `/${item.category?.slug}/${item.sub_category?.slug}/${item.slug}` : `/${item.category?.slug}/${item.slug}`} className="group flex cursor-pointer items-start gap-4 border-b border-border py-4 transition last:border-0 hover:bg-muted/30">
                            <div className="text-2xl font-bold text-gray-300 transition-colors group-hover:text-[#0455A4]">{i + 1}</div>
                            <div className="flex flex-col gap-1">
                                <h4 className="text-sm leading-snug font-bold text-gray-900 transition-colors group-hover:text-[#0455A4] dark:text-gray-100">{item.title}</h4>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Widget: Terbaru (Simple List) */}
            <div>
                <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-2">
                    <h3 className="text-lg font-bold text-[#0455A4] uppercase">Terbaru</h3>
                </div>
                <div className="flex flex-col gap-4">
                    {latestNews?.map((item) => (
                        <Link key={item.id} href={item.sub_category ? `/${item.category?.slug}/${item.sub_category?.slug}/${item.slug}` : `/${item.category?.slug}/${item.slug}`} className="group flex flex-col gap-1 border-b border-border pb-4 last:border-0">
                            <span className="text-[10px] font-bold text-[#0455A4] uppercase">{item.category?.name}</span>
                            <h4 className="line-clamp-2 text-sm leading-snug font-bold text-gray-900 transition-colors group-hover:text-[#0455A4] dark:text-gray-100">{item.title}</h4>
                            <span className="text-[10px] text-gray-500 uppercase">
                                {new Date(item.published_at).toLocaleDateString('id-ID', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric',
                                })}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
