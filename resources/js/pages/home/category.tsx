import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';
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
        <div className="min-h-screen bg-background font-sans text-foreground">
            <Head title={category.name} />

            <Navbar />

            <main className="mx-auto max-w-7xl px-4 py-8">
                {/* Header Kategori */}
                <div className="mb-10 flex flex-col border-b-2 border-blue-700 pb-6">
                    <h1 className="text-3xl font-black tracking-tighter uppercase sm:text-4xl">{category.name}</h1>
                    {category.description && <p className="mt-2 text-sm font-medium text-muted-foreground">{category.description}</p>}
                </div>

                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                    {/* Daftar Berita */}
                    <div className="lg:col-span-8">
                        <div className="flex flex-col">{news.data.length > 0 ? news.data.map((item) => <ListCard key={item.id} item={item as any} />) : <p className="py-20 text-center text-sm font-bold tracking-widest text-muted-foreground uppercase">Belum ada berita di kategori ini.</p>}</div>

                        {/* Pagination */}
                        {news.links && news.links.length > 3 && (
                            <div className="mt-12 flex flex-wrap justify-center gap-2">
                                {news.links.map((link: any, i: number) => (
                                    <Link key={i} href={link.url || '#'} dangerouslySetInnerHTML={{ __html: link.label }} className={`px-4 py-2 text-xs font-black uppercase transition-colors ${link.active ? 'bg-blue-700 text-white' : 'bg-muted text-muted-foreground hover:bg-blue-100 hover:text-blue-700'}`} />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-28">
                            <Sidebar trendingNews={trendingNews as any} latestNews={latestNews as any} />
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
