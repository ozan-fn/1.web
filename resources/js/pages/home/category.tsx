import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';
import { Head, Link } from '@inertiajs/react';
import StoryCategories from './partials/story-categories';

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
                {/* 1. TOP STORY BUBBLES */}
                <div className="mb-4">
                    <StoryCategories categories={trendingNews.map((t) => t.category.name).filter((v, i, a) => a.indexOf(v) === i)} />
                </div>

                {/* Header Kategori */}
                <div className="mb-10 border-b-2 border-[#0455A4] pb-6">
                    <h1 className="text-4xl font-extrabold tracking-tight text-[#0455A4] uppercase">{category.name}</h1>
                    <p className="mt-3 max-w-2xl text-lg text-gray-500 dark:text-gray-400">{category.description}</p>
                </div>

                {/* 2. GRID LAYOUT */}
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                    {/* Daftar Berita */}
                    <div className="lg:col-span-8">
                        {/* FEATURED IN CATEGORY (First item bigger) */}
                        {news.data.length > 0 && (
                            <div className="mb-12">
                                <Link href={`/${news.data[0].category.slug}/${news.data[0].slug}`} className="group block">
                                    <div className="aspect-[21/9] w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800">
                                        {news.data[0].thumbnail_url ? <img src={news.data[0].thumbnail_url} alt={news.data[0].title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" /> : <div className="flex h-full items-center justify-center font-bold text-gray-400">No Image</div>}
                                    </div>
                                    <div className="mt-6">
                                        <h2 className="text-3xl leading-tight font-bold text-gray-900 transition-colors group-hover:text-[#0455A4] dark:text-gray-100">{news.data[0].title}</h2>
                                        <p className="mt-4 line-clamp-3 text-gray-600 dark:text-gray-400">
                                            Liputan mendalam tentang {news.data[0].title} dan perkembangan terbaru di sektor {category.name}.
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        )}

                        <div className="flex flex-col gap-0 border-t border-gray-100 dark:border-gray-800">
                            {news.data.slice(1).length > 0 ? (
                                news.data.slice(1).map((item) => (
                                    <Link key={item.id} href={`/${item.category.slug}/${item.slug}`} className="group flex items-start gap-6 border-b border-gray-100 py-8 last:border-0 dark:border-gray-800">
                                        <div className="aspect-[16/9] w-[180px] flex-shrink-0 overflow-hidden rounded-xl bg-gray-100 md:w-[240px] dark:bg-gray-900">
                                            {item.thumbnail_url ? <img src={item.thumbnail_url} alt={item.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" /> : <div className="flex h-full items-center justify-center text-xs font-bold text-muted-foreground uppercase">No Image</div>}
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <h2 className="line-clamp-2 text-xl leading-tight font-bold tracking-tight text-gray-900 transition-colors group-hover:text-[#0455A4] md:text-2xl dark:text-gray-100">{item.title}</h2>
                                            <div className="flex items-center gap-3 text-xs font-bold tracking-widest text-gray-400 uppercase">
                                                <span className="text-[#0455A4]">{item.user.name}</span>
                                                <span className="h-1 w-1 rounded-full bg-gray-300"></span>
                                                <span>
                                                    {item.published_at
                                                        ? new Date(item.published_at).toLocaleDateString('id-ID', {
                                                              day: 'numeric',
                                                              month: 'short',
                                                              year: 'numeric',
                                                          })
                                                        : '-'}
                                                </span>
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
