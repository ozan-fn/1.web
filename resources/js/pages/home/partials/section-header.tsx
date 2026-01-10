import React from 'react';

interface Props {
    title: string;
    color?: string;
    textColor?: string;
}

const SectionHeader: React.FC<Props> = ({ title, color = 'bg-primary' }) => (
    <div className="relative mb-8 flex items-end justify-between overflow-hidden">
        <div className="flex items-center gap-4">
            <div className={`h-8 w-2 ${color}`}></div>
            <h2 className="text-2xl font-black tracking-[-0.02em] uppercase italic md:text-3xl">{title}</h2>
        </div>
        <div className="mx-6 h-[1px] flex-1 bg-border opacity-50"></div>
        <a href="#" className="text-[10px] font-black tracking-widest whitespace-nowrap text-muted-foreground uppercase transition-all hover:text-primary">
            Lihat Index <span className="ml-1 text-primary">→</span>
        </a>
    </div>
);

export default SectionHeader;
