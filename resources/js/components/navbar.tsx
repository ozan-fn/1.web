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
            {/* 1. BRAND BAR (Logo Center) */}
            <div className="border-b border-gray-100 bg-white py-4 dark:border-gray-800 dark:bg-gray-950">
                <div className="container mx-auto flex max-w-7xl items-center justify-between px-4">
                    {/* Left: Menu Trigger (Mobile only here, hidden on desktop or moves) */}
                    <div className="flex items-center gap-4 lg:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <button className="rounded-lg p-2 text-muted-foreground hover:bg-muted">
                                    <Menu className="h-6 w-6" />
                                </button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-[300px] bg-background p-0">
                                <SheetHeader className="border-b border-border p-6">
                                    <SheetTitle className="text-left">
                                        <Link href="/" className="flex items-center gap-3">
                                            <div className="flex flex-col leading-none">
                                                <span className="text-xl font-bold text-[#0455A4] uppercase">
                                                    {firstPart}
                                                    <span className="text-gray-900 dark:text-gray-100">{restParts ? ` ${restParts}` : ''}</span>
                                                </span>
                                            </div>
                                        </Link>
                                    </SheetTitle>
                                </SheetHeader>
                                <div className="flex flex-col py-4">
                                    <Link href="/" className={`flex items-center justify-between px-6 py-3 text-sm font-bold uppercase transition-colors ${url === '/' ? 'bg-blue-50 text-[#0455A4] dark:bg-blue-900/20' : 'text-gray-800 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800'}`}>
                                        Home
                                        <ChevronRight className="h-4 w-4" />
                                    </Link>
                                    {categories.map((cat) => (
                                        <Link key={cat.id} href={`/${cat.slug}`} className={`flex items-center justify-between px-6 py-3 text-sm font-bold uppercase transition-colors ${url === `/${cat.slug}` ? 'bg-blue-50 text-[#0455A4] dark:bg-blue-900/20' : 'text-gray-800 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800'}`}>
                                            {cat.name}
                                            <ChevronRight className="h-4 w-4" />
                                        </Link>
                                    ))}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    <div className="hidden items-center gap-4 lg:flex lg:w-1/3">
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-none">
                            {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                    </div>

                    {/* Center: Logo */}
                    <div className="flex flex-grow justify-center lg:w-1/3">
                        <Link href="/" className="flex flex-col items-center text-center">
                            {siteSettings?.logo ? (
                                <img src={`/storage/${siteSettings.logo}`} alt={siteSettings.site_name} className="h-12 w-auto object-contain" />
                            ) : (
                                <div className="flex flex-col leading-none">
                                    <span className="text-3xl font-black text-[#0455A4] uppercase tracking-tighter sm:text-4xl">
                                        {firstPart}
                                        <span className="text-gray-900 dark:text-gray-100">{restParts ? ` ${restParts}` : ''}</span>
                                    </span>
                                    <span className="mt-1 text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase">{siteSettings?.tagline || 'Informasi Terpercaya'}</span>
                                </div>
                            )}
                        </Link>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center justify-end gap-3 lg:w-1/3">
                        <button onClick={toggleTheme} className="rounded-full p-2 text-gray-400 hover:bg-gray-50 hover:text-[#0455A4] dark:hover:bg-gray-800" title={`Mode: ${appearance}`}>
                            {appearance === 'light' && <Sun className="h-5 w-5" />}
                            {appearance === 'dark' && <Moon className="h-5 w-5" />}
                            {appearance === 'system' && <Monitor className="h-5 w-5" />}
                        </button>
                        <button className="rounded-full bg-[#0455A4] px-4 py-1.5 text-[11px] font-bold text-white transition-opacity hover:opacity-90">
                            LOGIN
                        </button>
                    </div>
                </div>
            </div>

            {/* 2. NAVIGATION BAR (Sticky/Menu) */}
            <nav className="bg-white px-4 shadow-sm dark:bg-gray-950">
                <div className="container mx-auto flex max-w-7xl items-center justify-between border-t border-gray-50 dark:border-gray-900">
                    <div className="no-scrollbar flex flex-grow items-center overflow-x-auto overflow-y-hidden">
                        <div className="flex gap-1 py-1 text-[13px] font-bold uppercase tracking-tight">
                            <Link href="/" className={`px-4 py-3 transition-colors ${url === '/' ? 'text-[#0455A4] shadow-[inset_0_-2px_0_0_#0455A4]' : 'text-gray-600 hover:text-[#0455A4] dark:text-gray-400'}`}>
                                Home
                            </Link>
                            {categories.slice(0, 8).map((cat) => {
                                const href = `/${cat.slug}`;
                                const isActive = url === href || url.startsWith(`${href}/`);
                                return (
                                    <Link key={cat.id} href={href} className={`px-4 py-3 whitespace-nowrap transition-colors ${isActive ? 'text-[#0455A4] shadow-[inset_0_-2px_0_0_#0455A4]' : 'text-gray-600 hover:text-[#0455A4] dark:text-gray-400'}`}>
                                        {cat.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Search Bar Right */}
                    <div className="ml-4 flex items-center border-l border-gray-100 pl-4 dark:border-gray-800">
                        <form onSubmit={handleSearch} className="group flex items-center gap-2 rounded-full bg-gray-50 px-3 py-1.5 transition-all focus-within:ring-1 focus-within:ring-[#0455A4] dark:bg-gray-900">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari..."
                                className="w-24 bg-transparent text-xs font-medium outline-none transition-all focus:w-40"
                            />
                            <button type="submit" className="text-gray-400 hover:text-[#0455A4]">
                                <Search className="h-3.5 w-3.5" />
                            </button>
                        </form>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
