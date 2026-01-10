import React from 'react';

interface Props {
    label: string;
}

const CategoryBubble: React.FC<Props> = ({ label }) => (
    <div className="group flex min-w-[70px] cursor-pointer flex-col items-center gap-2">
        <div className="h-14 w-14 rounded-full border-2 border-gray-100 bg-gray-50 p-1 transition-all duration-300 group-hover:border-primary group-hover:bg-primary/10">
            <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-white">
                <span className="text-sm font-black tracking-tighter text-gray-300 uppercase group-hover:text-primary">{label.substring(0, 2)}</span>
            </div>
        </div>
        <span className="w-full truncate text-center text-[11px] font-black tracking-tight text-gray-500 uppercase transition-colors group-hover:text-primary">{label}</span>
    </div>
);

export default CategoryBubble;
