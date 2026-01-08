import { Head, Link } from '@inertiajs/react';
import Footer from '../../components/footer';
import Navbar from '../../components/navbar';

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

export interface Category {
    id: number;
    name: string;
    slug: string;
    description?: string | null;
}

export interface NewsItem {
    id: number;
    category: Category;
    category_id: number;
    user: {
        name: string;
    };
    title: string;
    slug: string;
    thumbnail: string | null;
    content: string;
    excerpt?: string | null;
    published_at: string;
    views: number;
}

interface Props {
    category: Category;
    news: {
        data: NewsItem[];
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
    };
    categories: Category[];
    siteSettings: SiteSettings | null;
}

export default function CategoryPage({
    category,
    news,
    categories,
    siteSettings,
}: Props) {
    return (
        <div className="min-h-screen bg-white font-sans text-gray-900 transition-colors dark:bg-gray-950 dark:text-gray-100">
            <Head>
                <title>{`Berita ${category.name} - ${siteSettings?.site_name || 'Lensa Publik'}`}</title>
                <meta
                    name="description"
                    content={
                        category.description ||
                        `Kumpulan berita terbaru seputar ${category.name}`
                    }
                />
                <meta
                    property="og:title"
                    content={`Berita ${category.name} - ${siteSettings?.site_name || 'Lensa Publik'}`}
                />
                <meta
                    property="og:description"
                    content={
                        category.description ||
                        `Kumpulan berita terbaru seputar ${category.name}`
                    }
                />
                <meta property="og:type" content="website" />
            </Head>

            <Navbar categories={categories} siteSettings={siteSettings} />

            <main className="container mx-auto max-w-7xl px-4 py-8">
                {/* Header */}
                <div className="mb-10 border-b-4 border-red-600 pb-4">
                    <h1 className="text-4xl font-black tracking-tighter text-gray-900 uppercase italic dark:text-white">
                        {category.name}
                    </h1>
                    {category.description && (
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            {category.description}
                        </p>
                    )}
                </div>

                {/* News Grid */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {news.data.map((item) => (
                        <article key={item.id} className="group flex flex-col">
                            <Link
                                href={`/${item.category.slug}/${item.slug}`}
                                className="relative h-48 overflow-hidden bg-gray-100"
                            >
                                {item.thumbnail ? (
                                    <img
                                        src={`/storage/${item.thumbnail}`}
                                        alt={item.title}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center text-gray-400">
                                        No Image
                                    </div>
                                )}
                                <div className="absolute top-4 left-4 bg-red-600 px-2 py-1 text-[10px] font-bold text-white uppercase italic">
                                    {item.category.name}
                                </div>
                            </Link>
                            <div className="flex flex-1 flex-col py-4">
                                <Link
                                    href={`/${item.category.slug}/${item.slug}`}
                                >
                                    <h2 className="line-clamp-2 text-lg leading-tight font-black tracking-tight text-gray-900 transition-colors group-hover:text-red-600">
                                        {item.title}
                                    </h2>
                                </Link>
                                <p className="mt-2 line-clamp-3 text-sm text-gray-600">
                                    {item.excerpt ||
                                        item.content
                                            .replace(/<[^>]*>?/gm, '')
                                            .substring(0, 120) + '...'}
                                </p>
                                <div className="mt-auto pt-4 text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                                    {item.user.name} •{' '}
                                    {new Date(
                                        item.published_at,
                                    ).toLocaleDateString('id-ID', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                    })}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Empty State */}
                {news.data.length === 0 && (
                    <div className="py-20 text-center">
                        <p className="text-gray-500">
                            Belum ada berita di kategori ini.
                        </p>
                    </div>
                )}

                {/* Pagination */}
                {news.links.length > 3 && (
                    <div className="mt-12 flex flex-wrap justify-center gap-2">
                        {news.links.map((link, i) => (
                            <Link
                                key={i}
                                href={link.url || '#'}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className={`rounded-sm px-4 py-2 text-sm font-bold transition-colors ${
                                    link.active
                                        ? 'bg-red-600 text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                } ${!link.url ? 'pointer-events-none cursor-default opacity-50' : ''}`}
                            />
                        ))}
                    </div>
                )}
            </main>

            <Footer categories={categories} siteSettings={siteSettings} />
        </div>
    );
}
