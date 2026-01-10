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
        <footer className="mt-24 bg-gradient-to-b from-background to-muted/50 pt-20 pb-10 transition-colors">
            <div className="container mx-auto max-w-[1400px] px-4">
                {/* Main Footer Content */}
                <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-12">
                    {/* Brand Section - Modern Card */}
                    <div className="lg:col-span-5">
                        <div className="rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 p-8">
                            <Link href="/" className="mb-4 inline-block">
                                <h2 className="font-sans text-4xl font-extrabold text-foreground">
                                    {firstPart}
                                    {restParts && <span className="text-primary"> {restParts}</span>}
                                </h2>
                            </Link>
                            <p className="mb-2 text-sm font-bold text-primary">{siteSettings?.tagline || 'Informasi Terpercaya'}</p>
                            <p className="mb-6 text-sm leading-relaxed text-muted-foreground">{siteSettings?.description || `Portal berita terpercaya yang menyajikan informasi tercepat dan akurat.`}</p>

                            {/* Contact Info - Modern Icons */}
                            <div className="mb-6 space-y-3">
                                {siteSettings?.email && (
                                    <a href={`mailto:${siteSettings.email}`} className="flex items-center gap-3 text-sm font-medium text-foreground transition-colors hover:text-primary">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
                                            <Mail className="h-4 w-4" />
                                        </div>
                                        <span>{siteSettings.email}</span>
                                    </a>
                                )}
                                {siteSettings?.phone && (
                                    <a href={`tel:${siteSettings.phone}`} className="flex items-center gap-3 text-sm font-medium text-foreground transition-colors hover:text-primary">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
                                            <Phone className="h-4 w-4" />
                                        </div>
                                        <span>{siteSettings.phone}</span>
                                    </a>
                                )}
                            </div>

                            {/* Social Icons - Colorful Modern */}
                            {socials.length > 0 && (
                                <div className="flex gap-3">
                                    {socials.map((social) => {
                                        const colors: Record<string, string> = {
                                            facebook: 'bg-[#1877F2] hover:bg-[#1877F2]/90',
                                            instagram: 'bg-gradient-to-tr from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] hover:opacity-90',
                                            twitter: 'bg-black hover:bg-black/90',
                                            youtube: 'bg-[#FF0000] hover:bg-[#FF0000]/90',
                                        };
                                        return (
                                            <a key={social.key} href={social.url!} target="_blank" rel="noopener noreferrer" className={`flex h-11 w-11 items-center justify-center rounded-full text-white shadow-lg transition-all hover:scale-110 ${colors[social.key] || 'bg-primary hover:bg-primary/90'}`}>
                                                <social.icon className="h-5 w-5" />
                                            </a>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Categories - Modern List */}
                    <div className="lg:col-span-3">
                        <h3 className="mb-6 font-sans text-xl font-bold text-foreground">Kategori</h3>
                        <div className="mb-6 h-1 w-12 rounded-full bg-primary"></div>
                        {categories.length > 0 ? (
                            <ul className="space-y-3">
                                {categories.slice(0, 8).map((cat) => (
                                    <li key={cat.id}>
                                        <Link href={`/${cat.slug}`} className="group flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                                            <div className="h-1.5 w-1.5 rounded-full bg-primary/50 transition-all group-hover:w-4"></div>
                                            {cat.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-muted-foreground italic">Belum ada kategori.</p>
                        )}
                    </div>

                    {/* Info Links - Modern */}
                    <div className="lg:col-span-2">
                        <h3 className="mb-6 font-sans text-xl font-bold text-foreground">Informasi</h3>
                        <div className="mb-6 h-1 w-12 rounded-full bg-primary"></div>
                        <ul className="space-y-3">
                            {[
                                { title: 'Tentang Kami', url: '#' },
                                { title: 'Redaksi', url: '#' },
                                { title: 'Kontak', url: '#' },
                                { title: 'Privasi', url: '#' },
                            ].map((link) => (
                                <li key={link.title}>
                                    <Link href={link.url} className="group flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                                        <div className="h-1.5 w-1.5 rounded-full bg-primary/50 transition-all group-hover:w-4"></div>
                                        {link.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* CTA - Modern Card */}
                    <div className="lg:col-span-2">
                        <div className="rounded-2xl bg-card p-6 shadow-lg">
                            <h3 className="mb-3 font-sans text-xl font-bold text-foreground">Hubungi Kami</h3>
                            <p className="mb-5 text-sm leading-relaxed text-muted-foreground">Punya informasi atau ingin bekerjasama?</p>
                            <Link href="#" className="flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-lg transition-all hover:scale-105 hover:bg-primary/90">
                                Kirim Berita
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar - Modern */}
                <div className="flex flex-col items-center justify-between gap-4 rounded-2xl bg-muted/50 p-6 md:flex-row">
                    <p className="text-sm font-medium text-muted-foreground">
                        © {new Date().getFullYear()} {siteSettings?.site_name || 'Portal Berita'}. All rights reserved.
                    </p>
                    <Link href="/login" className="rounded-full bg-background px-5 py-2 text-sm font-semibold text-foreground shadow-sm transition-all hover:bg-primary hover:text-primary-foreground">
                        Admin
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
