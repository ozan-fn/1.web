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
            <div className="flex flex-col items-center justify-center border-4 border-dashed border-foreground/10 py-20 text-center">
                <div className="mb-4 text-4xl font-black text-foreground/5 uppercase italic">NO_SIGNAL</div>
                <p className="text-xs font-black tracking-[0.4em] text-foreground/40 uppercase">Broadcast data currently unavailable for this node.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
            {category.news.map((item, idx) => {
                // Determine layout class based on index for "Asymmetrical Placement"
                const gridClass =
                    idx % 3 === 0
                        ? 'lg:col-span-8' // Wide card
                        : 'lg:col-span-4'; // Narrow card

                // Add vertical shift to odd rows for staggered effect
                const offsetClass = idx > 1 && idx % 2 === 1 ? 'lg:mt-12' : '';

                return (
                    <div key={item.id} className={`${gridClass} ${offsetClass}`}>
                        <ListCard item={item} />

                        {/* Industrial Label for each slot */}
                        <div className="mt-4 flex items-center justify-between text-[8px] font-black opacity-30">
                            <span>SLOT_{idx < 9 ? `0${idx + 1}` : idx + 1}</span>
                            <span>TYPE://ITEM_INDEX_LITERAL</span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default CategorySection;
