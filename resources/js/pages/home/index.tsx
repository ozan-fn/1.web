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
        <div className="min-h-screen bg-background font-sans text-foreground transition-colors">
            <Head>
                <title>{siteSettings?.site_name || ''}</title>
                <meta name="description" content={siteSettings?.description || 'Portal Berita Terpercaya'} />
            </Head>

            <Navbar categories={categories} siteSettings={siteSettings} />

            <main className="min-h-screen pt-20 pb-20 lg:ml-20 lg:pt-0">
                <div className="container mx-auto max-w-[1400px] px-4 py-8">
                    {/* HERO SECTION - REDESIGNED TO MOSAIC */}
                    {heroNews && (
                        <div className="mb-12">
                            <HeroSection heroNews={heroNews} sideHeroNews={sideHeroNews} />
                        </div>
                    )}

                    {/* DYNAMIC CONTENT LAYOUT */}
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                        {/* MAIN FEED */}
                        <div className="lg:col-span-9">
                            <div className="space-y-20">
                                {homepageCategories.map((category) => (
                                    <section key={category.id} className="scroll-mt-24">
                                        <div className="mb-8 flex items-end justify-between border-b border-border pb-4">
                                            <div className="group flex items-center gap-4">
                                                <div className="h-2 w-2 rounded-full bg-primary transition-all group-hover:w-8" />
                                                <h2 className="text-3xl font-black tracking-tighter text-foreground uppercase italic">{category.name}</h2>
                                            </div>
                                            <Link href={`/${category.slug}`} className="text-[10px] font-black tracking-widest text-muted-foreground uppercase transition-colors hover:text-primary">
                                                View All
                                            </Link>
                                        </div>
                                        <CategorySection category={category} />
                                    </section>
                                ))}
                            </div>
                        </div>

                        {/* MINI SIDEBAR INTEGRATED */}
                        <div className="lg:col-span-3">
                            <div className="sticky top-24 space-y-12">
                                <div className="rounded-[32px] bg-muted/40 p-8 ring-1 ring-border/50">
                                    <h3 className="mb-6 text-xs font-black tracking-widest text-primary uppercase italic">Latest Updates</h3>
                                    <div className="space-y-6">
                                        {latestNews.slice(0, 5).map((item) => {
                                            const latestCatSlug = item.category?.slug || 'news';
                                            return (
                                                <Link key={item.id} href={`/${latestCatSlug}/${item.slug}`} className="group flex items-start gap-4">
                                                    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-muted">
                                                        <img src={item.thumbnail_url || ''} className="h-full w-full object-cover transition-transform group-hover:scale-110" alt={item.title} />
                                                    </div>
                                                    <div className="flex flex-col gap-1">
                                                        <h4 className="line-clamp-2 text-xs leading-tight font-black text-foreground transition-colors group-hover:text-primary">{item.title}</h4>
                                                        <span className="text-[9px] font-bold text-muted-foreground uppercase">{new Date(item.published_at).toLocaleDateString()}</span>
                                                    </div>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {categories.map((cat) => (
                                        <Link key={cat.id} href={`/${cat.slug}`} className="rounded-full bg-muted px-4 py-2 text-[10px] font-black tracking-widest text-foreground uppercase transition-all hover:bg-primary hover:text-primary-foreground">
                                            #{cat.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer siteSettings={siteSettings} />
        </div>
    );
}
