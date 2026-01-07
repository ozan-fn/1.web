import Footer from '../../components/footer';
import Navbar from '../../components/navbar';
import Sidebar from '../../components/sidebar';
import CommunitySection from './partials/community-section';
import HeroSection from './partials/hero-section';
import InnovationSection from './partials/innovation-section';
import NationalNews from './partials/national-news';
import StoryCategories from './partials/story-categories';
import { Category, NewsItem } from './partials/types';
import VideoSection from './partials/video-section';

interface Props {
    heroNews: NewsItem | null;
    sideHeroNews: NewsItem[];
    nationalNews: NewsItem[];
    trendingNews: NewsItem[];
    latestNews: NewsItem[];
    videoNews: NewsItem[];
    categories: Category[];
}

export default function Index({
    heroNews,
    sideHeroNews,
    nationalNews,
    trendingNews,
    latestNews,
    videoNews,
    categories,
}: Props) {
    const categoryNames = categories.map((cat) => cat.name);

    return (
        <div className="min-h-screen overflow-x-hidden bg-white font-sans text-gray-900">
            <Navbar categories={categories} />

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
                        <NationalNews news={nationalNews} />

                        <VideoSection news={videoNews} />

                        <InnovationSection news={nationalNews} />

                        {/* Horizontal Ad */}
                        <div className="flex w-full flex-col overflow-hidden rounded-sm border border-gray-100 bg-gray-50">
                            <div className="border-b border-gray-100 bg-white py-1 text-center text-[9px] font-bold tracking-[0.2em] text-gray-400 uppercase">
                                ADVERTISEMENT
                            </div>
                            <div className="flex aspect-[5/1] items-center justify-center text-xl font-black tracking-tighter text-gray-300 uppercase italic">
                                News
                                <span className="text-gray-200">Portal</span> Ad
                                Space
                            </div>
                        </div>

                        <CommunitySection news={nationalNews} />
                    </div>

                    <Sidebar
                        trendingNews={trendingNews}
                        latestNews={latestNews}
                    />
                </div>
            </main>

            <Footer categories={categories} />
        </div>
    );
}
