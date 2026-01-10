import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useAppearance } from '@/hooks/use-appearance'; // Pastikan path sesuai
import { Link, router, usePage } from '@inertiajs/react';
import { Menu, Moon, Search, Sun } from 'lucide-react';
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
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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

    const currentDate = new Date().toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    return (
        <header className="w-full bg-background">
            {/* Topbar: Detik Style */}
            <div className="hidden border-b border-border bg-muted/30 py-2 text-[11px] font-medium text-muted-foreground lg:block">
                <div className="container mx-auto flex max-w-7xl items-center justify-between px-4">
                    <div className="flex items-center gap-6">
                        <span>{currentDate}</span>
                        <div className="flex gap-4">
                            <Link href="#" className="hover:text-primary">
                                Tentang Kami
                            </Link>
                            <Link href="#" className="hover:text-primary">
                                Redaksi
                            </Link>
                            <Link href="#" className="hover:text-primary">
                                Pedoman Media Siber
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button onClick={toggleTheme} className="flex items-center gap-1 hover:text-primary">
                            {appearance === 'light' ? <Sun className="h-3 w-3" /> : <Moon className="h-3 w-3" />}
                            <span className="capitalize">{appearance}</span>
                        </button>
                        <Link href="/login" className="font-bold text-primary hover:underline">
                            Masuk
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <div className="container mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:py-6">
                <div className="flex items-center gap-4">
                    <button onClick={() => setIsMenuOpen(true)} className="lg:hidden">
                        <Menu className="h-6 w-6" />
                    </button>
                    <Link href="/" className="flex items-center gap-3">
                        {siteSettings?.logo && <img src={`/storage/${siteSettings.logo}`} alt={siteSettings.site_name} className="h-10 w-auto object-contain lg:h-12" />}
                        <div className="flex flex-col leading-none">
                            <span className="text-2xl font-black tracking-tighter text-blue-700 uppercase lg:text-3xl">
                                {firstPart}
                                <span className="text-foreground">{restParts ? ` ${restParts}` : ''}</span>
                            </span>
                            <span className="text-[10px] font-bold tracking-[0.1em] text-muted-foreground uppercase">{siteSettings?.tagline || 'Informasi Terpercaya'}</span>
                        </div>
                    </Link>
                </div>

                {/* Desktop Search */}
                <form onSubmit={handleSearch} className="hidden max-w-xs flex-1 items-center gap-2 rounded-full border border-border bg-muted/20 px-4 py-2 focus-within:border-blue-500 lg:flex">
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari berita..." className="w-full bg-transparent text-sm font-medium outline-none" />
                    <button type="submit">
                        <Search className="h-4 w-4 text-muted-foreground" />
                    </button>
                </form>

                {/* Mobile Search Icon */}
                <button className="lg:hidden">
                    <Search className="h-6 w-6" />
                </button>
            </div>

            {/* Sticky Navigation Bar: Deep Blue Primary */}
            <nav className="sticky top-0 z-50 bg-blue-700 text-white shadow-md">
                <div className="no-scrollbar container mx-auto max-w-7xl overflow-x-auto px-4">
                    <div className="flex items-center gap-1">
                        <Link href="/" className={`px-4 py-3 text-[13px] font-bold uppercase transition-colors hover:bg-black/10 ${url === '/' ? 'bg-black/20' : ''}`}>
                            Home
                        </Link>
                        {categories.map((cat) => {
                            const href = `/${cat.slug}`;
                            const isActive = url === href || url.startsWith(`${href}/`);
                            return (
                                <Link key={cat.id} href={href} className={`px-4 py-3 text-[13px] font-bold whitespace-nowrap uppercase transition-colors hover:bg-black/10 ${isActive ? 'bg-black/20' : ''}`}>
                                    {cat.name}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </nav>

            {/* Mobile Drawer */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetContent side="left" className="w-[300px] p-0">
                    <div className="bg-blue-700 px-6 py-8 text-white">
                        <h2 className="text-2xl font-black tracking-tighter uppercase italic">
                            {firstPart} <span className="opacity-70">{restParts}</span>
                        </h2>
                    </div>
                    <div className="flex flex-col py-4">
                        <Link href="/" onClick={() => setIsMenuOpen(false)} className={`px-6 py-4 text-sm font-bold uppercase ${url === '/' ? 'bg-blue-50 text-blue-700' : 'text-foreground'}`}>
                            Home
                        </Link>
                        {categories.map((cat) => (
                            <Link key={cat.id} href={`/${cat.slug}`} onClick={() => setIsMenuOpen(false)} className={`px-6 py-4 text-sm font-bold uppercase ${url === `/${cat.slug}` ? 'bg-blue-50 text-blue-700' : 'text-foreground'}`}>
                                {cat.name}
                            </Link>
                        ))}
                    </div>
                </SheetContent>
            </Sheet>
        </header>
    );
};

export default Navbar;
