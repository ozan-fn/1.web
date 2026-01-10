import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';
import { Link, router, usePage } from '@inertiajs/react';
import { Home, Menu, Moon, Search, Sun } from 'lucide-react';
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
    const [searchOpen, setSearchOpen] = useState(false);

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

    const navItems = [{ icon: Home, label: 'Beranda', href: '/' }];

    return (
        <>
            {/* Desktop Left Sidebar */}
            <aside className="group fixed top-0 left-0 z-50 hidden h-screen w-20 flex-col items-center border-r border-border bg-background pt-6 pb-8 transition-all duration-300 hover:w-64 hover:bg-background/95 hover:shadow-2xl hover:shadow-primary/5 lg:flex">
                <Link href="/" className="mb-10 flex w-full items-center justify-start">
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20">
                            <span className="font-sans text-lg font-black text-primary-foreground">{firstPart.charAt(0)}</span>
                        </div>
                    </div>
                    <div className="flex flex-col overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover:ml-4 group-hover:opacity-100">
                        <span className="text-xl font-black tracking-tight text-foreground uppercase italic">{siteSettings?.site_name}</span>
                    </div>
                </Link>

                <nav className="flex w-full flex-1 flex-col gap-2">
                    {navItems.map((item) => {
                        const isActive = url === item.href;
                        return (
                            <Link key={item.label} href={item.href} className={cn('group/item relative flex h-14 w-full items-center transition-all duration-300', isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground')}>
                                {isActive && <div className="absolute left-0 h-8 w-1 rounded-r-full bg-primary" />}
                                <div className="flex w-20 shrink-0 items-center justify-center">
                                    <div className={cn('flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-300', isActive ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'group-hover/item:bg-muted')}>
                                        <item.icon className="h-5 w-5" />
                                    </div>
                                </div>
                                <span className="ml-0 overflow-hidden text-[13px] font-black tracking-tight whitespace-nowrap uppercase opacity-0 transition-all duration-300 group-hover:ml-4 group-hover:opacity-100">{item.label}</span>
                            </Link>
                        );
                    })}

                    <div className="my-6 px-6">
                        <div className="h-px w-full bg-border/60" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <span className="mb-2 w-20 text-center text-[10px] font-black tracking-widest text-primary/80 uppercase opacity-100 transition-opacity duration-300 group-hover:w-full group-hover:px-6 group-hover:text-left">Kategori</span>
                        {categories.slice(0, 10).map((cat: any) => {
                            const isActive = url === `/${cat.slug}`;
                            return (
                                <Link key={cat.id} href={`/${cat.slug}`} className={cn('group/item relative flex h-10 w-full items-center transition-all duration-300', isActive ? 'text-foreground' : 'text-muted-foreground/80 hover:text-foreground')}>
                                    <div className="flex w-20 shrink-0 items-center justify-center">
                                        <div className={cn('h-1.5 w-1.5 rounded-full transition-all duration-300', isActive ? 'scale-150 bg-primary' : 'bg-muted-foreground/40 group-hover/item:bg-primary')} />
                                    </div>
                                    <span className="ml-0 overflow-hidden text-[11px] font-black tracking-widest whitespace-nowrap uppercase opacity-0 transition-all duration-300 group-hover:ml-4 group-hover:opacity-100">{cat.name}</span>
                                </Link>
                            );
                        })}
                    </div>
                </nav>

                <div className="flex w-full flex-col gap-4">
                    <button onClick={toggleTheme} className="group/item flex h-14 w-full items-center text-muted-foreground transition-all duration-300 hover:text-foreground">
                        <div className="flex w-20 shrink-0 items-center justify-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-300 group-hover/item:bg-muted">{appearance === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}</div>
                        </div>
                        <span className="ml-0 overflow-hidden text-sm font-black tracking-tight whitespace-nowrap uppercase opacity-0 transition-all duration-300 group-hover:ml-2 group-hover:opacity-100">Tema</span>
                    </button>
                </div>
            </aside>

            {/* Mobile Bottom & Top Nav */}
            <header className="fixed top-0 z-50 flex h-16 w-full items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-xl lg:hidden">
                <Link href="/" className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                        <span className="font-sans text-sm font-black text-primary-foreground">{firstPart.charAt(0)}</span>
                    </div>
                    <span className="font-sans text-lg font-black tracking-tighter text-foreground uppercase italic">{siteSettings?.site_name}</span>
                </Link>

                <div className="flex items-center gap-2">
                    <button onClick={() => setSearchOpen(!searchOpen)} className="rounded-full p-2 text-muted-foreground hover:bg-muted">
                        <Search className="h-5 w-5" />
                    </button>
                    <Sheet>
                        <SheetTrigger asChild>
                            <button className="rounded-full p-2 text-muted-foreground hover:bg-muted">
                                <Menu className="h-6 w-6" />
                            </button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] border-l-0 bg-background p-0">
                            <SheetHeader className="border-b border-border px-6 py-5">
                                <SheetTitle className="text-left font-black tracking-tight text-primary uppercase italic">Discover</SheetTitle>
                            </SheetHeader>
                            <div className="flex flex-col py-2">
                                {categories.map((cat: any) => (
                                    <Link key={cat.id} href={`/${cat.slug}`} className="px-6 py-4 text-sm font-black tracking-widest text-foreground uppercase hover:bg-muted">
                                        {cat.name}
                                    </Link>
                                ))}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

                {searchOpen && (
                    <div className="absolute top-full left-0 w-full animate-in border-b border-border bg-background p-4 fade-in slide-in-from-top-4">
                        <form onSubmit={handleSearch} className="flex gap-2">
                            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search news..." className="flex-1 rounded-xl bg-muted px-4 py-2 text-sm ring-1 ring-border outline-none focus:ring-primary" />
                        </form>
                    </div>
                )}
            </header>

            {/* Mobile Bottom Bar */}
            <nav className="fixed bottom-0 left-0 z-50 flex h-16 w-full items-center justify-around border-t border-border bg-background/80 px-4 backdrop-blur-xl lg:hidden">
                {navItems.map((item) => {
                    const isActive = url === item.href;
                    return (
                        <Link key={item.label} href={item.href} className={cn('flex flex-col items-center gap-1 transition-colors', isActive ? 'text-primary' : 'text-foreground hover:text-primary')}>
                            <item.icon className="h-5 w-5" />
                            <span className="text-[10px] font-black tracking-tighter uppercase">{item.label}</span>
                        </Link>
                    );
                })}
                <button onClick={toggleTheme} className="flex flex-col items-center gap-1 text-foreground hover:text-primary">
                    {appearance === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                    <span className="text-[10px] font-black tracking-tighter uppercase">Tema</span>
                </button>
            </nav>

            {/* Desktop Top Bar Filter (Always present for spacing context) */}
            <div className="sticky top-0 z-40 hidden h-16 items-center justify-end border-b border-border bg-background/60 px-8 backdrop-blur-xl lg:ml-20 lg:flex">
                <form onSubmit={handleSearch} className="relative w-64">
                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Quick search..." className="w-full rounded-2xl bg-muted/50 px-9 py-2 text-xs font-bold ring-1 ring-border transition-all outline-none focus:bg-background focus:ring-primary" />
                </form>
            </div>
        </>
    );
};

export default Navbar;
