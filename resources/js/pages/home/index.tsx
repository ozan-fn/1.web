import { Head, Link } from '@inertiajs/react';
import Footer from '../../components/footer';
import Navbar from '../../components/navbar';
import Sidebar from '../../components/sidebar';
import CategorySection from './partials/category-section';
import HeroSection from './partials/hero-section';
import StoryCategories from './partials/story-categories';
import { Category, NewsItem } from './partials/types';
import VideoSection from './partials/video-section';

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
                {/* 1. TOP STORY BUBBLES */}
                <StoryCategories categories={categories.map((c) => c.name)} />

                {/* 2. HERO SECTION (HEADLINES) */}
                {heroNews && <HeroSection heroNews={heroNews} sideHeroNews={sideHeroNews} />}

                {/* 3. BREAKING/TRENDING SECTION (Grid Horizontal) */}
                <section className="mb-16 border-y border-gray-100 py-10 dark:border-gray-800">
                    <div className="mb-8 flex items-center justify-between">
                        <h3 className="text-xl font-bold tracking-tight text-[#0455A4] uppercase">Tren Saat Ini</h3>
                        <Link href="/" className="text-sm font-bold text-gray-400 hover:text-[#0455A4]">
                            Eksplorasi Semua
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {trendingNews.slice(0, 4).map((item) => (
                            <Link key={item.id} href={`/${item.category.slug}/${item.slug}`} className="group flex flex-col gap-3">
                                <div className="aspect-video w-full overflow-hidden rounded-lg">
                                    <img src={item.thumbnail_url || ''} className="h-full w-full object-cover transition-transform group-hover:scale-105" alt={item.title} />
                                </div>
                                <h4 className="line-clamp-2 text-sm leading-tight font-bold text-gray-900 transition-colors group-hover:text-[#0455A4] dark:text-gray-100">{item.title}</h4>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* 4. MAIN LAYOUT WITH SIDEBAR */}
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                    {/* LEFT: Category Lists */}
                    <div className="space-y-16 lg:col-span-8">
                        {homepageCategories.slice(0, 2).map((category) => (
                            <section key={category.id} className="scroll-mt-20">
                                <div className="mb-8 flex items-center justify-between border-b border-gray-100 pb-3 dark:border-gray-800">
                                    <h2 className="text-2xl font-bold text-[#0455A4] uppercase">{category.name}</h2>
                                    <Link href={`/${category.slug}`} className="text-xs font-bold text-[#0455A4] hover:underline">
                                        LIHAT SEMUA
                                    </Link>
                                </div>
                                <CategorySection category={category} />
                            </section>
                        ))}

                        {/* VIDEO INTERMISSION - Full inside the column or breaking out */}
                        {latestNews.length > 0 && (
                            <div className="py-4">
                                <VideoSection news={latestNews} />
                            </div>
                        )}

                        {homepageCategories.slice(2).map((category) => (
                            <section key={category.id} className="scroll-mt-20">
                                <div className="mb-8 flex items-center justify-between border-b border-gray-100 pb-3 dark:border-gray-800">
                                    <h2 className="text-2xl font-bold text-[#0455A4] uppercase">{category.name}</h2>
                                    <Link href={`/${category.slug}`} className="text-xs font-bold text-[#0455A4] hover:underline">
                                        LIHAT SEMUA
                                    </Link>
                                </div>
                                <CategorySection category={category} />
                            </section>
                        ))}
                    </div>

                    {/* RIGHT: Sidebar */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-24 space-y-12">
                            <Sidebar trendingNews={trendingNews} latestNews={latestNews} />

                            {/* Additional Sidebar Block: Newsletter or Promo */}
                            <div className="rounded-2xl bg-blue-50 p-6 dark:bg-gray-900">
                                <h4 className="text-lg font-bold text-[#0455A4]">Langganan Berita</h4>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Dapatkan update berita terpopuler setiap pagi langsung di email Anda.</p>
                                <div className="mt-4 flex flex-col gap-2">
                                    <input type="email" placeholder="Email Anda" className="rounded-lg border border-gray-200 px-4 py-2 text-sm outline-none focus:border-[#0455A4] dark:border-gray-800 dark:bg-gray-800" />
                                    <button className="rounded-lg bg-[#0455A4] py-2 text-sm font-bold text-white transition-opacity hover:opacity-90">Daftar Sekarang</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer categories={categories} siteSettings={siteSettings} />
        </div>
    );
}
