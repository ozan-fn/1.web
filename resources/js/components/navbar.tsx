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
        <header className="sticky top-0 z-50 bg-background shadow-md transition-all duration-300">
            {/* Main Bar - Horizontal Layout Compact */}
            <div className="border-b border-border/50 transition-all duration-300">
                <div className={`container mx-auto max-w-[1400px] px-4 transition-all duration-300 ${scrolled ? 'py-2' : 'py-3'}`}>
                    <div className="flex items-center justify-between gap-4">
                        {/* Left: Logo + Mobile Menu */}
                        <div className="flex items-center gap-3">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <button className="rounded-full p-2 text-foreground transition-colors hover:bg-primary/10 hover:text-primary lg:hidden">
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

                            {/* Logo - Left Side Compact */}
                            <Link href="/" className="transition-all duration-300">
                                <div className={`flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary/80 shadow-md transition-all duration-300 ${scrolled ? 'px-3 py-1' : 'px-4 py-1.5'}`}>
                                    <h1 className={`font-sans font-black uppercase tracking-[0.15em] text-primary-foreground transition-all duration-300 ${scrolled ? 'text-xs' : 'text-sm'}`}>
                                        {firstPart}
                                    </h1>
                                    {restParts && (
                                        <>
                                            <div className={`bg-primary-foreground/30 transition-all duration-300 ${scrolled ? 'h-3 w-px' : 'h-4 w-px'}`}></div>
                                            <span className={`font-sans font-bold uppercase tracking-wider text-primary-foreground/90 transition-all duration-300 ${scrolled ? 'text-[10px]' : 'text-xs'}`}>{restParts}</span>
                                        </>
                                    )}
                                </div>
                            </Link>
                        </div>

                        {/* Center: Search - Inline Horizontal */}
                        <form onSubmit={handleSearch} className={`hidden flex-1 transition-all duration-300 md:block ${scrolled ? 'max-w-md' : 'max-w-lg'}`}>
                            <div className={`flex items-stretch overflow-hidden rounded-lg border border-border bg-muted/30 shadow-sm transition-all duration-300 focus-within:border-primary focus-within:bg-background focus-within:shadow-md ${scrolled ? '' : ''}`}>
                                <input 
                                    type="text" 
                                    value={search} 
                                    onChange={(e) => setSearch(e.target.value)} 
                                    placeholder="Cari berita..." 
                                    className={`flex-1 bg-transparent px-4 font-medium text-foreground placeholder-muted-foreground/60 outline-none transition-all duration-300 ${scrolled ? 'py-1.5 text-xs' : 'py-2 text-sm'}`} 
                                />
                                <button 
                                    type="submit" 
                                    className={`flex items-center gap-1.5 bg-primary px-4 font-bold uppercase tracking-wide text-primary-foreground transition-all duration-300 hover:bg-primary/90 ${scrolled ? 'text-[10px]' : 'text-xs'}`}
                                >
                                    <span>Cari</span>
                                    <Search className={`transition-all duration-300 ${scrolled ? 'h-3 w-3' : 'h-3.5 w-3.5'}`} />
                                </button>
                            </div>
                        </form>

                        {/* Right: Theme Toggle */}
                        <div className="flex items-center gap-2">
                            <button className="rounded-full p-2 text-foreground transition-colors hover:bg-primary/10 hover:text-primary md:hidden">
                                <Search className="h-4 w-4" />
                            </button>
                            <button onClick={toggleTheme} className="rounded-full p-1.5 text-foreground transition-colors hover:bg-primary/10 hover:text-primary" title={`Mode: ${appearance}`}>
                                {appearance === 'light' && <Sun className="h-4 w-4" />}
                                {appearance === 'dark' && <Moon className="h-4 w-4" />}
                                {appearance === 'system' && <Monitor className="h-4 w-4" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Desktop Navigation - Modern Pills */}
            <nav className={`hidden border-b border-border/50 transition-all duration-300 lg:block ${scrolled ? 'py-1.5' : 'py-2'}`}>
                <div className="container mx-auto max-w-[1400px] px-4">
                    <div className={`flex justify-center transition-all duration-300 ${scrolled ? 'gap-2' : 'gap-3'}`}>
                        <Link href="/" className={`rounded-full font-semibold transition-all ${scrolled ? 'px-4 py-1.5 text-xs' : 'px-5 py-2 text-sm'} ${url === '/' ? 'bg-primary text-primary-foreground shadow-md' : 'text-foreground hover:bg-primary/10 hover:text-primary'}`}>
                            Beranda
                        </Link>
                        {categories.map((cat) => {
                            const href = `/${cat.slug}`;
                            const isActive = url === href || url.startsWith(`${href}/`);
                            return (
                                <Link key={cat.id} href={href} className={`rounded-full font-semibold transition-all ${scrolled ? 'px-4 py-1.5 text-xs' : 'px-5 py-2 text-sm'} ${isActive ? 'bg-primary text-primary-foreground shadow-md' : 'text-foreground hover:bg-primary/10 hover:text-primary'}`}>
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
