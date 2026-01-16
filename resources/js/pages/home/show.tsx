import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';
import { Head, Link, usePage } from '@inertiajs/react'; // Tambah usePage
import { Eye, Share2 } from 'lucide-react';
import React from 'react';

// 1. Interface SharedProps (Data dari Middleware)
interface SharedProps {
    app: {
        name: string;
        url: string;
        domain: string;
    };
    seo: {
        title: string;
        description: string;
        logo: string;
    };
    auth: { user: any };
    [key: string]: any;
}

// 2. Interface SiteSettings
interface SiteSettings {
    site_name: string;
    tagline: string | null;
    description: string | null;
    logo: string | null;
    email: string | null;
    phone: string | null;
    address: string | null;
    social_facebook: string | null;
    social_twitter: string | null;
    social_instagram: string | null;
    social_youtube: string | null;
}

// Interface Data
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
    excerpt?: string;
    thumbnail_url: string | null;
    published_at: string;
    views: number;
    category: Category;
    sub_category: Category | null;
    user: { name: string };
    tags: Tag[];
}

interface ShowProps {
    // Tambahkan categories untuk Navbar
    categories: { id: number; name: string; slug: string }[];

    post: Post;
    relatedPosts: Post[];
    trendingNews: Post[];
    latestNews: Post[];
}

