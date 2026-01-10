import React from 'react';

interface Props {
    label: string;
}

const CategoryBubble: React.FC<Props> = ({ label }) => (
    <div className="group flex min-w-[70px] cursor-pointer flex-col items-center gap-2">
        <div className="h-14 w-14 rounded-full border border-gray-100 bg-gray-50 p-1 transition-all duration-300 group-hover:border-[#0455A4] group-hover:bg-blue-50 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-white dark:bg-gray-950">
                <span className="text-sm font-bold text-gray-300 uppercase group-hover:text-[#0455A4]">{label.substring(0, 2)}</span>
            </div>
        </div>
        <span className="w-full truncate text-center text-[11px] font-bold text-gray-500 uppercase transition-colors group-hover:text-[#0455A4]">{label}</span>
    </div>
);

export default CategoryBubble;
