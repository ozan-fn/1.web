import React from 'react';

interface Props {
    title: string;
    color?: string;
    textColor?: string;
}

const SectionHeader: React.FC<Props> = ({ title, color = 'bg-[#0455A4]', textColor = 'text-[#0455A4]' }) => (
    <div className={`mb-6 flex items-center justify-between border-b border-gray-200 pb-2`}>
        <div className="flex items-center">
            <h2 className={`text-xl font-bold ${textColor} md:text-2xl`}>{title}</h2>
        </div>
        <a href="#" className={`text-[12px] font-bold text-[#0455A4] transition-colors hover:text-black dark:hover:text-white`}>
            Lihat Semua <span className="ml-1">›</span>
        </a>
    </div>
);

export default SectionHeader;
