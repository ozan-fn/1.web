import React from 'react';
import CategoryBubble from './category-bubble';

interface Props {
    categories: string[];
}

const StoryCategories: React.FC<Props> = ({ categories }) => (
    <section className="mb-8 overflow-x-auto scroll-smooth pb-2">
        <div className="flex min-w-max gap-4 px-2 md:justify-center">
            {categories.map((cat, idx) => (
                <CategoryBubble key={idx} label={cat} />
            ))}
        </div>
    </section>
);

export default StoryCategories;
