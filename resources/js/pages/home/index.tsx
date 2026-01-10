import { Head, Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
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

            <main className="container mx-auto max-w-7xl px-4 py-20">
                {/* HERO SECTION */}
                {heroNews && <HeroSection heroNews={heroNews} sideHeroNews={sideHeroNews} />}

                {/* DECORATIVE SEPARATOR - Extreme Industrial */}
                <div className="my-32 flex flex-col items-center justify-center text-center">
                    <div className="mb-8 h-24 w-[2px] bg-foreground"></div>
                    <h2 className="text-[8vw] leading-[0.8] font-black tracking-tighter uppercase italic md:text-[6vw]">
                        EXPLORE <span className="text-primary">THE_CHANNELS</span>
                    </h2>
                    <div className="mt-10 flex h-1 w-64 bg-foreground/10">
                        <div className="h-full w-1/3 bg-primary"></div>
                    </div>
                </div>

                {/* GRID CONTENT LAYOUT */}
                <div className="grid grid-cols-1 gap-24 lg:grid-cols-12">
                    {/* LEFT COLUMN (Daftar Kategori Berita) */}
                    <div className="space-y-40 lg:col-span-8">
                        {homepageCategories.map((category) => (
                            <section key={category.id} className="scroll-mt-20">
                                {/* HEADER KATEGORI - Heavy Brutalist */}
                                <div className="group mb-16">
                                    <div className="flex items-end justify-between border-b-8 border-foreground pb-4">
                                        <div className="flex items-baseline gap-4">
                                            <span className="text-6xl font-black text-primary/20 italic">#</span>
                                            <h2 className="text-5xl font-black tracking-tighter uppercase md:text-7xl">{category.name}</h2>
                                        </div>
                                        <Link href={`/${category.slug}`} className="group/link flex h-14 w-14 items-center justify-center border-4 border-foreground transition-all hover:bg-foreground hover:text-background">
                                            <ChevronRight className="h-8 w-8 transition-transform group-hover/link:translate-x-1" />
                                        </Link>
                                    </div>
                                    <div className="mt-2 text-[10px] font-black tracking-[1em] uppercase opacity-30">INDUSTRIAL_FEED_ACCESS</div>
                                </div>

                                <div className="relative">
                                    <CategorySection category={category} />
                                </div>
                            </section>
                        ))}
                    </div>

                    {/* RIGHT COLUMN (Sidebar) */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-32">
                            <Sidebar trendingNews={trendingNews} latestNews={latestNews} />
                        </div>
                    </div>
                </div>
            </main>

            <Footer categories={categories} siteSettings={siteSettings} />
        </div>
    );
}
