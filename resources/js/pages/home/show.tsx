import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';
import { Head, Link } from '@inertiajs/react';
import { ChevronRight, Share2 } from 'lucide-react';

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
        <div className="min-h-screen bg-background font-sans text-foreground transition-all duration-500">
            <Head title={post.title} />

            <Navbar />

            {/* PROGRESS BAR READ */}
            <div className="sticky top-[80px] z-40 h-1 w-full bg-muted/30">
                <div className="h-full bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)] transition-all duration-300" style={{ width: '30%' }}></div>
            </div>

            <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
                    {/* Main Content */}
                    <div className="lg:col-span-8">
                        {/* REFINED HEADER */}
                        <header className="mb-12">
                            <nav className="mb-8 flex items-center gap-3 text-[10px] font-black tracking-[0.3em] text-muted-foreground uppercase">
                                <Link href="/" className="transition-all hover:text-primary">
                                    Home
                                </Link>
                                <span className="h-1 w-1 rounded-full bg-border"></span>
                                <Link href={`/${post.category?.slug}`} className="text-primary transition-all hover:text-primary">
                                    {post.category?.name}
                                </Link>
                                {subCategory && (
                                    <>
                                        <span className="h-1 w-1 rounded-full bg-border"></span>
                                        <span className="opacity-60">{subCategory.name}</span>
                                    </>
                                )}
                            </nav>

                            <h1 className="mb-8 text-4xl leading-[1.1] font-black tracking-tighter text-foreground italic sm:text-5xl md:text-6xl lg:text-7xl">{post.title}</h1>

                            <div className="flex flex-wrap items-center justify-between gap-6 border-y border-border py-8">
                                <div className="flex items-center gap-4">
                                    <div className="h-14 w-14 overflow-hidden rounded-2xl border border-primary/20 bg-primary/10 p-1">
                                        <div className="flex h-full w-full items-center justify-center rounded-xl bg-primary text-xl font-black text-primary-foreground italic">{post.user?.name.charAt(0)}</div>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-black tracking-tighter text-foreground uppercase">{post.user?.name}</span>
                                        <span className="text-[10px] font-bold text-muted-foreground uppercase opacity-60">Redaksi Insight</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-8">
                                    <div className="flex flex-col items-end">
                                        <span className="mb-1 text-[10px] font-black tracking-widest text-muted-foreground uppercase">Published</span>
                                        <span className="text-xs font-bold">{formattedDate}</span>
                                    </div>
                                    <div className="h-8 w-px bg-border"></div>
                                    <div className="flex flex-col items-end">
                                        <span className="mb-1 text-[10px] font-black tracking-widest text-muted-foreground uppercase">Reading Time</span>
                                        <span className="text-xs font-bold">5 Mins Read</span>
                                    </div>
                                </div>
                            </div>
                        </header>

                        <article>
                            {post.thumbnail_url && (
                                <figure className="group relative mb-16 overflow-hidden rounded-[2.5rem] shadow-2xl">
                                    <img src={post.thumbnail_url} alt={post.title} className="h-auto w-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                                    <figcaption className="absolute bottom-6 left-8 translate-y-4 text-[11px] font-medium text-white/80 italic opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">Source: SWARA Library Archive</figcaption>
                                </figure>
                            )}

                            {/* SHARE BAR FLOATING CONCEPT (Side) */}
                            <div className="relative">
                                <div
                                    className="prose prose-lg max-w-none prose-zinc dark:prose-invert prose-headings:font-black prose-headings:tracking-tighter prose-headings:italic prose-p:text-lg prose-p:leading-[1.9] prose-p:text-foreground/80 prose-blockquote:rounded-r-2xl prose-blockquote:border-l-primary prose-blockquote:bg-muted/30 prose-blockquote:py-2 prose-strong:font-black prose-strong:text-foreground prose-img:rounded-[2rem] prose-img:shadow-xl"
                                    dangerouslySetInnerHTML={{ __html: post.content }}
                                />

                                <div className="mt-20 flex flex-col gap-10 border-t border-border pt-12">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            {post.tags.map((tag) => (
                                                <Link key={tag.id} href={`/tag/${tag.name.toLowerCase()}`} className="rounded-xl bg-muted px-4 py-2 text-[11px] font-black tracking-widest text-foreground uppercase transition-all hover:bg-primary hover:text-primary-foreground">
                                                    #{tag.name}
                                                </Link>
                                            ))}
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <button onClick={() => handleShare('copy')} className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-foreground transition-all hover:bg-primary hover:text-primary-foreground">
                                                <Share2 className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>

                        {/* Related News - DISINI PERBAIKAN WARNA BERITA TERHUBUNG */}
                        <section className="mt-32">
                            <div className="mb-12 flex items-center justify-between">
                                <h3 className="text-3xl font-black tracking-tighter text-foreground uppercase italic">
                                    Deep <span className="mr-2 text-primary">Dive</span> Insight
                                </h3>
                                <div className="ml-10 h-px flex-1 bg-border"></div>
                            </div>
                            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2">
                                {relatedPosts.map((related) => (
                                    <Link key={related.id} href={related.sub_category ? `/${related.category.slug}/${related.sub_category.slug}/${related.slug}` : `/${related.category.slug}/${related.slug}`} className="group relative">
                                        <div className="flex flex-col gap-6">
                                            {related.thumbnail_url && (
                                                <div className="aspect-[16/10] overflow-hidden rounded-[2rem] border border-border bg-muted shadow-sm transition-all group-hover:shadow-2xl">
                                                    <img src={related.thumbnail_url} alt={related.title} className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                                </div>
                                            )}
                                            <div className="flex flex-col gap-3 px-2">
                                                <span className="text-[10px] font-black tracking-widest text-primary uppercase">{related.category?.name}</span>
                                                <h4 className="line-clamp-2 text-xl leading-tight font-black text-foreground italic transition-colors group-hover:text-primary">{related.title}</h4>
                                                <div className="mt-2 flex items-center gap-4 text-[10px] font-bold text-muted-foreground uppercase">
                                                    <span>{new Date(related.published_at).toLocaleDateString('id-ID')}</span>
                                                    <span className="h-1 w-1 rounded-full bg-border"></span>
                                                    <span>5 Min Read</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* RIGHT SIDEBAR AREA */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-32 flex flex-col gap-12">
                            <Sidebar trendingNews={trendingNews as any} latestNews={latestNews as any} />

                            {/* Newsletter Specific to Show Page */}
                            <div className="rounded-[2.5rem] bg-primary p-10 text-primary-foreground shadow-2xl">
                                <h4 className="text-2xl font-black tracking-tighter italic">Stay Inspired.</h4>
                                <p className="mt-4 text-sm leading-relaxed font-medium opacity-80">Jangan lewatkan analisis mendalam selanjutnya. Daftar untuk update mingguan.</p>
                                <button className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-black py-4 text-[11px] font-black tracking-widest text-white uppercase transition-transform hover:scale-105">
                                    Notify Me
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
