import { Head, Link, usePage } from '@inertiajs/react';
import Footer from '../../components/footer';
import Navbar from '../../components/navbar';
import Sidebar from '../../components/sidebar';
import CategorySection from './partials/category-section';
import HeroSection from './partials/hero-section';
import { Category, NewsItem } from './partials/types';

// 1. Definisikan Tipe Data dari Middleware (HandleInertiaRequests)
interface SharedProps {
    app: {
        name: string;
        url: string;
        domain: string;
    };
    seo: {
        title: string;
        description: string;
        logo: string;
    };
    // Kita tambahkan ini agar TypeScript tidak marah saat mapping ke SiteSettings lama
    auth: { user: any };
    [key: string]: any;
}

// Interface props halaman (dari Controller)
interface Props {
    heroNews: NewsItem | null;
    sideHeroNews: NewsItem[];
    trendingNews: NewsItem[];
    latestNews: NewsItem[];
    categories: Category[];
    homepageCategories: Category[];
}

// Interface lama untuk Navbar/Footer (biarkan dulu agar tidak perlu refactor komponen lain)
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

export default function Index({
    heroNews,
    sideHeroNews = [],
    trendingNews = [],
    latestNews = [],
    categories = [],
    homepageCategories = []
}: Props) {
    // 2. Ambil data Global dari Middleware menggunakan usePage
    const { app, seo } = usePage<SharedProps>().props;

    // 3. Construct "Fake" SiteSettings dari data Middleware
    // Ini agar Navbar & Footer tetap jalan tanpa error meskipun database SiteSetting dihapus.
    const derivedSiteSettings: SiteSettings = {
        site_name: app.name,          // "Rumah", "Toko", dll (Otomatis)
        description: seo.description, // Otomatis
        logo: seo.logo,               // Otomatis generate text/image path
        tagline: null,                // Bisa diisi manual atau null
        email: `admin@${app.domain}`, // Contoh generate email otomatis
        phone: null,
        address: null,
        social_facebook: null,
        social_twitter: null,
        social_instagram: null,
        social_youtube: null,
    };

    return (
        <div className="min-h-screen bg-background font-sans text-foreground transition-colors">
            {/* 4. Update Head dengan data SEO dari Middleware */}
            <Head>
                <title>{seo.title}</title>
                <meta name="description" content={seo.description} />
                {/* Meta OpenGraph standar */}
                <meta property="og:title" content={seo.title} />
                <meta property="og:description" content={seo.description} />
                <meta property="og:site_name" content={app.name} />
            </Head>

            {/* Kirim derived settings ke Navbar */}
            <Navbar categories={categories} siteSettings={derivedSiteSettings} />

            <main className="container mx-auto max-w-7xl px-4 py-6">
                {/* HERO SECTION */}
                {heroNews && <HeroSection heroNews={heroNews} sideHeroNews={sideHeroNews} />}

                {/* GRID CONTENT LAYOUT */}
                <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12">
                    {/* LEFT COLUMN (Daftar Kategori Berita) */}
                    <div className="space-y-14 lg:col-span-8">
                        {homepageCategories.map((category) => (
                            <section key={category.id} className="scroll-mt-20">
                                {/* HEADER KATEGORI */}
                                <div className="mb-6 flex items-end justify-between border-b border-border pb-3">
                                    <div className="relative">
                                        <h2 className="text-2xl font-black tracking-tighter uppercase italic">
                                            {category.name}
                                        </h2>
                                        {/* Garis aksen bawah judul */}
                                        <div className="absolute -bottom-[3px] left-0 h-[3px] w-12 bg-primary"></div>
                                    </div>

                                    <Link
                                        href={`/${category.slug}`}
                                        className="group flex items-center gap-1 text-[11px] font-black tracking-widest text-muted-foreground uppercase transition-colors hover:text-primary"
                                    >
                                        Lihat Semua
                                        <span className="text-lg leading-none transition-transform group-hover:translate-x-1">›</span>
                                    </Link>
                                </div>

                                <CategorySection category={category} />
                            </section>
                        ))}
                    </div>

                    {/* RIGHT COLUMN (Sidebar) */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-24">
                            <Sidebar trendingNews={trendingNews} latestNews={latestNews} />
                        </div>
                    </div>
                </div>
            </main>

            <Footer categories={categories} siteSettings={derivedSiteSettings} />
        </div>
    );
}