import React from 'react';

interface Props {
    title: string;
    color?: string;
    textColor?: string;
}

const SectionHeader: React.FC<Props> = ({ title, color = 'bg-primary', textColor = 'text-foreground' }) => (
    <div className="mb-12 flex items-end justify-between border-b border-foreground/10 pb-6">
        <h2 className={`text-4xl leading-none font-bold tracking-tighter uppercase ${textColor} md:text-5xl`}>{title}</h2>
        <a href="#" className="font-mono text-[10px] font-bold tracking-[0.4em] text-muted-foreground uppercase transition-colors hover:text-primary">
            View All [→]
        </a>
    </div>
);

export default SectionHeader;
