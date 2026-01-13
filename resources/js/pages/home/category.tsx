import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';
import { Head, Link } from '@inertiajs/react';
import { Activity, Database } from 'lucide-react';
import ListCard from './partials/list-card'; // Import ListCard for consistency

interface NewsItem {
    id: number;
    title: string;
    slug: string;
    thumbnail_url: string | null;
    published_at: string;
    views: number;
    category: { name: string; slug: string };
    user: { name: string };
}

interface CategoryProps {
    category: {
        name: string;
        description: string;
    };
    news: {
        data: NewsItem[];
        links: any[];
    };
    trendingNews: NewsItem[];
    latestNews: NewsItem[];
}

export default function CategoryPage({ category, news, trendingNews, latestNews }: CategoryProps) {
    return (
        <div className="min-h-screen bg-background font-sans text-foreground transition-colors selection:bg-primary selection:text-background dark:bg-background dark:text-foreground dark:selection:bg-primary dark:selection:text-background">
            <Head title={category.name} />

            <Navbar />

            <main className="mx-auto max-w-[1700px] border-x-2 border-foreground bg-background px-0 sm:border-x-4 dark:border-foreground dark:bg-background">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                    {/* LEFT SIDE_BAR: Industrial Logic */}
                    <div className="order-2 border-t-2 border-foreground sm:border-t-4 lg:order-1 lg:col-span-3 lg:border-t-0 lg:border-r-2 lg:sm:border-r-4 dark:border-foreground">
                        <div className="sticky top-24 p-4 transition-all duration-500 sm:p-8">
                            <div className="mb-6 flex items-center justify-between border-b-2 border-foreground pb-3 sm:mb-10 sm:pb-4 dark:border-foreground">
                                <span className="text-[8px] font-black tracking-[0.3em] uppercase sm:text-[10px] sm:tracking-widest">Index_Sort</span>
                                <Activity className="h-3 w-3 animate-pulse text-primary sm:h-4 sm:w-4 dark:text-primary" />
                            </div>
                            <Sidebar trendingNews={trendingNews as any} latestNews={latestNews as any} />
                        </div>
                    </div>

                    {/* MAIN_FEED: Right Side */}
                    <div className="order-1 lg:order-2 lg:col-span-9">
                        {/* Radical Category Header */}
                        <div className="relative overflow-hidden border-b-2 border-foreground p-4 sm:border-b-4 sm:p-8 lg:p-16 dark:border-foreground">
                            <div className="pointer-events-none absolute -top-6 -right-6 text-[15vw] leading-none font-black text-foreground/[0.03] uppercase italic select-none sm:-top-10 sm:-right-10 sm:text-[20vw] dark:text-foreground/[0.06]">ARCHIVE</div>
                            <div className="relative z-10">
                                <span className="mb-3 inline-block bg-primary px-2 py-1 text-[8px] font-black tracking-[0.3em] text-background uppercase italic sm:mb-4 sm:px-3 sm:text-[10px] sm:tracking-widest dark:bg-primary dark:text-background">DATA_SECTOR_01</span>
                                <h1 className="text-3xl leading-none font-black tracking-tighter text-foreground uppercase sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl dark:text-foreground">{category.name}</h1>
                                <p className="mt-4 max-w-md text-base font-black text-foreground italic opacity-60 sm:mt-8 sm:text-lg lg:max-w-xl dark:text-foreground">// {category.description || 'COLLECTING_RELEVANT_DATA_SETS_IN_REAL_TIME'}</p>
                            </div>
                        </div>

                        {/* List Feed */}
                        <div className="p-4 sm:p-8 lg:p-16">
                            <div className="grid grid-cols-1 gap-8 sm:gap-12">
                                {news.data.length > 0 ? (
                                    news.data.map((item, idx) => (
                                        <div key={item.id} className="group relative">
                                            {/* Decoration for list index */}
                                            <div className="absolute top-0 -left-6 hidden sm:-left-12 lg:block">
                                                <span className="text-2xl font-black text-foreground/5 italic sm:text-3xl dark:text-foreground/10">{String(idx + 1).padStart(2, '0')}</span>
                                            </div>
                                            <ListCard item={item as any} />
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-foreground/20 py-20 sm:border-4 sm:py-40 dark:border-foreground/20">
                                        <Database className="mb-4 h-12 w-12 opacity-10 sm:h-16 sm:w-16" />
                                        <p className="text-xs font-black tracking-[0.3em] uppercase italic opacity-40 sm:text-sm sm:tracking-widest">NULL_DATA_DETECTED_IN_THIS_SECTOR</p>
                                    </div>
                                )}
                            </div>

                            {/* Brutalist Pagination Replacement */}
                            <div className="mt-12 flex flex-wrap gap-2 border-t-2 border-foreground pt-8 sm:mt-20 sm:gap-4 sm:border-t-4 sm:pt-12 dark:border-foreground">
                                {news.links.map((link: any, i: number) => {
                                    if (!link.url) return null;
                                    return (
                                        <Link
                                            key={i}
                                            href={link.url}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                            className={`flex h-10 w-10 items-center justify-center border-2 font-black transition-all sm:h-14 sm:w-14 sm:border-4 ${link.active ? 'border-foreground bg-foreground text-background dark:border-foreground dark:bg-foreground dark:text-background' : 'border-foreground/20 bg-transparent text-foreground hover:border-primary hover:text-primary dark:border-foreground/20 dark:text-foreground dark:hover:border-primary dark:hover:text-primary'} `}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
