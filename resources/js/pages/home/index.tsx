import { Head, Link, usePage } from '@inertiajs/react';
import Footer from '../../components/footer';
import Navbar from '../../components/navbar';
import Sidebar from '../../components/sidebar';
import CategorySection from './partials/category-section';
import HeroSection from './partials/hero-section';
import { Category, NewsItem } from './partials/types';

// Interface untuk data global (sesuai middleware HandleInertiaRequests)
interface SharedProps {
    settings: {
        site_name: string;
        tagline: string | null;
        description: string | null;
        logo: string | null;
        // ... field lain jika perlu
    } | null;
    [key: string]: any;
}

interface Props {
    heroNews: NewsItem | null;
    sideHeroNews: NewsItem[];
    trendingNews: NewsItem[];
    latestNews: NewsItem[];
    // categories: Category[]; // Tidak lagi dibutuhkan di sini karena Navbar mengambilnya sendiri
    homepageCategories: Category[]; // Kategori khusus untuk layout body homepage
}

export default function Index({ heroNews, sideHeroNews = [], trendingNews = [], latestNews = [], homepageCategories = [] }: Props) {
    // Mengambil settings dari Global Props (Middleware) untuk keperluan SEO/Head
    const { settings } = usePage<SharedProps>().props;

    return (
        <div className="min-h-screen bg-background font-sans text-foreground transition-colors duration-300">
            {/* SEO & Meta Tags */}
            <Head>
                <title>{settings?.site_name || 'Beranda'}</title>
                <meta name="description" content={settings?.description || 'Portal Berita Terpercaya dan Aktual'} />
            </Head>

            {/* Navbar: Tidak perlu oper props lagi, dia ambil sendiri dari global state */}
            <Navbar />

            <main className="container mx-auto max-w-7xl px-4 py-8 lg:px-8">
                {/* HERO SECTION */}
                {heroNews && (
                    <div className="animate-in duration-700 fade-in slide-in-from-bottom-4">
                        <HeroSection heroNews={heroNews} sideHeroNews={sideHeroNews} />
                    </div>
                )}

                {/* MAIN CONTENT LAYOUT */}
                <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12">
                    {/* LEFT COLUMN: Kategori Berita */}
                    <div className="space-y-16 lg:col-span-8">
                        {homepageCategories.map((category, index) => (
                            <section
                                key={category.id}
                                className="scroll-mt-24"
                                // Sedikit delay animasi untuk setiap kategori agar tidak muncul bersamaan
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Header Kategori */}
                                <div className="mb-8 flex items-end justify-between border-b border-border/60 pb-3">
                                    <div className="relative">
                                        <h2 className="text-3xl font-black tracking-tighter text-foreground uppercase italic">{category.name}</h2>
                                        <div className="absolute -bottom-[13px] left-0 h-[3px] w-16 bg-primary"></div>
                                    </div>

                                    <Link href={`/${category.slug}`} className="group flex items-center gap-1 text-[11px] font-bold tracking-widest text-muted-foreground uppercase transition-colors hover:text-primary">
                                        Lihat Semua
                                        <span className="text-lg leading-none transition-transform duration-300 group-hover:translate-x-1">›</span>
                                    </Link>
                                </div>

                                {/* List Berita per Kategori */}
                                <CategorySection category={category} />
                            </section>
                        ))}
                    </div>

                    {/* RIGHT COLUMN: Sidebar (Sticky) */}
                    <aside className="lg:col-span-4">
                        <div className="sticky top-24 space-y-10">
                            <Sidebar trendingNews={trendingNews} latestNews={latestNews} />
                        </div>
                    </aside>
                </div>
            </main>

            {/* Footer: Tidak perlu oper props lagi */}
            <Footer />
        </div>
    );
}
