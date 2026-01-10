import { Link, usePage } from '@inertiajs/react';
import { ArrowUpRight, Cpu, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
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

    const siteName = siteSettings?.site_name || 'INDUSTRIAL_SYSTEM';

    return (
        <footer className="mt-40 border-t-[15px] border-foreground bg-background text-foreground transition-colors selection:bg-foreground selection:text-background">
            {/* MASSIVE TITULAR FOOTER BLOCK */}
            <div className="border-b-4 border-foreground px-8 py-20 lg:px-16 lg:py-40">
                <div className="mx-auto max-w-[1700px]">
                    <div className="grid grid-cols-1 gap-20 lg:grid-cols-12 lg:items-center">
                        <div className="lg:col-span-8">
                            <h2 className="text-[12vw] leading-[0.8] font-[900] tracking-[-0.05em] uppercase md:text-[10vw]">
                                {siteName.split(' ')[0]} <br />
                                <span className="text-primary italic">{siteName.split(' ').slice(1).join('_') || 'NETWORK'}</span>
                            </h2>
                        </div>
                        <div className="flex flex-col gap-8 lg:col-span-4 lg:items-end">
                            <div className="text-right">
                                <p className="text-xs font-black tracking-[0.3em] uppercase opacity-40">Operational_Status</p>
                                <p className="text-2xl font-black text-primary uppercase italic">// ONLINE_ACTIVE //</p>
                            </div>
                            <div className="flex gap-4">
                                {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                                    <button key={i} className="flex h-16 w-16 translate-y-0 items-center justify-center border-4 border-foreground transition-all hover:-translate-y-2 hover:bg-foreground hover:text-background">
                                        <Icon className="h-6 w-6" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* DIRECTORY GRID */}
            <div className="border-b-4 border-foreground px-8 py-20 lg:px-16">
                <div className="mx-auto max-w-[1700px]">
                    <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-4">
                        {/* Sector: Distribution */}
                        <div className="flex flex-col gap-8">
                            <h3 className="flex items-center gap-4 text-sm font-black tracking-[0.4em] uppercase italic">
                                <span className="h-4 w-4 bg-primary"></span>
                                SECTOR_DISTRIBUTION
                            </h3>
                            <ul className="flex flex-col gap-4 text-3xl font-black tracking-tighter uppercase italic">
                                {categories.slice(0, 5).map((cat: any) => (
                                    <li key={cat.id}>
                                        <Link href={`/${cat.slug}`} className="group flex items-center gap-2 transition-all hover:text-primary">
                                            {cat.name}
                                            <ArrowUpRight className="h-6 w-6 opacity-0 group-hover:opacity-100" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Sector: Information */}
                        <div className="flex flex-col gap-8">
                            <h3 className="flex items-center gap-4 text-sm font-black tracking-[0.4em] uppercase italic">
                                <span className="h-4 w-4 bg-foreground/20"></span>
                                SYSTEM_INFO
                            </h3>
                            <ul className="flex flex-col gap-6 text-[11px] font-black tracking-[0.2em] uppercase opacity-60">
                                {['ABOUT_US', 'EDITORIAL_CODE', 'RED_DESK_PROTOCOL', 'PRIVACY_ENCRYPTION', 'DISCLAIMER_LOG'].map((link) => (
                                    <li key={link}>
                                        <Link href="#" className="hover:text-primary hover:opacity-100">
                                            {link}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Sector: Connection */}
                        <div className="flex flex-col gap-8">
                            <h3 className="flex items-center gap-4 text-sm font-black tracking-[0.4em] uppercase italic">
                                <span className="h-4 w-4 bg-foreground/20"></span>
                                SOURCE_LINKS
                            </h3>
                            <div className="grid grid-cols-1 gap-4">
                                <div className="border-4 border-foreground p-6">
                                    <span className="text-[10px] font-black uppercase opacity-40">BASE_ADDR</span>
                                    <p className="mt-2 text-xs font-black uppercase">{siteSettings?.address || 'COORDINATES_NOT_SET'}</p>
                                </div>
                                <div className="border-4 border-foreground p-6">
                                    <span className="text-[10px] font-black uppercase opacity-40">COMM_FREQ</span>
                                    <p className="mt-2 text-xs font-black uppercase">{siteSettings?.email || 'NULL@NETWORK'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Sector: Identity */}
                        <div className="flex flex-col gap-8">
                            <div className="bg-foreground p-10 text-background">
                                <Cpu className="mb-6 h-12 w-12 text-primary" />
                                <h4 className="text-2xl leading-none font-black tracking-tighter uppercase italic">
                                    HARDWARE_SUPPORT <br /> READY_FOR_DEPL
                                </h4>
                                <Link href="#" className="mt-8 flex items-center justify-between border-b border-background/20 pb-2 text-[10px] font-black uppercase transition-colors hover:text-primary">
                                    CONTACT_SYSTEM_ADM
                                    <ArrowUpRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* LOWER TERMINAL BAR */}
            <div className="px-8 py-8 lg:px-16">
                <div className="mx-auto flex max-w-[1700px] flex-col items-center justify-between gap-6 text-[9px] font-black tracking-[0.4em] uppercase opacity-30 md:flex-row">
                    <span>
                        (C) {new Date().getFullYear()} {siteName} // ALL_RECORDS_LOGGED
                    </span>
                    <div className="flex gap-8">
                        <span>BUILD_V_2026.01.11</span>
                        <span>ENC: AES_256_GCM</span>
                    </div>
                    <Link href="/login" className="hover:text-primary hover:opacity-100">
                        ACCESS_CONSOLE
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
