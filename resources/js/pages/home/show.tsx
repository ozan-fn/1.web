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
        <div className="min-h-screen bg-background font-sans text-foreground">
            <Head title={post.title} />

            <Navbar />

            <main className="mx-auto max-w-7xl px-4 py-8">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                    {/* Main Content */}
                    <div className="lg:col-span-8">
                        {/* Breadcrumbs */}
                        <nav className="mb-6 flex items-center text-[13px] font-bold tracking-tight text-muted-foreground uppercase">
                            <Link href="/" className="text-blue-700 hover:underline">
                                Beranda
                            </Link>
                            <span className="mx-2 text-slate-300">/</span>
                            <Link href={`/category/${post.category?.slug}`} className="text-blue-700 hover:underline">
                                {post.category?.name}
                            </Link>
                            {subCategory && (
                                <>
                                    <span className="mx-2 text-slate-300">/</span>
                                    <span className="text-slate-400">{subCategory.name}</span>
                                </>
                            )}
                        </nav>

                        <article>
                            <h1 className="mb-4 text-3xl leading-tight font-black tracking-tight text-foreground sm:text-4xl md:text-5xl">{post.title}</h1>

                            <div className="mb-8">
                                <div className="flex items-center gap-2 text-[14px] font-medium text-slate-500">
                                    <span className="font-bold text-blue-700">{post.user?.name}</span>
                                    <span className="text-slate-300">-</span>
                                    <span className="uppercase">
                                        {formattedDate} | {new Date(post.published_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB
                                    </span>
                                </div>

                                <div className="mt-6 flex items-center gap-4 border-y border-slate-100 py-4">
                                    <div className="flex gap-2">
                                        <button onClick={() => handleShare('facebook')} className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1877F2] text-white transition-opacity hover:opacity-90">
                                            <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                            </svg>
                                        </button>
                                        <button onClick={() => handleShare('twitter')} className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition-opacity hover:opacity-90">
                                            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                            </svg>
                                        </button>
                                        <button onClick={() => handleShare('whatsapp')} className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] text-white transition-opacity hover:opacity-90">
                                            <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.27 9.27 0 01-4.487-1.159l-.323-.192-3.33.873.888-3.245-.211-.336a9.28 9.28 0 01-1.424-4.916c0-5.11 4.156-9.265 9.268-9.265a9.245 9.245 0 016.551 2.716 9.22 9.22 0 012.718 6.556c0 5.11-4.156 9.265-9.268 9.265M12 2.182a10.3 10.3 0 00-10.324 10.311 10.27 10.27 0 001.603 5.53L2 22l4.285-1.124a10.25 10.25 0 005.711 1.698l.004-.001c5.696 0 10.327-4.631 10.327-10.323 0-2.744-1.069-5.323-3.012-7.266A10.23 10.23 0 0012 2.182z" />
                                            </svg>
                                        </button>
                                        <button onClick={() => handleShare('copy')} className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200">
                                            <Share2 className="h-5 w-5" />
                                        </button>
                                    </div>
                                    <div className="ml-auto flex items-center gap-1.5 text-[14px] font-bold text-slate-400">
                                        <Eye className="h-5 w-5" />
                                        <span>{post.views}</span>
                                    </div>
                                </div>
                            </div>

                            {post.thumbnail_url && (
                                <figure className="mb-10 text-center">
                                    <div className="overflow-hidden rounded-xl border border-slate-100 shadow-sm">
                                        <img src={post.thumbnail_url} alt={post.title} className="h-auto w-full object-cover" />
                                    </div>
                                    <figcaption className="mt-4 text-[14px] text-slate-500 italic">Foto: {post.title} (Istimewa)</figcaption>
                                </figure>
                            )}

                            <div className="prose max-w-none text-[18px] leading-[1.8] text-slate-800 prose-blue prose-img:rounded-2xl" dangerouslySetInnerHTML={{ __html: post.content }} />

                            {post.tags.length > 0 && (
                                <div className="mt-12 flex flex-wrap gap-2 border-t border-slate-100 pt-8">
                                    {post.tags.map((tag) => (
                                        <Link key={tag.id} href={`/tag/${tag.name.toLowerCase()}`} className="rounded-full bg-slate-100 px-4 py-1.5 text-[14px] font-bold text-slate-600 transition-colors hover:bg-blue-700 hover:text-white">
                                            #{tag.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </article>

                        {/* Related News */}
                        <section className="mt-20">
                            <div className="mb-8 flex items-center border-b-2 border-blue-700 pb-2">
                                <h3 className="text-xl font-black text-foreground uppercase">
                                    Berita <span className="text-blue-700">Terkait</span>
                                </h3>
                            </div>
                            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
                                {relatedPosts.map((related) => (
                                    <Link key={related.id} href={related.sub_category ? `/${related.category.slug}/${related.sub_category.slug}/${related.slug}` : `/${related.category.slug}/${related.slug}`} className="group">
                                        <div className="flex flex-col gap-4">
                                            {related.thumbnail_url && (
                                                <div className="aspect-video overflow-hidden rounded-xl border border-slate-100 shadow-sm">
                                                    <img src={related.thumbnail_url} alt={related.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                                </div>
                                            )}
                                            <div className="flex flex-col gap-2">
                                                <h4 className="line-clamp-2 text-lg leading-snug font-extrabold group-hover:text-blue-700">{related.title}</h4>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-28">
                            <Sidebar trendingNews={trendingNews as any} latestNews={latestNews as any} />
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
