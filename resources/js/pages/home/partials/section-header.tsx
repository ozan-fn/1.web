import React from 'react';

interface Props {
    title: string;
    color?: string;
    textColor?: string;
}

const SectionHeader: React.FC<Props> = ({
    title,
    color = 'bg-red-600',
    textColor = 'text-gray-900',
}) => (
    <div
        className={`mb-6 flex items-center justify-between border-b-2 border-red-600 pb-2`}
    >
        <div className="flex items-center">
            <h2
                className={`text-xl font-black tracking-tighter uppercase ${textColor} md:text-2xl`}
            >
                {title}
            </h2>
        </div>
        <a
            href="#"
            className={`text-[12px] font-bold tracking-wider text-red-600 uppercase transition-colors hover:text-black`}
        >
            Lihat Semua <span className="ml-1">›</span>
        </a>
    </div>
);

export default SectionHeader;
