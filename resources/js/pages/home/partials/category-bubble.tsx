import React from 'react';

interface Props {
    label: string;
}

const CategoryBubble: React.FC<Props> = ({ label }) => (
    <div className="group flex min-w-[70px] cursor-pointer flex-col items-center gap-2">
        <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-[#ea3a7e] via-[#20aadb] to-[#23e0b3] p-[2px] transition-transform group-hover:scale-105">
            <div className="h-full w-full overflow-hidden rounded-full border-[3px] border-white bg-gray-100">
                <img
                    src={`https://placehold.co/60x60?text=${label.charAt(0)}`}
                    alt={label}
                    className="h-full w-full object-cover opacity-80 group-hover:opacity-100"
                />
            </div>
        </div>
        <span className="w-full truncate text-center text-[11px] font-medium text-gray-700 group-hover:text-[#3357a7]">
            {label}
        </span>
    </div>
);

export default CategoryBubble;
