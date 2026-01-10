import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import { Head, Link } from '@inertiajs/react';
import ListCard from './partials/list-card';

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
        <div className="min-h-screen bg-background font-sans text-foreground transition-all duration-300 lg:pl-20">
            <Head title={category.name} />

            <Navbar />

            <main className="mx-auto max-w-7xl px-4 py-12 lg:max-w-none lg:px-12">
                {/* Header Kategori */}
                <div className="mb-16">
                    <div className="mb-4 flex items-center gap-4">
                        <div className="h-1 w-12 rounded-full bg-primary" />
                        <span className="text-xs font-black tracking-[0.4em] text-primary uppercase">Category Archive</span>
                    </div>
                    <h1 className="text-5xl font-black tracking-tighter uppercase italic md:text-7xl lg:text-8xl">{category.name}</h1>
                    <p className="mt-6 max-w-2xl text-lg leading-relaxed font-medium text-muted-foreground">{category.description}</p>
                </div>

                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                    {/* Daftar Berita */}
                    <div className="lg:col-span-9">
                        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
                            {news.data.length > 0 ? (
                                news.data.map((item) => <ListCard key={item.id} item={item as any} />)
                            ) : (
                                <div className="col-span-full rounded-[40px] border border-dashed border-border bg-muted/20 py-32 text-center">
                                    <p className="text-sm font-black tracking-widest text-muted-foreground uppercase italic">Stay tuned for fresh updates.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Integrated Sidebar */}
                    <div className="lg:col-span-3">
                        <div className="sticky top-24 space-y-12">
                            <div className="rounded-[40px] bg-muted/30 p-10 ring-1 ring-border/50">
                                <h3 className="mb-8 text-xs font-black tracking-[0.3em] text-primary uppercase italic">Trending Now</h3>
                                <div className="space-y-8">
                                    {trendingNews.slice(0, 5).map((item) => (
                                        <Link key={item.id} href={`/${item.category.slug}/${item.slug}`} className="group flex flex-col gap-2">
                                            <h4 className="line-clamp-2 text-sm leading-tight font-black text-foreground transition-colors group-hover:text-primary">{item.title}</h4>
                                            <span className="text-[10px] font-bold text-muted-foreground uppercase">{new Date(item.published_at).toLocaleDateString()}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
