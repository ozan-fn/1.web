import { Head, Link } from '@inertiajs/react';
import Footer from '../../components/footer';
import Navbar from '../../components/navbar';
import Sidebar from '../../components/sidebar';
import CategorySection from './partials/category-section';
import HeroSection from './partials/hero-section';
import { Category, NewsItem } from './partials/types';

export interface SiteSettings {
    site_name: string;
    tagline: string | null;
    description: string | null;
    logo: string | null;
    email: string | null;
    phone: string | null;
    address: string | null;
    social_facebook: string | null;
    social_twitter: string | null;
    social_instagram: string | null;
    social_youtube: string | null;
}

interface Props {
    heroNews: NewsItem | null;
    sideHeroNews: NewsItem[];
    trendingNews: NewsItem[];
    latestNews: NewsItem[];
    categories: Category[];
    homepageCategories: Category[];
    siteSettings: SiteSettings | null;
}

export default function Index({ heroNews, sideHeroNews = [], trendingNews = [], latestNews = [], categories = [], homepageCategories = [], siteSettings }: Props) {
    return (
        <div className="min-h-screen bg-background font-sans text-foreground transition-colors">
            <Head>
                <title>{siteSettings?.site_name || ''}</title>
                <meta name="description" content={siteSettings?.description || 'Portal Berita Terpercaya'} />
            </Head>

            <Navbar categories={categories} siteSettings={siteSettings} />

            <main className="container mx-auto max-w-7xl px-4 py-6">
                {/* HERO SECTION */}
                {heroNews && <HeroSection heroNews={heroNews} sideHeroNews={sideHeroNews} />}

                {/* GRID CONTENT LAYOUT */}
                <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12">
                    {/* LEFT COLUMN (Daftar Kategori Berita) */}
                    <div className="space-y-14 lg:col-span-8">
                        {homepageCategories.map((category) => (
                            <section key={category.id} className="scroll-mt-20">
                                {/* HEADER KATEGORI - Dipusatkan di sini untuk menghindari duplikasi */}
                                <div className="mb-6 flex items-end justify-between border-b border-border pb-3">
                                    <div className="relative">
                                        <h2 className="text-2xl font-black tracking-tighter uppercase italic">{category.name}</h2>
                                        <div className="absolute -bottom-[3px] left-0 h-[3px] w-12 bg-primary"></div>
                                    </div>

                                    <Link href={`/${category.slug}`} className="group flex items-center gap-1 text-[11px] font-black tracking-widest text-muted-foreground uppercase transition-colors hover:text-primary">
                                        Lihat Semua
                                        <span className="text-lg leading-none transition-transform group-hover:translate-x-1">›</span>
                                    </Link>
                                </div>

                                {/* Hanya merender list berita */}
                                <CategorySection category={category} />
                            </section>
                        ))}
                    </div>

                    {/* RIGHT COLUMN (Sidebar) */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-24">
                            <Sidebar trendingNews={trendingNews} latestNews={latestNews} />
                        </div>
                    </div>
                </div>
            </main>

            <Footer categories={categories} siteSettings={siteSettings} />
        </div>
    );
}
