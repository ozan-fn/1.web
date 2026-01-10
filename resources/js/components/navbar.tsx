import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';
import { Link, router, usePage } from '@inertiajs/react';
import { Home, Menu, Moon, Sun } from 'lucide-react';
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

    const siteNameParts = siteSettings?.site_name?.split(' ') || ['NEWS', 'PORTAL'];
    const firstPart = siteNameParts[0];

    const navItems = [{ icon: Home, label: 'INDEX', href: '/' }];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-foreground/10 bg-background/80 backdrop-blur-xl transition-all duration-300">
            <div className="mx-auto flex h-20 items-center justify-between px-6 lg:px-20">
                <Link href="/" className="flex items-center gap-6">
                    <div className="flex h-10 w-10 items-center justify-center border border-foreground bg-foreground font-mono text-xl font-bold text-background">{firstPart.charAt(0)}</div>
                    <span className="hidden font-mono text-xs font-bold tracking-[0.4em] uppercase lg:block">{siteSettings?.site_name || 'URBAN_JOURNAL'}</span>
                </Link>

                <nav className="hidden items-center gap-10 lg:flex">
                    {categories.slice(0, 5).map((cat: any) => (
                        <Link key={cat.id} href={`/${cat.slug}`} className={cn('font-mono text-[10px] font-bold tracking-[0.4em] uppercase transition-colors hover:text-primary', url === `/${cat.slug}` ? 'text-primary' : 'text-muted-foreground')}>
                            {cat.name}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-8">
                    <button onClick={toggleTheme} className="hidden text-muted-foreground transition-colors hover:text-foreground lg:block">
                        {appearance === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                    </button>

                    <button onClick={() => setSearchOpen(!searchOpen)} className="font-mono text-[10px] font-bold tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground">
                        [SEARCH]
                    </button>

                    <Sheet>
                        <SheetTrigger asChild>
                            <button className="flex items-center gap-4 border border-foreground px-5 py-2 transition-all hover:bg-foreground hover:text-background">
                                <span className="font-mono text-[10px] font-bold tracking-[0.3em] uppercase">EXPAND</span>
                                <Menu className="h-4 w-4" />
                            </button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-full border-l border-foreground/10 bg-background p-0 sm:w-[450px]">
                            <SheetHeader className="border-b border-foreground/10 px-10 py-12 text-left">
                                <SheetTitle className="font-mono text-xs font-bold tracking-[0.5em] text-primary uppercase">CATALOGUE_2026</SheetTitle>
                            </SheetHeader>
                            <div className="flex h-full flex-col gap-12 p-10">
                                <div className="space-y-6">
                                    <h4 className="font-mono text-[10px] font-bold tracking-[0.4em] text-muted-foreground uppercase">Primary Sections</h4>
                                    <div className="flex flex-col gap-4">
                                        <Link href="/" className="font-mono text-4xl font-bold tracking-tighter uppercase italic transition-colors hover:text-primary">
                                            00_INDEX
                                        </Link>
                                        {categories.map((cat: any) => (
                                            <Link key={cat.id} href={`/${cat.slug}`} className="font-mono text-4xl font-bold tracking-tighter uppercase transition-colors hover:text-primary">
                                                / {cat.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-auto pb-12">
                                    <div className="mb-8 h-px w-full bg-foreground/10" />
                                    <button onClick={toggleTheme} className="font-mono text-[10px] font-bold tracking-[0.3em] text-muted-foreground uppercase hover:text-foreground">
                                        TOGGLE_VISUAL_MODE: [{appearance.toUpperCase()}]
                                    </button>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>

            {searchOpen && (
                <div className="absolute top-full left-0 w-full animate-in border-b border-foreground/10 bg-background p-10 slide-in-from-top-4">
                    <form onSubmit={handleSearch} className="mx-auto max-w-5xl">
                        <input type="text" autoFocus value={search} onChange={(e) => setSearch(e.target.value)} placeholder="INPUT_QUERY..." className="w-full border-b-2 border-foreground bg-transparent py-6 font-mono text-4xl font-bold tracking-tighter outline-none focus:border-primary" />
                    </form>
                </div>
            )}
        </header>
    );
};

export default Navbar;
