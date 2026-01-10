import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useAppearance } from '@/hooks/use-appearance'; // Pastikan path sesuai
import { Link, router, usePage } from '@inertiajs/react';
import { Menu, Monitor, Moon, Search, Sun } from 'lucide-react';
import React, { useEffect, useState } from 'react';

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
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
        <header className="sticky top-0 z-50 bg-background shadow-sm transition-all duration-300">
            {/* Top Bar - Logo Center */}
            <div className="border-b border-border/50 transition-all duration-300">
                <div className={`container mx-auto max-w-[1400px] px-4 transition-all duration-300 ${scrolled ? 'py-2' : 'py-6'}`}>
                    <div className="flex items-center justify-between">
                        {/* Left: Theme Toggle & Mobile Menu */}
                        <div className="flex items-center gap-3">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <button className="rounded-md p-2 text-foreground hover:bg-muted lg:hidden">
                                        <Menu className="h-5 w-5" />
                                    </button>
                                </SheetTrigger>
                                <SheetContent side="left" className="w-[280px] bg-card p-0">
                                    <SheetHeader className="border-b border-border p-5">
                                        <SheetTitle className="font-serif text-lg font-bold text-foreground">Menu</SheetTitle>
                                    </SheetHeader>
                                    <div className="flex flex-col py-2">
                                        <Link href="/" className={`px-5 py-3 text-sm font-medium transition-colors ${url === '/' ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-muted'}`}>
                                            Beranda
                                        </Link>
                                        {categories.map((cat) => (
                                            <Link key={cat.id} href={`/${cat.slug}`} className={`px-5 py-3 text-sm font-medium transition-colors ${url === `/${cat.slug}` ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-muted'}`}>
                                                {cat.name}
                                            </Link>
                                        ))}
                                    </div>
                                </SheetContent>
                            </Sheet>

                            <button onClick={toggleTheme} className="hidden rounded-md p-2 text-foreground hover:bg-muted lg:block" title={`Mode: ${appearance}`}>
                                {appearance === 'light' && <Sun className="h-5 w-5" />}
                                {appearance === 'dark' && <Moon className="h-5 w-5" />}
                                {appearance === 'system' && <Monitor className="h-5 w-5" />}
                            </button>
                        </div>

                        {/* Center: Logo */}
                        <Link href="/" className="flex flex-col items-center transition-all duration-300">
                            <h1 className={`font-serif leading-none font-bold text-foreground transition-all duration-300 ${scrolled ? 'text-2xl' : 'text-4xl'}`}>{firstPart}</h1>
                            {restParts && <span className={`font-serif font-normal text-foreground/70 transition-all duration-300 ${scrolled ? 'text-sm' : 'text-xl'}`}>{restParts}</span>}
                            {!scrolled && <p className="mt-1 text-xs tracking-widest text-muted-foreground transition-opacity duration-300">{siteSettings?.tagline || 'Informasi Terpercaya'}</p>}
                        </Link>

                        {/* Right: Search & Theme (mobile) */}
                        <div className="flex items-center gap-3">
                            <button className="rounded-md p-2 text-foreground hover:bg-muted md:hidden">
                                <Search className="h-5 w-5" />
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

            {/* Search Bar - Prominent */}
            <div className={`border-b border-border/50 bg-muted/30 transition-all duration-300 ${scrolled ? 'py-2' : 'py-3'}`}>
                <div className="container mx-auto max-w-[1400px] px-4">
                    <form onSubmit={handleSearch} className={`mx-auto flex items-center gap-2 rounded-full border border-border bg-background shadow-sm transition-all duration-300 focus-within:border-primary focus-within:shadow-md ${scrolled ? 'max-w-xl px-4 py-1.5' : 'max-w-2xl px-5 py-2.5'}`}>
                        <Search className={`text-muted-foreground transition-all duration-300 ${scrolled ? 'h-4 w-4' : 'h-5 w-5'}`} />
                        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari berita, topik, atau kata kunci..." className={`flex-1 bg-transparent text-foreground placeholder-muted-foreground transition-all duration-300 outline-none ${scrolled ? 'text-xs' : 'text-sm'}`} />
                        <button type="submit" className={`rounded-full bg-primary font-semibold text-primary-foreground transition-all duration-300 hover:bg-primary/90 ${scrolled ? 'px-3 py-1 text-[10px]' : 'px-5 py-1.5 text-xs'}`}>
                            Cari
                        </button>
                    </form>
                </div>
            </div>

            {/* Desktop Navigation - Centered */}
            <nav className={`hidden border-b border-border/50 transition-all duration-300 lg:block ${scrolled ? 'py-2' : 'py-4'}`}>
                <div className="container mx-auto max-w-[1400px] px-4">
                    <div className={`flex justify-center transition-all duration-300 ${scrolled ? 'gap-6' : 'gap-8'}`}>
                        <Link href="/" className={`font-medium transition-colors ${scrolled ? 'text-xs' : 'text-sm'} ${url === '/' ? 'text-primary' : 'text-foreground hover:text-primary'}`}>
                            Beranda
                        </Link>
                        {categories.map((cat) => {
                            const href = `/${cat.slug}`;
                            const isActive = url === href || url.startsWith(`${href}/`);
                            return (
                                <Link key={cat.id} href={href} className={`font-medium transition-colors ${scrolled ? 'text-xs' : 'text-sm'} ${isActive ? 'text-primary' : 'text-foreground hover:text-primary'}`}>
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
