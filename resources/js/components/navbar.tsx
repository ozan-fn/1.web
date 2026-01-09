import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useAppearance } from '@/hooks/use-appearance'; // Pastikan path sesuai
import { Link, router, usePage } from '@inertiajs/react';
import { ChevronRight, Menu, Monitor, Moon, Search, Sun } from 'lucide-react';
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
        <header className="sticky top-0 z-50 border-b border-border bg-background transition-colors">
            {/* Top Bar */}
            <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
                <div className="flex items-center gap-4">
                    <Sheet>
                        <SheetTrigger asChild>
                            <button className="rounded-lg p-2 text-muted-foreground hover:bg-muted lg:hidden">
                                <Menu className="h-6 w-6" />
                            </button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[300px] bg-background p-0">
                            <SheetHeader className="border-b border-border p-6">
                                <SheetTitle className="text-left">
                                    <Link href="/" className="flex items-center gap-3">
                                        <div className="flex flex-col leading-none">
                                            <span className="text-xl font-black tracking-tighter text-red-600 uppercase italic">
                                                {firstPart}
                                                <span className="text-foreground">{restParts ? ` ${restParts}` : ''}</span>
                                            </span>
                                        </div>
                                    </Link>
                                </SheetTitle>
                            </SheetHeader>
                            <div className="flex flex-col py-4">
                                <Link href="/" className={`flex items-center justify-between px-6 py-3 text-sm font-bold uppercase transition-colors ${url === '/' ? 'bg-red-50 text-red-600 dark:bg-red-950/20' : 'text-foreground/80 hover:bg-muted'}`}>
                                    Home
                                    <ChevronRight className="h-4 w-4" />
                                </Link>
                                {categories.map((cat) => (
                                    <Link key={cat.id} href={`/${cat.slug}`} className={`flex items-center justify-between px-6 py-3 text-sm font-bold uppercase transition-colors ${url === `/${cat.slug}` ? 'bg-red-50 text-red-600 dark:bg-red-950/20' : 'text-foreground/80 hover:bg-muted'}`}>
                                        {cat.name}
                                        <ChevronRight className="h-4 w-4" />
                                    </Link>
                                ))}
                            </div>
                        </SheetContent>
                    </Sheet>

                    <Link href="/" className="flex items-center gap-3">
                        {siteSettings?.logo && <img src={`/storage/${siteSettings.logo}`} alt={siteSettings.site_name} className="h-10 w-auto object-contain" />}
                        <div className="flex flex-col leading-none">
                            <span className="text-2xl font-black tracking-tighter text-red-600 uppercase italic">
                                {firstPart}
                                <span className="text-foreground">{restParts ? ` ${restParts}` : ''}</span>
                            </span>
                            <span className="text-[9px] font-bold tracking-[0.2em] text-muted-foreground uppercase">{siteSettings?.tagline || 'Informasi Terpercaya'}</span>
                        </div>
                    </Link>
                </div>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="mx-8 hidden max-w-md flex-1 rounded-sm border-b border-border bg-background px-2 py-2 transition-colors focus-within:border-red-600 md:flex">
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari berita..." className="w-full bg-transparent text-sm font-medium text-foreground placeholder-muted-foreground outline-none" />
                    <button type="submit" className="px-2 text-muted-foreground transition-colors hover:text-red-600">
                        <Search className="h-4 w-4" />
                    </button>
                </form>

                <div className="flex items-center gap-2">
                    {/* Theme Toggle Button */}
                    <button onClick={toggleTheme} className="flex items-center gap-2 rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-red-600" title={`Mode: ${appearance}`}>
                        {appearance === 'light' && <Sun className="h-5 w-5" />}
                        {appearance === 'dark' && <Moon className="h-5 w-5" />}
                        {appearance === 'system' && <Monitor className="h-5 w-5" />}

                        {/* Indikator teks opsional (bisa dihapus jika ingin icon saja) */}
                        <span className="hidden text-[10px] font-bold uppercase lg:block">{appearance}</span>
                    </button>

                    <button className="rounded-full p-2 text-muted-foreground hover:bg-muted md:hidden">
                        <Search className="h-5 w-5" />
                    </button>
                </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden border-t border-border bg-background lg:block">
                <div className="no-scrollbar container mx-auto max-w-7xl overflow-x-auto px-4">
                    <div className="flex gap-8 py-3 text-[13px] font-black tracking-tight whitespace-nowrap uppercase">
                        <Link href="/" className={`border-b-2 py-1 transition-colors ${url === '/' ? 'border-red-600 text-red-600' : 'border-transparent text-foreground hover:text-red-600'}`}>
                            Home
                        </Link>
                        {categories.map((cat) => {
                            const href = `/${cat.slug}`;
                            const isActive = url === href || url.startsWith(`${href}/`);
                            return (
                                <Link key={cat.id} href={href} className={`border-b-2 py-1 transition-colors ${isActive ? 'border-red-600 text-red-600' : 'border-transparent text-foreground hover:text-red-600'}`}>
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
