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
    const { appearance, updateAppearance } = useAppearance();

    const categories = propCategories || props.categories || [];
    const siteSettings = propSiteSettings || props.siteSettings;
    const [search, setSearch] = useState('');
    const [isSearchOpen, setIsSearchOpen] = useState(false);

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
        <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md transition-all">
            {/* Top Bar */}
            <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-4 lg:px-8">
                {/* Left: Mobile Menu & Logo */}
                <div className="flex items-center gap-6">
                    <Sheet>
                        <SheetTrigger asChild>
                            <button className="group flex h-10 w-10 items-center justify-center rounded-xl bg-muted/50 transition-colors hover:bg-primary hover:text-primary-foreground lg:hidden">
                                <Menu className="h-5 w-5" />
                            </button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[320px] p-0 ring-primary/20">
                            <SheetHeader className="border-b border-border p-8">
                                <SheetTitle className="text-left">
                                    <Link href="/" className="flex items-center gap-3">
                                        <div className="flex flex-col leading-none">
                                            <span className="text-2xl font-black tracking-tighter text-primary uppercase italic">
                                                {firstPart}
                                                <span className="text-foreground">{restParts ? ` ${restParts}` : ''}</span>
                                            </span>
                                        </div>
                                    </Link>
                                </SheetTitle>
                            </SheetHeader>
                            <div className="flex flex-col p-4">
                                <Link href="/" className={`flex items-center justify-between rounded-xl px-6 py-4 text-sm font-black tracking-widest uppercase transition-all ${url === '/' ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'text-foreground/70 hover:bg-muted'}`}>
                                    Home
                                    <ChevronRight className="h-4 w-4" />
                                </Link>
                                {categories.map((cat: Category) => (
                                    <Link key={cat.id} href={`/${cat.slug}`} className={`mt-2 flex items-center justify-between rounded-xl px-6 py-4 text-sm font-black tracking-widest uppercase transition-all ${url === `/${cat.slug}` ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'text-foreground/70 hover:bg-muted'}`}>
                                        {cat.name}
                                        <ChevronRight className="h-4 w-4" />
                                    </Link>
                                ))}
                            </div>
                        </SheetContent>
                    </Sheet>

                    <Link href="/" className="group flex items-center gap-4">
                        {siteSettings?.logo && (
                            <div className="relative overflow-hidden rounded-xl border border-border bg-card p-1 transition-transform group-hover:scale-110">
                                <img src={`/storage/${siteSettings.logo}`} alt={siteSettings.site_name} className="h-10 w-auto object-contain" />
                            </div>
                        )}
                        <div className="flex flex-col leading-none">
                            <span className="text-2xl font-black tracking-tighter text-primary uppercase italic sm:text-3xl">
                                {firstPart}
                                <span className="text-foreground">{restParts ? ` ${restParts}` : ''}</span>
                            </span>
                            <span className="mt-1 text-[8px] font-black tracking-[0.4em] text-muted-foreground uppercase opacity-80 sm:text-[9px]">{siteSettings?.tagline || 'Informasi Terpercaya'}</span>
                        </div>
                    </Link>
                </div>

                {/* Right: Search & Theme & Navigation */}
                <div className="flex items-center gap-3">
                    {/* Desktop Hover Navigation */}
                    <nav className="mr-8 hidden items-center gap-8 xl:flex">
                        {categories.slice(0, 4).map((cat: Category) => (
                            <Link key={cat.id} href={`/${cat.slug}`} className={`text-[11px] font-black tracking-[0.2em] uppercase transition-all hover:text-primary ${url === `/${cat.slug}` ? 'text-primary' : 'text-muted-foreground'}`}>
                                {cat.name}
                            </Link>
                        ))}
                    </nav>

                    <form onSubmit={handleSearch} className={`relative flex items-center transition-all duration-500 ease-in-out ${isSearchOpen ? 'w-48 sm:w-64' : 'w-10'}`}>
                        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari..." className={`h-10 w-full rounded-full bg-muted/50 px-4 py-2 text-xs font-bold ring-primary/20 transition-all outline-none focus:ring-4 ${isSearchOpen ? 'pr-10 opacity-100' : 'cursor-default opacity-0'}`} onBlur={() => !search && setIsSearchOpen(false)} />
                        <button type="button" onClick={() => setIsSearchOpen(!isSearchOpen)} className={`absolute right-0 flex h-10 w-10 items-center justify-center rounded-full transition-all hover:bg-muted/80 ${isSearchOpen ? 'text-primary' : 'text-muted-foreground'}`}>
                            <Search className="h-5 w-5" />
                        </button>
                    </form>

                    <button onClick={toggleTheme} className="flex h-10 w-10 items-center justify-center rounded-full bg-muted/30 text-muted-foreground shadow-inner transition-all hover:bg-muted hover:text-primary">
                        {appearance === 'light' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    </button>

                    <button className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background transition-transform hover:scale-110 active:scale-95">
                        <span className="text-[10px] font-black tracking-tighter uppercase italic">Pro</span>
                    </button>
                </div>
            </div>

            {/* Bottom Navigation (Sticky) */}
            <div className="hidden border-t border-border bg-background lg:block">
                <div className="container mx-auto px-8">
                    <div className="flex gap-10 py-4">
                        <Link href="/" className={`group relative py-1 text-[11px] font-black tracking-[0.3em] uppercase transition-colors ${url === '/' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
                            Front Page
                            <span className={`absolute -bottom-4 left-0 h-1 w-full bg-primary transition-all duration-300 ${url === '/' ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'}`}></span>
                        </Link>
                        {categories.map((cat: Category) => (
                            <Link key={cat.id} href={`/${cat.slug}`} className={`group relative py-1 text-[11px] font-black tracking-[0.3em] uppercase transition-colors ${url === `/${cat.slug}` ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
                                {cat.name}
                                <span className={`absolute -bottom-4 left-0 h-1 w-full bg-primary transition-all duration-300 ${url === `/${cat.slug}` ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'}`}></span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
