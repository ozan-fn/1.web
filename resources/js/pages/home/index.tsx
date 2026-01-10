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
        <div className="min-h-screen bg-background font-sans text-foreground">
            <Head>
                <title>{siteSettings?.site_name || ''}</title>
                <meta name="description" content={siteSettings?.description || 'Portal Berita Terpercaya'} />
            </Head>

            <Navbar categories={categories} siteSettings={siteSettings} />

            <main className="container mx-auto max-w-7xl px-4 py-8">
                {/* HERO / FOCUS SECTION */}
                <div className="mb-12">{heroNews && <HeroSection heroNews={heroNews} sideHeroNews={sideHeroNews} />}</div>

                {/* BREAKING NEWS TICKER (SIMULATED or Minimal) */}
                <div className="mb-12 flex h-10 items-center overflow-hidden rounded-md border border-blue-100 bg-blue-50/50">
                    <div className="bg-blue-700 px-4 py-2 text-[11px] font-black text-white uppercase">Breaking</div>
                    <div className="flex-1 px-4 text-xs font-bold text-blue-800">{latestNews[0]?.title || 'Selamat datang di portal berita terupdate.'}</div>
                </div>

                {/* GRID CONTENT LAYOUT */}
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                    {/* LEFT COLUMN: Main News Stream */}
                    <div className="lg:col-span-8">
                        <div className="space-y-16">
                            {homepageCategories.map((category) => (
                                <section key={category.id} className="scroll-mt-20">
                                    <div className="mb-6 flex items-center justify-between border-b-2 border-blue-700 pb-2">
                                        <h2 className="text-xl font-black text-foreground uppercase">{category.name}</h2>
                                        <Link href={`/${category.slug}`} className="text-xs font-black text-blue-700 uppercase hover:underline">
                                            Lihat Semua
                                        </Link>
                                    </div>
                                    <CategorySection category={category} />
                                </section>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Sidebar */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-28">
                            <Sidebar trendingNews={trendingNews} latestNews={latestNews} />
                        </div>
                    </div>
                </div>
            </main>

            <Footer categories={categories} siteSettings={siteSettings} />
        </div>
    );
}
