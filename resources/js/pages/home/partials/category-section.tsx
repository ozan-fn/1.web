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
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-border py-12 text-center">
                <p className="text-sm font-bold tracking-[0.2em] text-muted-foreground uppercase">Belum ada berita terbaru di kanal ini.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
            {category.news.map((item) => (
                <ListCard key={item.id} item={item} />
            ))}
        </div>
    );
};

export default CategorySection;
