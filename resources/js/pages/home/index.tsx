import { Head, Link } from '@inertiajs/react';
import Footer from '../../components/footer';
import Navbar from '../../components/navbar';
import Sidebar from '../../components/sidebar';
import CategorySection from './partials/category-section';
import HeroSection from './partials/hero-section';
import SectionHeader from './partials/section-header';
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
    videoNews: NewsItem[];
    categories: Category[];
    homepageCategories: Category[];
    siteSettings: SiteSettings | null;
}

export default function Index({ heroNews, sideHeroNews = [], trendingNews = [], latestNews = [], videoNews = [], categories = [], homepageCategories = [], siteSettings }: Props) {
    return (
        <div className="min-h-screen bg-background font-sans text-foreground transition-colors">
            <Head>
                <title>{siteSettings?.site_name || ''}</title>
                <meta name="description" content={siteSettings?.description || 'Portal Berita Terpercaya'} />
            </Head>

            <Navbar categories={categories} siteSettings={siteSettings} />

            {/* BREAKING NEWS TICKER */}
            {latestNews.length > 0 && (
                <div className="overflow-hidden border-b border-primary/10 bg-primary/5 py-3">
                    <div className="container mx-auto flex max-w-7xl items-center gap-6 px-4">
                        <div className="flex shrink-0 items-center gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
                            </span>
                            <span className="text-[10px] font-black tracking-[0.2em] text-primary uppercase">Breaking</span>
                        </div>
                        <div className="flex flex-1 overflow-hidden whitespace-nowrap">
                            <div className="animate-marquee flex gap-12 text-[11px] font-bold text-foreground">
                                {latestNews.map((item) => (
                                    <Link key={item.id} href={`/${item.category.slug}/${item.slug}`} className="transition-colors hover:text-primary">
                                        {item.title}
                                    </Link>
                                ))}
                                {/* Duplicate for continuous animation if needed, but marquee usually handles it with CSS */}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <main className="container mx-auto max-w-7xl px-4 py-12 lg:px-8">
                {/* 1. HERO SECTION (Bento Style) */}
                <div className="mb-20">{heroNews && <HeroSection heroNews={heroNews} sideHeroNews={sideHeroNews} />}</div>

                <div className="grid grid-cols-1 gap-16 xl:grid-cols-12 xl:gap-24">
                    {/* LEFT CONTENT AREA */}
                    <div className="order-2 xl:order-1 xl:col-span-8">
                        {/* 2. CATEGORY QUICK NAV */}
                        <div className="mb-16 flex flex-wrap items-center gap-3">
                            <span className="flex items-center pr-6 text-[10px] font-black tracking-[0.3em] text-muted-foreground uppercase">
                                <span className="mr-2 h-4 w-1 rounded-full bg-border"></span>
                                Filter
                            </span>
                            {categories.slice(0, 6).map((cat) => (
                                <Link key={cat.id} href={`/${cat.slug}`} className="rounded-2xl border border-border px-6 py-3 text-[11px] font-black tracking-widest text-muted-foreground uppercase transition-all hover:border-foreground hover:bg-foreground hover:text-background hover:shadow-2xl">
                                    {cat.name}
                                </Link>
                            ))}
                        </div>

                        <div className="space-y-32">
                            {/* Display first half of categories */}
                            {homepageCategories.slice(0, 2).map((category, index) => (
                                <section key={category.id} className="scroll-mt-20">
                                    <SectionHeader title={category.name} href={`/${category.slug}`} color={index % 2 === 0 ? 'bg-primary' : 'bg-foreground'} />
                                    <CategorySection category={category} />
                                </section>
                            ))}

                            {/* Full Width Impact Section */}
                            {videoNews.length > 0 && (
                                <div className="relative -mx-4 lg:-mx-8">
                                    <VideoSection news={videoNews} />
                                </div>
                            )}

                            {/* Remaining categories */}
                            {homepageCategories.slice(2).map((category, index) => (
                                <section key={category.id} className="scroll-mt-20">
                                    <SectionHeader title={category.name} href={`/${category.slug}`} color={(index + 2) % 2 === 0 ? 'bg-primary' : 'bg-foreground'} />
                                    <CategorySection category={category} />
                                </section>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT SIDEBAR AREA */}
                    <div className="order-1 xl:order-2 xl:col-span-4">
                        <div className="sticky top-32 flex flex-col gap-16">
                            {/* Newsletter / CTA - Redesigned */}
                            <div className="relative overflow-hidden rounded-[2.5rem] bg-foreground p-10 text-background dark:bg-muted/20 dark:text-foreground">
                                <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-primary/20 blur-[80px]"></div>
                                <h4 className="relative z-10 text-2xl font-black tracking-tighter italic sm:text-3xl">
                                    SWARA
                                    <br />
                                    DAILY GIST
                                </h4>
                                <p className="relative z-10 mt-6 text-sm leading-relaxed text-background/60 dark:text-muted-foreground">Eksklusif ke kotak masuk Anda. Tanpa spam, hanya kabar utama.</p>
                                <div className="relative z-10 mt-10 space-y-3">
                                    <input type="text" placeholder="your@email.com" className="w-full rounded-2xl border-none bg-background/5 px-6 py-4 text-sm font-medium text-background transition-all focus:bg-background/10 focus:ring-2 focus:ring-primary dark:bg-background/20" />
                                    <button className="w-full rounded-2xl bg-primary py-4 text-[11px] font-black tracking-[0.2em] text-primary-foreground uppercase transition-all hover:bg-white hover:text-black">Join The Insight</button>
                                </div>
                            </div>

                            <Sidebar trendingNews={trendingNews} latestNews={latestNews} />
                        </div>
                    </div>
                </div>
            </main>

            <Footer categories={categories} siteSettings={siteSettings} />
        </div>
    );
}
