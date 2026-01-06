import React from 'react';

interface Props {
    title: string;
    color?: string;
    textColor?: string;
}

const SectionHeader: React.FC<Props> = ({
    title,
    color = 'bg-[#3357a7]',
    textColor = 'text-black',
}) => (
    <div
        className={`mb-4 flex items-center justify-between border-b ${textColor === 'text-white' ? 'border-gray-700' : 'border-gray-200'} pb-2`}
    >
        <div className="flex items-center">
            <div className={`h-8 w-1 ${color} mr-3 rounded-full`}></div>
            <h2
                className={`font-['Roboto'] text-xl font-bold md:text-2xl ${textColor} uppercase`}
            >
                {title}
            </h2>
        </div>
        <a
            href="#"
            className={`text-sm ${textColor} flex items-center opacity-70 transition-opacity hover:opacity-100`}
        >
            Lihat Semua <span className="ml-1">→</span>
        </a>
    </div>
);

export default SectionHeader;
