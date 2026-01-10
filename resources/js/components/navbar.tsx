import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useAppearance } from '@/hooks/use-appearance';
import { Link, router, usePage } from '@inertiajs/react';
import { ChevronRight, Menu, Monitor, Moon, Search, Sun, X } from 'lucide-react';
import React, { useState } from 'react';

// Tipe data disesuaikan dengan apa yang dikirim dari HandleInertiaRequests.php
interface SharedProps {
    settings: {
        site_name: string;
        tagline: string | null;
        logo: string | null;
        // ... field lainnya
    } | null;
    categories: Array<{
        id: number;
        name: string;
        slug: string;
    }>;
    [key: string]: any;
}

export default function Navbar() {
    // 1. Mengambil data global dari Middleware (tidak perlu props manual lagi)
    const { url, props } = usePage<SharedProps>();
    const { settings, categories } = props;
    const { appearance, updateAppearance } = useAppearance();

    const [search, setSearch] = useState('');
    const [isSearchOpen, setIsSearchOpen] = useState(false); // State untuk mobile search

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (search.trim()) {
            router.get(`/search?q=${encodeURIComponent(search.trim())}`);
            setIsSearchOpen(false);
        }
    };

    const toggleTheme = () => {
        const nextTheme = appearance === 'light' ? 'dark' : 'light';
        updateAppearance(nextTheme);
    };

    // Parsing Nama Situs untuk Styling (Kata pertama Bold, sisanya Normal)
    const siteNameParts = settings?.site_name?.split(' ') || ['LENSA', 'PUBLIK'];
    const firstPart = siteNameParts[0];
    const restParts = siteNameParts.slice(1).join(' ');

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md transition-all duration-300 supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
                {/* --- BAGIAN KIRI (Menu Mobile & Tools) --- */}
                <div className="flex items-center gap-2">
                    {/* 1. Mobile Menu Trigger (Hamburger) */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <button className="flex h-9 w-9 items-center justify-center rounded-full text-foreground/70 transition-colors hover:bg-accent hover:text-foreground lg:hidden">
                                <Menu className="h-5 w-5" />
                            </button>
                        </SheetTrigger>

                        {/* Sheet muncul dari KANAN (sesuai request mirror layout, meski tombol di kiri) */}
                        <SheetContent side="right" className="w-[85%] pr-0 sm:w-[350px]">
                            <SheetHeader className="border-b px-6 pb-4 text-right">
                                <SheetTitle>
                                    <Link href="/" className="flex items-center justify-end gap-2">
                                        <span className="text-lg font-bold tracking-tighter">
                                            {firstPart} <span className="font-light">{restParts}</span>
                                        </span>
                                        {settings?.logo && <img src={`/storage/${settings.logo}`} alt="Logo" className="h-8 w-auto" />}
                                    </Link>
                                </SheetTitle>
                            </SheetHeader>
                            <nav className="flex h-[calc(100vh-100px)] flex-col gap-1 overflow-y-auto p-4">
                                <Link href="/" className={`flex items-center justify-between rounded-md px-4 py-3 text-sm font-medium transition-colors ${url === '/' ? 'bg-primary/10 text-primary' : 'hover:bg-accent hover:text-accent-foreground'}`}>
                                    <ChevronRight className="h-4 w-4 rotate-180 text-muted-foreground" />
                                    Home
                                </Link>
                                {categories?.map((cat) => (
                                    <Link key={cat.id} href={`/${cat.slug}`} className={`flex items-center justify-between rounded-md px-4 py-3 text-sm font-medium transition-colors ${url.startsWith(`/${cat.slug}`) ? 'bg-primary/10 text-primary' : 'hover:bg-accent hover:text-accent-foreground'}`}>
                                        <ChevronRight className="h-4 w-4 rotate-180 text-muted-foreground" />
                                        {cat.name}
                                    </Link>
                                ))}
                            </nav>
                        </SheetContent>
                    </Sheet>

                    {/* 2. Theme Toggle (Desain Icon Only Minimalis) */}
                    <button onClick={toggleTheme} className="group flex h-9 w-9 items-center justify-center rounded-full text-foreground/70 transition-colors hover:bg-accent hover:text-primary" aria-label="Toggle Theme">
                        {appearance === 'light' && <Sun className="h-5 w-5 transition-transform group-hover:rotate-90" />}
                        {appearance === 'dark' && <Moon className="h-5 w-5 transition-transform group-hover:-rotate-12" />}
                        {appearance === 'system' && <Monitor className="h-5 w-5" />}
                    </button>

                    {/* 3. Mobile Search Trigger */}
                    <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="flex h-9 w-9 items-center justify-center rounded-full text-foreground/70 transition-colors hover:bg-accent hover:text-primary md:hidden">
                        {isSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
                    </button>
                </div>

                {/* --- BAGIAN TENGAH (Search Bar Desktop) --- */}
                {/* Style: Pill Shape (Rounded Full) & Transparent Background */}
                <div className="hidden flex-1 px-8 md:block lg:px-12">
                    <form onSubmit={handleSearch} className="group relative mx-auto w-full max-w-md">
                        <div className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary">
                            <Search className="h-4 w-4" />
                        </div>
                        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Telusuri berita..." className="h-10 w-full rounded-full border border-border/50 bg-secondary/50 pr-4 pl-10 text-sm transition-all outline-none placeholder:text-muted-foreground/70 focus:border-primary/50 focus:bg-background focus:ring-2 focus:ring-primary/20" />
                    </form>
                </div>

                {/* --- BAGIAN KANAN (Logo & Branding) --- */}
                <div className="flex min-w-[140px] items-center justify-end gap-3">
                    <Link href="/" className="group flex items-center gap-3 text-right">
                        <div className="flex flex-col items-end leading-none">
                            <h1 className="text-xl font-extrabold tracking-tighter text-foreground transition-colors group-hover:text-primary sm:text-2xl">
                                {firstPart}
                                <span className="font-light text-foreground/80">{restParts ? ` ${restParts}` : ''}</span>
                            </h1>
                            {settings?.tagline && <span className="hidden text-[10px] font-medium tracking-[0.15em] text-muted-foreground sm:block">{settings.tagline}</span>}
                        </div>
                        {settings?.logo ? <img src={`/storage/${settings.logo}`} alt={settings.site_name} className="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105 sm:h-10" /> : <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 font-bold text-primary">{firstPart[0]}</div>}
                    </Link>
                </div>
            </div>

            {/* --- MOBILE SEARCH EXPAND (Muncul jika tombol search mobile diklik) --- */}
            {isSearchOpen && (
                <div className="animate-in border-b border-border bg-background px-4 py-3 slide-in-from-top-2 md:hidden">
                    <form onSubmit={handleSearch} className="relative">
                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input autoFocus type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari sesuatu..." className="h-10 w-full rounded-md border border-input bg-background pr-4 pl-10 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                    </form>
                </div>
            )}

            {/* --- DESKTOP NAVIGATION (Sub-header) --- */}
            {/* Rata Kanan (Justify-End) sesuai konsep Mirror 180 derajat */}
            <div className="hidden border-t border-border/40 bg-background/50 backdrop-blur-sm lg:block">
                <nav className="container mx-auto max-w-7xl px-8">
                    <div className="no-scrollbar flex justify-end gap-1 overflow-x-auto py-2">
                        <Link href="/" className={`rounded-md px-4 py-2 text-[13px] font-bold tracking-wide uppercase transition-all ${url === '/' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:bg-accent hover:text-foreground'}`}>
                            Home
                        </Link>
                        {categories?.map((cat) => {
                            const href = `/${cat.slug}`;
                            const isActive = url === href || url.startsWith(`${href}/`);
                            return (
                                <Link key={cat.id} href={href} className={`rounded-md px-4 py-2 text-[13px] font-bold tracking-wide uppercase transition-all ${isActive ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:bg-accent hover:text-foreground'}`}>
                                    {cat.name}
                                </Link>
                            );
                        })}
                    </div>
                </nav>
            </div>
        </header>
    );
}
