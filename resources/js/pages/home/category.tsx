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
        <div className="min-h-screen bg-background font-sans text-foreground transition-colors selection:bg-primary selection:text-background">
            <Head title={category.name} />

            <Navbar />

            <main className="mx-auto max-w-[1700px] border-x-4 border-foreground bg-background px-0">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                    {/* LEFT SIDE_BAR: Industrial Logic */}
                    <div className="order-2 border-t-4 border-foreground lg:order-1 lg:col-span-3 lg:border-t-0 lg:border-r-4">
                        <div className="sticky top-24 p-8 transition-all duration-500">
                            <div className="mb-10 flex items-center justify-between border-b-2 border-foreground pb-4">
                                <span className="text-[10px] font-black tracking-widest uppercase">Index_Sort</span>
                                <Activity className="h-4 w-4 animate-pulse text-primary" />
                            </div>
                            <Sidebar trendingNews={trendingNews as any} latestNews={latestNews as any} />
                        </div>
                    </div>

                    {/* MAIN_FEED: Right Side */}
                    <div className="order-1 lg:order-2 lg:col-span-9">
                        {/* Radical Category Header */}
                        <div className="relative overflow-hidden border-b-4 border-foreground p-8 lg:p-16">
                            <div className="pointer-events-none absolute -top-10 -right-10 text-[20vw] leading-none font-black text-foreground/[0.03] uppercase italic select-none">ARCHIVE</div>
                            <div className="relative z-10">
                                <span className="mb-4 inline-block bg-primary px-3 py-1 text-[10px] font-black tracking-widest text-background uppercase italic">DATA_SECTOR_01</span>
                                <h1 className="text-6xl leading-none font-black tracking-tighter text-foreground uppercase md:text-8xl lg:text-9xl">{category.name}</h1>
                                <p className="mt-8 max-w-xl text-lg font-black text-foreground italic opacity-60">// {category.description || 'COLLECTING_RELEVANT_DATA_SETS_IN_REAL_TIME'}</p>
                            </div>
                        </div>

                        {/* List Feed */}
                        <div className="p-8 lg:p-16">
                            <div className="grid grid-cols-1 gap-12">
                                {news.data.length > 0 ? (
                                    news.data.map((item, idx) => (
                                        <div key={item.id} className="group relative">
                                            {/* Decoration for list index */}
                                            <div className="absolute top-0 -left-12 hidden lg:block">
                                                <span className="text-3xl font-black text-foreground/5 italic">{String(idx + 1).padStart(2, '0')}</span>
                                            </div>
                                            <ListCard item={item as any} />
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex flex-col items-center justify-center border-4 border-dashed border-foreground/20 py-40">
                                        <Database className="mb-4 h-16 w-16 opacity-10" />
                                        <p className="text-sm font-black tracking-widest uppercase italic opacity-40">NULL_DATA_DETECTED_IN_THIS_SECTOR</p>
                                    </div>
                                )}
                            </div>

                            {/* Brutalist Pagination Replacement */}
                            <div className="mt-20 flex flex-wrap gap-4 border-t-4 border-foreground pt-12">
                                {news.links.map((link: any, i: number) => {
                                    if (!link.url) return null;
                                    return <Link key={i} href={link.url} dangerouslySetInnerHTML={{ __html: link.label }} className={`flex h-14 w-14 items-center justify-center border-4 font-black transition-all ${link.active ? 'border-foreground bg-foreground text-background' : 'border-foreground/20 bg-transparent text-foreground hover:border-primary hover:text-primary'} `} />;
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
