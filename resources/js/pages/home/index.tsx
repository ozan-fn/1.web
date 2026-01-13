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
        <div className="min-h-screen bg-background dark:bg-background font-sans text-foreground dark:text-foreground transition-colors">
            <Head>
                <title>{siteSettings?.site_name || ''}</title>
                <meta name="description" content={siteSettings?.description || 'Portal Berita Terpercaya'} />
            </Head>

            <Navbar categories={categories} siteSettings={siteSettings} />

            <main className="container mx-auto max-w-[1700px] border-x-2 sm:border-x-4 border-foreground dark:border-foreground bg-background dark:bg-background px-0">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                    {/* LEFT SIDEBAR - Replaced to the left and made more "Tech/Terminal" style */}
                    <div className="order-2 border-t-2 sm:border-t-4 border-foreground dark:border-foreground lg:order-1 lg:col-span-3 lg:border-t-0 lg:border-r-2 lg:sm:border-r-4">
                        <div className="sticky top-24 p-4 sm:p-8 transition-all duration-500">
                            <div className="mb-8 sm:mb-12 border-b-2 border-foreground dark:border-foreground pb-4 sm:pb-6">
                                <span className="text-[8px] sm:text-[10px] font-black tracking-[0.3em] sm:tracking-[0.4em] uppercase opacity-40">System_Status</span>
                                <div className="mt-2 animate-pulse text-[10px] sm:text-xs font-black text-primary dark:text-primary uppercase">● LIVE_COVERAGE_ACTIVE</div>
                            </div>

                            <Sidebar trendingNews={trendingNews} latestNews={latestNews} />

                            {/* Industrial Stats Widget */}
                            <div className="mt-12 sm:mt-20 border-2 border-foreground dark:border-foreground bg-foreground dark:bg-foreground p-4 sm:p-6 text-background dark:text-background transition-all hover:-translate-y-2 hover:shadow-[6px_6px_0px_0px_rgba(var(--primary-rgb),1)] sm:hover:shadow-[8px_8px_0px_0px_rgba(var(--primary-rgb),1)]">
                                <h4 className="text-lg sm:text-xl font-black tracking-tighter uppercase italic">METRIC_REPORT</h4>
                                <div className="mt-4 flex justify-between border-t border-background/20 dark:border-background/20 pt-4">
                                    <span className="text-[8px] sm:text-[10px] font-bold opacity-60">ENGAGEMENT</span>
                                    <span className="text-xs sm:text-sm font-black">+84.2%</span>
                                </div>
                                <div className="mt-2 flex justify-between">
                                    <span className="text-[8px] sm:text-[10px] font-bold opacity-60">REACH_INDEX</span>
                                    <span className="text-xs sm:text-sm font-black">2.4M</span>
                                </div>
                                <div className="mt-4 sm:mt-6 font-mono text-[6px] sm:text-[8px] opacity-40">CRC_32: 0x8F2C4A91</div>
                            </div>
                        </div>
                    </div>

                    {/* MAIN CONTENT AREA */}
                    <div className="order-1 lg:order-2 lg:col-span-9">
                        {/* TOP SECTION: Massive Hero with Absolute Positioning Overlap */}
                        <div className="relative border-b-2 sm:border-b-4 border-foreground dark:border-foreground p-4 sm:p-8 lg:p-16">
                            {heroNews && <HeroSection heroNews={heroNews} sideHeroNews={sideHeroNews} />}

                            {/* Decorative Background Text */}
                            <div className="pointer-events-none absolute right-4 sm:right-10 -bottom-6 sm:-bottom-10 -z-10 text-[60px] sm:text-[120px] font-black text-foreground/[0.03] dark:text-foreground/[0.06] italic select-none">EDITION_2026</div>
                        </div>

                        {/* MIDDLE SECTION: Mosaic Category Display */}
                        <div className="p-4 sm:p-8 lg:p-16">
                            <div className="mb-16 sm:mb-32 flex flex-col items-center sm:items-end justify-between border-b-2 sm:border-b-4 border-foreground dark:border-foreground pb-4 sm:pb-8 md:flex-row">
                                <h3 className="text-[12vw] sm:text-[10vw] leading-none font-black tracking-tighter uppercase italic md:text-[6vw] text-foreground dark:text-foreground">
                                    BROADCAST_<span className="text-primary dark:text-primary">FEEDS</span>
                                </h3>
                                <div className="hidden text-center sm:text-right lg:block">
                                    <p className="text-[8px] sm:text-[10px] font-black tracking-[0.2em] sm:tracking-[0.3em] uppercase opacity-40">Global Information Network</p>
                                    <p className="text-[8px] sm:text-[10px] font-black tracking-[0.2em] sm:tracking-[0.3em] uppercase opacity-40">Verified_Source_ID: {Math.random().toString(36).substring(7).toUpperCase()}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-20 sm:gap-40">
                                {homepageCategories.map((category, idx) => (
                                    <section key={category.id} className={`group relative ${idx % 2 === 1 ? 'lg:pl-16 xl:pl-32' : 'lg:pr-16 xl:pr-32'} scroll-mt-32`}>
                                        <div className="mb-8 sm:mb-12 flex flex-col justify-between gap-4 sm:gap-8 border-l-4 sm:border-l-8 border-primary dark:border-primary pl-4 sm:pl-8 md:flex-row md:items-end">
                                            <div className="relative">
                                                <div className="absolute -top-10 sm:-top-20 -left-8 sm:-left-16 font-mono text-[80px] sm:text-[180px] leading-none font-black text-foreground/[0.04] dark:text-foreground/[0.08] italic select-none">{idx + 1}</div>
                                                <h2 className="relative text-3xl sm:text-6xl font-black tracking-tighter uppercase md:text-5xl lg:text-8xl text-foreground dark:text-foreground">{category.name}</h2>
                                                <div className="mt-4 flex gap-2">
                                                    <span className="h-1 sm:h-2 w-8 sm:w-12 bg-primary dark:bg-primary"></span>
                                                    <span className="h-1 sm:h-2 w-1 sm:w-2 bg-foreground dark:bg-foreground"></span>
                                                    <span className="h-1 sm:h-2 w-1 sm:w-2 bg-foreground dark:bg-foreground"></span>
                                                </div>
                                            </div>

                                            <Link href={`/${category.slug}`} className="group/link flex h-12 sm:h-16 items-center gap-4 sm:gap-6 border-2 sm:border-4 border-foreground dark:border-foreground bg-foreground dark:bg-foreground px-6 sm:px-10 text-[8px] sm:text-[10px] font-black text-background dark:text-background transition-all hover:bg-transparent dark:hover:bg-transparent hover:text-foreground dark:hover:text-foreground active:scale-95">
                                                ACCESS_ARCHIVE
                                                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover/link:translate-x-3" />
                                            </Link>
                                        </div>

                                        <div className="relative">
                                            {/* Decorative Corner Borders */}
                                            <div className="absolute -top-2 sm:-top-4 -left-2 sm:-left-4 hidden h-4 sm:h-8 w-4 sm:w-8 border-t-2 sm:border-t-4 border-l-2 sm:border-l-4 border-foreground dark:border-foreground lg:block"></div>
                                            <div className="absolute -right-2 sm:-right-4 -bottom-2 sm:-bottom-4 hidden h-4 sm:h-8 w-4 sm:w-8 border-r-2 sm:border-r-4 border-b-2 sm:border-b-4 border-foreground dark:border-foreground lg:block"></div>

                                            <CategorySection category={category} />
                                        </div>

                                        {/* Row Separator Line */}
                                        <div className="mt-20 sm:mt-40 h-[1px] w-full bg-foreground/10 dark:bg-foreground/10"></div>
                                    </section>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer categories={categories} siteSettings={siteSettings} />
        </div>
    );
}
