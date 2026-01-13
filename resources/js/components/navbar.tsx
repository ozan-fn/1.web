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
        <header className="sticky top-0 z-50 bg-background dark:bg-background">
            {/* BRAND HEADER - Compact Style */}
            <div className={`border-foreground dark:border-foreground px-4 sm:px-8 lg:px-16 ${scrolled ? 'border-b-4 py-3' : 'border-b-4 py-4 sm:py-6'}`}>
                <div className="mx-auto flex max-w-[1700px] flex-col items-center justify-between gap-4 lg:flex-row lg:items-center">
                    <div className="flex flex-col items-center lg:items-start lg:flex-row lg:items-center lg:gap-6">
                        <div className="flex items-center gap-2 sm:gap-4 mb-2 lg:mb-0">
                            <span className="bg-primary dark:bg-primary px-2 sm:px-3 py-1 text-[8px] sm:text-[10px] font-black tracking-[0.3em] text-white dark:text-white uppercase italic">SYSTEM_LIVE_V.4.0</span>
                            <div className="h-1 w-8 sm:w-12 bg-foreground dark:bg-foreground opacity-10"></div>
                        </div>
                        <Link href="/" className="group relative">
                            <h1 className="leading-none font-[900] tracking-[-0.08em] text-foreground dark:text-foreground uppercase text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                                {siteName.split(' ')[0]}
                                <span className="text-primary dark:text-primary italic">{siteName.split(' ').slice(1).join('_')}</span>
                            </h1>
                        </Link>
                    </div>

                    {/* Search & Actions Block */}
                    <div className="flex w-full flex-col gap-3 lg:w-auto lg:flex-row lg:items-center">
                        <form onSubmit={handleSearch} className="relative w-full lg:w-[280px]">
                            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="SEARCH..." className="w-full border-2 border-foreground dark:border-foreground bg-transparent dark:bg-transparent font-black uppercase placeholder-foreground/30 dark:placeholder-foreground/30 text-foreground dark:text-foreground p-3 text-xs" />
                            <button type="submit" className="absolute top-1/2 right-3 -translate-y-1/2">
                                <Search className="h-4 w-4 text-foreground dark:text-foreground" />
                            </button>
                        </form>

                        <div className="flex items-center gap-3">
                            <button onClick={toggleTheme} className="border-2 border-foreground dark:border-foreground hover:bg-foreground dark:hover:bg-foreground hover:text-background dark:hover:text-background p-2">
                                {appearance === 'light' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                            </button>

                            <Sheet>
                                <SheetTrigger asChild>
                                    <button className="flex items-center gap-2 border-2 border-foreground dark:border-foreground bg-foreground dark:bg-foreground font-black text-background dark:text-background hover:bg-primary dark:hover:bg-primary p-2">
                                        <Menu className="h-4 w-4" />
                                        <span className="hidden text-xs uppercase lg:block">MENU</span>
                                    </button>
                                </SheetTrigger>
                                <SheetContent side="right" className="w-full border-l-[10px] sm:border-l-[20px] border-foreground dark:border-foreground bg-background dark:bg-background p-0 md:max-w-xl">
                                    <div className="flex h-full flex-col p-6 sm:p-12">
                                        <div className="mb-12 sm:mb-20 flex items-center justify-between border-b-4 sm:border-b-8 border-foreground dark:border-foreground pb-4 sm:pb-8">
                                            <h2 className="text-3xl sm:text-5xl font-black tracking-tighter uppercase italic text-foreground dark:text-foreground">DIRECTORY</h2>
                                            <div className="h-3 w-3 sm:h-4 sm:w-4 bg-primary dark:bg-primary"></div>
                                        </div>
                                        <nav className="flex flex-col gap-2 sm:gap-4">
                                            <Link href="/" className="group flex items-center justify-between border-b-2 border-foreground/10 dark:border-foreground/10 py-4 sm:py-6 text-2xl sm:text-4xl font-black uppercase italic transition-all hover:text-primary dark:hover:text-primary text-foreground dark:text-foreground">
                                                00_HOME
                                                <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8 translate-x-10 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                                            </Link>
                                            {categories.map((cat: any, i: number) => (
                                                <Link key={cat.id} href={`/${cat.slug}`} className="group flex items-center justify-between border-b-2 border-foreground/10 dark:border-foreground/10 py-4 sm:py-6 text-2xl sm:text-4xl font-black uppercase italic transition-all hover:text-primary dark:hover:text-primary text-foreground dark:text-foreground">
                                                    {String(i + 1).padStart(2, '0')}_{cat.name}
                                                    <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8 translate-x-10 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
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

            {/* SUB NAVBAR */}
            <nav className="border-b-2 border-foreground dark:border-foreground bg-background dark:bg-background py-2">
                <div className="no-scrollbar mx-auto max-w-[1700px] overflow-x-auto px-4 sm:px-8">
                    <div className="flex items-center gap-6 text-[10px] font-[900] tracking-[0.1em] whitespace-nowrap uppercase">
                        <Link href="/" className={`hover:text-primary dark:hover:text-primary text-foreground dark:text-foreground ${url === '/' ? 'text-primary dark:text-primary underline decoration-2 underline-offset-4' : ''}`}>
                            / ROOT
                        </Link>
                        {categories.map((cat: any) => {
                            const href = `/${cat.slug}`;
                            const isActive = url === href || url.startsWith(`${href}/`);
                            return (
                                <Link key={cat.id} href={href} className={`hover:text-primary dark:hover:text-primary text-foreground dark:text-foreground ${isActive ? 'text-primary dark:text-primary underline decoration-2 underline-offset-4' : ''}`}>
                                    / {cat.name}
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
