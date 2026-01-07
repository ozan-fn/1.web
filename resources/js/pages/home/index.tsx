import { Head } from '@inertiajs/react';
import Footer from '../../components/footer';
import Navbar from '../../components/navbar';
import Sidebar from '../../components/sidebar';
import CategorySection from './partials/category-section';
import HeroSection from './partials/hero-section';
import StoryCategories from './partials/story-categories';
import { Category, NewsItem } from './partials/types';
import VideoSection from './partials/video-section';

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
        <div className="min-h-screen overflow-x-hidden bg-white font-sans text-gray-900">
            <Head>
                <title>{siteSettings?.site_name || 'Lensa Publik'}</title>
                <meta
                    name="description"
                    content={
                        siteSettings?.description || 'Portal Berita Terpercaya'
                    }
                />
            </Head>

            <Navbar categories={categories} siteSettings={siteSettings} />

            {/* MAIN CONTENT */}
            <main className="container mx-auto max-w-7xl px-4 py-6">
                {/* Banner Ad */}
                <div className="mb-10 w-full overflow-hidden rounded-sm border border-gray-100 bg-gray-50">
                    <div className="border-b border-gray-100 py-1 text-center text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                        Advertisement
                    </div>
                    <img
                        src="https://placehold.co/1200x150?text=Iklan+News+Portal"
                        alt="Ads"
                        className="h-auto min-h-[100px] w-full object-cover"
                    />
                </div>

                <StoryCategories categories={categoryNames} />

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

                        <VideoSection news={videoNews} />

                        {/* Horizontal Ad */}
                        <div className="flex w-full flex-col overflow-hidden rounded-sm border border-gray-100 bg-gray-50">
                            <div className="border-b border-gray-100 bg-white py-1 text-center text-[9px] font-bold tracking-[0.2em] text-gray-400 uppercase">
                                ADVERTISEMENT
                            </div>
                            <div className="flex aspect-[5/1] items-center justify-center text-xl font-black tracking-tighter text-gray-300 uppercase italic">
                                {siteSettings?.site_name || 'News Portal'}
                                <span className="text-gray-200"> Ad Space</span>
                            </div>
                        </div>
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
