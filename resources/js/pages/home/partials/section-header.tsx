import React from 'react';

interface Props {
    title: string;
    color?: string;
    textColor?: string;
    href?: string;
}

const SectionHeader: React.FC<Props> = ({ title, color = 'bg-primary', textColor = 'text-gray-900 dark:text-white', href = '#' }) => (
    <div className="mb-8 flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-center gap-3">
            <div className={`h-8 w-1.5 ${color} rounded-full`}></div>
            <h2 className={`text-2xl font-black tracking-tighter uppercase ${textColor} md:text-3xl`}>{title}</h2>
        </div>
        <a href={href} className="group flex items-center gap-2 text-[11px] font-black tracking-[0.2em] text-muted-foreground uppercase transition-all hover:text-primary">
            Explore More
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-border transition-all group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="9 5l7 7-7 7" />
                </svg>
            </span>
        </a>
    </div>
);

export default SectionHeader;
