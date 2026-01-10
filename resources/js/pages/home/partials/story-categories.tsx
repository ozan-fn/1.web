import React from 'react';
import CategoryBubble from './category-bubble';

interface Props {
    categories: string[];
}

const StoryCategories: React.FC<Props> = ({ categories }) => (
    <section className="mb-16 border-b border-border pb-10">
        <div className="mb-8 flex items-center gap-4">
            <span className="text-[10px] font-black tracking-[0.4em] whitespace-nowrap text-muted-foreground uppercase">Telusuri Kanal Utama</span>
            <div className="h-[1px] w-full bg-border"></div>
        </div>
        <div className="hide-scrollbar flex snap-x snap-mandatory gap-8 overflow-x-auto pb-4">
            {categories.map((cat, idx) => (
                <div key={idx} className="snap-center">
                    <CategoryBubble label={cat} />
                </div>
            ))}
        </div>
    </section>
);

export default StoryCategories;
