import { Link, usePage } from '@inertiajs/react';
import { Facebook, Instagram, Mail, MapPin, Twitter, Youtube } from 'lucide-react';
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
        <footer className="mt-40 bg-foreground text-background">
            {/* Massive Industry Header */}
            <div className="border-b border-background/10 py-20">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-[12vw] leading-none font-black tracking-tighter uppercase italic md:text-[15vw]">
                        {firstPart}
                        <span className="text-primary opacity-80">{restParts ? ` ${restParts}` : ''}</span>
                    </h2>
                    <div className="mt-10 flex flex-wrap justify-center gap-10 text-[10px] font-black tracking-[0.5em] uppercase md:gap-20">
                        <span>Reliable</span>
                        <span className="text-primary">●</span>
                        <span>Accurate</span>
                        <span className="text-primary">●</span>
                        <span>Deep Impact</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto max-w-7xl px-4 py-20">
                <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-4">
                    {/* About Column */}
                    <div>
                        <div className="mb-10 text-xs font-black tracking-[0.3em] text-primary uppercase">About Platform</div>
                        <p className="text-lg leading-tight font-bold tracking-tight uppercase">{siteSettings?.description || `Portal berita ${siteSettings?.site_name || 'Lensa Publik'} menyajikan informasi tercepat, akurat, dan mendalam dari seluruh penjuru negeri.`}</p>
                        <div className="mt-10 space-y-2 text-[10px] font-black tracking-widest uppercase opacity-60">
                            {siteSettings?.address && (
                                <div className="flex gap-2">
                                    <MapPin className="h-3 w-3" /> {siteSettings.address}
                                </div>
                            )}
                            {siteSettings?.email && (
                                <div className="flex items-center gap-2">
                                    <Mail className="h-3 w-3" /> {siteSettings.email}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Navigation Column */}
                    <div>
                        <div className="mb-10 text-xs font-black tracking-[0.3em] text-primary uppercase">Navigation</div>
                        <ul className="grid grid-cols-1 gap-4 text-xl font-black uppercase italic">
                            {categories.slice(0, 6).map((cat: any) => (
                                <li key={cat.id}>
                                    <Link href={`/${cat.slug}`} className="inline-block transition-all hover:translate-x-2 hover:text-primary">
                                        {cat.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Info Column */}
                    <div>
                        <div className="mb-10 text-xs font-black tracking-[0.3em] text-primary uppercase">Information</div>
                        <ul className="flex flex-col gap-4 text-sm font-black tracking-widest uppercase">
                            {['Tentang Kami', 'Redaksi', 'Pedoman Media Siber', 'Disclaimer', 'Kebijakan Privasi', 'Kontak Kami'].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="italic opacity-60 transition-all hover:text-primary hover:opacity-100">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Industrial Contact */}
                    <div className="group relative overflow-hidden border-4 border-primary p-8 transition-all hover:bg-primary hover:text-primary-foreground">
                        <div className="relative z-10">
                            <div className="mb-6 text-xs font-black tracking-[0.3em] uppercase">Be Part of Us</div>
                            <h4 className="text-3xl leading-tight font-black uppercase italic">SEND YOUR NEWS TO OUR DESK</h4>
                            <div className="mt-10 flex gap-4">
                                {socials.map((social) => (
                                    <a key={social.key} href={social.url!} target="_blank" rel="noopener noreferrer" className="flex h-12 w-12 items-center justify-center border-2 border-current transition-all hover:bg-background hover:text-foreground">
                                        <social.icon className="h-5 w-5" />
                                    </a>
                                ))}
                            </div>
                        </div>
                        <div className="pointer-events-none absolute -right-4 -bottom-4 text-8xl font-black italic opacity-10 transition-all group-hover:opacity-20">SOS</div>
                    </div>
                </div>

                <div className="mt-32 flex flex-col items-center justify-between border-t border-background/10 pt-10 md:flex-row">
                    <p className="text-[10px] font-black tracking-[0.3em] uppercase opacity-50">
                        © {new Date().getFullYear()} {siteSettings?.site_name}. ALL RIGHTS RESERVED.
                    </p>
                    <div className="mt-4 flex gap-8 text-[10px] font-black tracking-[0.3em] uppercase md:mt-0">
                        <span className="cursor-help transition-colors hover:text-primary">SYSTEM v4.0.2</span>
                        <Link href="/login" className="transition-colors hover:text-primary">
                            ADMIN LOGIN
                        </Link>
                        <span className="cursor-help transition-colors hover:text-primary">DESIGN BY AGENT</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
