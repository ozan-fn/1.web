import React from 'react';
import ListCard from './list-card';
import SectionHeader from './section-header';
import { Category } from './types';

interface Props {
    category: Category;
}

const CategorySection: React.FC<Props> = ({ category }) => {
    if (!category.news || category.news.length === 0) return null;

    return (
        <div className="mb-10">
            <SectionHeader title={category.name} />
            <div className="grid grid-cols-1 gap-x-6 gap-y-2 md:grid-cols-2">
                {category.news.map((item) => (
                    <ListCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default CategorySection;