export default function PostShow({ categories, post, relatedPosts, trendingNews, latestNews }: ShowProps) {

    // 3. Ambil data Global dari Middleware
    const { app, seo } = usePage<SharedProps>().props;

    // 4. Construct "Fake" SiteSettings
    const derivedSiteSettings: SiteSettings = {
        site_name: app.name,
        description: seo.description,
        logo: seo.logo,
        tagline: null,
        email: `redaksi@${app.domain}`,
        phone: null,
        address: null,
        social_facebook: null,
        social_twitter: null,
        social_instagram: null,
        social_youtube: null,
    };

    const formattedDate = new Date(post.published_at).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    const subCategory = post.sub_category;

    // Helper URL
    const getPostUrl = (item: Post) => item.sub_category
        ? `/${item.category.slug}/${item.sub_category.slug}/${item.slug}`
        : `/${item.category.slug}/${item.slug}`;

    const handleShare = (platform: 'facebook' | 'twitter' | 'whatsapp' | 'copy') => {
        if (typeof window === 'undefined') return;

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
                    navigator.share({ title, text: title, url }).catch(() => { });
                } else {
                    navigator.clipboard.writeText(url);
                    alert('Link berhasil disalin ke clipboard!');
                }
                break;
        }
    };

    return (
        <div className="min-h-screen bg-background font-sans text-foreground transition-colors">
            {/* SEO KHUSUS ARTIKEL */}
            <Head>
                <title>{post.title}</title>
                <meta name="description" content={post.excerpt || post.title} />
                <meta name="author" content={post.user?.name} />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="article" />
                <meta property="og:title" content={post.title} />
                <meta property="og:description" content={post.excerpt || post.title} />
                {post.thumbnail_url && <meta property="og:image" content={post.thumbnail_url} />}
                <meta property="article:published_time" content={post.published_at} />
                <meta property="article:author" content={post.user?.name} />
                <meta property="article:section" content={post.category?.name} />
                {post.tags.map(tag => (
                    <meta property="article:tag" content={tag.name} key={tag.id} />
                ))}

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={post.title} />
                {post.thumbnail_url && <meta name="twitter:image" content={post.thumbnail_url} />}
            </Head>

            {/* 5. Kirim Props ke Navbar */}
            <Navbar categories={categories} siteSettings={derivedSiteSettings} />

            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                    {/* LEFT COLUMN: Main Content */}
                    <div className="lg:col-span-8">

                        {/* Breadcrumbs */}
                        <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                            <Link href="/" className="transition-colors hover:text-primary">
                                Home
                            </Link>
                            <span className="opacity-50">/</span>
                            <Link href={`/${post.category?.slug}`} className="transition-colors hover:text-primary">
                                {post.category?.name}
                            </Link>
                            {subCategory && (
                                <>
                                    <span className="opacity-50">/</span>
                                    <Link href={`/${post.category?.slug}/${subCategory.slug}`} className="transition-colors hover:text-primary">
                                        {subCategory.name}
                                    </Link>
                                </>
                            )}
                        </nav>

                        <article>
                            {/* Kategori Badge Mobile Friendly */}
                            <div className="mb-4 flex items-center gap-3">
                                <span className="rounded-sm bg-primary/10 px-2 py-1 text-xs font-black tracking-widest text-primary uppercase">
                                    {post.category?.name}
                                </span>
                            </div>

                            {/* Judul Artikel */}
                            <h1 className="mb-6 text-3xl leading-[1.2] font-black tracking-tight text-foreground sm:text-4xl md:text-[42px]">
                                {post.title}
                            </h1>

                            {/* Author & Meta */}
                            <div className="mb-8 flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-bold text-muted-foreground">
                                        {post.user?.name.charAt(0)}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-foreground">{post.user?.name}</span>
                                        <span className="text-xs text-muted-foreground">
                                            {formattedDate} • {new Date(post.published_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB
                                        </span>
                                    </div>
                                </div>

                                {/* Share Buttons */}
                                <div className="flex items-center gap-2">
                                    <button onClick={() => handleShare('facebook')} title="Share to Facebook" className="flex h-9 w-9 items-center justify-center rounded-sm bg-[#1877F2]/10 text-[#1877F2] transition-colors hover:bg-[#1877F2] hover:text-white">
                                        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                                    </button>
                                    <button onClick={() => handleShare('twitter')} title="Share to X" className="flex h-9 w-9 items-center justify-center rounded-sm bg-black/10 text-black transition-colors hover:bg-black hover:text-white dark:bg-white/10 dark:text-white dark:hover:bg-white dark:hover:text-black">
                                        <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                                    </button>
                                    <button onClick={() => handleShare('whatsapp')} title="Share to WA" className="flex h-9 w-9 items-center justify-center rounded-sm bg-[#25D366]/10 text-[#25D366] transition-colors hover:bg-[#25D366] hover:text-white">
                                        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.27 9.27 0 01-4.487-1.159l-.323-.192-3.33.873.888-3.245-.211-.336a9.28 9.28 0 01-1.424-4.916c0-5.11 4.156-9.265 9.268-9.265a9.245 9.245 0 016.551 2.716 9.22 9.22 0 012.718 6.556c0 5.11-4.156 9.265-9.268 9.265M12 2.182a10.3 10.3 0 00-10.324 10.311 10.27 10.27 0 001.603 5.53L2 22l4.285-1.124a10.25 10.25 0 005.711 1.698l.004-.001c5.696 0 10.327-4.631 10.327-10.323 0-2.744-1.069-5.323-3.012-7.266A10.23 10.23 0 0012 2.182z" /></svg>
                                    </button>
                                    <button onClick={() => handleShare('copy')} title="Copy Link" className="flex h-9 w-9 items-center justify-center rounded-sm bg-secondary text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground">
                                        <Share2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Featured Image */}
                            {post.thumbnail_url && (
                                <figure className="mb-10">
                                    <div className="overflow-hidden rounded-md bg-muted">
                                        <img
                                            src={post.thumbnail_url}
                                            alt={post.title}
                                            className="h-auto w-full object-cover"
                                        />
                                    </div>
                                    <figcaption className="mt-3 text-[13px] text-muted-foreground italic">
                                        {post.title}
                                    </figcaption>
                                </figure>
                            )}

                            {/* CONTENT BODY */}
                            <div
                                className="
                                    prose prose-lg max-w-none 
                                    text-foreground/90 
                                    prose-headings:font-black prose-headings:text-foreground 
                                    prose-p:mb-6 prose-p:leading-relaxed
                                    prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                                    prose-strong:text-foreground
                                    prose-img:rounded-lg
                                    prose-blockquote:border-l-primary prose-blockquote:bg-muted/30 prose-blockquote:py-1 prose-blockquote:pr-2
                                    dark:prose-invert
                                "
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />

                            {/* Tags */}
                            {post.tags.length > 0 && (
                                <div className="mt-12 flex flex-wrap gap-2 border-t border-border pt-8">
                                    <span className="flex items-center text-xs font-black tracking-widest text-muted-foreground uppercase">
                                        Tags:
                                    </span>
                                    {post.tags.map((tag) => (
                                        <Link
                                            key={tag.id}
                                            href={`/tag/${tag.name.toLowerCase()}`}
                                            className="rounded-full bg-secondary px-4 py-1.5 text-xs font-bold text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                                        >
                                            #{tag.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </article>

                        {/* Views Counter */}
                        <div className="mt-6 flex items-center justify-end gap-1.5 text-xs font-medium text-muted-foreground">
                            <Eye className="h-4 w-4" />
                            <span>Dilihat {post.views} kali</span>
                        </div>

                        {/* Related News */}
                        <section className="mt-16 border-t-4 border-primary pt-10">
                            <h3 className="mb-8 text-xl font-black tracking-tight text-foreground uppercase">
                                Berita <span className="text-primary">Terhubung</span>
                            </h3>

                            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                                {relatedPosts.map((related) => (
                                    <Link key={related.id} href={getPostUrl(related)} className="group flex flex-col gap-3">
                                        <div className="relative aspect-video w-full overflow-hidden rounded-md bg-muted">
                                            {related.thumbnail_url ? (
                                                <img
                                                    src={related.thumbnail_url}
                                                    alt={related.title}
                                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center text-xs font-bold text-muted-foreground uppercase">No Image</div>
                                            )}
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[10px] font-black tracking-widest text-primary uppercase">
                                                {related.category.name}
                                            </span>
                                            <h4 className="line-clamp-2 text-lg leading-tight font-bold text-foreground transition-colors group-hover:text-primary">
                                                {related.title}
                                            </h4>
                                            <span className="text-[11px] font-medium text-muted-foreground">
                                                {new Date(related.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* RIGHT COLUMN: Sidebar */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-24 space-y-8">
                            <Sidebar trendingNews={trendingNews} latestNews={latestNews} />
                        </div>
                    </div>
                </div>
            </main>

            {/* 6. Kirim Props ke Footer */}
            <Footer categories={categories} siteSettings={derivedSiteSettings} />
        </div>
    );
}