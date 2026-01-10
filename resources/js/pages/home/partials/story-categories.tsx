import React from 'react';
import CategoryBubble from './category-bubble';

interface Props {
    categories: string[];
}

const StoryCategories: React.FC<Props> = ({ categories }) => (
    <section className="no-scrollbar mb-12 overflow-x-auto scroll-smooth py-4">
        <div className="flex min-w-max gap-6 px-2 md:justify-start">
            {categories.map((cat, idx) => (
                <CategoryBubble key={idx} label={cat} />
            ))}
        </div>
    </section>
);

export default StoryCategories;
