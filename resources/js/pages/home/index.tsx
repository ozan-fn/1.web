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
        <div className="min-h-screen bg-background font-sans text-foreground transition-colors dark:bg-background dark:text-foreground">
            <Head>
                <title>{siteSettings?.site_name || ''}</title>
                <meta name="description" content={siteSettings?.description || 'Portal Berita Terpercaya'} />
            </Head>

            <Navbar categories={categories} siteSettings={siteSettings} />

            <main className="container mx-auto max-w-[1700px] border-x-2 border-foreground bg-background px-0 sm:border-x-4 dark:border-foreground dark:bg-background">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                    {/* LEFT SIDEBAR - Replaced to the left and made more "Tech/Terminal" style */}
                    <div className="order-2 border-t-2 border-foreground sm:border-t-4 lg:order-1 lg:col-span-3 lg:border-t-0 lg:border-r-2 lg:sm:border-r-4 dark:border-foreground">
                        <div className="sticky top-24 p-4 transition-all duration-500 sm:p-8">
                            <div className="mb-8 border-b-2 border-foreground pb-4 sm:mb-12 sm:pb-6 dark:border-foreground">
                                <span className="text-[8px] font-black tracking-[0.3em] uppercase opacity-40 sm:text-[10px] sm:tracking-[0.4em]">System_Status</span>
                                <div className="mt-2 animate-pulse text-[10px] font-black text-primary uppercase sm:text-xs dark:text-primary">● LIVE_COVERAGE_ACTIVE</div>
                            </div>

                            <Sidebar trendingNews={trendingNews} latestNews={latestNews} />

                            {/* Industrial Stats Widget */}
                            <div className="mt-12 border-2 border-foreground bg-foreground p-4 text-background transition-all hover:-translate-y-2 hover:shadow-[6px_6px_0px_0px_rgba(var(--primary-rgb),1)] sm:mt-20 sm:p-6 sm:hover:shadow-[8px_8px_0px_0px_rgba(var(--primary-rgb),1)] dark:border-foreground dark:bg-foreground dark:text-background">
                                <h4 className="text-lg font-black tracking-tighter uppercase italic sm:text-xl">METRIC_REPORT</h4>
                                <div className="mt-4 flex justify-between border-t border-background/20 pt-4 dark:border-background/20">
                                    <span className="text-[8px] font-bold opacity-60 sm:text-[10px]">ENGAGEMENT</span>
                                    <span className="text-xs font-black sm:text-sm">+84.2%</span>
                                </div>
                                <div className="mt-2 flex justify-between">
                                    <span className="text-[8px] font-bold opacity-60 sm:text-[10px]">REACH_INDEX</span>
                                    <span className="text-xs font-black sm:text-sm">2.4M</span>
                                </div>
                                <div className="mt-4 font-mono text-[6px] opacity-40 sm:mt-6 sm:text-[8px]">CRC_32: 0x8F2C4A91</div>
                            </div>
                        </div>
                    </div>

                    {/* MAIN CONTENT AREA */}
                    <div className="order-1 lg:order-2 lg:col-span-9">
                        {/* TOP SECTION: Massive Hero with Absolute Positioning Overlap */}
                        <div className="relative border-b-2 border-foreground p-4 sm:border-b-4 sm:p-8 lg:p-16 dark:border-foreground">
                            {heroNews && <HeroSection heroNews={heroNews} sideHeroNews={sideHeroNews} />}

                            {/* Decorative Background Text */}
                            <div className="pointer-events-none absolute right-4 -bottom-6 -z-10 text-[60px] font-black text-foreground/[0.03] italic select-none sm:right-10 sm:-bottom-10 sm:text-[120px] dark:text-foreground/[0.06]">EDITION_2026</div>
                        </div>

                        {/* MIDDLE SECTION: Mosaic Category Display */}
                        <div className="p-4 sm:p-8 lg:p-16">
                            <div className="mb-16 flex flex-col items-center justify-between border-b-2 border-foreground pb-4 sm:mb-32 sm:items-end sm:border-b-4 sm:pb-8 md:flex-row dark:border-foreground">
                                <h3 className="text-3xl leading-none font-black tracking-tighter text-foreground uppercase italic sm:text-4xl md:text-5xl lg:text-6xl dark:text-foreground">
                                    BROADCAST_<span className="text-primary dark:text-primary">FEEDS</span>
                                </h3>
                                <div className="hidden text-center sm:text-right lg:block">
                                    <p className="text-[8px] font-black tracking-[0.2em] uppercase opacity-40 sm:text-[10px] sm:tracking-[0.3em]">Global Information Network</p>
                                    <p className="text-[8px] font-black tracking-[0.2em] uppercase opacity-40 sm:text-[10px] sm:tracking-[0.3em]">Verified_Source_ID: {Math.random().toString(36).substring(7).toUpperCase()}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-20 sm:gap-40">
                                {homepageCategories.map((category, idx) => (
                                    <section key={category.id} className={`group relative ${idx % 2 === 1 ? 'lg:pl-16 xl:pl-32' : 'lg:pr-16 xl:pr-32'} scroll-mt-32`}>
                                        <div className="mb-8 flex flex-col justify-between gap-4 border-l-4 border-primary pl-4 sm:mb-12 sm:gap-8 sm:border-l-8 sm:pl-8 md:flex-row md:items-end dark:border-primary">
                                            <div className="relative">
                                                <div className="absolute -top-10 -left-8 font-mono text-[80px] leading-none font-black text-foreground/[0.04] italic select-none sm:-top-20 sm:-left-16 sm:text-[180px] dark:text-foreground/[0.08]">{idx + 1}</div>
                                                <h2 className="relative text-2xl font-black tracking-tighter text-foreground uppercase sm:text-3xl md:text-4xl lg:text-5xl dark:text-foreground">{category.name}</h2>
                                                <div className="mt-4 flex gap-2">
                                                    <span className="h-1 w-8 bg-primary sm:h-2 sm:w-12 dark:bg-primary"></span>
                                                    <span className="h-1 w-1 bg-foreground sm:h-2 sm:w-2 dark:bg-foreground"></span>
                                                    <span className="h-1 w-1 bg-foreground sm:h-2 sm:w-2 dark:bg-foreground"></span>
                                                </div>
                                            </div>

                                            <Link
                                                href={`/${category.slug}`}
                                                className="group/link flex h-12 items-center gap-4 border-2 border-foreground bg-foreground px-6 text-[8px] font-black text-background transition-all hover:bg-transparent hover:text-foreground active:scale-95 sm:h-16 sm:gap-6 sm:border-4 sm:px-10 sm:text-[10px] dark:border-foreground dark:bg-foreground dark:text-background dark:hover:bg-transparent dark:hover:text-foreground"
                                            >
                                                ACCESS_ARCHIVE
                                                <ChevronRight className="h-4 w-4 transition-transform group-hover/link:translate-x-3 sm:h-5 sm:w-5" />
                                            </Link>
                                        </div>

                                        <div className="relative">
                                            {/* Decorative Corner Borders */}
                                            <div className="absolute -top-2 -left-2 hidden h-4 w-4 border-t-2 border-l-2 border-foreground sm:-top-4 sm:-left-4 sm:h-8 sm:w-8 sm:border-t-4 sm:border-l-4 lg:block dark:border-foreground"></div>
                                            <div className="absolute -right-2 -bottom-2 hidden h-4 w-4 border-r-2 border-b-2 border-foreground sm:-right-4 sm:-bottom-4 sm:h-8 sm:w-8 sm:border-r-4 sm:border-b-4 lg:block dark:border-foreground"></div>

                                            <CategorySection category={category} />
                                        </div>

                                        {/* Row Separator Line */}
                                        <div className="mt-20 h-[1px] w-full bg-foreground/10 sm:mt-40 dark:bg-foreground/10"></div>
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
