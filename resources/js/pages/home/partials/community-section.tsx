import React from 'react';
import SectionHeader from './section-header';
import { NewsItem } from './types';

interface Props {
    news: NewsItem[];
}

const CommunitySection: React.FC<Props> = ({ news }) => (
    <div>
        <SectionHeader title="Community Archive" />
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2">
            {news.map((item) => (
                <div key={item.id} className="group border-b border-foreground/10 pb-12 last:border-0 sm:border-b-0 sm:pb-0">
                    <div className="relative mb-6 aspect-video overflow-hidden border border-foreground/10 grayscale transition-all duration-700 group-hover:grayscale-0">
                        <img src={item.thumbnail_url || ''} className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={item.title} />
                        <span className="absolute top-0 left-0 bg-foreground px-4 py-2 font-mono text-[9px] font-bold tracking-[0.3em] text-background uppercase">{item.category.name}</span>
                    </div>
                    <h3 className="line-clamp-2 text-2xl leading-tight font-bold tracking-tighter text-foreground uppercase transition-colors group-hover:text-primary">{item.title}</h3>
                    <div className="mt-4 flex items-center gap-4 font-mono text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                        <span className="tracking-[0.4em] text-primary">FILE_0{item.id % 9}</span>
                        <span>/</span>
                        <span>{item.timestamp}</span>
                    </div>
                </div>
            ))}
        </div>

        {/* Pagination */}
        <div className="mt-20 flex items-center justify-center gap-1 font-mono">
            <button className="flex h-12 w-12 items-center justify-center border-2 border-foreground bg-foreground text-[11px] font-bold text-background transition-all">01</button>
            <button className="flex h-12 w-12 items-center justify-center border border-foreground/10 text-[11px] font-bold text-foreground transition-all hover:bg-muted">02</button>
            <button className="flex h-12 w-12 items-center justify-center border border-foreground/10 text-[11px] font-bold text-foreground transition-all hover:bg-muted">03</button>
            <span className="px-4 text-muted-foreground opacity-30">...</span>
        </div>
    </div>
);

export default CommunitySection;
