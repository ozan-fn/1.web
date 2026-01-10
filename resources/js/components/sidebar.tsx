import { Link } from '@inertiajs/react';
import React from 'react';
import { NewsItem } from '../pages/home/partials/types';

interface SidebarProps {
    // Gunakan opsional (?) agar tidak crash jika data belum ada
    trendingNews?: NewsItem[];
    latestNews?: NewsItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ trendingNews = [], latestNews = [] }) => {
    return (
        <aside className="space-y-8">
            {/* Widget: Terpopuler - Modern Card */}
            <section className="overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 p-6 shadow-md">
                <header className="mb-6">
                    <h3 className="font-sans text-2xl font-bold text-foreground">Terpopuler</h3>
                    <div className="mt-2 h-1 w-16 rounded-full bg-primary"></div>
                </header>
                <div className="space-y-4">
                    {trendingNews?.map((item, i) => (
                        <Link key={item.id} href={item.sub_category ? `/${item.category?.slug}/${item.sub_category?.slug}/${item.slug}` : `/${item.category?.slug}/${item.slug}`} className="group flex cursor-pointer items-start gap-3 rounded-xl p-3 transition-all hover:bg-background/80">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary font-sans text-sm font-bold text-primary-foreground shadow-md transition-transform group-hover:scale-110">{i + 1}</div>
                            <div className="flex flex-col gap-1">
                                <h4 className="line-clamp-2 font-serif text-sm font-bold leading-snug text-foreground transition-colors group-hover:text-primary">{item.title}</h4>
                                <span className="inline-flex w-fit items-center rounded-full bg-background px-2 py-0.5 text-[10px] font-bold uppercase text-primary">{item.category?.name}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Widget: Terbaru - Modern Card */}
            <section className="overflow-hidden rounded-2xl bg-card p-6 shadow-md">
                <header className="mb-6">
                    <h3 className="font-sans text-2xl font-bold text-foreground">Terbaru</h3>
                    <div className="mt-2 h-1 w-16 rounded-full bg-primary"></div>
                </header>
                <div className="space-y-5">
                    {latestNews?.map((item) => (
                        <article key={item.id}>
                            <Link href={item.sub_category ? `/${item.category?.slug}/${item.sub_category?.slug}/${item.slug}` : `/${item.category?.slug}/${item.slug}`} className="group flex flex-col gap-3">
                                <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-muted shadow-sm">
                                    {item.thumbnail_url ? <img src={item.thumbnail_url} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" alt={item.title} /> : <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5 text-xs font-semibold text-primary">No Image</div>}
                                    <span className="absolute bottom-2 left-2 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground shadow-lg">{item.category?.name}</span>
                                </div>
                                <h4 className="line-clamp-2 font-serif text-base font-bold leading-snug text-foreground transition-colors group-hover:text-primary">{item.title}</h4>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <span className="font-medium">{item.user?.name || 'Redaksi'}</span>
                                    <span>•</span>
                                    <time>
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
