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

            <main className="container mx-auto max-w-[1400px] px-4 py-8">
                {/* HERO SECTION - Modern Bento Grid */}
                {heroNews && (
                    <section className="mb-12">
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
                            {/* Main Hero - Larger Left */}
                            <div className="lg:col-span-7">
                                <Link href={heroNews.sub_category ? `/${heroNews.category?.slug}/${heroNews.sub_category?.slug}/${heroNews.slug}` : `/${heroNews.category?.slug}/${heroNews.slug}`} className="group relative block h-[400px] overflow-hidden rounded-2xl lg:h-[500px]">
                                    {heroNews.thumbnail_url && <img src={heroNews.thumbnail_url} alt={heroNews.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 w-full p-8">
                                        <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-1.5 text-xs font-bold text-primary-foreground">{heroNews.category?.name}</span>
                                        <h2 className="mb-3 line-clamp-3 font-serif text-3xl font-bold text-white lg:text-4xl">{heroNews.title}</h2>
                                        <div className="flex items-center gap-3 text-sm text-white/80">
                                            <span>{new Date(heroNews.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                            <span>•</span>
                                            <span>{heroNews.views} views</span>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            {/* Side Heroes - Stacked Right */}
                            <div className="grid grid-cols-2 gap-4 lg:col-span-5 lg:grid-cols-1">
                                {sideHeroNews.slice(0, 2).map((item) => (
                                    <Link key={item.id} href={item.sub_category ? `/${item.category?.slug}/${item.sub_category?.slug}/${item.slug}` : `/${item.category?.slug}/${item.slug}`} className="group relative block h-[195px] overflow-hidden rounded-2xl lg:h-[242px]">
                                        {item.thumbnail_url && <img src={item.thumbnail_url} alt={item.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                                        <div className="absolute bottom-0 left-0 w-full p-5">
                                            <span className="mb-2 inline-block rounded-full bg-primary/90 px-3 py-1 text-[10px] font-bold text-primary-foreground">{item.category?.name}</span>
                                            <h3 className="line-clamp-2 font-serif text-base font-bold text-white lg:text-lg">{item.title}</h3>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* MAIN LAYOUT - Content Left, Sidebar Right */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                    {/* MAIN CONTENT - Category Sections (8 cols) */}
                    <div className="lg:col-span-8">
                        <div className="space-y-16">
                            {homepageCategories.map((category) => (
                                <section key={category.id} className="scroll-mt-20">
                                    {/* Modern Category Header */}
                                    <div className="mb-6 flex items-center justify-between">
                                        <h2 className="font-sans text-3xl font-bold text-foreground">{category.name}</h2>
                                        <Link href={`/${category.slug}`} className="group flex items-center gap-1 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
                                            Lihat Semua
                                            <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </Link>
                                    </div>
                                    <CategorySection category={category} />
                                </section>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT SIDEBAR - Sticky (4 cols) */}
                    <aside className="lg:col-span-4">
                        <div className="sticky top-24 space-y-8">
                            <Sidebar trendingNews={trendingNews} latestNews={latestNews} />
                        </div>
                    </aside>
                </div>
            </main>

            <Footer categories={categories} siteSettings={siteSettings} />
        </div>
    );
}
