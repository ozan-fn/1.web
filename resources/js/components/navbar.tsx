import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAppearance } from '@/hooks/use-appearance';
import { Link, router, usePage } from '@inertiajs/react';
import { ChevronRight, Menu, Moon, Search, Sun, Terminal } from 'lucide-react';
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
    const { appearance, updateAppearance } = useAppearance();

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

    const toggleTheme = () => {
        if (appearance === 'light') updateAppearance('dark');
        else updateAppearance('light');
    };

    const siteName = siteSettings?.site_name || 'INDUSTRIAL_NEWS';

    return (
        <header className="sticky top-0 z-50 bg-background transition-all duration-500">
            {/* MASSIVE BRAND HEADER - Neo-Brutalist Style */}
            <div className={`border-foreground px-8 transition-all duration-500 lg:px-16 ${scrolled ? 'border-b-4 py-2' : 'border-b-[10px] py-10 lg:py-20'}`}>
                <div className="mx-auto flex max-w-[1700px] flex-col items-center justify-between gap-12 lg:flex-row lg:items-end">
                    <div className={`flex flex-col items-center transition-all duration-500 lg:items-start ${scrolled ? 'lg:flex-row lg:items-center lg:gap-8' : ''}`}>
                        <div className={`flex items-center gap-4 transition-all duration-500 ${scrolled ? 'hidden lg:flex' : 'mb-4'}`}>
                            <span className="animate-pulse bg-primary px-3 py-1 text-[10px] font-black tracking-[0.5em] text-background uppercase italic">SYSTEM_LIVE_V.4.0</span>
                            {!scrolled && <div className="h-1 w-20 bg-foreground opacity-10"></div>}
                        </div>
                        <Link href="/" className="group relative">
                            <h1 className={`leading-none font-[900] tracking-[-0.08em] text-foreground uppercase transition-all duration-500 ${scrolled ? 'text-4xl md:text-5xl lg:text-6xl' : 'text-7xl md:text-9xl lg:text-[180px]'}`}>
                                {siteName.split(' ')[0]}
                                <span className="text-primary italic">{siteName.split(' ').slice(1).join('_')}</span>
                            </h1>
                            {/* Decorative ghost text behind brand */}
                            {!scrolled && <div className="pointer-events-none absolute -bottom-10 left-0 -z-10 text-[150px] leading-none font-black whitespace-nowrap italic opacity-[0.03] select-none lg:text-[250px]">CONNECTED_REALITY</div>}
                        </Link>
                        {!scrolled && (
                            <div className="mt-6 flex flex-wrap items-center gap-6 text-[10px] font-black tracking-[0.2em] uppercase opacity-40 lg:text-xs">
                                <span>PORTAL_ID: 88-X-99</span>
                                <span className="h-1 w-1 rounded-full bg-foreground"></span>
                                <span>{siteSettings?.tagline || 'NO_TAGLINE_LOGGED'}</span>
                                <span className="h-1 w-1 rounded-full bg-foreground"></span>
                                <span className="flex items-center gap-2">
                                    <Terminal className="h-3 w-3" />
                                    ROOT@USER_PROMPT:~$
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Industrial Search & Actions Block */}
                    <div className={`flex w-full flex-col gap-6 transition-all duration-500 lg:w-auto lg:items-end ${scrolled ? 'lg:flex-row lg:items-center' : ''}`}>
                        <form onSubmit={handleSearch} className={`relative w-full transition-all duration-500 ${scrolled ? 'lg:w-[250px]' : 'lg:w-[400px]'}`}>
                            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="EXECUTE_SEARCH_QUERY..." className={`w-full border-4 border-foreground bg-transparent font-black uppercase placeholder-foreground/30 transition-all outline-none focus:bg-foreground focus:text-background focus:placeholder-background/30 ${scrolled ? 'p-3 text-xs' : 'p-6 text-sm'}`} />
                            <button type="submit" className="absolute top-1/2 right-4 -translate-y-1/2">
                                <Search className={`${scrolled ? 'h-4 w-4' : 'h-6 w-6'}`} />
                            </button>
                        </form>

                        <div className="flex items-center gap-4">
                            <button onClick={toggleTheme} className={`group relative border-4 border-foreground transition-all hover:bg-foreground hover:text-background ${scrolled ? 'p-2' : 'p-4'}`}>
                                {appearance === 'light' ? <Sun className={`${scrolled ? 'h-5 w-5' : 'h-6 w-6'}`} /> : <Moon className={`${scrolled ? 'h-5 w-5' : 'h-6 w-6'}`} />}
                            </button>

                            <Sheet>
                                <SheetTrigger asChild>
                                    <button className={`group flex items-center gap-4 border-4 border-foreground bg-foreground font-black text-background transition-all hover:bg-primary ${scrolled ? 'p-2' : 'p-4'}`}>
                                        <Menu className={`${scrolled ? 'h-5 w-5' : 'h-6 w-6'}`} />
                                        {!scrolled && <span className="hidden text-sm uppercase lg:block">INDEX_CHANNELS</span>}
                                    </button>
                                </SheetTrigger>
                                <SheetContent side="right" className="w-full border-l-[20px] border-foreground bg-background p-0 md:max-w-xl">
                                    <div className="flex h-full flex-col p-12">
                                        <div className="mb-20 flex items-center justify-between border-b-8 border-foreground pb-8">
                                            <h2 className="text-5xl font-black tracking-tighter uppercase italic">DIRECTORY</h2>
                                            <div className="h-4 w-4 bg-primary"></div>
                                        </div>
                                        <nav className="flex flex-col gap-4">
                                            <Link href="/" className="group flex items-center justify-between border-b-2 border-foreground/10 py-6 text-4xl font-black uppercase italic transition-all hover:text-primary">
                                                00_HOME
                                                <ChevronRight className="h-8 w-8 translate-x-10 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                                            </Link>
                                            {categories.map((cat: any, i: number) => (
                                                <Link key={cat.id} href={`/${cat.slug}`} className="group flex items-center justify-between border-b-2 border-foreground/10 py-6 text-4xl font-black uppercase italic transition-all hover:text-primary">
                                                    {String(i + 1).padStart(2, '0')}_{cat.name}
                                                    <ChevronRight className="h-8 w-8 translate-x-10 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                                                </Link>
                                            ))}
                                        </nav>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </div>

            {/* MINIMAL SUBNAVBAR */}
            {!scrolled && (
                <nav className="border-b-4 border-foreground bg-background py-4">
                    <div className="no-scrollbar mx-auto max-w-[1700px] overflow-x-auto px-8">
                        <div className="flex items-center gap-12 text-[11px] font-[900] tracking-[0.2em] whitespace-nowrap uppercase">
                            <Link href="/" className={`transition-all hover:text-primary ${url === '/' ? 'text-primary underline decoration-4 underline-offset-8' : ''}`}>
                                / ROOT
                            </Link>
                            {categories.map((cat: any) => {
                                const href = `/${cat.slug}`;
                                const isActive = url === href || url.startsWith(`${href}/`);
                                return (
                                    <Link key={cat.id} href={href} className={`transition-all hover:text-primary ${isActive ? 'text-primary underline decoration-4 underline-offset-8' : ''}`}>
                                        / {cat.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </nav>
            )}
        </header>
    );
};

export default Navbar;
