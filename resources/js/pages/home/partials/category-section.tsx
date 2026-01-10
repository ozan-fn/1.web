import React from 'react';
import ListCard from './list-card';
import { Category } from './types';

interface Props {
    category: Category;
}

const CategorySection: React.FC<Props> = ({ category }) => {
    // JOS: Cek apakah ada berita, jika tidak ada jangan render apapun
    if (!category.news || category.news.length === 0) {
        return <div className="py-4 text-sm text-muted-foreground italic">Belum ada berita terbaru di kategori ini.</div>;
    }

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {category.news.map((item) => (
                <ListCard key={item.id} item={item} />
            ))}
        </div>
    );
};

export default CategorySection;
