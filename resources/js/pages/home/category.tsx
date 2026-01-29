import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';
import { Head, Link, usePage } from '@inertiajs/react'; // Tambah usePage
import { Calendar, Eye, User } from 'lucide-react';
import React from 'react';

// 1. Definisikan Interface SharedProps (Data dari Middleware)
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
    auth: { user: any };
    [key: string]: any;
}

// 2. Interface SiteSettings (Untuk Navbar/Footer)
interface SiteSettings {
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

interface NewsItem {
    id: number;
    title: string;
    slug: string;
    excerpt?: string;
    thumbnail_url: string | null;
    published_at: string;
    views: number;
    category: { name: string; slug: string };
    sub_category: { name: string; slug: string } | null;
    user: { name: string };
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface CategoryProps {
    // Tambahkan categories global untuk menu Navbar
    categories: { id: number; name: string; slug: string }[];

    category: {
        name: string;
        description: string;
        slug: string;
    };
    news: {
        data: NewsItem[];
        links: PaginationLink[];
        current_page: number;
    };
    trendingNews: NewsItem[];
    latestNews: NewsItem[];
}

export default function CategoryPage({ categories, category, news, trendingNews, latestNews }: CategoryProps) {

    // 3. Ambil data Global dari Middleware
    const { app, seo } = usePage<SharedProps>().props;

    // 4. Construct "Fake" SiteSettings (Sama seperti Index.tsx)
    const derivedSiteSettings: SiteSettings = {
        site_name: app.name,
        description: seo.description,
        logo: seo.logo,
        tagline: null,
        email: `redaksi@${app.domain}`,
        phone: null,
        address: null,
        social_facebook: null,
        social_twitter: null,
        social_instagram: null,
        social_youtube: null,
    };

    // Helper URL
    const getPostUrl = (item: NewsItem) => item.sub_category
        ? `/${item.category.slug}/${item.sub_category.slug}/${item.slug}`
        : `/${item.category.slug}/${item.slug}`;

    return (
        <div className="min-h-screen bg-background font-sans text-foreground transition-colors">
            <Head title={category.name} />

            {/* 5. Kirim Props ke Navbar */}
            <Navbar categories={categories} siteSettings={derivedSiteSettings} />

            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

                {/* Breadcrumbs */}
                <nav className="mb-6 flex items-center gap-2 text-xs font-bold tracking-wider text-muted-foreground uppercase">
                    <Link href="/" className="transition-colors hover:text-primary">Home</Link>
                    <span className="opacity-50">/</span>
                    <span className="text-primary">{category.name}</span>
                </nav>

                {/* Header Kategori */}
                <div className="mb-10 border-b-2 border-primary pb-6">
                    <h1 className="text-3xl font-black tracking-tighter uppercase sm:text-4xl">
                        {category.name}
                    </h1>
                    <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
                        {category.description}
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
                    {/* LEFT COLUMN: Daftar Berita */}
                    <div className="lg:col-span-8">
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                            {news.data.length > 0 ? (
                                news.data.map((item) => (
                                    <Link key={item.id} href={getPostUrl(item)} className="group flex flex-col gap-4">
                                        {/* Image Card */}
                                        <div className="relative aspect-[16/10] overflow-hidden rounded-md border border-border bg-muted">
                                            {item.thumbnail_url ? (
                                                <img
                                                    src={item.thumbnail_url}
                                                    alt={item.title}
                                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="flex h-full items-center justify-center text-xs font-bold text-muted-foreground uppercase">
                                                    No Image
                                                </div>
                                            )}

                                            {/* Sub Category Badge */}
                                            {item.sub_category && (
                                                <span className="absolute bottom-2 left-2 rounded-sm bg-black/70 px-2 py-0.5 text-[9px] font-bold text-white uppercase backdrop-blur-sm">
                                                    {item.sub_category.name}
                                                </span>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="flex flex-col gap-2">
                                            {/* Meta Top */}
                                            <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-primary uppercase">
                                                {new Date(item.published_at).toLocaleDateString('id-ID', {
                                                    day: 'numeric', month: 'short', year: 'numeric'
                                                })}
                                            </div>

                                            {/* Title */}
                                            <h2 className="line-clamp-2 text-xl leading-tight font-black transition-colors group-hover:text-primary">
                                                {item.title}
                                            </h2>

                                            {/* Excerpt */}
                                            <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                                                {item.excerpt || 'Klik untuk membaca selengkapnya...'}
                                            </p>

                                            {/* Meta Bottom */}
                                            <div className="mt-2 flex items-center justify-between border-t border-border pt-3 text-[11px] font-medium text-muted-foreground">
                                                <div className="flex items-center gap-1.5">
                                                    <User className="h-3 w-3" />
                                                    <span>{item.user?.name || 'Redaksi'}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <Eye className="h-3 w-3" />
                                                    <span>{item.views}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                /* Empty State */
                                <div className="col-span-full flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 py-20 text-center">
                                    <div className="mb-2 rounded-full bg-muted p-4">
                                        <Calendar className="h-8 w-8 text-muted-foreground" />
                                    </div>
                                    <h3 className="text-lg font-bold">Belum ada berita</h3>
                                    <p className="text-sm text-muted-foreground">Kategori ini belum memiliki artikel yang diterbitkan.</p>
                                </div>
                            )}
                        </div>

                        {/* PAGINATION */}
                        {news.links.length > 3 && (
                            <div className="mt-16 flex justify-center">
                                <div className="flex flex-wrap gap-1 rounded-md border border-border bg-background p-1">
                                    {news.links.map((link, i) => (
                                        link.url ? (
                                            <Link
                                                key={i}
                                                href={link.url}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                                className={`
                                                    flex h-9 min-w-[36px] items-center justify-center rounded-sm px-3 text-xs font-bold transition-colors
                                                    ${link.active
                                                        ? 'bg-primary text-primary-foreground'
                                                        : 'hover:bg-muted text-foreground'
                                                    }
                                                `}
                                            />
                                        ) : (
                                            <span
                                                key={i}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                                className="flex h-9 min-w-[36px] cursor-not-allowed items-center justify-center rounded-sm px-3 text-xs font-bold text-muted-foreground opacity-50"
                                            />
                                        )
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* RIGHT COLUMN: Sidebar */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-24 space-y-8">
                            <Sidebar trendingNews={trendingNews} latestNews={latestNews} />
                        </div>
                    </div>
                </div>
            </main>

            {/* 6. Kirim Props ke Footer */}
            <Footer categories={categories} siteSettings={derivedSiteSettings} />
        </div>
    );
}