import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useAppearance } from '@/hooks/use-appearance';
import { Link, router, usePage } from '@inertiajs/react';
import { Menu, Monitor, Moon, Search, Sun } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface SiteSettings {
    site_name: string;
    tagline: string | null;
    logo: string | null;
}

interface Props {
    categories?: Category[];
    siteSettings?: SiteSettings | null;
}

const Navbar: React.FC<Props> = ({ categories: propCategories, siteSettings: propSiteSettings }) => {
    const { url, props } = usePage<any>();
    const { appearance, updateAppearance } = useAppearance();

    const categories = propCategories || props.categories || [];
    const siteSettings = propSiteSettings || props.siteSettings;
    const [search, setSearch] = useState('');

    // State hanya untuk bayangan (shadow), bukan untuk mengubah ukuran layout
    const [isStuck, setIsStuck] = useState(false);
    const sentinelRef = useRef<HTMLDivElement>(null);

    // Menggunakan IntersectionObserver (Jauh lebih ringan daripada window scroll event)
    // Ini mendeteksi apakah menu sudah mentok di atas atau belum
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Jika sentinel tidak terlihat (berarti menu sudah di paling atas), aktifkan shadow
                setIsStuck(!entry.isIntersecting);
            },
            { threshold: [1] },
        );

        if (sentinelRef.current) {
            observer.observe(sentinelRef.current);
        }

        return () => {
            if (sentinelRef.current) {
                observer.unobserve(sentinelRef.current);
            }
        };
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (search.trim()) {
            router.get(`/search?q=${encodeURIComponent(search.trim())}`);
        }
    };

    const toggleTheme = () => {
        if (appearance === 'light') updateAppearance('dark');
        else updateAppearance('light');
    };

    const siteNameParts = siteSettings?.site_name.split(' ') || ['NEWS', 'PORTAL'];
    const firstPart = siteNameParts[0];
    const restParts = siteNameParts.slice(1).join(' ');

    return (
        <div className="relative z-50 flex w-full flex-col bg-background">
            {/* BAGIAN 1: HEADER ATAS (LOGO & JUDUL) 
                Bagian ini TIDAK sticky. Saat di-scroll dia akan hilang ke atas secara natural.
                Tidak ada perubahan ukuran font yang dipaksa JS -> Anti Getar.
            */}
            <div className="relative z-20 border-b border-border/50 bg-background py-6">
                <div className="container mx-auto max-w-[1400px] px-4">
                    <div className="flex items-center justify-between">
                        {/* Kiri: Mobile Toggle & Theme */}
                        <div className="flex items-center gap-3">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <button className="rounded-md p-2 text-foreground hover:bg-muted lg:hidden">
                                        <Menu className="h-6 w-6" />
                                    </button>
                                </SheetTrigger>
                                <SheetContent side="left" className="w-[280px] bg-card p-0">
                                    <SheetHeader className="border-b border-border p-5">
                                        <SheetTitle className="font-serif text-lg font-bold text-foreground">Menu</SheetTitle>
                                    </SheetHeader>
                                    <div className="flex flex-col py-2">
                                        <Link href="/" className={`px-5 py-3 text-sm font-medium ${url === '/' ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-muted'}`}>
                                            Beranda
                                        </Link>
                                        {categories.map((cat: any) => (
                                            <Link key={cat.id} href={`/${cat.slug}`} className={`px-5 py-3 text-sm font-medium ${url === `/${cat.slug}` ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-muted'}`}>
                                                {cat.name}
                                            </Link>
                                        ))}
                                    </div>
                                </SheetContent>
                            </Sheet>

                            <button onClick={toggleTheme} className="hidden rounded-md p-2 text-foreground hover:bg-muted lg:block">
                                {appearance === 'light' && <Sun className="h-5 w-5" />}
                                {appearance === 'dark' && <Moon className="h-5 w-5" />}
                                {appearance === 'system' && <Monitor className="h-5 w-5" />}
                            </button>
                        </div>

                        {/* Tengah: Logo Besar (Static) */}
                        <Link href="/" className="flex flex-col items-center">
                            <h1 className="font-serif text-4xl leading-none font-bold text-foreground">{firstPart}</h1>
                            {restParts && <span className="font-serif text-xl leading-none font-normal text-foreground/70">{restParts}</span>}
                            <p className="mt-2 text-xs tracking-widest text-muted-foreground uppercase">{siteSettings?.tagline || 'Informasi Terpercaya'}</p>
                        </Link>

                        {/* Kanan: Search Icon (Mobile) */}
                        <div className="flex items-center gap-3">
                            <button className="rounded-md p-2 text-foreground hover:bg-muted md:hidden">
                                <Search className="h-6 w-6" />
                            </button>
                            <button onClick={toggleTheme} className="rounded-md p-2 text-foreground hover:bg-muted lg:hidden">
                                {appearance === 'light' && <Sun className="h-5 w-5" />}
                                {appearance === 'dark' && <Moon className="h-5 w-5" />}
                                {appearance === 'system' && <Monitor className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* SENTINEL: Elemen hantu 1px untuk mendeteksi kapan navbar menabrak atas layar */}
            <div ref={sentinelRef} className="pointer-events-none absolute top-[120px] h-[1px] w-full opacity-0" />

            {/* BAGIAN 2: STICKY NAV (SEARCH & MENU)
                Bagian ini akan "nyangkut" di atas layar saat logo sudah lewat.
                CSS 'sticky' ditangani browser, bukan JS loop.
            */}
            <div className={`sticky top-0 z-40 w-full bg-background/95 backdrop-blur transition-shadow duration-300 supports-[backdrop-filter]:bg-background/60 ${isStuck ? 'border-b border-border/50 shadow-md' : ''}`}>
                {/* Search Bar Container */}
                <div className={`transition-all duration-300 ${isStuck ? 'py-2' : 'border-b border-border/50 bg-muted/30 py-3'}`}>
                    <div className="container mx-auto max-w-[1400px] px-4">
                        {/* Layout Search Bar Berubah sedikit saat Stuck agar muat Logo Kecil jika mau, tapi disini kita keep simple */}
                        <div className="flex items-center justify-center gap-4">
                            {/* Opsi: Tampilkan Logo Mini disebelah kiri hanya saat stuck */}
                            <Link href="/" className={`overflow-hidden font-serif text-lg font-bold transition-all duration-300 ${isStuck ? 'mr-2 w-auto opacity-100' : 'w-0 opacity-0'}`}>
                                {firstPart}
                            </Link>

                            <form onSubmit={handleSearch} className={`flex items-center gap-2 rounded-full border border-border bg-background shadow-sm transition-all duration-300 focus-within:border-primary focus-within:shadow-md ${isStuck ? 'w-full max-w-lg px-3 py-1.5' : 'w-full max-w-2xl px-5 py-2.5'}`}>
                                <Search className={`text-muted-foreground ${isStuck ? 'h-4 w-4' : 'h-5 w-5'}`} />
                                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari berita..." className={`flex-1 bg-transparent text-foreground placeholder-muted-foreground outline-none ${isStuck ? 'text-sm' : 'text-base'}`} />
                                <button type="submit" className={`rounded-full bg-primary font-semibold text-primary-foreground hover:bg-primary/90 ${isStuck ? 'px-3 py-1 text-xs' : 'px-5 py-1.5 text-sm'}`}>
                                    Cari
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Desktop Menu Link - Hanya tampil di desktop */}
                <nav className="hidden border-b border-border/50 lg:block">
                    <div className="container mx-auto max-w-[1400px] px-4">
                        <div className="flex justify-center gap-8 py-3">
                            <Link href="/" className={`text-sm font-medium transition-colors ${url === '/' ? 'text-primary' : 'text-foreground hover:text-primary'}`}>
                                Beranda
                            </Link>
                            {categories.map((cat: any) => {
                                const href = `/${cat.slug}`;
                                const isActive = url === href || url.startsWith(`${href}/`);
                                return (
                                    <Link key={cat.id} href={href} className={`text-sm font-medium transition-colors ${isActive ? 'text-primary' : 'text-foreground hover:text-primary'}`}>
                                        {cat.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Navbar;
