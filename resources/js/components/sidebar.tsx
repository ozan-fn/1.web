import { Link } from '@inertiajs/react';
import React from 'react';
import { NewsItem } from '../pages/home/partials/types';

interface SidebarProps {
    // Gunakan opsional (?) agar tidak crash jika data belum ada
    trendingNews?: NewsItem[];
    latestNews?: NewsItem[];
}

const Sidebar: React.FC<SidebarProps> = ({
    trendingNews = [],
    latestNews = [],
}) => {
    return (
        <aside className="space-y-12">
            {/* Widget: Terpopuler */}
            <section className="rounded-lg border border-border bg-card p-6 shadow-sm">
                <header className="mb-6 border-b-2 border-primary pb-3">
                    <h3 className="font-serif text-2xl font-bold text-foreground">Terpopuler</h3>
                </header>
                <div className="space-y-5">
                    {trendingNews?.map((item, i) => (
                        <Link 
                            key={item.id} 
                            href={item.sub_category ? `/${item.category?.slug}/${item.sub_category?.slug}/${item.slug}` : `/${item.category?.slug}/${item.slug}`} 
                            className="group flex cursor-pointer items-start gap-4 border-b border-border/50 pb-5 transition-all last:border-0 last:pb-0 hover:bg-muted/30 hover:px-2 hover:-mx-2 rounded-md"
                        >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 font-serif text-xl font-bold text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                {i + 1}
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <h4 className="font-serif text-sm font-bold leading-snug text-foreground transition-colors line-clamp-2 group-hover:text-primary">
                                    {item.title}
                                </h4>
                                <span className="text-xs font-semibold tracking-wide text-primary uppercase">
                                    {item.category?.name}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Widget: Terbaru */}
            <section className="rounded-lg border border-border bg-card p-6 shadow-sm">
                <header className="mb-6 border-b-2 border-primary pb-3">
                    <h3 className="font-serif text-2xl font-bold text-foreground">Terbaru</h3>
                </header>
                <div className="space-y-6">
                    {latestNews?.map((item) => (
                        <article key={item.id}>
                            <Link 
                                href={item.sub_category ? `/${item.category?.slug}/${item.sub_category?.slug}/${item.slug}` : `/${item.category?.slug}/${item.slug}`} 
                                className="group flex flex-col gap-3"
                            >
                                <div className="relative aspect-video w-full overflow-hidden rounded-md bg-muted shadow-sm">
                                    {item.thumbnail_url ? (
                                        <img 
                                            src={item.thumbnail_url} 
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
                                            alt={item.title} 
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center text-xs font-semibold text-muted-foreground">
                                            No Image
                                        </div>
                                    )}
                                    <span className="absolute bottom-2 left-2 rounded-sm bg-primary px-2 py-1 text-xs font-bold text-primary-foreground shadow-md">
                                        {item.category?.name}
                                    </span>
                                </div>
                                <h4 className="font-serif text-base font-bold leading-snug text-foreground transition-colors line-clamp-2 group-hover:text-primary">
                                    {item.title}
                                </h4>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <span className="font-medium">{item.user?.name || 'Redaksi'}</span>
                                    <span className="text-border">•</span>
                                    <time className="font-normal">
                                        {new Date(item.published_at).toLocaleDateString('id-ID', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric',
                                        })}
                                    </time>
                                </div>
                            </Link>
                        </article>
                    ))}
                </div>
            </section>
        </aside>
    );
};

export default Sidebar;
