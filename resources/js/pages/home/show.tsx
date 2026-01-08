import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';
import { Head, Link } from '@inertiajs/react';
import { Eye, Share2 } from 'lucide-react';

interface Tag {
    id: number;
    name: string;
}

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface Post {
    id: number;
    title: string;
    slug: string;
    content: string;
    thumbnail: string | null;
    published_at: string;
    views: number;
    category: Category;
    sub_category: Category | null;
    user: { name: string };
    tags: Tag[];
}

interface ShowProps {
    post: Post;
    relatedPosts: Post[];
    trendingNews: Post[];
    latestNews: Post[];
}

export default function PostShow({
    post,
    relatedPosts,
    trendingNews,
    latestNews,
}: ShowProps) {
    const formattedDate = new Date(post.published_at).toLocaleDateString(
        'id-ID',
        {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        },
    );

    // Check both snake_case and camelCase just in case
    const subCategory = post.sub_category || (post as any).subCategory;

    return (
        <div className="min-h-screen bg-white font-sans text-gray-900 transition-colors dark:bg-gray-950 dark:text-gray-100">
            <Head>
                <title>{post.title}</title>
                <meta name="description" content={post.title} />
                <meta property="og:title" content={post.title} />
                <meta property="og:description" content={post.title} />
                {post.thumbnail && (
                    <meta
                        property="og:image"
                        content={`/storage/${post.thumbnail}`}
                    />
                )}
                <meta property="og:type" content="article" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={post.title} />
                <meta name="twitter:description" content={post.title} />
                {post.thumbnail && (
                    <meta
                        name="twitter:image"
                        content={`/storage/${post.thumbnail}`}
                    />
                )}
            </Head>

            <Navbar />

            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                    {/* Main Content */}
                    <div className="lg:col-span-8">
                        {/* Breadcrumbs */}
                        <nav className="mb-4 flex text-sm text-gray-500 dark:text-gray-400">
                            <Link href="/" className="hover:text-red-600">
                                Beranda
                            </Link>
                            <span className="mx-2">/</span>
                            <Link
                                href={`/${post.category?.slug}`}
                                className="hover:text-red-600"
                            >
                                {post.category?.name}
                            </Link>
                            {subCategory && (
                                <>
                                    <span className="mx-2">/</span>
                                    <Link
                                        href={`/${post.category?.slug}/${subCategory.slug}`}
                                        className="hover:text-red-600"
                                    >
                                        {subCategory.name}
                                    </Link>
                                </>
                            )}
                        </nav>

                        <article className="bg-white dark:bg-gray-950">
                            {/* Category Label */}
                            <div className="mb-2 flex items-center gap-2">
                                <Link
                                    href={`/${post.category?.slug}`}
                                    className="text-sm font-bold tracking-widest text-red-600 uppercase transition-colors hover:text-red-700 dark:text-red-500"
                                >
                                    {post.category?.name}
                                </Link>
                                {subCategory && (
                                    <>
                                        <span className="text-gray-300 dark:text-gray-700">
                                            |
                                        </span>
                                        <Link
                                            href={`/${post.category?.slug}/${subCategory.slug}`}
                                            className="text-sm font-medium text-gray-500 hover:text-red-600 dark:text-gray-400"
                                        >
                                            {subCategory.name}
                                        </Link>
                                    </>
                                )}
                            </div>

                            <h1 className="mb-4 text-3xl leading-[1.15] font-black text-gray-900 sm:text-4xl md:text-5xl lg:text-[42px] dark:text-white">
                                {post.title}
                            </h1>

                            <div className="mb-6 focus:outline-none">
                                <div className="flex items-center gap-2 text-[13px] text-gray-500 dark:text-gray-400">
                                    <span className="font-bold text-gray-900 underline decoration-red-600 decoration-2 underline-offset-4 dark:text-gray-200">
                                        {post.user?.name}
                                    </span>
                                    <span className="text-gray-300 dark:text-gray-700">
                                        |
                                    </span>
                                    <span className="font-medium tracking-tight uppercase">
                                        {formattedDate} |{' '}
                                        {new Date(
                                            post.published_at,
                                        ).toLocaleTimeString('id-ID', {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}{' '}
                                        WIB
                                    </span>
                                </div>
                                <div className="mt-6 flex items-center gap-4 border-y border-gray-100 py-4">
                                    <span className="text-[11px] font-black tracking-widest text-gray-400 uppercase">
                                        BAGIKAN:
                                    </span>
                                    <div className="flex gap-2">
                                        <button className="flex h-8 w-8 items-center justify-center rounded-sm bg-[#1877F2] text-white transition-transform hover:-translate-y-1">
                                            <svg
                                                className="h-4 w-4 fill-current"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                            </svg>
                                        </button>
                                        <button className="flex h-8 w-8 items-center justify-center rounded-sm bg-[#1DA1F2] text-white transition-transform hover:-translate-y-1">
                                            <svg
                                                className="h-4 w-4 fill-current"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                            </svg>
                                        </button>
                                        <button className="flex h-8 w-8 items-center justify-center rounded-sm bg-[#25D366] text-white transition-transform hover:-translate-y-1">
                                            <svg
                                                className="h-4 w-4 fill-current"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.27 9.27 0 01-4.487-1.159l-.323-.192-3.33.873.888-3.245-.211-.336a9.28 9.28 0 01-1.424-4.916c0-5.11 4.156-9.265 9.268-9.265a9.245 9.245 0 016.551 2.716 9.22 9.22 0 012.718 6.556c0 5.11-4.156 9.265-9.268 9.265M12 2.182a10.3 10.3 0 00-10.324 10.311 10.27 10.27 0 001.603 5.53L2 22l4.285-1.124a10.25 10.25 0 005.711 1.698l.004-.001c5.696 0 10.327-4.631 10.327-10.323 0-2.744-1.069-5.323-3.012-7.266A10.23 10.23 0 0012 2.182z" />
                                            </svg>
                                        </button>
                                        <button className="flex h-8 w-8 items-center justify-center rounded-sm bg-gray-100 text-gray-500 transition-colors hover:bg-gray-900 hover:text-white">
                                            <Share2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                    <div className="ml-auto flex items-center gap-1.5 text-[12px] font-bold text-gray-400">
                                        <Eye className="h-4 w-4" />
                                        <span>{post.views}</span>
                                    </div>
                                </div>
                            </div>

                            {post.thumbnail && (
                                <figure className="mb-8">
                                    <div className="overflow-hidden rounded-lg shadow-sm">
                                        <img
                                            src={`/storage/${post.thumbnail}`}
                                            alt={post.title}
                                            className="h-auto w-full object-cover"
                                        />
                                    </div>
                                    <figcaption className="mt-3 text-[13px] leading-relaxed text-gray-500 italic">
                                        Ilustrasi {post.title}. (Foto: Istimewa)
                                    </figcaption>
                                </figure>
                            )}

                            <div
                                className="quill-content prose prose-red prose-p:mb-6 prose-strong:text-gray-900 max-w-none text-[17px] leading-[1.8] text-[#333]"
                                dangerouslySetInnerHTML={{
                                    __html: post.content,
                                }}
                            />

                            {/* Tags */}
                            {post.tags.length > 0 && (
                                <div className="mt-12 border-t border-gray-100 pt-8">
                                    <h4 className="mb-4 text-sm font-bold tracking-wider text-gray-900 uppercase">
                                        TAGS:
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {post.tags.map((tag) => (
                                            <Link
                                                key={tag.id}
                                                href={`/tag/${tag.name.toLowerCase()}`}
                                                className="rounded-sm bg-gray-100 px-3 py-1.5 text-[13px] font-semibold text-gray-700 transition-colors hover:bg-red-600 hover:text-white"
                                            >
                                                {tag.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </article>

                        {/* Related News */}
                        <section className="mt-16 border-t border-gray-100 pt-10">
                            <div className="mb-8 flex items-center justify-between">
                                <h3 className="text-xl font-black tracking-tight text-gray-900 uppercase">
                                    Berita{' '}
                                    <span className="text-red-600">
                                        Terhubung
                                    </span>
                                </h3>
                                <div className="ml-6 h-px flex-1 bg-gray-100"></div>
                            </div>
                            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:gap-12">
                                {relatedPosts.map((related) => (
                                    <Link
                                        key={related.id}
                                        href={
                                            related.sub_category
                                                ? `/${related.category.slug}/${related.sub_category.slug}/${related.slug}`
                                                : `/${related.category.slug}/${related.slug}`
                                        }
                                        className="group"
                                    >
                                        <div className="flex flex-col gap-4">
                                            {related.thumbnail && (
                                                <div className="aspect-[16/9] overflow-hidden rounded-md shadow-sm">
                                                    <img
                                                        src={`/storage/${related.thumbnail}`}
                                                        alt={related.title}
                                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    />
                                                </div>
                                            )}
                                            <div className="flex flex-col gap-2">
                                                <span className="text-[11px] font-bold tracking-wider text-red-600 uppercase">
                                                    {related.category.name}
                                                </span>
                                                <h4 className="line-clamp-2 text-lg leading-snug font-extrabold text-gray-900 group-hover:text-red-700">
                                                    {related.title}
                                                </h4>
                                                <span className="text-[12px] text-gray-400">
                                                    {new Date(
                                                        related.published_at,
                                                    ).toLocaleDateString(
                                                        'id-ID',
                                                        {
                                                            day: 'numeric',
                                                            month: 'long',
                                                            year: 'numeric',
                                                        },
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-24 space-y-8">
                            <Sidebar
                                trendingNews={trendingNews}
                                latestNews={latestNews}
                            />
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
