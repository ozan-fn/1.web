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
        <div className="min-h-screen bg-background dark:bg-background font-sans text-foreground dark:text-foreground transition-colors selection:bg-primary dark:selection:bg-primary selection:text-background dark:selection:text-background">
            <Head title={category.name} />

            <Navbar />

            <main className="mx-auto max-w-[1700px] border-x-2 sm:border-x-4 border-foreground dark:border-foreground bg-background dark:bg-background px-0">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                    {/* LEFT SIDE_BAR: Industrial Logic */}
                    <div className="order-2 border-t-2 sm:border-t-4 border-foreground dark:border-foreground lg:order-1 lg:col-span-3 lg:border-t-0 lg:border-r-2 lg:sm:border-r-4">
                        <div className="sticky top-24 p-4 sm:p-8 transition-all duration-500">
                            <div className="mb-6 sm:mb-10 flex items-center justify-between border-b-2 border-foreground dark:border-foreground pb-3 sm:pb-4">
                                <span className="text-[8px] sm:text-[10px] font-black tracking-[0.3em] sm:tracking-widest uppercase">Index_Sort</span>
                                <Activity className="h-3 w-3 sm:h-4 sm:w-4 animate-pulse text-primary dark:text-primary" />
                            </div>
                            <Sidebar trendingNews={trendingNews as any} latestNews={latestNews as any} />
                        </div>
                    </div>

                    {/* MAIN_FEED: Right Side */}
                    <div className="order-1 lg:order-2 lg:col-span-9">
                        {/* Radical Category Header */}
                        <div className="relative overflow-hidden border-b-2 sm:border-b-4 border-foreground dark:border-foreground p-4 sm:p-8 lg:p-16">
                            <div className="pointer-events-none absolute -top-6 sm:-top-10 -right-6 sm:-right-10 text-[15vw] sm:text-[20vw] leading-none font-black text-foreground/[0.03] dark:text-foreground/[0.06] uppercase italic select-none">ARCHIVE</div>
                            <div className="relative z-10">
                                <span className="mb-3 sm:mb-4 inline-block bg-primary dark:bg-primary px-2 sm:px-3 py-1 text-[8px] sm:text-[10px] font-black tracking-[0.3em] sm:tracking-widest text-background dark:text-background uppercase italic">DATA_SECTOR_01</span>
                                <h1 className="text-4xl sm:text-6xl leading-none font-black tracking-tighter text-foreground dark:text-foreground uppercase md:text-6xl lg:text-8xl xl:text-9xl">{category.name}</h1>
                                <p className="mt-4 sm:mt-8 max-w-md lg:max-w-xl text-base sm:text-lg font-black text-foreground dark:text-foreground italic opacity-60">// {category.description || 'COLLECTING_RELEVANT_DATA_SETS_IN_REAL_TIME'}</p>
                            </div>
                        </div>

                        {/* List Feed */}
                        <div className="p-4 sm:p-8 lg:p-16">
                            <div className="grid grid-cols-1 gap-8 sm:gap-12">
                                {news.data.length > 0 ? (
                                    news.data.map((item, idx) => (
                                        <div key={item.id} className="group relative">
                                            {/* Decoration for list index */}
                                            <div className="absolute top-0 -left-6 sm:-left-12 hidden lg:block">
                                                <span className="text-2xl sm:text-3xl font-black text-foreground/5 dark:text-foreground/10 italic">{String(idx + 1).padStart(2, '0')}</span>
                                            </div>
                                            <ListCard item={item as any} />
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex flex-col items-center justify-center border-2 sm:border-4 border-dashed border-foreground/20 dark:border-foreground/20 py-20 sm:py-40">
                                        <Database className="mb-4 h-12 w-12 sm:h-16 sm:w-16 opacity-10" />
                                        <p className="text-xs sm:text-sm font-black tracking-[0.3em] sm:tracking-widest uppercase italic opacity-40">NULL_DATA_DETECTED_IN_THIS_SECTOR</p>
                                    </div>
                                )}
                            </div>

                            {/* Brutalist Pagination Replacement */}
                            <div className="mt-12 sm:mt-20 flex flex-wrap gap-2 sm:gap-4 border-t-2 sm:border-t-4 border-foreground dark:border-foreground pt-8 sm:pt-12">
                                {news.links.map((link: any, i: number) => {
                                    if (!link.url) return null;
                                    return <Link key={i} href={link.url} dangerouslySetInnerHTML={{ __html: link.label }} className={`flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center border-2 sm:border-4 font-black transition-all ${link.active ? 'border-foreground dark:border-foreground bg-foreground dark:bg-foreground text-background dark:text-background' : 'border-foreground/20 dark:border-foreground/20 bg-transparent text-foreground dark:text-foreground hover:border-primary dark:hover:border-primary hover:text-primary dark:hover:text-primary'} `} />;
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
