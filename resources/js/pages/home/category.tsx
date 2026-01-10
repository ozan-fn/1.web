import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';
import { Head, Link, usePage } from '@inertiajs/react';
import { Calendar, ChevronLeft, ChevronRight, Eye, Hash } from 'lucide-react';

// --- Interfaces ---

// Interface untuk data global dari Middleware (Shared Data)
interface SharedProps {
    settings: {
        site_name: string;
        // field lainnya...
    } | null;
    [key: string]: any;
}

interface NewsItem {
    id: number;
    title: string;
    slug: string;
    thumbnail_url: string | null;
    published_at: string;
    views: number;
    excerpt?: string;
    category: { name: string; slug: string };
    user: { name: string };
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface CategoryProps {
    category: {
        name: string;
        slug: string;
        description: string | null;
    };
    news: {
        data: NewsItem[];
        links: PaginationLink[];
        current_page: number;
        last_page: number;
        from: number;
        to: number;
        total: number;
    };
    trendingNews: NewsItem[];
    latestNews: NewsItem[];
}

export default function CategoryPage({ category, news, trendingNews, latestNews }: CategoryProps) {
    // Ambil settings dari Global Props (Middleware)
    const { settings } = usePage<SharedProps>().props;

    return (
        <div className="min-h-screen bg-background font-sans text-foreground transition-colors duration-300">
            {/* Dynamic SEO Title */}
            <Head>
                <title>{`${category.name} - ${settings?.site_name || 'Portal Berita'}`}</title>
                <meta name="description" content={category.description || `Berita terbaru kategori ${category.name}`} />
            </Head>

            {/* Navbar tanpa prop drilling */}
            <Navbar />

            <main className="container mx-auto max-w-7xl px-4 py-8 lg:px-8">
                {/* Header Kategori */}
                <div className="mb-12 animate-in border-b border-border/60 pb-6 duration-700 fade-in slide-in-from-top-4">
                    <div className="mb-3 flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                            <Hash className="h-4 w-4" />
                        </div>
                        <span className="text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">Arsip Kategori</span>
                    </div>

                    <h1 className="text-4xl font-black tracking-tighter text-foreground uppercase italic sm:text-5xl lg:text-6xl">{category.name}</h1>

                    {category.description && <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">{category.description}</p>}
                </div>

                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                    {/* LEFT COLUMN: Daftar Berita */}
                    <div className="lg:col-span-8">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2">
                            {news.data.length > 0 ? (
                                news.data.map((item, index) => (
                                    <Link key={item.id} href={`/${item.category.slug}/${item.slug}`} className="group flex animate-in flex-col gap-4 duration-500 zoom-in-95 fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                                        {/* Thumbnail with Hover Effect */}
                                        <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border/50 bg-muted shadow-sm transition-all duration-300 group-hover:border-primary/20 group-hover:shadow-md">
                                            {item.thumbnail_url ? (
                                                <img src={item.thumbnail_url} alt={item.title} className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                                            ) : (
                                                <div className="flex h-full flex-col items-center justify-center gap-2 bg-secondary/30 text-muted-foreground">
                                                    <span className="text-xs font-bold tracking-widest uppercase opacity-50">No Image</span>
                                                </div>
                                            )}

                                            {/* Badge Tanggal (Overlay) */}
                                            <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-1 text-[10px] font-bold text-foreground shadow-sm backdrop-blur-sm">
                                                <Calendar className="h-3 w-3 text-primary" />
                                                {item.published_at ? new Date(item.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }) : '-'}
                                            </div>
                                        </div>

                                        {/* Content Text */}
                                        <div className="flex flex-col gap-2.5">
                                            <h2 className="line-clamp-2 text-lg leading-tight font-extrabold tracking-tight transition-colors group-hover:text-primary lg:text-xl">{item.title}</h2>

                                            <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">{item.excerpt || 'Klik untuk membaca selengkapnya mengenai topik berita ini...'}</p>

                                            <div className="flex items-center gap-3 pt-1 text-[10px] font-bold tracking-wider text-muted-foreground/80 uppercase">
                                                <div className="flex items-center gap-1">
                                                    <Eye className="h-3 w-3" />
                                                    {item.views} Views
                                                </div>
                                                <span className="h-3 w-px bg-border"></span>
                                                <span>{item.user?.name || 'Redaksi'}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div className="col-span-full flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/20 py-24 text-center">
                                    <div className="mb-4 rounded-full bg-muted p-4">
                                        <Hash className="h-8 w-8 text-muted-foreground/50" />
                                    </div>
                                    <h3 className="text-lg font-bold">Belum ada konten</h3>
                                    <p className="text-sm text-muted-foreground">Berita untuk kategori ini belum tersedia saat ini.</p>
                                </div>
                            )}
                        </div>

                        {/* PAGINATION SECTION */}
                        {news.last_page > 1 && (
                            <div className="mt-20 flex justify-center">
                                <div className="flex flex-wrap items-center gap-2 rounded-full border border-border bg-background p-1.5 shadow-sm">
                                    {news.links.map((link, key) => {
                                        // Ganti label HTML entities dengan Icon yang proper
                                        let label = link.label;
                                        let isPrev = label.includes('&laquo;') || label.includes('Previous');
                                        let isNext = label.includes('&raquo;') || label.includes('Next');

                                        // Render Disabled Links (biasanya Previous di halaman 1)
                                        if (link.url === null) {
                                            return (
                                                <div key={key} className="flex h-10 w-10 cursor-not-allowed items-center justify-center rounded-full text-muted-foreground/40">
                                                    {isPrev ? <ChevronLeft className="h-5 w-5" /> : isNext ? <ChevronRight className="h-5 w-5" /> : null}
                                                </div>
                                            );
                                        }

                                        // Render Active & Inactive Links
                                        return (
                                            <Link key={key} href={link.url} className={`flex h-10 min-w-[40px] items-center justify-center rounded-full px-3 text-xs font-bold transition-all duration-200 ${link.active ? 'scale-105 bg-primary text-primary-foreground shadow-md' : 'text-muted-foreground hover:bg-accent hover:text-foreground'}`}>
                                                {isPrev ? <ChevronLeft className="h-5 w-5" /> : isNext ? <ChevronRight className="h-5 w-5" /> : <span dangerouslySetInnerHTML={{ __html: label }} />}
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Info Pagination text */}
                        {news.total > 0 && (
                            <p className="mt-4 text-center text-xs text-muted-foreground">
                                Menampilkan {news.from} - {news.to} dari {news.total} berita
                            </p>
                        )}
                    </div>

                    {/* RIGHT COLUMN: Sidebar (Sticky) */}
                    <aside className="lg:col-span-4">
                        <div className="sticky top-24 space-y-10">
                            <Sidebar trendingNews={trendingNews} latestNews={latestNews} />
                        </div>
                    </aside>
                </div>
            </main>

            <Footer />
        </div>
    );
}
