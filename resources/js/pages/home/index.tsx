import { Head, Link } from '@inertiajs/react';
import Footer from '../../components/footer';
import Navbar from '../../components/navbar';
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
        <div className="min-h-screen bg-background font-sans text-foreground transition-all duration-300">
            <Head>
                <title>{siteSettings?.site_name || ''}</title>
                <meta name="description" content={siteSettings?.description || 'Portal Berita Terpercaya'} />
            </Head>

            <Navbar categories={categories} siteSettings={siteSettings} />

            <main className="container mx-auto px-4 py-16 lg:max-w-none lg:px-20">
                <div className="mb-20 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-end">
                    <div>
                        <div className="mb-4 flex items-center gap-3">
                            <span className="h-[1px] w-12 bg-primary" />
                            <span className="font-mono text-[10px] font-bold tracking-[0.4em] text-primary uppercase">Edition 2026</span>
                        </div>
                        <h1 className="text-6xl leading-[0.9] font-bold tracking-tighter text-foreground md:text-8xl lg:text-[120px]">
                            URBAN
                            <br />
                            <span className="text-muted-foreground/30">JOURNAL</span>
                        </h1>
                    </div>
                    <div className="flex flex-col gap-6 lg:pb-4">
                        <p className="max-w-md font-mono text-sm leading-relaxed tracking-tight text-muted-foreground uppercase">A curated selection of stories exploring the intersection of culture, technology, and modern living in the digital age.</p>
                        <div className="flex items-center gap-6">
                            <div className="flex -space-x-3">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="h-10 w-10 border border-background bg-muted" />
                                ))}
                            </div>
                            <span className="font-mono text-[10px] font-bold text-foreground">500+ DAILY SUBSCRIBERS</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-20 lg:grid-cols-1">
                    {/* MAIN FEED - FULL WIDTH */}
                    <div className="lg:col-span-1">
                        <div className="space-y-40">
                            {/* FEATURED FIRST */}
                            {heroNews && (
                                <section>
                                    <HeroSection heroNews={heroNews} sideHeroNews={sideHeroNews} />
                                </section>
                            )}

                            {homepageCategories.map((category) => (
                                <section key={category.id} className="scroll-mt-24">
                                    <div className="mb-16 flex flex-col gap-6 border-l border-foreground pl-10">
                                        <h2 className="text-5xl font-bold tracking-tighter text-foreground uppercase md:text-7xl">{category.name}</h2>
                                        <div className="flex items-center gap-10">
                                            <Link href={`/${category.slug}`} className="font-mono text-[11px] font-bold tracking-[0.4em] text-primary uppercase transition-all hover:translate-x-4">
                                                EXPLORE_SECTION [→]
                                            </Link>
                                            <div className="h-[1px] flex-1 bg-foreground/10" />
                                            <span className="font-mono text-[10px] text-muted-foreground/50">{category.news?.length || 0} TOTAL_RECORDS</span>
                                        </div>
                                    </div>
                                    <CategorySection category={category} />
                                </section>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <Footer categories={categories} siteSettings={siteSettings} />
        </div>
    );
}
