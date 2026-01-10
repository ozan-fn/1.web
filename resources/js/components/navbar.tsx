import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useAppearance } from '@/hooks/use-appearance'; // Pastikan path sesuai
import { Link, router, usePage } from '@inertiajs/react';
import { ChevronRight, Menu, Moon, Search, Sun } from 'lucide-react';
import React, { useState } from 'react';

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
    const { appearance, updateAppearance } = useAppearance(); // Menggunakan hook baru

    const categories = propCategories || props.categories || [];
    const siteSettings = propSiteSettings || props.siteSettings;
    const [search, setSearch] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (search.trim()) {
            router.get(`/search?q=${encodeURIComponent(search.trim())}`);
        }
    };

    // Fungsi untuk rotasi tema: Light -> Dark -> System
    const toggleTheme = () => {
        if (appearance === 'light') updateAppearance('dark');
        // else if (appearance === 'dark') updateAppearance('system');
        else updateAppearance('light');
    };

    const siteNameParts = siteSettings?.site_name.split(' ') || ['NEWS', 'PORTAL'];
    const firstPart = siteNameParts[0];
    const restParts = siteNameParts.slice(1).join(' ');

    return (
        <header className="z-50 bg-background transition-colors">
            {/* Top Minimal Info Bar */}
            <div className="border-b border-border bg-foreground text-background">
                <div className="container mx-auto flex h-8 max-w-7xl items-center justify-between px-4 text-[9px] font-black tracking-[0.3em] uppercase">
                    <div className="flex gap-6">
                        <span>{new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        <span className="hidden sm:inline">Edisi Digital #001</span>
                    </div>
                    <div className="flex gap-4">
                        <Link href="/about" className="transition-colors hover:text-primary">
                            Redaksi
                        </Link>
                        <Link href="/contact" className="transition-colors hover:text-primary">
                            Kontak
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Brand Section - Massive Typography */}
            <div className="border-b-4 border-foreground py-8">
                <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-4 md:flex-row">
                    <div className="flex items-center gap-6">
                        <Sheet>
                            <SheetTrigger asChild>
                                <button className="group relative flex h-14 w-14 items-center justify-center border-2 border-foreground bg-background transition-all hover:bg-foreground hover:text-background">
                                    <Menu className="h-6 w-6" />
                                    <div className="absolute -right-1 -bottom-1 h-3 w-3 bg-primary"></div>
                                </button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-full border-r-8 border-foreground bg-background p-0 sm:w-[400px]">
                                <SheetHeader className="border-b-4 border-foreground p-10">
                                    <SheetTitle className="text-left text-4xl font-black tracking-tighter uppercase italic">Exploration</SheetTitle>
                                </SheetHeader>
                                <div className="flex flex-col space-y-2 p-6">
                                    <Link href="/" className={`group flex items-center justify-between p-4 text-2xl font-black uppercase italic transition-all hover:translate-x-4 ${url === '/' ? 'text-primary' : ''}`}>
                                        Dashboard
                                        <ChevronRight className="h-6 w-6 opacity-0 group-hover:opacity-100" />
                                    </Link>
                                    {categories.map((cat: any) => (
                                        <Link key={cat.id} href={`/${cat.slug}`} className="group flex items-center justify-between p-4 text-2xl font-black uppercase italic transition-all hover:translate-x-4">
                                            {cat.name}
                                            <ChevronRight className="h-6 w-6 opacity-0 group-hover:opacity-100" />
                                        </Link>
                                    ))}
                                </div>
                            </SheetContent>
                        </Sheet>

                        <Link href="/" className="group flex flex-col items-start leading-none">
                            <span className="text-5xl font-black tracking-[-0.08em] text-foreground uppercase italic md:text-7xl lg:text-8xl">
                                {firstPart}
                                <span className="text-primary">{restParts ? `${restParts}` : ''}</span>
                            </span>
                        </Link>
                    </div>

                    <div className="flex w-full items-center gap-4 md:w-auto">
                        <form onSubmit={handleSearch} className="relative flex-1 md:w-64">
                            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="CARI INFORMASI..." className="w-full border-b-2 border-foreground bg-transparent py-2 text-xs font-black placeholder-foreground/30 outline-none" />
                            <button type="submit" className="absolute top-1/2 right-0 -translate-y-1/2">
                                <Search className="h-4 w-4" />
                            </button>
                        </form>

                        <button onClick={toggleTheme} className="flex h-10 w-10 items-center justify-center border-2 border-foreground transition-all hover:bg-foreground hover:text-background">
                            {appearance === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Sticky Navigation - Minimalist Sidebar-like items */}
            <nav className="sticky top-0 z-40 border-b-2 border-foreground bg-background/80 backdrop-blur-md">
                <div className="container mx-auto max-w-7xl px-4">
                    <div className="no-scrollbar flex items-center justify-center gap-10 overflow-x-auto py-4">
                        <Link href="/" className={`text-[11px] font-black tracking-[0.2em] uppercase transition-all hover:text-primary ${url === '/' ? 'text-primary' : ''}`}>
                            Beranda
                        </Link>
                        {categories.map((cat: any) => {
                            const href = `/${cat.slug}`;
                            const isActive = url === href || url.startsWith(`${href}/`);
                            return (
                                <Link key={cat.id} href={href} className={`text-[11px] font-black tracking-[0.2em] uppercase transition-all hover:text-primary ${isActive ? 'text-primary' : ''}`}>
                                    {cat.name}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
