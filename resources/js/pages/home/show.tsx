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
        <div className="min-h-screen bg-background font-sans text-foreground transition-colors">
            {/* Meta Tags dihandle app.blade.php */}
            <Head title={post.title} />

            <Navbar />

            <main className="mx-auto max-w-[1700px] border-x-4 border-foreground bg-background px-0">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                    {/* LEFT SIDEBAR - Industrial Pivot */}
                    <div className="order-2 border-t-4 border-foreground lg:order-1 lg:col-span-3 lg:border-t-0 lg:border-r-4">
                        <div className="sticky top-24 p-8 transition-all duration-500">
                            <div className="mb-10 flex items-center justify-between border-b-2 border-foreground pb-4">
                                <span className="text-[10px] font-black tracking-widest uppercase">System_Nav</span>
                                <div className="h-2 w-2 animate-pulse bg-primary"></div>
                            </div>
                            <Sidebar trendingNews={trendingNews as any} latestNews={latestNews as any} />
                        </div>
                    </div>

                    {/* MAIN CONTENT - Right Column */}
                    <div className="order-1 p-8 lg:order-2 lg:col-span-9 lg:p-16">
                        {/* Fragmented Breadcrumb */}
                        <div className="mb-16 flex flex-wrap items-center gap-4 text-[10px] font-black tracking-[0.3em] uppercase opacity-40">
                            <Link href="/" className="transition-colors hover:text-primary">
                                ROOT
                            </Link>
                            <span>/</span>
                            <Link href={`/${post.category?.slug}`} className="transition-colors hover:text-primary">
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
                            <div className="relative mb-24">
                                <div className="pointer-events-none absolute -top-40 -left-10 -z-10 text-[15vw] leading-none font-black whitespace-nowrap text-foreground/[0.04] uppercase italic select-none">{post.category?.name}</div>
                                <h1 className="text-5xl leading-[0.85] font-black tracking-tighter text-foreground uppercase md:text-7xl lg:text-[100px]">{post.title}</h1>
                                <div className="mt-12 flex h-3 w-full bg-foreground/10">
                                    <div className="h-full w-1/3 bg-primary"></div>
                                </div>
                            </div>

                            {/* Grid Meta Data */}
                            <div className="mb-20 grid grid-cols-1 divide-y-4 divide-foreground border-y-4 border-foreground font-black uppercase md:grid-cols-3 md:divide-x-4 md:divide-y-0">
                                <div className="p-6">
                                    <span className="mb-2 block text-[10px] opacity-40">OPERATOR_ID</span>
                                    <span className="text-xl text-primary italic">@{post.user?.name}</span>
                                </div>
                                <div className="p-6">
                                    <span className="mb-2 block text-[10px] opacity-40">TIMESTAMP</span>
                                    <span className="text-sm">
                                        {formattedDate} // {new Date(post.published_at).toLocaleTimeString('id-ID')}
                                    </span>
                                </div>
                                <div className="flex items-end justify-between p-6">
                                    <div>
                                        <span className="mb-2 block text-[10px] opacity-40">METRIC_LOGS</span>
                                        <span className="text-sm">{post.views.toLocaleString()} VIEWS</span>
                                    </div>
                                    <Eye className="h-5 w-5 text-primary" />
                                </div>
                            </div>

                            {/* Fragmented Hero Media */}
                            {post.thumbnail_url && (
                                <div className="group relative mb-24">
                                    <div className="absolute -top-6 -left-6 -z-10 h-full w-full border-4 border-primary transition-all group-hover:top-0 group-hover:left-0"></div>
                                    <div className="overflow-hidden border-8 border-foreground bg-foreground">
                                        <img src={post.thumbnail ? `/storage/${post.thumbnail}` : post.thumbnail_url} alt={post.title} className="w-full object-cover brightness-90 grayscale transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0" />
                                    </div>
                                    <div className="mt-4 flex justify-between text-[10px] font-black tracking-widest uppercase italic opacity-60">
                                        <span>IMG_REF_001: {post.title.substring(0, 15)}</span>
                                        <span>(SOURCE: INTERFACE_SYSTEM)</span>
                                    </div>
                                </div>
                            )}

                            {/* Industrial Content Typography */}
                            <div className="prose prose-xl max-w-none text-foreground/90 prose-invert prose-headings:font-black prose-headings:tracking-tighter prose-headings:uppercase prose-p:leading-relaxed prose-a:text-primary prose-a:underline prose-strong:text-primary prose-li:marker:text-primary" dangerouslySetInnerHTML={{ __html: post.content }} />

                            {/* System Tags */}
                            <div className="mt-32 border-t-8 border-foreground pt-12">
                                <label className="mb-8 block text-center text-sm font-black tracking-[0.5em] uppercase italic opacity-30 md:text-left">CLASSIFIED_TAGS</label>
                                <div className="flex flex-wrap gap-4">
                                    {post.tags.map((tag) => (
                                        <Link key={tag.id} href={`/tag/${tag.name}`} className="group flex items-center gap-2 border-2 border-foreground bg-transparent px-6 py-3 text-xs font-black tracking-widest uppercase transition-all hover:bg-foreground hover:text-background">
                                            <div className="h-2 w-2 bg-primary group-hover:bg-background"></div>
                                            {tag.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Social Grid */}
                            <div className="mt-20 grid grid-cols-1 overflow-hidden border-4 border-foreground md:grid-cols-4">
                                <div className="flex flex-col justify-center bg-foreground p-8 md:col-span-2">
                                    <h4 className="text-3xl leading-none font-black tracking-tighter text-background uppercase italic">
                                        TRANSFER_DATA <br /> TO_BROADCAST
                                    </h4>
                                </div>
                                <button onClick={() => handleShare('facebook')} className="group flex h-32 flex-col items-center justify-center gap-2 border-t-4 border-foreground transition-colors hover:bg-primary md:border-t-0 md:border-l-4">
                                    <span className="text-[10px] font-black text-foreground group-hover:text-background">FACEBOOK</span>
                                    <Share2 className="h-6 w-6 group-hover:text-background" />
                                </button>
                                <button onClick={() => handleShare('whatsapp')} className="group flex h-32 flex-col items-center justify-center gap-2 border-l-4 border-foreground transition-colors hover:bg-primary">
                                    <span className="text-[10px] font-black text-foreground group-hover:text-background">WHATSAPP</span>
                                    <Share2 className="h-6 w-6 group-hover:text-background" />
                                </button>
                            </div>
                        </article>

                        {/* CROSS-LINKED FEEDS (Related) */}
                        <div className="mt-56">
                            <div className="relative mb-20">
                                <h3 className="text-6xl leading-none font-black tracking-tighter uppercase italic">CROSS_FEEDS</h3>
                                <div className="absolute right-0 -bottom-4 text-[10px] font-black opacity-30">SYSTEM_RECO_V.4.0</div>
                                <div className="mt-6 h-2 w-full bg-foreground"></div>
                            </div>
                            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                                {relatedPosts.map((related: any) => (
                                    <div key={related.id} className="border-b-4 border-foreground pb-12">
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
