import { Link, usePage } from '@inertiajs/react';
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from 'lucide-react';
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
        <footer className="mt-20 border-t border-gray-100 bg-white transition-colors dark:border-gray-800 dark:bg-gray-950">
            {/* 1. TOP SECTION: Branding & Socials */}
            <div className="container mx-auto max-w-7xl px-4 pt-16 pb-12">
                <div className="flex flex-col items-center justify-between border-b border-gray-100 pb-12 lg:flex-row dark:border-gray-800">
                    <div className="mb-8 lg:mb-0">
                        <Link href="/" className="flex flex-col items-center leading-none lg:items-start">
                            <span className="text-4xl font-black uppercase tracking-tighter text-[#0455A4]">
                                {firstPart}
                                <span className="text-gray-900 dark:text-gray-100">{restParts ? ` ${restParts}` : ''}</span>
                            </span>
                            <span className="mt-1 text-[11px] font-bold uppercase tracking-[0.3em] text-gray-500">{siteSettings?.tagline || 'Informasi Terpercaya'}</span>
                        </Link>
                    </div>

                    <div className="flex flex-col items-center gap-6 lg:items-end">
                        <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Ikuti Kami Di Media Sosial</span>
                        {socials.length > 0 && (
                            <div className="flex gap-4">
                                {socials.map((social) => (
                                    <a
                                        key={social.key}
                                        href={social.url!}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 bg-white transition-all hover:border-[#0455A4] hover:bg-[#0455A4] dark:border-gray-800 dark:bg-gray-900"
                                    >
                                        <social.icon className="h-4 w-4 text-gray-400 group-hover:text-white" />
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* 2. GRID SECTION: Links & Info */}
                <div className="grid grid-cols-2 gap-12 py-16 md:grid-cols-4 lg:grid-cols-5">
                    {/* About Us Column */}
                    <div className="col-span-2 lg:col-span-2">
                        <h4 className="mb-6 text-[13px] font-bold uppercase tracking-wider text-gray-900 dark:text-gray-100">Tentang Kami</h4>
                        <p className="max-w-md text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                            {siteSettings?.description || `Portal berita ${siteSettings?.site_name || 'Lensa Publik'} menyajikan informasi tercepat, akurat, dan mendalam dari seluruh penjuru negeri secara profesional dan independen.`}
                        </p>

                        <div className="mt-8 space-y-4">
                            {siteSettings?.address && (
                                <div className="flex items-start gap-4 text-xs text-gray-500">
                                    <MapPin className="h-4 w-4 shrink-0 text-[#0455A4]" />
                                    <span>{siteSettings.address}</span>
                                </div>
                            )}
                            {siteSettings?.email && (
                                <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
                                    <Mail className="h-4 w-4 shrink-0 text-[#0455A4]" />
                                    <span>{siteSettings.email}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Quick Navigation */}
                    <div className="col-span-1">
                        <h4 className="mb-6 text-[13px] font-bold uppercase tracking-wider text-gray-900 dark:text-gray-100">Kanal Berita</h4>
                        {categories.length > 0 ? (
                            <ul className="space-y-3">
                                {categories.slice(0, 7).map((cat) => (
                                    <li key={cat.id}>
                                        <Link href={`/${cat.slug}`} className="text-sm text-gray-500 transition-colors hover:text-[#0455A4] dark:hover:text-[#0455A4]">
                                            {cat.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-xs italic text-gray-400">Belum tersedia.</p>
                        )}
                    </div>

                    <div className="col-span-1 pt-11 lg:pt-[44px]">
                        {categories.length > 7 ? (
                            <ul className="space-y-3">
                                {categories.slice(7, 14).map((cat) => (
                                    <li key={cat.id}>
                                        <Link href={`/${cat.slug}`} className="text-sm text-gray-500 transition-colors hover:text-[#0455A4] dark:hover:text-[#0455A4]">
                                            {cat.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ) : null}
                    </div>

                    {/* Company Legal */}
                    <div className="col-span-1 lg:col-span-1">
                        <h4 className="mb-6 text-[13px] font-bold uppercase tracking-wider text-gray-900 dark:text-gray-100">Informasi</h4>
                        <ul className="space-y-3 text-sm text-gray-500">
                            <li>
                                <Link href="/" className="hover:text-[#0455A4]">
                                    Redaksi
                                </Link>
                            </li>
                            <li>
                                <Link href="/" className="hover:text-[#0455A4]">
                                    Pedoman Media Siber
                                </Link>
                            </li>
                            <li>
                                <Link href="/" className="hover:text-[#0455A4]">
                                    Disclaimer
                                </Link>
                            </li>
                            <li>
                                <Link href="/" className="hover:text-[#0455A4]">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/" className="hover:text-[#0455A4]">
                                    Info Iklan
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* 3. BOTTOM SECTION: Copyright */}
            <div className="bg-gray-50 py-8 dark:bg-gray-900/50">
                <div className="container mx-auto max-w-7xl px-4">
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                            © {new Date().getFullYear()} <span className="text-[#0455A4]">{siteSettings?.site_name || 'Lensa Publik'}</span>. All Rights Reserved.
                        </p>
                        <div className="flex items-center gap-6">
                            <Link href="/login" className="text-[10px] font-bold uppercase tracking-wide text-gray-400 hover:text-[#0455A4]">
                                Admin Login
                            </Link>
                            <span className="text-[10px] font-bold uppercase tracking-wide text-gray-400">Terpercaya Sejak 2025</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
