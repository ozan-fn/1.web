import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import React from 'react';
import ListCard from './list-card';
import { Category } from './types';

interface Props {
    category: Category;
}

const CategorySection: React.FC<Props> = ({ category }) => {
    // JOS: Cek apakah ada berita, jika tidak ada jangan render apapun
    if (!category.news || category.news.length === 0) {
        return (
            <div className="flex items-center justify-center border-2 border-dashed border-foreground/5 py-20">
                <span className="font-mono text-[10px] font-bold tracking-[0.5em] text-muted-foreground uppercase opacity-40">No records found for this section</span>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-24 lg:grid-cols-3">
            {category.news.slice(0, 6).map((item, idx) => (
                <div key={item.id} className={cn('transition-all duration-300', idx === 0 && 'mb-12 border-b border-foreground/10 pb-24 lg:col-span-3')}>
                    {idx === 0 ? (
                        <div className="group relative flex flex-col gap-16 lg:flex-row">
                            <div className="flex-1 overflow-hidden border border-foreground/10 grayscale transition-all duration-1000 hover:grayscale-0">
                                <img src={item.thumbnail_url || ''} className="aspect-video w-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                            </div>
                            <div className="flex flex-1 flex-col justify-center">
                                <nav className="mb-8 flex items-center gap-6 font-mono text-[10px] font-bold tracking-[0.4em] text-primary uppercase">
                                    <span>ARCHIVE_FEATURE</span>
                                    <span className="opacity-10">/</span>
                                    <span className="text-muted-foreground/50">ENTRY_01</span>
                                </nav>
                                <Link href={`/${item.category?.slug}/${item.slug}`}>
                                    <h3 className="line-clamp-3 text-5xl leading-[0.85] font-bold tracking-tighter text-foreground uppercase transition-colors group-hover:text-primary md:text-7xl lg:text-9xl">{item.title}</h3>
                                </Link>
                                <div className="group/item mt-12 flex items-center gap-10">
                                    <div className="h-[2px] w-12 bg-primary transition-all group-hover/item:w-32" />
                                    <span className="font-mono text-[10px] font-bold tracking-[0.4em] uppercase">INIT_READ_PROCEDURE [→]</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <ListCard item={item} />
                    )}
                </div>
            ))}
        </div>
    );
};

export default CategorySection;
