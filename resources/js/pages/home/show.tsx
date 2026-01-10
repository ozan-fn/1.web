import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';
import { Head, Link } from '@inertiajs/react';
import { Eye, Facebook, Share2, Twitter } from 'lucide-react';
import ListCard from './partials/list-card';
import SectionHeader from './partials/section-header';

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

            <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                    {/* Main Content */}
                    <div className="lg:col-span-8">
                        <article>
                            <div className="mb-6 flex flex-wrap items-center gap-3">
                                <Link href={`/${post.category?.slug}`} className="bg-primary px-4 py-1.5 text-[10px] font-black tracking-[0.2em] text-primary-foreground uppercase shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                                    {post.category?.name}
                                </Link>
                                {subCategory && <span className="border border-border px-3 py-1.5 text-[10px] font-bold tracking-widest text-muted-foreground uppercase">{subCategory.name}</span>}
                            </div>

                            <h1 className="mb-8 text-4xl leading-[1.1] font-black tracking-[-0.03em] text-foreground md:text-5xl lg:text-7xl">{post.title}</h1>

                            <div className="flex flex-col gap-6 border-y border-border py-8 md:flex-row md:items-center md:justify-between">
                                <div className="flex items-center gap-6">
                                    <div className="h-14 w-14 overflow-hidden rounded-full ring-2 ring-primary/20">
                                        <div className="flex h-full w-full items-center justify-center bg-muted text-xl font-black text-muted-foreground uppercase italic">{post.user.name.substring(0, 1)}</div>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase">Penulis</span>
                                        <span className="text-lg font-black italic">{post.user.name}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col md:text-right">
                                    <span className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase">Dirilis Pada</span>
                                    <span className="text-lg font-black italic">{formattedDate}</span>
                                </div>
                            </div>

                            {/* Featured Image Case */}
                            <div className="group relative my-12 overflow-hidden bg-muted">
                                {post.thumbnail_url ? <img src={post.thumbnail_url} alt={post.title} className="w-full object-cover shadow-2xl contrast-110 transition-all duration-700 group-hover:scale-105" /> : <div className="flex aspect-video w-full items-center justify-center text-4xl font-black text-muted-foreground uppercase">No Image</div>}
                                {/* Decorative Frame */}
                                <div className="pointer-events-none absolute inset-4 border border-white/20 transition-all group-hover:inset-6"></div>
                            </div>

                            {/* Content Area */}
                            <div className="prose prose-lg max-w-none md:prose-xl dark:prose-invert prose-headings:font-black prose-headings:tracking-tighter prose-p:leading-relaxed prose-img:shadow-2xl">
                                <div dangerouslySetInnerHTML={{ __html: post.content }} />
                            </div>

                            {/* Share & Stats */}
                            <div className="mt-16 flex flex-col gap-8 border-t border-border pt-12 md:flex-row md:items-center md:justify-between">
                                <div className="flex items-center gap-4">
                                    <span className="text-[10px] font-black tracking-[0.3em] text-muted-foreground uppercase">Bagikan</span>
                                    <div className="flex gap-3">
                                        <button onClick={() => handleShare('facebook')} className="flex h-10 w-10 items-center justify-center border border-border transition-all hover:rotate-12 hover:bg-primary hover:text-primary-foreground">
                                            <Facebook className="h-4 w-4" />
                                        </button>
                                        <button onClick={() => handleShare('twitter')} className="flex h-10 w-10 items-center justify-center border border-border transition-all hover:rotate-12 hover:bg-primary hover:text-primary-foreground">
                                            <Twitter className="h-4 w-4" />
                                        </button>
                                        <button onClick={() => handleShare('whatsapp')} className="flex h-10 w-10 items-center justify-center border border-border transition-all hover:rotate-12 hover:bg-primary hover:text-primary-foreground">
                                            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.27 9.27 0 01-4.487-1.159l-.323-.192-3.33.873.888-3.245-.211-.336a9.28 9.28 0 01-1.424-4.916c0-5.11 4.156-9.265 9.268-9.265a9.245 9.245 0 016.551 2.716 9.22 9.22 0 012.718 6.556c0 5.11-4.156 9.265-9.268 9.265M12 2.182a10.3 10.3 0 00-10.324 10.311 10.27 10.27 0 001.603 5.53L2 22l4.285-1.124a10.25 10.25 0 005.711 1.698l.004-.001c5.696 0 10.327-4.631 10.327-10.323 0-2.744-1.069-5.323-3.012-7.266A10.23 10.23 0 0012 2.182z" />
                                            </svg>
                                        </button>
                                        <button onClick={() => handleShare('copy')} className="flex h-10 w-10 items-center justify-center border border-border transition-all hover:rotate-12 hover:bg-primary hover:text-primary-foreground">
                                            <Share2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <Eye className="h-4 w-4" />
                                        <span className="text-sm font-black italic">{post.views.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Tags Section */}
                            {post.tags.length > 0 && (
                                <div className="mt-12 flex flex-wrap gap-2">
                                    {post.tags.map((tag) => (
                                        <Link key={tag.id} href={`/tag/${tag.name.toLowerCase()}`} className="border border-border px-3 py-1 text-[11px] font-bold tracking-widest text-muted-foreground uppercase transition-all hover:border-primary hover:text-primary">
                                            #{tag.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </article>

                        {/* Related News */}
                        <section className="mt-24">
                            <SectionHeader title="Berita Terhubung" />
                            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                                {relatedPosts.slice(0, 4).map((related) => (
                                    <ListCard key={related.id} item={related as any} />
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-24 space-y-8">
                            <Sidebar trendingNews={trendingNews as any} latestNews={latestNews as any} />
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
