import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';
import { Head } from '@inertiajs/react';
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
        <div className="min-h-screen bg-background font-sans text-foreground transition-colors">
            <Head title={category.name} />

            <Navbar />

            <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                {/* Header Kategori - Industrial Editorial Style */}
                <div className="relative mb-20 overflow-hidden bg-foreground p-10 text-background">
                    <div className="pointer-events-none absolute -top-10 -right-10 text-[180px] leading-none font-black text-background/5 opacity-50 select-none">{category.name.charAt(0)}</div>
                    <div className="relative z-10">
                        <div className="mb-4 flex items-center gap-4">
                            <span className="text-[10px] font-black tracking-[0.4em] text-primary uppercase">Arsip Kanal</span>
                            <div className="h-[1px] w-20 bg-background/20"></div>
                        </div>
                        <h1 className="text-5xl font-black tracking-[-0.05em] uppercase italic md:text-7xl">{category.name}</h1>
                        <p className="mt-6 max-w-2xl text-lg leading-relaxed font-medium text-background/60">{category.description || `Kumpulan berita terbaru dan terpercaya dalam kanal ${category.name}. Kami menyajikan informasi akurat untuk Anda.`}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
                    {/* Daftar Berita */}
                    <div className="lg:col-span-8">
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                            {news.data.length > 0 ? (
                                news.data.map((item) => <ListCard key={item.id} item={item as any} />)
                            ) : (
                                <div className="col-span-full flex flex-col items-center justify-center border-2 border-dashed border-border py-32 text-center">
                                    <h3 className="text-xl font-bold tracking-widest text-muted-foreground uppercase">Arsip Kosong</h3>
                                    <p className="mt-2 text-sm text-muted-foreground/60">Belum ada berita yang diterbitkan di kanal ini.</p>
                                </div>
                            )}
                        </div>

                        {/* Pagination - Custom Styled */}
                        <div className="mt-20 flex justify-center gap-4">
                            {/* Simple generic pagination visual for now */}
                            <button className="flex h-12 w-12 items-center justify-center border-2 border-primary bg-primary font-black text-primary-foreground italic">1</button>
                            <button className="flex h-12 w-12 items-center justify-center border-2 border-border font-black italic transition-all hover:border-primary">2</button>
                            <button className="flex h-12 w-12 items-center justify-center border-2 border-border font-black italic transition-all hover:border-primary">3</button>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-24">
                            <Sidebar trendingNews={trendingNews as any} latestNews={latestNews as any} />
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
