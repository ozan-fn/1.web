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
    category_id: number;
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
                        {/* Breadcrumbs - Clean Modern */}
                        <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
                            <Link href="/" className="transition-colors hover:text-primary">
                                Beranda
                            </Link>
                            <span>/</span>
                            <Link href={`/${post.category?.slug}`} className="transition-colors hover:text-primary">
                                {post.category?.name}
                            </Link>
                            {subCategory && (
                                <>
                                    <span>/</span>
                                    <div className="text-foreground">{subCategory.name}</div>
                                </>
                            )}
                        </nav>

                        <article>
                            {/* Category Badge Modern */}
                            <div className="mb-4 flex items-center gap-2">
                                <Link href={`/${post.category?.slug}`} className="inline-flex items-center rounded-full bg-primary px-4 py-1.5 text-xs font-bold text-primary-foreground transition-all hover:bg-primary/90">
                                    {post.category?.name}
                                </Link>
                                {subCategory && <span className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">{subCategory.name}</span>}
                            </div>

                            {/* Title - Modern Clean */}
                            <h1 className="mb-6 font-serif text-4xl leading-tight font-bold text-foreground sm:text-5xl md:text-5xl lg:text-6xl">{post.title}</h1>

                            {/* Meta Info - Clean */}
                            <div className="mb-8">
                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                    <span className="font-semibold text-foreground">{post.user?.name}</span>
                                    <span>•</span>
                                    <span>
                                        {formattedDate} • {new Date(post.published_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB
                                    </span>
                                    <span>•</span>
                                    <div className="flex items-center gap-1">
                                        <Eye className="h-4 w-4" />
                                        <span>{post.views}</span>
                                    </div>
                                </div>

                                {/* Share Buttons - Modern Rounded */}
                                <div className="mt-6 flex items-center gap-3 rounded-2xl bg-muted/50 p-4">
                                    <span className="text-xs font-bold text-muted-foreground">Bagikan:</span>
                                    <div className="flex gap-2">
                                        <button onClick={() => handleShare('facebook')} className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1877F2] text-white transition-transform hover:scale-110">
                                            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                            </svg>
                                        </button>
                                        <button onClick={() => handleShare('twitter')} className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition-transform hover:scale-110">
                                            <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                            </svg>
                                        </button>
                                        <button onClick={() => handleShare('whatsapp')} className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] text-white transition-transform hover:scale-110">
                                            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.27 9.27 0 01-4.487-1.159l-.323-.192-3.33.873.888-3.245-.211-.336a9.28 9.28 0 01-1.424-4.916c0-5.11 4.156-9.265 9.268-9.265a9.245 9.245 0 016.551 2.716 9.22 9.22 0 012.718 6.556c0 5.11-4.156 9.265-9.268 9.265M12 2.182a10.3 10.3 0 00-10.324 10.311 10.27 10.27 0 001.603 5.53L2 22l4.285-1.124a10.25 10.25 0 005.711 1.698l.004-.001c5.696 0 10.327-4.631 10.327-10.323 0-2.744-1.069-5.323-3.012-7.266A10.23 10.23 0 0012 2.182z" />
                                            </svg>
                                        </button>
                                        <button onClick={() => handleShare('copy')} className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-transform hover:scale-110">
                                            <Share2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Featured Image - Modern Rounded */}
                            {post.thumbnail_url && (
                                <figure className="mb-10">
                                    <div className="overflow-hidden rounded-2xl shadow-lg">
                                        <img src={post.thumbnail_url} alt={post.title} className="h-auto w-full object-cover" />
                                    </div>
                                    <figcaption className="mt-3 text-sm text-muted-foreground italic">Ilustrasi {post.title}. (Foto: Istimewa)</figcaption>
                                </figure>
                            )}

                            {/* Content - Clean Prose */}
                            <div className="prose max-w-none text-base leading-relaxed text-foreground/90 prose-red dark:prose-invert prose-headings:font-bold prose-headings:text-foreground prose-p:mb-5 prose-a:text-primary prose-strong:text-foreground prose-img:rounded-2xl" dangerouslySetInnerHTML={{ __html: post.content }} />

                            {/* Tags - Modern Pills */}
                            {post.tags.length > 0 && (
                                <div className="mt-12 rounded-2xl bg-muted/50 p-6">
                                    <h4 className="mb-4 text-sm font-bold text-foreground">Tags:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {post.tags.map((tag) => (
                                            <Link key={tag.id} href={`/tag/${tag.name.toLowerCase()}`} className="rounded-full bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-all hover:bg-primary hover:text-primary-foreground">
                                                {tag.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </article>

                        {/* Related News - Modern Card Grid */}
                        <section className="mt-16 rounded-2xl bg-muted/30 p-8">
                            <div className="mb-8">
                                <h3 className="mb-2 font-sans text-2xl font-bold text-foreground">
                                    Berita <span className="text-primary">Terkait</span>
                                </h3>
                                <div className="h-1 w-20 rounded-full bg-primary"></div>
                            </div>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                {relatedPosts.map((related) => (
                                    <Link key={related.id} href={related.sub_category ? `/${related.category.slug}/${related.sub_category.slug}/${related.slug}` : `/${related.category.slug}/${related.slug}`} className="group flex flex-col overflow-hidden rounded-2xl bg-card shadow-md transition-all hover:shadow-xl">
                                        {related.thumbnail_url && (
                                            <div className="aspect-[16/9] overflow-hidden">
                                                <img src={related.thumbnail_url} alt={related.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                            </div>
                                        )}
                                        <div className="flex flex-col gap-3 p-5">
                                            <span className="inline-flex w-fit items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">{related.category.name}</span>
                                            <h4 className="line-clamp-2 font-serif text-lg leading-snug font-bold text-foreground transition-colors group-hover:text-primary">{related.title}</h4>
                                            <span className="text-xs text-muted-foreground">{new Date(related.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
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
