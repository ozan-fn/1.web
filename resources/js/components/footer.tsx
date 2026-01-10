import { Link, usePage } from '@inertiajs/react';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import React from 'react';

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface SiteSettings {
    site_name: string;
    tagline: string | null;
    description: string | null;
    email: string | null;
    phone: string | null;
    address: string | null;
    social_facebook: string | null;
    social_instagram: string | null;
    social_twitter: string | null;
    social_youtube: string | null;
}

interface Props {
    categories?: Category[];
    siteSettings?: SiteSettings | null;
}

const Footer: React.FC<Props> = ({ categories: propCategories, siteSettings: propSiteSettings }) => {
    const { props } = usePage<any>();
    const categories = propCategories || props.categories || [];
    const siteSettings = propSiteSettings || props.siteSettings;

    // Split site name for styling
    const siteNameParts = siteSettings?.site_name?.split(' ') || ['NEWS', 'PORTAL'];
    const firstPart = siteNameParts[0];
    const restParts = siteNameParts.slice(1).join(' ');

    const socials = [
        { key: 'facebook', icon: Facebook, url: siteSettings?.social_facebook },
        {
            key: 'instagram',
            icon: Instagram,
            url: siteSettings?.social_instagram,
        },
        { key: 'twitter', icon: Twitter, url: siteSettings?.social_twitter },
        { key: 'youtube', icon: Youtube, url: siteSettings?.social_youtube },
    ].filter((s) => s.url);

    return (
        <footer className="mt-40 overflow-hidden border-t border-foreground bg-background py-20 text-muted-foreground transition-colors">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 gap-20 lg:grid-cols-4">
                    {/* Brand Info */}
                    <div className="lg:col-span-2">
                        <div className="mb-10">
                            <Link href="/" className="group flex items-center gap-6">
                                <div className="flex h-16 w-16 items-center justify-center border-2 border-foreground bg-foreground font-mono text-3xl font-bold text-background">{firstPart.charAt(0)}</div>
                                <h2 className="text-4xl leading-[1.1] font-bold tracking-tighter text-foreground uppercase">
                                    {firstPart}
                                    <span className="block text-muted-foreground/30">{restParts}</span>
                                </h2>
                            </Link>
                        </div>
                        <p className="max-w-md font-mono text-[11px] leading-relaxed font-medium tracking-wide uppercase opacity-60">{siteSettings?.description || `Portal berita ${siteSettings?.site_name} menyajikan informasi tercepat, akurat, dan mendalam dari seluruh penjuru negeri.`}</p>

                        <div className="mt-12 flex gap-2">
                            {socials.map((social) => (
                                <a key={social.key} href={social.url!} target="_blank" rel="noopener noreferrer" className="flex h-12 w-12 items-center justify-center border border-foreground/10 grayscale transition-all hover:bg-foreground hover:text-background hover:grayscale-0">
                                    <social.icon className="h-4 w-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="mb-10 font-mono text-[10px] font-bold tracking-[0.5em] text-muted-foreground uppercase">Archives</h3>
                        <ul className="grid grid-cols-1 gap-4 font-mono text-[10px] font-bold tracking-[0.2em] text-foreground uppercase">
                            {categories.slice(0, 8).map((cat) => (
                                <li key={cat.id}>
                                    <Link href={`/${cat.slug}`} className="transition-all hover:text-primary">
                                        / {cat.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Info Links */}
                    <div>
                        <h3 className="mb-10 font-mono text-[10px] font-bold tracking-[0.5em] text-muted-foreground uppercase">Information</h3>
                        <ul className="grid grid-cols-1 gap-4 font-mono text-[10px] font-bold tracking-[0.2em] text-foreground uppercase">
                            {[
                                { title: 'Terms', url: '#' },
                                { title: 'Editorial', url: '#' },
                                { title: 'Privacy', url: '#' },
                                { title: 'Contact', url: '#' },
                            ].map((link) => (
                                <li key={link.title}>
                                    <Link href={link.url} className="transition-all hover:ml-2 hover:text-primary">
                                        {link.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-20 flex flex-col items-center justify-between border-t border-border/50 pt-10 lg:flex-row">
                    <p className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase">
                        © {new Date().getFullYear()} {siteSettings?.site_name}. Built for the future.
                    </p>
                    <div className="mt-6 flex gap-8 lg:mt-0">
                        <Link href="/login" className="text-[10px] font-black tracking-widest text-muted-foreground uppercase transition-all hover:text-primary">
                            Member Area
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
