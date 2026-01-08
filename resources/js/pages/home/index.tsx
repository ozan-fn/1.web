import { Head } from '@inertiajs/react';
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
    email: string | null;
    phone: string | null;
    logo: string | null;
    favicon: string | null;
    address: string | null;
    social_facebook: string | null;
    social_instagram: string | null;
    social_twitter: string | null;
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

const breadcrumbs = []; // Or remove if not used

export default function Index({
    heroNews,
    sideHeroNews,
    trendingNews,
    latestNews,
    videoNews,
    categories,
    homepageCategories,
    siteSettings,
}: Props) {
    const categoryNames = categories.map((cat) => cat.name);

    return (
        <div className="min-h-screen overflow-x-hidden bg-white font-sans text-gray-900 transition-colors dark:bg-gray-950 dark:text-gray-100">
            <Head>
                <title>{siteSettings?.site_name || 'Lensa Publik'}</title>
                <meta
                    name="description"
                    content={
                        siteSettings?.description || 'Portal Berita Terpercaya'
                    }
                />
                <meta
                    property="og:title"
                    content={siteSettings?.site_name || 'Lensa Publik'}
                />
                <meta
                    property="og:description"
                    content={
                        siteSettings?.description || 'Portal Berita Terpercaya'
                    }
                />
                {siteSettings?.logo && (
                    <meta
                        property="og:image"
                        content={`/storage/${siteSettings.logo}`}
                    />
                )}
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>

            <Navbar categories={categories} siteSettings={siteSettings} />

            {/* MAIN CONTENT */}
            <main className="container mx-auto max-w-7xl px-4 py-6">
                {/* <StoryCategories categories={categoryNames} /> */}

                {heroNews && (
                    <HeroSection
                        heroNews={heroNews}
                        sideHeroNews={sideHeroNews}
                    />
                )}

                {/* GRID CONTENT LAYOUT */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                    {/* LEFT COLUMN (Main Feed) */}
                    <div className="space-y-10 lg:col-span-8">
                        {homepageCategories.map((category) => (
                            <CategorySection
                                key={category.id}
                                category={category}
                            />
                        ))}

                        {/* <VideoSection news={videoNews} /> */}
                    </div>

                    <Sidebar
                        trendingNews={trendingNews}
                        latestNews={latestNews}
                    />
                </div>
            </main>

            <Footer categories={categories} siteSettings={siteSettings} />
        </div>
    );
}
