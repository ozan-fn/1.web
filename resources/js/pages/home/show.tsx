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
    thumbnail_url: string | null;
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

export default function PostShow({ post, relatedPosts, trendingNews, latestNews }: ShowProps) {
    const formattedDate = new Date(post.published_at).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    const subCategory = post.sub_category || (post as any).subCategory;

    const handleShare = (platform: 'facebook' | 'twitter' | 'whatsapp' | 'copy') => {
        const url = window.location.href;
        const title = post.title;
        const text = `${title}\n\nBaca selengkapnya di: ${url}`;

        switch (platform) {
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
                break;
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
                break;
            case 'whatsapp':
                window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
                break;
            case 'copy':
                if (navigator.share) {
                    navigator.share({ title, text: title, url }).catch(() => {
                        navigator.clipboard.writeText(url);
                    });
                } else {
                    navigator.clipboard.writeText(url);
                    alert('Link berhasil disalin!');
                }
                break;
        }
    };

    return (
        <div className="min-h-screen bg-background font-sans text-foreground transition-colors">
            {/* Meta Tags dihandle app.blade.php */}
            <Head title={post.title} />

            <Navbar />

            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                    {/* Main Content */}
                    <div className="lg:col-span-8">
                        {/* Breadcrumbs */}
                        <nav className="mb-4 flex items-center text-sm text-muted-foreground">
                            <Link href="/" className="transition-colors hover:text-primary">
                                Beranda
                            </Link>
                            <span className="mx-2 opacity-50">/</span>
                            <Link href={`/${post.category?.slug}`} className="transition-colors hover:text-primary">
                                {post.category?.name}
                            </Link>
                            {subCategory && (
                                <>
                                    <span className="mx-2 opacity-50">/</span>
                                    <div className="transition-colors hover:text-primary">{subCategory.name}</div>
                                </>
                            )}
                        </nav>

                        <article>
                            <div className="mb-4 flex items-center gap-2">
                                <Link href={`/${post.category?.slug}`} className="text-sm font-bold text-[#0455A4] uppercase transition-colors hover:text-black dark:hover:text-white">
                                    {post.category?.name}
                                </Link>
                                {subCategory && (
                                    <>
                                        <span className="text-gray-300">|</span>
                                        <div className="text-sm font-medium text-gray-500">{subCategory.name}</div>
                                    </>
                                )}
                            </div>

                            <h1 className="mb-6 text-3xl font-black text-gray-900 leading-[1.2] sm:text-4xl md:text-5xl lg:text-[42px] dark:text-gray-100 tracking-tight">{post.title}</h1>

                            <div className="mb-8">
                                <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="font-bold text-[#0455A4] uppercase tracking-wide">{post.user?.name}</span>
                                    <span className="h-4 w-px bg-gray-200 dark:bg-gray-800"></span>
                                    <span className="font-medium">
                                        {formattedDate} | {new Date(post.published_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB
                                    </span>
                                </div>

                                <div className="mt-8 flex items-center justify-between border-y border-gray-100 py-4 dark:border-gray-800">
                                    <div className="flex items-center gap-4">
                                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Bagikan:</span>
                                        <div className="flex gap-2">
                                            <button onClick={() => handleShare('facebook')} className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1877F2] text-white transition-opacity hover:opacity-90">
                                                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                                </svg>
                                            </button>
                                            <button onClick={() => handleShare('whatsapp')} className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366] text-white transition-opacity hover:opacity-90">
                                                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.27 9.27 0 01-4.487-1.159l-.323-.192-3.33.873.888-3.245-.211-.336a9.28 9.28 0 01-1.424-4.916c0-5.11 4.156-9.265 9.268-9.265a9.245 9.245 0 016.551 2.716 9.22 9.22 0 012.718 6.556c0 5.11-4.156 9.265-9.268 9.265M12 2.182a10.3 10.3 0 00-10.324 10.311 10.27 10.27 0 001.603 5.53L2 22l4.285-1.124a10.25 10.25 0 005.711 1.698l.004-.001c5.696 0 10.327-4.631 10.327-10.323 0-2.744-1.069-5.323-3.012-7.266A10.23 10.23 0 0012 2.182z" />
                                                </svg>
                                            </button>
                                            <button onClick={() => handleShare('twitter')} className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition-opacity hover:opacity-90">
                                                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                                </svg>
                                            </button>
                                            <button onClick={() => handleShare('copy')} className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-[#0455A4] hover:text-white dark:bg-gray-800">
                                                <Share2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-[12px] font-bold text-gray-400">
                                        <Eye className="h-4 w-4" />
                                        <span>{post.views.toLocaleString('id-ID')} Views</span>
                                    </div>
                                </div>
                            </div>

                            {post.thumbnail_url && (
                                <figure className="mb-10 lg:relative lg:-mx-8">
                                    <div className="overflow-hidden rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
                                        <img src={post.thumbnail_url} alt={post.title} className="h-auto w-full object-cover" />
                                    </div>
                                    <figcaption className="mt-4 px-8 text-[13px] text-gray-500 italic border-l-2 border-[#0455A4]">
                                        {post.title}. (Foto: Istimewa)
                                    </figcaption>
                                </figure>
                            )}

                            <div className="prose prose-blue max-w-none text-[18px] leading-[1.85] text-gray-800 dark:text-gray-300 transition-colors prose-headings:font-black prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:mb-6 prose-strong:text-gray-900 dark:prose-strong:text-white prose-a:text-[#0455A4] prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl" dangerouslySetInnerHTML={{ __html: post.content }} />

                            {post.tags.length > 0 && (
                                <div className="mt-12 border-t border-gray-100 pt-8 dark:border-gray-800">
                                    <h4 className="mb-4 text-sm font-bold text-gray-900 dark:text-gray-100 uppercase">Tags:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {post.tags.map((tag) => (
                                            <Link key={tag.id} href={`/tag/${tag.name.toLowerCase()}`} className="rounded px-3 py-1.5 text-sm font-medium bg-gray-100 text-gray-800 transition-colors hover:bg-[#0455A4] hover:text-white dark:bg-gray-800 dark:text-gray-200">
                                                {tag.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </article>

                        {/* Related News */}
                        <section className="mt-16 border-t border-gray-100 pt-10 dark:border-gray-800">
                            <div className="mb-8 flex items-center justify-between">
                                <h3 className="text-xl font-bold text-[#0455A4] uppercase">
                                    Berita Terkait
                                </h3>
                                <div className="ml-6 h-px flex-1 bg-gray-100 dark:bg-gray-800"></div>
                            </div>
                            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
                                {relatedPosts.map((related) => (
                                    <Link key={related.id} href={related.sub_category ? `/${related.category.slug}/${related.sub_category.slug}/${related.slug}` : `/${related.category.slug}/${related.slug}`} className="group">
                                        <div className="flex flex-col gap-4">
                                            {related.thumbnail_url && (
                                                <div className="aspect-[16/9] overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
                                                    <img src={related.thumbnail_url} alt={related.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                                </div>
                                            )}
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[11px] font-bold text-[#0455A4] uppercase">{related.category.name}</span>
                                                <h4 className="line-clamp-2 text-base font-bold text-gray-900 transition-colors group-hover:text-[#0455A4] dark:text-gray-100">{related.title}</h4>
                                                <span className="text-[11px] text-gray-500">{new Date(related.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
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
                            <Sidebar trendingNews={trendingNews} latestNews={latestNews} />
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
