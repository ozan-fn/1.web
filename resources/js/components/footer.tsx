import { Link, usePage } from '@inertiajs/react';
import { ArrowRight, Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from 'lucide-react';

// Interface disamakan dengan Navbar untuk konsistensi type
interface SharedProps {
    settings: {
        site_name: string;
        tagline: string | null;
        description: string | null;
        email: string | null;
        phone: string | null;
        address: string | null;
        logo: string | null;
        social_facebook: string | null;
        social_instagram: string | null;
        social_twitter: string | null;
        social_youtube: string | null;
    } | null;
    categories: Array<{
        id: number;
        name: string;
        slug: string;
    }>;
    [key: string]: any;
}

export default function Footer() {
    // 1. Ambil data dari Middleware (Global)
    const { props } = usePage<SharedProps>();
    const { settings, categories } = props;

    // Split site name for styling (Sama seperti Navbar)
    const siteNameParts = settings?.site_name?.split(' ') || ['LENSA', 'PUBLIK'];
    const firstPart = siteNameParts[0];
    const restParts = siteNameParts.slice(1).join(' ');

    const socials = [
        { key: 'facebook', icon: Facebook, url: settings?.social_facebook, color: 'hover:bg-blue-600 hover:border-blue-600' },
        { key: 'instagram', icon: Instagram, url: settings?.social_instagram, color: 'hover:bg-pink-600 hover:border-pink-600' },
        { key: 'twitter', icon: Twitter, url: settings?.social_twitter, color: 'hover:bg-sky-500 hover:border-sky-500' },
        { key: 'youtube', icon: Youtube, url: settings?.social_youtube, color: 'hover:bg-red-600 hover:border-red-600' },
    ].filter((s) => s.url);

    return (
        <footer className="w-full border-t border-border/40 bg-muted/20 pt-16 pb-8 text-muted-foreground">
            <div className="container mx-auto max-w-7xl px-4 lg:px-8">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                    {/* KOLOM 1: Brand & Contact (Lebar: 4 span) */}
                    <div className="space-y-6 lg:col-span-4">
                        <div>
                            <Link href="/" className="inline-block">
                                <h2 className="text-2xl font-black tracking-tighter text-foreground uppercase italic">
                                    {firstPart}
                                    <span className="font-light text-muted-foreground"> {restParts}</span>
                                </h2>
                            </Link>
                            <p className="mt-1 text-[10px] font-bold tracking-[0.25em] text-primary uppercase">{settings?.tagline || 'Informasi Terpercaya'}</p>
                        </div>

                        <p className="max-w-sm text-sm leading-relaxed text-foreground/80">{settings?.description || `Portal berita terdepan yang menyajikan informasi aktual, tajam, dan terpercaya dari berbagai penjuru.`}</p>

                        <div className="space-y-3 pt-2">
                            {settings?.address && (
                                <div className="group flex items-start gap-3 text-sm">
                                    <MapPin className="mt-1 h-4 w-4 shrink-0 text-primary transition-colors group-hover:text-foreground" />
                                    <span className="transition-colors group-hover:text-foreground">{settings.address}</span>
                                </div>
                            )}
                            {settings?.email && (
                                <div className="group flex items-center gap-3 text-sm">
                                    <Mail className="h-4 w-4 shrink-0 text-primary transition-colors group-hover:text-foreground" />
                                    <a href={`mailto:${settings.email}`} className="transition-colors group-hover:text-foreground hover:underline">
                                        {settings.email}
                                    </a>
                                </div>
                            )}
                            {settings?.phone && (
                                <div className="group flex items-center gap-3 text-sm">
                                    <Phone className="h-4 w-4 shrink-0 text-primary transition-colors group-hover:text-foreground" />
                                    <span className="transition-colors group-hover:text-foreground">{settings.phone}</span>
                                </div>
                            )}
                        </div>

                        {/* Social Icons */}
                        {socials.length > 0 && (
                            <div className="flex gap-2 pt-2">
                                {socials.map((social) => (
                                    <a key={social.key} href={social.url!} target="_blank" rel="noopener noreferrer" className={`flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background transition-all hover:text-white ${social.color}`}>
                                        <social.icon className="h-4 w-4" />
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* KOLOM 2: Kategori (Lebar: 3 span) */}
                    <div className="lg:col-span-3">
                        <h3 className="mb-6 text-sm font-bold tracking-wider text-foreground uppercase">Topik Populer</h3>
                        {categories && categories.length > 0 ? (
                            <ul className="space-y-3">
                                {categories.slice(0, 6).map((cat) => (
                                    <li key={cat.id}>
                                        <Link href={`/${cat.slug}`} className="group flex items-center justify-between text-sm transition-colors hover:font-medium hover:text-primary">
                                            <span>{cat.name}</span>
                                            <ArrowRight className="h-3 w-3 -translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-xs text-muted-foreground italic">Belum ada kategori.</p>
                        )}
                    </div>

                    {/* KOLOM 3: Informasi (Lebar: 2 span) */}
                    <div className="lg:col-span-2">
                        <h3 className="mb-6 text-sm font-bold tracking-wider text-foreground uppercase">Tentang</h3>
                        <ul className="space-y-3">
                            {[
                                { title: 'Redaksi', url: '#' },
                                { title: 'Pedoman Media', url: '#' },
                                { title: 'Disclaimer', url: '#' },
                                { title: 'Kebijakan Privasi', url: '#' },
                                { title: 'Karir', url: '#' },
                            ].map((link) => (
                                <li key={link.title}>
                                    <Link href={link.url} className="text-sm underline-offset-4 transition-colors hover:text-primary hover:underline">
                                        {link.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* KOLOM 4: CTA / Bantuan (Lebar: 3 span) */}
                    <div className="lg:col-span-3">
                        <h3 className="mb-6 text-sm font-bold tracking-wider text-foreground uppercase">Kolaborasi</h3>
                        <div className="rounded-lg border border-border bg-background p-6 shadow-sm">
                            <p className="mb-4 text-xs leading-relaxed text-muted-foreground">Ingin beriklan atau mengirim rilis berita? Hubungi tim redaksi kami.</p>
                            <div className="space-y-3">
                                <Link href="#" className="flex w-full items-center justify-center rounded-md bg-primary px-4 py-2.5 text-xs font-bold tracking-wide text-primary-foreground uppercase transition-all hover:bg-primary/90 hover:shadow-md">
                                    Hubungi Redaksi
                                </Link>
                                <Link href="#" className="flex w-full items-center justify-center rounded-md border border-input bg-transparent px-4 py-2.5 text-xs font-bold tracking-wide uppercase transition-colors hover:bg-accent hover:text-accent-foreground">
                                    Info Iklan
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-8 md:flex-row">
                    <p className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                        © {new Date().getFullYear()} <span className="text-foreground">{settings?.site_name || 'Lensa Publik'}</span>. All Rights Reserved.
                    </p>

                    <div className="flex items-center gap-6">
                        <Link href="/login" className="text-[10px] font-bold text-muted-foreground uppercase transition-colors hover:text-primary">
                            Admin Access
                        </Link>
                        <span className="h-3 w-px bg-border"></span>
                        <Link href="#" className="text-[10px] font-bold text-muted-foreground uppercase transition-colors hover:text-primary">
                            Sitemap
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
