import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { Link, router, usePage } from '@inertiajs/react';
import { ChevronRight, Menu, Moon, Search, Sun } from 'lucide-react';
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

const Navbar: React.FC<Props> = ({
    categories: propCategories,
    siteSettings: propSiteSettings,
}) => {
    const { url, props } = usePage<any>();
    const categories = propCategories || props.categories || [];
    const siteSettings = propSiteSettings || props.siteSettings;
    const [search, setSearch] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const root = window.document.documentElement;
        const initialColorValue = root.classList.contains('dark');
        setIsDarkMode(initialColorValue);
    }, []);

    const toggleDarkMode = () => {
        const root = window.document.documentElement;
        if (isDarkMode) {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
        setIsDarkMode(!isDarkMode);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (search.trim()) {
            router.get(`/search?q=${encodeURIComponent(search.trim())}`);
        }
    };

    // Split site name for styling if it has multiple words
    const siteNameParts = siteSettings?.site_name.split(' ') || [
        'NEWS',
        'PORTAL',
    ];
    const firstPart = siteNameParts[0];
    const restParts = siteNameParts.slice(1).join(' ');

    return (
        <header className="sticky top-0 z-50 border-b border-gray-100 bg-white shadow-sm transition-colors dark:border-gray-800 dark:bg-gray-950">
            {/* Top Bar */}
            <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
                <div className="flex items-center gap-4">
                    {/* Hamburger Icon - Mobile Sidebar */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <button className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden dark:text-gray-400 dark:hover:bg-gray-900">
                                <Menu className="h-6 w-6" />
                            </button>
                        </SheetTrigger>
                        <SheetContent
                            side="left"
                            className="w-[300px] p-0 dark:bg-gray-950"
                        >
                            <SheetHeader className="border-b p-6 dark:border-gray-800">
                                <SheetTitle className="text-left">
                                    <Link
                                        href="/"
                                        className="flex items-center gap-3"
                                    >
                                        <div className="flex flex-col leading-none">
                                            <span className="text-xl font-black tracking-tighter text-red-600 uppercase italic">
                                                {firstPart}
                                                <span className="text-gray-900 dark:text-white">
                                                    {restParts
                                                        ? ` ${restParts}`
                                                        : ''}
                                                </span>
                                            </span>
                                        </div>
                                    </Link>
                                </SheetTitle>
                            </SheetHeader>
                            <div className="flex flex-col py-4">
                                <Link
                                    href="/"
                                    className={`flex items-center justify-between px-6 py-3 text-sm font-bold uppercase transition-colors ${
                                        url === '/'
                                            ? 'bg-red-50 text-red-600 dark:bg-red-950/20'
                                            : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-900'
                                    }`}
                                >
                                    Home
                                    <ChevronRight className="h-4 w-4" />
                                </Link>
                                {categories.map((cat) => (
                                    <Link
                                        key={cat.id}
                                        href={`/${cat.slug}`}
                                        className={`flex items-center justify-between px-6 py-3 text-sm font-bold uppercase transition-colors ${
                                            url === `/${cat.slug}`
                                                ? 'bg-red-50 text-red-600 dark:bg-red-950/20'
                                                : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-900'
                                        }`}
                                    >
                                        {cat.name}
                                        <ChevronRight className="h-4 w-4" />
                                    </Link>
                                ))}
                            </div>
                        </SheetContent>
                    </Sheet>

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        {siteSettings?.logo && (
                            <img
                                src={`/storage/${siteSettings.logo}`}
                                alt={siteSettings.site_name}
                                className="h-10 w-auto object-contain"
                            />
                        )}
                        <div className="flex flex-col leading-none">
                            <span className="text-2xl font-black tracking-tighter text-red-600 uppercase italic">
                                {firstPart}
                                <span className="text-gray-900 dark:text-white">
                                    {restParts ? ` ${restParts}` : ''}
                                </span>
                            </span>
                            <span className="text-[9px] font-bold tracking-[0.2em] text-gray-400 uppercase dark:text-gray-500">
                                {siteSettings?.tagline ||
                                    'Informasi Terpercaya'}
                            </span>
                        </div>
                    </Link>
                </div>

                {/* Search Bar (Hidden on Mobile) */}
                <form
                    onSubmit={handleSearch}
                    className="mx-8 hidden max-w-md flex-1 rounded-sm border-b border-gray-200 bg-white px-2 py-2 transition-colors focus-within:border-red-600 md:flex dark:border-gray-800 dark:bg-gray-950"
                >
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Cari berita..."
                        className="w-full bg-transparent text-sm font-medium text-gray-800 placeholder-gray-400 outline-none dark:text-gray-200"
                    />
                    <button
                        type="submit"
                        className="px-2 text-gray-400 transition-colors hover:text-red-600"
                    >
                        <Search className="h-4 w-4" />
                    </button>
                </form>

                {/* Right Side Actions */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={toggleDarkMode}
                        className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-red-600 dark:text-gray-400 dark:hover:bg-gray-900"
                        title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
                    >
                        {isDarkMode ? (
                            <Sun className="h-5 w-5" />
                        ) : (
                            <Moon className="h-5 w-5" />
                        )}
                    </button>

                    {/* Mobile Search Trigger */}
                    <button className="rounded-full p-2 text-gray-500 hover:bg-gray-100 md:hidden dark:text-gray-400 dark:hover:bg-gray-900">
                        <Search className="h-5 w-5" />
                    </button>
                </div>
            </div>

            {/* Navigation Menu (Scrollable) */}
            <nav className="hidden border-t border-gray-100 bg-white lg:block dark:border-gray-800 dark:bg-gray-950">
                <div className="no-scrollbar container mx-auto max-w-7xl overflow-x-auto px-4">
                    <div className="flex gap-8 py-3 text-[13px] font-black tracking-tight whitespace-nowrap uppercase">
                        <Link
                            href="/"
                            className={`border-b-2 py-1 transition-colors ${
                                url === '/'
                                    ? 'border-red-600 text-red-600'
                                    : 'border-transparent text-gray-900 hover:text-red-600 dark:text-gray-300'
                            }`}
                        >
                            Home
                        </Link>
                        {categories.map((cat) => {
                            const href = `/${cat.slug}`;
                            const isActive =
                                url === href || url.startsWith(`${href}/`);
                            return (
                                <Link
                                    key={cat.id}
                                    href={href}
                                    className={`border-b-2 py-1 transition-colors ${
                                        isActive
                                            ? 'border-red-600 text-red-600'
                                            : 'border-transparent text-gray-900 hover:text-red-600 dark:text-gray-300'
                                    }`}
                                >
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
