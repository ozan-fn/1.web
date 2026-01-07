import { Link, usePage } from '@inertiajs/react';
import {
    Facebook,
    Instagram,
    Mail,
    MapPin,
    Phone,
    Twitter,
    Youtube,
} from 'lucide-react';
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

const Footer: React.FC<Props> = ({
    categories: propCategories,
    siteSettings: propSiteSettings,
}) => {
    const { props } = usePage<any>();
    const categories = propCategories || props.categories || [];
    const siteSettings = propSiteSettings || props.siteSettings;

    // Split site name for styling
    const siteNameParts = siteSettings?.site_name.split(' ') || [
        'NEWS',
        'PORTAL',
    ];
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
        <footer className="mt-20 border-t-4 border-red-600 bg-black pt-16 pb-12 text-gray-500">
            <div className="container mx-auto max-w-7xl px-4">
                <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
                    {/* Brand Info */}
                    <div className="col-span-1">
                        <div className="mb-6">
                            <Link href="/">
                                <h2 className="text-3xl font-black tracking-tighter text-white uppercase italic">
                                    {firstPart}
                                    <span className="text-gray-400">
                                        {' '}
                                        {restParts}
                                    </span>
                                </h2>
                            </Link>
                            <p className="mt-2 text-[10px] font-bold tracking-[0.3em] text-red-600 uppercase">
                                {siteSettings?.tagline ||
                                    'Informasi Terpercaya'}
                            </p>
                        </div>
                        <p className="mb-6 text-sm leading-relaxed text-gray-400">
                            {siteSettings?.description ||
                                `Portal berita ${siteSettings?.site_name || 'Lensa Publik'} menyajikan informasi tercepat, akurat, dan mendalam dari seluruh penjuru negeri.`}
                        </p>

                        <div className="mb-8 space-y-4">
                            {siteSettings?.address && (
                                <div className="flex gap-3 text-xs leading-normal text-gray-400">
                                    <MapPin className="text-opacity-80 h-4 w-4 shrink-0 text-red-600" />
                                    <span>{siteSettings.address}</span>
                                </div>
                            )}

                            {siteSettings?.email && (
                                <div className="flex items-center gap-3 text-xs font-medium text-gray-400">
                                    <Mail className="text-opacity-80 h-4 w-4 shrink-0 text-red-600" />
                                    <span>{siteSettings.email}</span>
                                </div>
                            )}
                            {siteSettings?.phone && (
                                <div className="flex items-center gap-3 text-xs font-medium text-gray-400">
                                    <Phone className="text-opacity-80 h-4 w-4 shrink-0 text-red-600" />
                                    <span>{siteSettings.phone}</span>
                                </div>
                            )}
                        </div>

                        {socials.length > 0 && (
                            <div className="flex gap-3">
                                {socials.map((social) => (
                                    <a
                                        key={social.key}
                                        href={social.url!}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-sm border border-zinc-800 bg-zinc-900 transition-all hover:border-red-600 hover:bg-red-600 hover:text-white"
                                    >
                                        <social.icon className="h-4 w-4" />
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Quick Links */}
                    <div className="col-span-1">
                        <h3 className="mb-8 border-l-4 border-red-600 pl-4 text-sm font-black tracking-widest text-white uppercase">
                            Kategori Populer
                        </h3>
                        {categories.length > 0 ? (
                            <ul className="grid grid-cols-2 gap-x-4 gap-y-4 text-xs font-bold tracking-tight uppercase">
                                {categories.slice(0, 10).map((cat) => (
                                    <li key={cat.id}>
                                        <Link
                                            href={`/${cat.slug}`}
                                            className="transition-colors hover:text-red-600"
                                        >
                                            {cat.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-xs text-gray-500 italic">
                                Belum ada kategori.
                            </p>
                        )}
                    </div>

                    {/* Info Links */}
                    <div className="col-span-1">
                        <h3 className="mb-8 border-l-4 border-red-600 pl-4 text-sm font-black tracking-widest text-white uppercase">
                            Informasi
                        </h3>
                        <ul className="space-y-4 text-xs font-bold tracking-tight uppercase">
                            {[
                                { title: 'Tentang Kami', url: '#' },
                                { title: 'Redaksi', url: '#' },
                                { title: 'Pedoman Media Siber', url: '#' },
                                { title: 'Disclaimer', url: '#' },
                                { title: 'Kebijakan Privasi', url: '#' },
                                { title: 'Kontak Kami', url: '#' },
                            ].map((link) => (
                                <li key={link.title}>
                                    <Link
                                        href={link.url}
                                        className="transition-colors hover:text-red-500"
                                    >
                                        {link.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Redaksi / Office */}
                    <div className="col-span-1">
                        <h3 className="mb-8 border-l-4 border-red-600 pl-4 text-sm font-black tracking-widest text-white uppercase">
                            Bantuan & Redaksi
                        </h3>
                        <p className="mb-6 text-sm leading-relaxed text-gray-400">
                            Punya informasi berita atau ingin bekerjasama dengan
                            redaksi kami? Silakan hubungi kami melalui saluran
                            berikut.
                        </p>
                        <div className="space-y-3">
                            <Link
                                href="#"
                                className="flex w-full items-center justify-center rounded-sm bg-red-600 px-4 py-3 text-xs font-black tracking-widest text-white uppercase transition hover:bg-white hover:text-black"
                            >
                                Kirim Berita (WA)
                            </Link>
                            <Link
                                href="#"
                                className="flex w-full items-center justify-center rounded-sm border border-zinc-800 bg-zinc-900 px-4 py-3 text-xs font-black tracking-widest text-white uppercase transition hover:border-red-600 hover:bg-red-600"
                            >
                                Media Kit & Iklan
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="border-t border-zinc-900 pt-8 text-center md:flex md:items-center md:justify-between">
                    <p className="text-[11px] font-medium tracking-widest uppercase">
                        © {new Date().getFullYear()}{' '}
                        {siteSettings?.site_name || 'Lensa Publik'}. Seluruh Hak
                        Cipta Dilindungi.
                    </p>
                    <div className="mt-4 flex justify-center gap-6 md:mt-0">
                        <Link
                            href="/login"
                            className="text-[10px] font-bold text-gray-700 uppercase transition-colors hover:text-red-600"
                        >
                            Admin Login
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
