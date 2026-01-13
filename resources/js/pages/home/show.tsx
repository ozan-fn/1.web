import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';
import { Head, Link } from '@inertiajs/react';
import { Eye, Share2 } from 'lucide-react';
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
        <div className="min-h-screen bg-background font-sans text-foreground transition-colors dark:bg-background dark:text-foreground">
            {/* Meta Tags dihandle app.blade.php */}
            <Head title={post.title} />

            <Navbar />

            <main className="mx-auto max-w-[1700px] border-x-2 border-foreground bg-background px-0 sm:border-x-4 dark:border-foreground dark:bg-background">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                    {/* LEFT SIDEBAR - Industrial Pivot */}
                    <div className="order-2 border-t-2 border-foreground sm:border-t-4 lg:order-1 lg:col-span-3 lg:border-t-0 lg:border-r-2 lg:sm:border-r-4 dark:border-foreground">
                        <div className="sticky top-24 p-4 transition-all duration-500 sm:p-8">
                            <div className="mb-6 flex items-center justify-between border-b-2 border-foreground pb-3 sm:mb-10 sm:pb-4 dark:border-foreground">
                                <span className="text-[8px] font-black tracking-[0.3em] uppercase sm:text-[10px] sm:tracking-widest">System_Nav</span>
                                <div className="h-2 w-2 animate-pulse bg-primary dark:bg-primary"></div>
                            </div>
                            <Sidebar trendingNews={trendingNews as any} latestNews={latestNews as any} />
                        </div>
                    </div>

                    {/* MAIN CONTENT - Right Column */}
                    <div className="order-1 p-4 sm:p-8 lg:order-2 lg:col-span-9 lg:p-16">
                        {/* Fragmented Breadcrumb */}
                        <div className="mb-12 flex flex-wrap items-center gap-2 text-[8px] font-black tracking-[0.2em] uppercase opacity-40 sm:mb-16 sm:gap-4 sm:text-[10px] sm:tracking-[0.3em]">
                            <Link href="/" className="transition-colors hover:text-primary dark:hover:text-primary">
                                ROOT
                            </Link>
                            <span>/</span>
                            <Link href={`/${post.category?.slug}`} className="transition-colors hover:text-primary dark:hover:text-primary">
                                {post.category?.name}
                            </Link>
                            {subCategory && (
                                <>
                                    <span>/</span>
                                    <span>{subCategory.name}</span>
                                </>
                            )}
                        </div>

                        <article className="relative">
                            {/* Massive Ghost Title Background */}
                            <div className="relative mb-16 sm:mb-24">
                                <div className="pointer-events-none absolute -top-20 -left-6 -z-10 text-[12vw] leading-none font-black whitespace-nowrap text-foreground/[0.04] uppercase italic select-none sm:-top-40 sm:-left-10 sm:text-[15vw] dark:text-foreground/[0.08]">{post.category?.name}</div>
                                <h1 className="text-2xl leading-[0.85] font-black tracking-tighter text-foreground uppercase sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl dark:text-foreground">{post.title}</h1>
                                <div className="mt-8 flex h-2 w-full bg-foreground/10 sm:mt-12 sm:h-3 dark:bg-foreground/10">
                                    <div className="h-full w-1/3 bg-primary dark:bg-primary"></div>
                                </div>
                            </div>

                            {/* Grid Meta Data */}
                            <div className="mb-12 grid grid-cols-1 divide-y-2 divide-foreground border-y-2 border-foreground font-black uppercase sm:mb-20 sm:divide-y-4 sm:border-y-4 md:grid-cols-3 md:divide-x-2 md:divide-y-0 md:sm:divide-x-4 dark:divide-foreground dark:border-foreground">
                                <div className="p-4 sm:p-6">
                                    <span className="mb-2 block text-[8px] opacity-40 sm:text-[10px]">OPERATOR_ID</span>
                                    <span className="text-lg text-primary italic sm:text-xl dark:text-primary">@{post.user?.name}</span>
                                </div>
                                <div className="p-4 sm:p-6">
                                    <span className="mb-2 block text-[8px] opacity-40 sm:text-[10px]">TIMESTAMP</span>
                                    <span className="text-xs sm:text-sm">
                                        {formattedDate} // {new Date(post.published_at).toLocaleTimeString('id-ID')}
                                    </span>
                                </div>
                                <div className="flex items-end justify-between p-4 sm:p-6">
                                    <div>
                                        <span className="mb-2 block text-[8px] opacity-40 sm:text-[10px]">METRIC_LOGS</span>
                                        <span className="text-xs sm:text-sm">{post.views.toLocaleString()} VIEWS</span>
                                    </div>
                                    <Eye className="h-4 w-4 text-primary sm:h-5 sm:w-5 dark:text-primary" />
                                </div>
                            </div>

                            {/* Fragmented Hero Media */}
                            {post.thumbnail_url && (
                                <div className="group relative mb-16 sm:mb-24">
                                    <div className="absolute -top-3 -left-3 -z-10 h-full w-full border-2 border-primary transition-all group-hover:top-0 group-hover:left-0 sm:-top-6 sm:-left-6 sm:border-4 dark:border-primary"></div>
                                    <div className="overflow-hidden border-4 border-foreground bg-foreground sm:border-8 dark:border-foreground dark:bg-foreground">
                                        <img src={post.thumbnail ? `/storage/${post.thumbnail}` : post.thumbnail_url} alt={post.title} className="w-full object-cover brightness-90 grayscale transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0" />
                                    </div>
                                    <div className="mt-3 flex justify-between text-[8px] font-black tracking-[0.3em] uppercase italic opacity-60 sm:mt-4 sm:text-[10px] sm:tracking-widest">
                                        <span>IMG_REF_001: {post.title.substring(0, 15)}</span>
                                        <span className="hidden sm:inline">(SOURCE: INTERFACE_SYSTEM)</span>
                                    </div>
                                </div>
                            )}

                            {/* Industrial Content Typography */}
                            <div
                                className="prose prose-lg max-w-none text-foreground/90 prose-invert sm:prose-xl dark:text-foreground/90 prose-headings:font-black prose-headings:tracking-tighter prose-headings:uppercase prose-p:leading-relaxed prose-a:text-primary prose-a:underline dark:prose-a:text-primary prose-strong:text-primary dark:prose-strong:text-primary prose-li:marker:text-primary dark:prose-li:marker:text-primary"
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />

                            {/* System Tags */}
                            <div className="mt-20 border-t-4 border-foreground pt-8 sm:mt-32 sm:border-t-8 sm:pt-12 dark:border-foreground">
                                <label className="mb-6 block text-center text-xs font-black tracking-[0.4em] uppercase italic opacity-30 sm:mb-8 sm:text-sm sm:tracking-[0.5em] md:text-left">CLASSIFIED_TAGS</label>
                                <div className="flex flex-wrap gap-2 sm:gap-4">
                                    {post.tags.map((tag) => (
                                        <Link key={tag.id} href={`/tag/${tag.name}`} className="group flex items-center gap-2 border-2 border-foreground bg-transparent px-4 py-2 text-[10px] font-black tracking-[0.2em] uppercase transition-all hover:bg-foreground hover:text-background sm:px-6 sm:py-3 sm:text-xs sm:tracking-widest dark:border-foreground dark:hover:bg-foreground dark:hover:text-background">
                                            <div className="h-2 w-2 bg-primary group-hover:bg-background dark:bg-primary dark:group-hover:bg-background"></div>
                                            {tag.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Social Grid */}
                            <div className="mt-12 grid grid-cols-1 overflow-hidden border-2 border-foreground sm:mt-20 sm:border-4 md:grid-cols-4 dark:border-foreground">
                                <div className="flex flex-col justify-center bg-foreground p-6 sm:p-8 md:col-span-2 dark:bg-foreground">
                                    <h4 className="text-2xl leading-none font-black tracking-tighter text-background uppercase italic sm:text-3xl dark:text-background">
                                        TRANSFER_DATA <br /> TO_BROADCAST
                                    </h4>
                                </div>
                                <button onClick={() => handleShare('facebook')} className="group flex h-24 flex-col items-center justify-center gap-2 border-t-2 border-foreground transition-colors hover:bg-primary sm:h-32 sm:border-t-4 md:border-t-0 md:border-l-2 md:sm:border-l-4 dark:border-foreground dark:hover:bg-primary">
                                    <span className="text-[8px] font-black text-foreground group-hover:text-background sm:text-[10px] dark:text-foreground dark:group-hover:text-background">FACEBOOK</span>
                                    <Share2 className="h-5 w-5 group-hover:text-background sm:h-6 sm:w-6 dark:group-hover:text-background" />
                                </button>
                                <button onClick={() => handleShare('whatsapp')} className="group flex h-24 flex-col items-center justify-center gap-2 border-l-2 border-foreground transition-colors hover:bg-primary sm:h-32 sm:border-l-4 dark:border-foreground dark:hover:bg-primary">
                                    <span className="text-[8px] font-black text-foreground group-hover:text-background sm:text-[10px] dark:text-foreground dark:group-hover:text-background">WHATSAPP</span>
                                    <Share2 className="h-5 w-5 group-hover:text-background sm:h-6 sm:w-6 dark:group-hover:text-background" />
                                </button>
                            </div>
                        </article>

                        {/* CROSS-LINKED FEEDS (Related) */}
                        <div className="mt-32 sm:mt-56">
                            <div className="relative mb-12 sm:mb-20">
                                <h3 className="text-2xl leading-none font-black tracking-tighter text-foreground uppercase italic sm:text-3xl lg:text-4xl dark:text-foreground">CROSS_FEEDS</h3>
                                <div className="absolute right-0 -bottom-2 text-[8px] font-black opacity-30 sm:-bottom-4 sm:text-[10px]">SYSTEM_RECO_V.4.0</div>
                                <div className="mt-4 h-2 w-full bg-foreground sm:mt-6 dark:bg-foreground"></div>
                            </div>
                            <div className="grid grid-cols-1 gap-8 sm:gap-12 md:grid-cols-2">
                                {relatedPosts.map((related: any) => (
                                    <div key={related.id} className="border-b-2 border-foreground pb-8 sm:border-b-4 sm:pb-12 dark:border-foreground">
                                        <ListCard item={related} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
