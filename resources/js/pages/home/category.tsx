import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';
import { Head, Link } from '@inertiajs/react';
import { Clock, Eye } from 'lucide-react';

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
            {/* Judul halaman di-handle Head Inertia */}
            <Head title={category.name} />

            <Navbar />

            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Header Kategori */}
                <div className="mb-10 border-b border-border pb-6">
                    <h1 className="text-3xl font-black tracking-tighter uppercase sm:text-4xl">{category.name}</h1>
                    <p className="mt-2 text-muted-foreground">{category.description}</p>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                    {/* Daftar Berita */}
                    <div className="lg:col-span-8">
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                            {news.data.length > 0 ? (
                                news.data.map((item) => (
                                    <Link key={item.id} href={`/${item.category.slug}/${item.slug}`} className="group flex flex-col gap-4">
                                        <div className="aspect-[16/9] overflow-hidden rounded-md border border-border bg-muted">
                                            {item.thumbnail_url ? <img src={item.thumbnail_url} alt={item.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /> : <div className="flex h-full items-center justify-center text-xs font-bold text-muted-foreground uppercase">No Image</div>}
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <h2 className="line-clamp-2 text-xl leading-snug font-extrabold transition-colors group-hover:text-primary">{item.title}</h2>
                                            <div className="flex items-center gap-3 text-xs font-medium tracking-wider text-muted-foreground uppercase">
                                                <div className="flex items-center gap-1">
                                                    <Clock className="h-3 w-3" />
                                                    {/* JOS: Pastikan item.published_at ada sebelum diformat */}
                                                    {item.published_at
                                                        ? new Date(item.published_at).toLocaleDateString('id-ID', {
                                                              day: 'numeric',
                                                              month: 'short',
                                                              year: 'numeric',
                                                          })
                                                        : '-'}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Eye className="h-3 w-3" />
                                                    {item.views}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <p className="col-span-full py-20 text-center text-muted-foreground">Belum ada berita di kategori ini.</p>
                            )}
                        </div>

                        {/* Pagination sederhana (Contoh) */}
                        <div className="mt-12 flex justify-center gap-2">{/* Render pagination links di sini jika diperlukan */}</div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-24 space-y-8">
                            <Sidebar trendingNews={trendingNews} latestNews={latestNews} />
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
