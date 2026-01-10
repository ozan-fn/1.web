import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import { Head, Link } from '@inertiajs/react';
import { Share2 } from 'lucide-react';
import ListCard from './partials/list-card';

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
        // ... (sharing logic remains same)
    };

    return (
        <div className="min-h-screen bg-background font-sans text-foreground transition-all duration-300">
            <Head title={post.title} />

            <Navbar />

            <main className="mx-auto max-w-5xl px-6 py-24 lg:px-0">
                <div className="grid grid-cols-1 gap-24">
                    {/* Main Content - Centered Hero Layout */}
                    <div>
                        <article>
                            <nav className="mb-16 flex items-center gap-6 font-mono text-[11px] font-bold tracking-[0.5em] uppercase">
                                <Link href="/" className="text-muted-foreground transition-colors hover:text-primary">
                                    INDEX
                                </Link>
                                <span className="opacity-20">/</span>
                                <Link href={`/${post.category?.slug}`} className="tracking-[0.2em] text-primary">
                                    {post.category?.name}
                                </Link>
                            </nav>

                            <h1 className="mb-20 text-6xl leading-[0.85] font-bold tracking-tighter text-foreground uppercase sm:text-8xl lg:text-[140px]">{post.title}</h1>

                            <div className="mb-24 flex flex-col gap-12 border-y border-foreground py-16 md:flex-row md:items-center md:justify-between">
                                <div className="flex items-center gap-10">
                                    <div className="flex h-20 w-20 items-center justify-center border-2 border-foreground bg-foreground font-mono text-3xl font-bold text-background italic">{post.user?.name.charAt(0)}</div>
                                    <div className="flex flex-col gap-2">
                                        <span className="font-mono text-[12px] font-bold tracking-[0.3em] uppercase">{post.user?.name}</span>
                                        <span className="font-mono text-[11px] text-muted-foreground uppercase opacity-60">PUBLISHED_{formattedDate}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    {[
                                        {
                                            key: 'facebook',
                                            icon: (
                                                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                                </svg>
                                            ),
                                        },
                                        {
                                            key: 'whatsapp',
                                            icon: (
                                                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.27 9.27 0 01-4.487-1.159l-.323-.192-3.33.873.888-3.245-.211-.336a9.28 9.28 0 01-1.424-4.916c0-5.11 4.156-9.265 9.268-9.265a9.245 9.245 0 016.551 2.716 9.22 9.22 0 012.718 6.556c0 5.11-4.156 9.265-9.268 9.265M12 2.182a10.3 10.3 0 00-10.324 10.311 10.27 10.27 0 001.603 5.53L2 22l4.285-1.124a10.25 10.25 0 005.711 1.698l.004-.001c5.696 0 10.327-4.631 10.327-10.323 0-2.744-1.069-5.323-3.012-7.266A10.23 10.23 0 0012 2.182z" />
                                                </svg>
                                            ),
                                        },
                                        { key: 'copy', icon: <Share2 className="h-4 w-4" /> },
                                    ].map((social) => (
                                        <button key={social.key} className="flex h-14 w-14 items-center justify-center border border-foreground/10 transition-all hover:bg-foreground hover:text-background">
                                            {social.icon}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {post.thumbnail_url && (
                                <figure className="mb-32">
                                    <div className="overflow-hidden border border-foreground/10 grayscale transition-all duration-1000 hover:grayscale-0">
                                        <img src={post.thumbnail_url} alt={post.title} className="w-full transition-transform duration-1000 hover:scale-[1.05]" />
                                    </div>
                                    <figcaption className="mt-8 text-center font-mono text-[10px] font-bold tracking-[0.4em] text-muted-foreground uppercase italic opacity-40">PHOTO_ARCHIVE [10293] / URBAN_JOURNAL_PRESS</figcaption>
                                </figure>
                            )}

                            <div
                                className="mx-auto prose prose-xl max-w-4xl prose-headings:font-bold prose-headings:tracking-tighter prose-headings:uppercase prose-p:mb-12 prose-p:leading-[1.8] prose-p:text-foreground/80 prose-blockquote:border-l-2 prose-blockquote:border-foreground prose-blockquote:pl-12 prose-blockquote:font-mono prose-blockquote:text-lg prose-img:border prose-img:border-foreground/10"
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />

                            {post.tags.length > 0 && (
                                <div className="mt-32 flex flex-wrap justify-center gap-x-12 gap-y-6 border-t border-foreground/10 pt-20">
                                    {post.tags.map((tag) => (
                                        <Link key={tag.id} href={`/tag/${tag.id}`} className="font-mono text-[11px] font-bold tracking-[0.4em] text-foreground uppercase transition-colors hover:text-primary">
                                            #{tag.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </article>

                        {/* Integrated Related News - Centered Grid */}
                        <section className="mt-48 border-t-2 border-foreground pt-32">
                            <div className="mb-24 flex items-end justify-between">
                                <h3 className="text-6xl leading-none font-bold tracking-tighter text-foreground uppercase italic">
                                    Extended
                                    <br />
                                    Reading
                                </h3>
                                <span className="font-mono text-xs font-bold tracking-[0.5em] text-muted-foreground opacity-30">ARCHIVE_SUGGESTIONS</span>
                            </div>
                            <div className="grid grid-cols-1 gap-24 md:grid-cols-2">
                                {relatedPosts.slice(0, 4).map((related) => (
                                    <ListCard key={related.id} item={related as any} />
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
