import { Link, usePage } from '@inertiajs/react';
import { Facebook, Instagram, Mail, Phone, Twitter, Youtube } from 'lucide-react';
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

    const socials = [
        { key: 'facebook', icon: Facebook, url: siteSettings?.social_facebook },
        { key: 'instagram', icon: Instagram, url: siteSettings?.social_instagram },
        { key: 'twitter', icon: Twitter, url: siteSettings?.social_twitter },
        { key: 'youtube', icon: Youtube, url: siteSettings?.social_youtube },
    ].filter((s) => s.url);

    return (
        <footer className="mt-20 border-t-4 border-blue-700 bg-slate-50 pt-16 pb-12 text-slate-600 transition-colors">
            <div className="container mx-auto max-w-7xl px-4">
                <div className="mb-12 grid grid-cols-1 gap-12 lg:grid-cols-12">
                    {/* Brand Info */}
                    <div className="lg:col-span-4">
                        <div className="mb-6">
                            <Link href="/">
                                <h2 className="text-3xl font-black tracking-tighter text-blue-700 uppercase">{siteSettings?.site_name || 'Harian Indonesia'}</h2>
                            </Link>
                            <p className="mt-1 text-[12px] font-bold tracking-wider text-slate-400 uppercase">{siteSettings?.tagline || 'Informasi Terpercaya'}</p>
                        </div>
                        <p className="mb-8 text-sm leading-relaxed text-slate-500">{siteSettings?.description || `Portal berita ${siteSettings?.site_name || 'Harian Indonesia'} menyajikan informasi tercepat, akurat, dan mendalam dari seluruh penjuru negeri.`}</p>

                        <div className="flex flex-col gap-3">
                            <span className="text-xs font-black tracking-widest text-slate-400 uppercase">Hubungi Kami:</span>
                            <div className="space-y-3">
                                {siteSettings?.email && (
                                    <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
                                        <Mail className="h-4 w-4 shrink-0 text-blue-700" />
                                        <span>{siteSettings.email}</span>
                                    </div>
                                )}
                                {siteSettings?.phone && (
                                    <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
                                        <Phone className="h-4 w-4 shrink-0 text-blue-700" />
                                        <span>{siteSettings.phone}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Categories */}
                    <div className="lg:col-span-5">
                        <h4 className="mb-6 border-l-4 border-blue-700 pl-3 text-sm font-black tracking-widest text-slate-900 uppercase">Kategori Populer</h4>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3">
                            {categories.slice(0, 12).map((category) => (
                                <Link key={category.id} href={`/category/${category.slug}`} className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-700 hover:underline">
                                    {category.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Socials & Apps */}
                    <div className="lg:col-span-3">
                        <h4 className="mb-6 border-l-4 border-blue-700 pl-3 text-sm font-black tracking-widest text-slate-900 uppercase">Ikuti Kami</h4>
                        <div className="mb-8 flex flex-wrap gap-3">
                            {socials.map((social) => (
                                <a key={social.key} href={social.url!} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white transition-all hover:border-blue-700 hover:text-blue-700 hover:shadow-md">
                                    <social.icon className="h-5 w-5" />
                                </a>
                            ))}
                        </div>

                        <div className="space-y-3">
                            <span className="text-xs font-black tracking-widest text-slate-400 uppercase italic">Segera Hadir:</span>
                            <div className="flex gap-2">
                                <div className="flex h-10 w-32 items-center justify-center rounded-lg border border-slate-200 bg-white text-[10px] font-bold text-slate-400 uppercase shadow-sm">Google Play</div>
                                <div className="flex h-10 w-32 items-center justify-center rounded-lg border border-slate-200 bg-white text-[10px] font-bold text-slate-400 uppercase shadow-sm">App Store</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-16 border-t border-slate-200 pt-8">
                    <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-bold tracking-tighter text-slate-400 uppercase">
                            <Link href="/about" className="hover:text-blue-700">
                                Tentang Kami
                            </Link>
                            <Link href="/disclaimer" className="hover:text-blue-700">
                                Disclaimer
                            </Link>
                            <Link href="/privacy" className="hover:text-blue-700">
                                Kebijakan Privasi
                            </Link>
                            <Link href="/pedoman" className="hover:text-blue-700">
                                Pedoman Media Siber
                            </Link>
                            <Link href="/contact" className="hover:text-blue-700">
                                Kontak
                            </Link>
                        </div>
                        <p className="text-xs font-bold text-slate-400">
                            &copy; {new Date().getFullYear()} <span className="text-blue-700">{siteSettings?.site_name}</span>. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
