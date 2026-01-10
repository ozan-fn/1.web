import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';
import { Head, Link, usePage } from '@inertiajs/react';
import { Bookmark, Calendar, ChevronRight, Copy, Facebook, Hash, MessageCircle, Share2, Twitter } from 'lucide-react';

// --- Interfaces & Types ---
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
    user: { name: string; avatar?: string; bio?: string }; // Ditambah optional props simulasi
    tags: Tag[];
}

interface ShowProps {
    post: Post;
    relatedPosts: Post[];
    trendingNews: Post[];
    latestNews: Post[];
}

// --- Helper Components ---

const ShareButton = ({ icon: Icon, onClick, className }: { icon: any; onClick: () => void; className?: string }) => (
    <button onClick={onClick} className={`flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-all hover:-translate-y-1 hover:shadow-md ${className}`}>
        <Icon className="h-4 w-4" />
    </button>
);

export default function PostShow({ post, relatedPosts, trendingNews, latestNews }: ShowProps) {
    // Mengambil data global site settings
    const { settings } = usePage<any>().props;

    const handleShare = (platform: 'facebook' | 'twitter' | 'whatsapp' | 'copy') => {
        const url = typeof window !== 'undefined' ? window.location.href : '';
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
                navigator.clipboard.writeText(url);
                alert('Tautan artikel berhasil disalin!');
                break;
        }
    };

    return (
        <div className="min-h-screen bg-background font-sans text-foreground">
            <Head>
                <title>{`${post.title} - ${settings?.site_name || 'News'}`}</title>
                <meta name="description" content={post.content.substring(0, 160).replace(/<[^>]*>?/gm, '')} />
                <meta property="og:image" content={post.thumbnail_url || ''} />
            </Head>

            <Navbar />

            <main className="pb-20">
                {/* --- HEADER SECTION (Centered & Dramatic) --- */}
                <header className="relative w-full border-b border-border/40 bg-muted/10 pt-12 pb-12 lg:pt-20">
                    <div className="container mx-auto max-w-4xl px-4 text-center">
                        {/* Breadcrumb Minimalis */}
                        <div className="mb-6 flex items-center justify-center gap-2 text-xs font-bold tracking-widest text-muted-foreground uppercase">
                            <Link href={`/${post.category?.slug}`} className="text-primary hover:underline">
                                {post.category?.name}
                            </Link>
                            {post.sub_category && (
                                <>
                                    <ChevronRight className="h-3 w-3" />
                                    <Link href={`/${post.category?.slug}/${post.sub_category.slug}`} className="hover:text-foreground">
                                        {post.sub_category.name}
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Judul Besar */}
                        <h1 className="mb-6 text-3xl leading-tight font-black tracking-tighter text-foreground sm:text-4xl md:text-5xl lg:text-6xl">{post.title}</h1>

                        {/* Author & Meta Data */}
                        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 overflow-hidden rounded-full border border-border bg-muted">
                                    {/* Placeholder Avatar - Gunakan inisial jika tidak ada gambar */}
                                    <div className="flex h-full w-full items-center justify-center bg-primary/10 text-sm font-bold text-primary">{post.user.name.charAt(0)}</div>
                                </div>
                                <div className="text-left">
                                    <p className="text-sm font-bold text-foreground">{post.user.name}</p>
                                    <p className="text-xs text-muted-foreground">Redaksi</p>
                                </div>
                            </div>
                            <div className="hidden h-8 w-px bg-border sm:block"></div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="h-4 w-4" />
                                    {new Date(post.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <span className="font-medium text-foreground">{post.views}</span> Dibaca
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* --- CONTENT WRAPPER --- */}
                <div className="container mx-auto max-w-7xl px-4 lg:px-8">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
                        {/* LEFT: Floating Share (Sticky) - Hidden on Mobile */}
                        <div className="hidden lg:col-span-1 lg:block">
                            <div className="sticky top-32 flex flex-col items-center gap-4">
                                <span className="mb-2 rotate-180 text-[10px] font-black tracking-widest text-muted-foreground/50 uppercase" style={{ writingMode: 'vertical-rl' }}>
                                    Bagikan
                                </span>
                                <ShareButton icon={Facebook} onClick={() => handleShare('facebook')} className="hover:border-blue-600 hover:text-blue-600" />
                                <ShareButton icon={Twitter} onClick={() => handleShare('twitter')} className="hover:border-sky-500 hover:text-sky-500" />
                                <ShareButton icon={MessageCircle} onClick={() => handleShare('whatsapp')} className="hover:border-green-500 hover:text-green-500" />
                                <div className="my-2 h-px w-6 bg-border"></div>
                                <ShareButton icon={Copy} onClick={() => handleShare('copy')} />
                                <ShareButton icon={Bookmark} onClick={() => alert('Fitur Bookmark segera hadir')} />
                            </div>
                        </div>

                        {/* CENTER: Main Article */}
                        <article className="lg:col-span-8">
                            {/* Featured Image - Negative Margin Top to overlap header slightly */}
                            {post.thumbnail_url && (
                                <figure className="relative -mt-8 mb-12 overflow-hidden rounded-xl shadow-xl lg:-mt-12">
                                    <img src={post.thumbnail_url} alt={post.title} className="w-full object-cover transition-transform duration-700 hover:scale-105" style={{ maxHeight: '500px' }} />
                                    <figcaption className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-xs text-white/80">Ilustrasi gambar utama artikel.</figcaption>
                                </figure>
                            )}

                            {/* The Content */}
                            <div className="prose prose-lg max-w-none text-foreground dark:prose-invert prose-headings:font-black prose-headings:tracking-tight prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl">
                                <div dangerouslySetInnerHTML={{ __html: post.content }} />
                            </div>

                            {/* Tags */}
                            {post.tags.length > 0 && (
                                <div className="mt-12 flex flex-wrap items-center gap-2 border-y border-border py-6">
                                    <div className="mr-2 flex items-center gap-1 text-primary">
                                        <Hash className="h-4 w-4" />
                                        <span className="text-sm font-bold uppercase">Topik:</span>
                                    </div>
                                    {post.tags.map((tag) => (
                                        <Link key={tag.id} href={`/tag/${tag.name.toLowerCase()}`} className="rounded-full bg-muted px-4 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground">
                                            {tag.name}
                                        </Link>
                                    ))}
                                </div>
                            )}

                            {/* Author Bio Box */}
                            <div className="mt-10 rounded-xl bg-muted/30 p-8 text-center sm:text-left">
                                <div className="flex flex-col items-center gap-6 sm:flex-row">
                                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-background shadow-md">
                                        <div className="flex h-full w-full items-center justify-center bg-primary text-2xl font-bold text-white">{post.user.name.charAt(0)}</div>
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-lg font-bold text-foreground">Tentang Penulis: {post.user.name}</h3>
                                        <p className="text-sm leading-relaxed text-muted-foreground">Jurnalis dan editor konten di {settings?.site_name || 'Portal Berita'}. Berdedikasi untuk menyajikan informasi faktual dan mendalam seputar topik terkini.</p>
                                        <Link href="#" className="inline-block text-xs font-bold text-primary hover:underline">
                                            Lihat semua artikel penulis &rarr;
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Mobile Share Bar (Fixed Bottom) */}
                            <div className="fixed right-0 bottom-0 left-0 z-40 border-t border-border bg-background/80 p-3 backdrop-blur-md lg:hidden">
                                <div className="flex justify-evenly">
                                    <button onClick={() => handleShare('whatsapp')} className="flex flex-col items-center gap-1 text-xs text-muted-foreground hover:text-primary">
                                        <MessageCircle className="h-5 w-5" /> WA
                                    </button>
                                    <button onClick={() => handleShare('facebook')} className="flex flex-col items-center gap-1 text-xs text-muted-foreground hover:text-primary">
                                        <Facebook className="h-5 w-5" /> FB
                                    </button>
                                    <button onClick={() => handleShare('twitter')} className="flex flex-col items-center gap-1 text-xs text-muted-foreground hover:text-primary">
                                        <Twitter className="h-5 w-5" /> X
                                    </button>
                                    <button onClick={() => handleShare('copy')} className="flex flex-col items-center gap-1 text-xs text-muted-foreground hover:text-primary">
                                        <Share2 className="h-5 w-5" /> Share
                                    </button>
                                </div>
                            </div>
                        </article>

                        {/* RIGHT: Sidebar (Sticky) */}
                        <aside className="lg:col-span-3">
                            <div className="sticky top-32 space-y-8">
                                {/* Baca Juga Card */}
                                <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                                    <div className="mb-4 flex items-center gap-2 border-b border-border pb-2">
                                        <div className="h-2 w-2 animate-pulse rounded-full bg-primary"></div>
                                        <h3 className="text-sm font-black tracking-widest uppercase">Wajib Baca</h3>
                                    </div>
                                    <div className="flex flex-col gap-6">
                                        {trendingNews.slice(0, 4).map((item, idx) => (
                                            <Link key={item.id} href={`/${item.category.slug}/${item.slug}`} className="group flex gap-3">
                                                <span className="text-2xl font-black text-muted-foreground/20 transition-colors group-hover:text-primary/50">{idx + 1}</span>
                                                <div>
                                                    <h4 className="line-clamp-3 text-sm leading-tight font-bold transition-colors group-hover:text-primary">{item.title}</h4>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                {/* Iklan / Banner Space */}
                                <div className="flex aspect-square w-full items-center justify-center rounded-xl bg-muted/50 text-xs font-medium text-muted-foreground">Space Iklan</div>

                                <Sidebar trendingNews={[]} latestNews={latestNews} />
                            </div>
                        </aside>
                    </div>
                </div>

                {/* --- RELATED POSTS SECTION (Full Width Darker BG) --- */}
                <section className="mt-20 border-t border-border bg-muted/30 py-16">
                    <div className="container mx-auto max-w-7xl px-4 lg:px-8">
                        <div className="mb-10 flex items-center justify-between">
                            <h2 className="text-2xl font-black tracking-tight uppercase sm:text-3xl">Berita Terkait</h2>
                            <Link href="/" className="text-sm font-bold text-primary hover:underline">
                                Lihat Index &rarr;
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {relatedPosts.map((related) => (
                                <Link key={related.id} href={`/${related.category.slug}/${related.slug}`} className="group flex flex-col overflow-hidden rounded-lg bg-background shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                                    <div className="aspect-[3/2] overflow-hidden">{related.thumbnail_url ? <img src={related.thumbnail_url} alt={related.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" /> : <div className="flex h-full w-full items-center justify-center bg-muted text-xs text-muted-foreground">NO IMAGE</div>}</div>
                                    <div className="flex flex-1 flex-col p-4">
                                        <span className="mb-2 text-[10px] font-black tracking-widest text-primary uppercase">{related.category.name}</span>
                                        <h3 className="mb-2 line-clamp-3 text-base leading-snug font-bold group-hover:text-primary">{related.title}</h3>
                                        <div className="mt-auto pt-4 text-xs text-muted-foreground">{new Date(related.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long' })}</div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
