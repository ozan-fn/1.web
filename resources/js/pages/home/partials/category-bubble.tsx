import React from 'react';

interface Props {
    label: string;
}

const CategoryBubble: React.FC<Props> = ({ label }) => (
    <div className="group flex min-w-[100px] cursor-pointer flex-col items-center gap-3">
        <div className="relative h-16 w-16 bg-muted transition-all duration-500 group-hover:rotate-6 group-hover:bg-primary">
            <div className="flex h-full w-full items-center justify-center border border-border group-hover:border-primary-foreground">
                <span className="text-lg font-black tracking-tighter text-muted-foreground uppercase transition-colors group-hover:text-primary-foreground">{label.substring(0, 2)}</span>
            </div>
            {/* Corner Accent */}
            <div className="absolute -right-1 -bottom-1 h-3 w-3 bg-primary group-hover:bg-foreground"></div>
        </div>
        <span className="w-full truncate text-center text-[10px] font-black tracking-widest text-muted-foreground uppercase transition-colors group-hover:text-primary">{label}</span>
    </div>
);

export default CategoryBubble;
