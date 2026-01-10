import { Link } from '@inertiajs/react';
import React from 'react';
import ListCard from './list-card';
import SectionHeader from './section-header';
import { NewsItem } from './types';

interface Props {
    news: NewsItem[];
}

const CommunitySection: React.FC<Props> = ({ news }) => (
    <div className="my-16">
        <SectionHeader title="Pengabdian Masyarakat" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {news.slice(0, 6).map((item) => (
                <ListCard key={item.id} item={item} />
            ))}
        </div>

        {/* Action Button */}
        <div className="mt-12 flex items-center justify-center">
            <Link href="/kategori/pengabdian-masyarakat" className="group relative flex h-14 w-full max-w-xs items-center justify-center overflow-hidden border-2 border-primary bg-transparent text-sm font-black tracking-widest uppercase transition-all hover:text-white md:w-64">
                <div className="absolute inset-0 z-0 h-full w-0 bg-primary transition-all duration-300 group-hover:w-full"></div>
                <span className="relative z-10">Lihat Arsip Lengkap</span>
            </Link>
        </div>
    </div>
);

export default CommunitySection;
