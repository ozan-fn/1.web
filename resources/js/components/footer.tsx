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

    const siteNameParts = siteSettings?.site_name?.split(' ') || ['NEWS', 'PORTAL'];
    const firstPart = siteNameParts[0];
    const restParts = siteNameParts.slice(1).join(' ');

    const socials = [
        { key: 'facebook', icon: Facebook, url: siteSettings?.social_facebook },
        { key: 'instagram', icon: Instagram, url: siteSettings?.social_instagram },
        { key: 'twitter', icon: Twitter, url: siteSettings?.social_twitter },
        { key: 'youtube', icon: Youtube, url: siteSettings?.social_youtube },
    ].filter((s) => s.url);

    return (
        <footer className="mt-24 border-t border-border bg-[#050505] pt-24 pb-12 text-zinc-400">
            <div className="container mx-auto max-w-7xl px-8">
                {/* Main Footer Grid */}
                <div className="mb-24 grid grid-cols-1 gap-16 lg:grid-cols-12">
                    {/* Brand Identity Section */}
                    <div className="lg:col-span-4">
                        <Link href="/" className="group inline-block">
                            <h2 className="text-4xl font-black tracking-tighter text-white uppercase italic transition-transform group-hover:-translate-y-1">
                                {firstPart}
                                <span className="text-primary"> {restParts}</span>
                            </h2>
                            <div className="mt-2 h-1 w-12 rounded-full bg-primary transition-all group-hover:w-24"></div>
                        </Link>

                        <p className="mt-8 max-w-sm text-sm leading-relaxed font-medium text-zinc-500">{siteSettings?.description || `Pusat jurnalisme keberlanjutan yang menyuarakan kebenaran dari sudut pandang yang paling jujur.`}</p>

                        <div className="mt-10 flex flex-col gap-6">
                            <div className="group flex cursor-pointer items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900 transition-all group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                                    <Mail className="h-5 w-5" />
                                </div>
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-[10px] font-black tracking-widest text-zinc-600 uppercase">Drop us a line</span>
                                    <span className="text-sm font-bold text-zinc-300">{siteSettings?.email || 'hello@swara.id'}</span>
                                </div>
                            </div>

                            <div className="group flex cursor-pointer items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900 transition-all group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                                    <MapPin className="h-5 w-5" />
                                </div>
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-[10px] font-black tracking-widest text-zinc-600 uppercase">Our Hub</span>
                                    <span className="line-clamp-1 text-sm font-bold text-zinc-300">{siteSettings?.address || 'Jakarta, Indonesia'}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Columns */}
                    <div className="lg:col-span-8">
                        <div className="grid grid-cols-2 gap-12 sm:grid-cols-3">
                            <div>
                                <h3 className="mb-8 text-[11px] font-black tracking-[0.3em] text-white uppercase opacity-40">Categories</h3>
                                <ul className="space-y-4">
                                    {categories.slice(0, 6).map((cat: Category) => (
                                        <li key={cat.id}>
                                            <Link href={`/${cat.slug}`} className="text-sm font-bold transition-all hover:pl-2 hover:text-primary">
                                                {cat.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h3 className="mb-8 text-[11px] font-black tracking-[0.3em] text-white uppercase opacity-40">Company</h3>
                                <ul className="space-y-4">
                                    {['About Us', 'Editorial', 'Media Cyber', 'Disclaimer', 'Privacy Policy'].map((item) => (
                                        <li key={item}>
                                            <Link href="#" className="text-sm font-bold transition-all hover:pl-2 hover:text-primary">
                                                {item}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="col-span-2 sm:col-span-1">
                                <h3 className="mb-8 text-[11px] font-black tracking-[0.3em] text-white uppercase opacity-40">Follow Us</h3>
                                <div className="flex flex-wrap gap-3">
                                    {socials.map((social) => (
                                        <a key={social.key} href={social.url!} target="_blank" rel="noopener noreferrer" className="flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900 transition-all hover:scale-110 hover:border-primary hover:bg-primary hover:text-white">
                                            <social.icon className="h-5 w-5" />
                                        </a>
                                    ))}
                                </div>

                                <div className="mt-12 overflow-hidden rounded-[1.5rem] border border-primary/10 bg-gradient-to-br from-primary/20 to-transparent p-6">
                                    <p className="mb-2 text-[10px] font-black tracking-widest text-primary uppercase">Swara Pro</p>
                                    <p className="mb-4 text-xs font-bold text-zinc-400">Dapatkan akses konten eksklusif.</p>
                                    <button className="w-full rounded-xl bg-white py-3 text-[10px] font-black tracking-tighter text-black uppercase transition-colors hover:bg-primary hover:text-white">Upgrade Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col items-center justify-between gap-8 border-t border-zinc-900 pt-12 md:flex-row">
                    <div className="flex items-center gap-6">
                        <p className="text-[10px] font-black tracking-[0.4em] text-zinc-600 uppercase">
                            © {new Date().getFullYear()} {siteSettings?.site_name}. RAISING THE BAR.
                        </p>
                    </div>

                    <div className="flex items-center gap-8">
                        <Link href="/login" className="text-[10px] font-black tracking-[0.2em] text-zinc-600 uppercase transition-colors hover:text-primary">
                            Console
                        </Link>
                        <div className="h-4 w-px bg-zinc-900"></div>
                        <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
                            <span className="text-[10px] font-black tracking-widest text-zinc-500 uppercase">Service Operational</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
