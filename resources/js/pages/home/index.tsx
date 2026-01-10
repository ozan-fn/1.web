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
        <div className="min-h-screen bg-background text-foreground transition-colors">
            <Head>
                <title>{siteSettings?.site_name || ''}</title>
                <meta name="description" content={siteSettings?.description || 'Portal Berita Terpercaya'} />
            </Head>

            <Navbar categories={categories} siteSettings={siteSettings} />

            <main className="container mx-auto max-w-[1400px] px-4 py-10">
                {/* HERO SECTION - Full Width */}
                {heroNews && (
                    <section className="mb-16">
                        <HeroSection heroNews={heroNews} sideHeroNews={sideHeroNews} />
                    </section>
                )}

                {/* MAIN CONTENT - Magazine Grid */}
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
                    {/* LEFT SIDEBAR - Terpopuler & Terbaru (4 cols) */}
                    <aside className="lg:col-span-4">
                        <div className="sticky top-24 space-y-10">
                            <Sidebar trendingNews={trendingNews} latestNews={latestNews} />
                        </div>
                    </aside>

                    {/* MAIN CONTENT - Category News (8 cols) */}
                    <div className="lg:col-span-8">
                        <div className="space-y-20">
                            {homepageCategories.map((category, index) => (
                                <article key={category.id} className="scroll-mt-20">
                                    {/* Category Header - Magazine Style */}
                                    <header className="mb-8">
                                        <div className="flex items-baseline gap-4">
                                            <h2 className="font-serif text-4xl font-bold text-foreground">{category.name}</h2>
                                            <div className="h-px flex-1 bg-border"></div>
                                            <Link href={`/${category.slug}`} className="shrink-0 text-sm font-medium text-primary transition-colors hover:text-primary/80">
                                                Selengkapnya →
                                            </Link>
                                        </div>
                                    </header>

                                    {/* Category Content */}
                                    <CategorySection category={category} />
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <Footer categories={categories} siteSettings={siteSettings} />
        </div>
    );
}
