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
        <footer className="mt-24 border-t border-border bg-muted/30 pt-16 pb-8 transition-colors">
            <div className="container mx-auto max-w-[1400px] px-4">
                {/* Main Footer Content */}
                <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12">
                    {/* Brand Section - Larger on left */}
                    <div className="lg:col-span-5">
                        <Link href="/" className="mb-6 inline-block">
                            <h2 className="font-serif text-4xl font-bold text-foreground">{firstPart}</h2>
                            {restParts && <p className="font-serif text-xl text-foreground/70">{restParts}</p>}
                        </Link>
                        <p className="mb-1 text-sm font-medium tracking-wide text-primary">{siteSettings?.tagline || 'Informasi Terpercaya'}</p>
                        <p className="mb-8 text-sm leading-relaxed text-muted-foreground">{siteSettings?.description || `Portal berita terpercaya yang menyajikan informasi tercepat dan akurat.`}</p>

                        {/* Contact Info - Compact */}
                        <div className="mb-8 space-y-3">
                            {siteSettings?.email && (
                                <a href={`mailto:${siteSettings.email}`} className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary">
                                    <Mail className="h-4 w-4" />
                                    <span>{siteSettings.email}</span>
                                </a>
                            )}
                            {siteSettings?.phone && (
                                <a href={`tel:${siteSettings.phone}`} className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary">
                                    <Phone className="h-4 w-4" />
                                    <span>{siteSettings.phone}</span>
                                </a>
                            )}
                        </div>

                        {/* Social Icons - Minimal */}
                        {socials.length > 0 && (
                            <div className="flex gap-3">
                                {socials.map((social) => (
                                    <a key={social.key} href={social.url!} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-all hover:border-primary hover:text-primary">
                                        <social.icon className="h-4 w-4" />
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Categories - Compact */}
                    <div className="lg:col-span-3">
                        <h3 className="mb-6 font-serif text-lg font-bold text-foreground">Kategori</h3>
                        {categories.length > 0 ? (
                            <ul className="space-y-2">
                                {categories.slice(0, 8).map((cat) => (
                                    <li key={cat.id}>
                                        <Link href={`/${cat.slug}`} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                                            {cat.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-muted-foreground italic">Belum ada kategori.</p>
                        )}
                    </div>

                    {/* Info Links - Compact */}
                    <div className="lg:col-span-2">
                        <h3 className="mb-6 font-serif text-lg font-bold text-foreground">Informasi</h3>
                        <ul className="space-y-2">
                            {[
                                { title: 'Tentang Kami', url: '#' },
                                { title: 'Redaksi', url: '#' },
                                { title: 'Kontak', url: '#' },
                                { title: 'Privasi', url: '#' },
                            ].map((link) => (
                                <li key={link.title}>
                                    <Link href={link.url} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                                        {link.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter / CTA - Compact */}
                    <div className="lg:col-span-2">
                        <h3 className="mb-6 font-serif text-lg font-bold text-foreground">Hubungi</h3>
                        <p className="mb-4 text-sm text-muted-foreground">Punya informasi atau ingin bekerjasama?</p>
                        <Link href="#" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                            Kirim Berita
                        </Link>
                    </div>
                </div>

                {/* Bottom Bar - Minimal */}
                <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} {siteSettings?.site_name || 'Portal Berita'}. All rights reserved.
                    </p>
                    <Link href="/login" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                        Admin
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
