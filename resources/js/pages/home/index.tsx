import Footer from '../../components/footer';
import Navbar from '../../components/navbar';
import Sidebar from '../../components/sidebar';
import CommunitySection from './partials/community-section';
import HeroSection from './partials/hero-section';
import InnovationSection from './partials/innovation-section';
import NationalNews from './partials/national-news';
import StoryCategories from './partials/story-categories';
import { NewsItem } from './partials/types';

// --- 2. MOCK DATA (DATA DUMMY UNTUK PROTOTYPE) ---

const HERO_NEWS: NewsItem = {
    id: 1,
    category: 'Kampus',
    title: 'Mahasiswa Berprestasi Lensapublik.ac.id Raih Penghargaan Internasional di Ajang Inovasi Teknologi',
    imageUrl: 'https://placehold.co/800x500',
};

const SIDE_HERO_NEWS: NewsItem[] = [
    {
        id: 2,
        category: 'Akademik',
        title: 'Rektorat Umumkan Kebijakan Baru Terkait Kurikulum Merdeka Belajar',
        imageUrl: 'https://placehold.co/400x250',
    },
    {
        id: 3,
        category: 'Beasiswa',
        title: 'Pendaftaran Beasiswa Unggulan Telah Dibuka, Simak Syarat Lengkapnya',
        imageUrl: 'https://placehold.co/400x250',
    },
];

const NASIONAL_NEWS: NewsItem[] = Array.from({ length: 4 }).map((_, i) => ({
    id: i + 10,
    category: i % 2 === 0 ? 'Pendidikan' : 'Riset',
    title: 'Kementerian Pendidikan Dorong Digitalisasi Kampus di Seluruh Indonesia',
    imageUrl: `https://placehold.co/300x200?text=News+${i + 10}`,
    timestamp: `${i + 1} Jam yang lalu`,
}));

const LINTAS_DAERAH: NewsItem[] = Array.from({ length: 4 }).map((_, i) => ({
    id: i + 20,
    category: 'Pengabdian',
    title: 'KKN Mahasiswa di Desa Binong Berhasil Tingkatkan UMKM Lokal',
    imageUrl: `https://placehold.co/400x300?text=Daerah+${i + 20}`,
    timestamp: '3 Hari yang lalu',
}));

const CATEGORIES = [
    'Trending',
    'Akademik',
    'Mahasiswa',
    'Beasiswa',
    'Riset',
    'Pengabdian',
    'Opini',
    'Kampus',
    'Teknologi',
];

// --- 4. MAIN PAGE COMPONENT ---

import VideoSection from './partials/video-section';

export default function Index() {
    return (
        <div className="min-h-screen overflow-x-hidden bg-[#f3f4f6] font-sans text-gray-900">
            <Navbar />

            {/* MAIN CONTENT */}
            <main className="container mx-auto max-w-7xl px-4 py-6">
                {/* Banner Ad */}
                <div className="mb-8 w-full overflow-hidden rounded-xl shadow-sm">
                    <img
                        src="https://placehold.co/1200x150?text=Iklan+Penerimaan+Mahasiswa+Baru"
                        alt="Ads"
                        className="h-auto min-h-[100px] w-full object-cover"
                    />
                </div>

                <StoryCategories categories={CATEGORIES} />

                <HeroSection
                    heroNews={HERO_NEWS}
                    sideHeroNews={SIDE_HERO_NEWS}
                />

                {/* GRID CONTENT LAYOUT */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                    {/* LEFT COLUMN (Main Feed) */}
                    <div className="space-y-10 lg:col-span-8">
                        <NationalNews news={NASIONAL_NEWS} />

                        <VideoSection />

                        <InnovationSection news={NASIONAL_NEWS} />

                        {/* Horizontal Ad */}
                        <div className="flex aspect-[5/1] w-full items-center justify-center rounded-lg border border-gray-300 bg-gray-200 font-bold text-gray-400">
                            SPACE IKLAN KAMPUS
                        </div>

                        <CommunitySection news={LINTAS_DAERAH} />
                    </div>

                    <Sidebar />
                </div>
            </main>

            <Footer />
        </div>
    );
}
