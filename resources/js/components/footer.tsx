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
        <footer className="mt-20 sm:mt-40 border-t-[8px] sm:border-t-[15px] border-foreground dark:border-foreground bg-background dark:bg-background text-foreground dark:text-foreground transition-colors selection:bg-foreground dark:selection:bg-foreground selection:text-background dark:selection:text-background">
            {/* MASSIVE TITULAR FOOTER BLOCK */}
            <div className="border-b-2 sm:border-b-4 border-foreground dark:border-foreground px-4 sm:px-8 py-12 sm:py-20 lg:px-16 lg:py-40">
                <div className="mx-auto max-w-[1700px]">
                    <div className="grid grid-cols-1 gap-12 sm:gap-20 lg:grid-cols-12 lg:items-center">
                        <div className="lg:col-span-8">
                            <h2 className="text-[10vw] sm:text-[12vw] leading-[0.8] font-[900] tracking-[-0.05em] uppercase md:text-[8vw] lg:text-[10vw] text-foreground dark:text-foreground">
                                {siteName.split(' ')[0]} <br />
                                <span className="text-primary dark:text-primary italic">{siteName.split(' ').slice(1).join('_') || 'NETWORK'}</span>
                            </h2>
                        </div>
                        <div className="flex flex-col gap-6 sm:gap-8 lg:col-span-4 lg:items-end">
                            <div className="text-center lg:text-right">
                                <p className="text-[10px] sm:text-xs font-black tracking-[0.2em] sm:tracking-[0.3em] uppercase opacity-40">Operational_Status</p>
                                <p className="text-xl sm:text-2xl font-black text-primary dark:text-primary uppercase italic">// ONLINE_ACTIVE //</p>
                            </div>
                            <div className="flex gap-2 sm:gap-4 justify-center lg:justify-end">
                                {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                                    <button key={i} className="flex h-12 w-12 sm:h-16 sm:w-16 translate-y-0 items-center justify-center border-2 sm:border-4 border-foreground dark:border-foreground transition-all hover:-translate-y-2 hover:bg-foreground dark:hover:bg-foreground hover:text-background dark:hover:text-background">
                                        <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* DIRECTORY GRID */}
            <div className="border-b-2 sm:border-b-4 border-foreground dark:border-foreground px-4 sm:px-8 py-12 sm:py-20 lg:px-16">
                <div className="mx-auto max-w-[1700px]">
                    <div className="grid grid-cols-1 gap-8 sm:gap-16 md:grid-cols-2 lg:grid-cols-4">
                        {/* Sector: Distribution */}
                        <div className="flex flex-col gap-6 sm:gap-8">
                            <h3 className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm font-black tracking-[0.3em] sm:tracking-[0.4em] uppercase italic text-foreground dark:text-foreground">
                                <span className="h-3 w-3 sm:h-4 sm:w-4 bg-primary dark:bg-primary"></span>
                                SECTOR_DISTRIBUTION
                            </h3>
                            <ul className="flex flex-col gap-3 sm:gap-4 text-2xl sm:text-3xl font-black tracking-tighter uppercase italic">
                                {categories.slice(0, 5).map((cat: any) => (
                                    <li key={cat.id}>
                                        <Link href={`/${cat.slug}`} className="group flex items-center gap-2 transition-all hover:text-primary dark:hover:text-primary text-foreground dark:text-foreground">
                                            {cat.name}
                                            <ArrowUpRight className="h-5 w-5 sm:h-6 sm:w-6 opacity-0 group-hover:opacity-100" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Sector: Information */}
                        <div className="flex flex-col gap-6 sm:gap-8">
                            <h3 className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm font-black tracking-[0.3em] sm:tracking-[0.4em] uppercase italic text-foreground dark:text-foreground">
                                <span className="h-3 w-3 sm:h-4 sm:w-4 bg-foreground/20 dark:bg-foreground/20"></span>
                                SYSTEM_INFO
                            </h3>
                            <ul className="flex flex-col gap-4 sm:gap-6 text-[10px] sm:text-[11px] font-black tracking-[0.15em] sm:tracking-[0.2em] uppercase opacity-60">
                                {['ABOUT_US', 'EDITORIAL_CODE', 'RED_DESK_PROTOCOL', 'PRIVACY_ENCRYPTION', 'DISCLAIMER_LOG'].map((link) => (
                                    <li key={link}>
                                        <Link href="#" className="hover:text-primary dark:hover:text-primary hover:opacity-100 text-foreground dark:text-foreground">
                                            {link}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Sector: Connection */}
                        <div className="flex flex-col gap-6 sm:gap-8">
                            <h3 className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm font-black tracking-[0.3em] sm:tracking-[0.4em] uppercase italic text-foreground dark:text-foreground">
                                <span className="h-3 w-3 sm:h-4 sm:w-4 bg-foreground/20 dark:bg-foreground/20"></span>
                                SOURCE_LINKS
                            </h3>
                            <div className="grid grid-cols-1 gap-3 sm:gap-4">
                                <div className="border-2 sm:border-4 border-foreground dark:border-foreground p-4 sm:p-6">
                                    <span className="text-[8px] sm:text-[10px] font-black uppercase opacity-40">BASE_ADDR</span>
                                    <p className="mt-2 text-[10px] sm:text-xs font-black uppercase text-foreground dark:text-foreground">{siteSettings?.address || 'COORDINATES_NOT_SET'}</p>
                                </div>
                                <div className="border-2 sm:border-4 border-foreground dark:border-foreground p-4 sm:p-6">
                                    <span className="text-[8px] sm:text-[10px] font-black uppercase opacity-40">COMM_FREQ</span>
                                    <p className="mt-2 text-[10px] sm:text-xs font-black uppercase text-foreground dark:text-foreground">{siteSettings?.email || 'NULL@NETWORK'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Sector: Identity */}
                        <div className="flex flex-col gap-6 sm:gap-8">
                            <div className="bg-foreground dark:bg-foreground p-6 sm:p-10 text-background dark:text-background">
                                <Cpu className="mb-4 sm:mb-6 h-8 w-8 sm:h-12 sm:w-12 text-primary dark:text-primary" />
                                <h4 className="text-lg sm:text-2xl leading-none font-black tracking-tighter uppercase italic">
                                    HARDWARE_SUPPORT <br /> READY_FOR_DEPL
                                </h4>
                                <Link href="#" className="mt-6 sm:mt-8 flex items-center justify-between border-b border-background/20 dark:border-background/20 pb-2 text-[8px] sm:text-[10px] font-black uppercase transition-colors hover:text-primary dark:hover:text-primary">
                                    CONTACT_SYSTEM_ADM
                                    <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* LOWER TERMINAL BAR */}
            <div className="px-4 sm:px-8 py-6 sm:py-8 lg:px-16">
                <div className="mx-auto flex max-w-[1700px] flex-col items-center justify-between gap-4 sm:gap-6 text-[8px] sm:text-[9px] font-black tracking-[0.3em] sm:tracking-[0.4em] uppercase opacity-30 md:flex-row">
                    <span className="text-center md:text-left">
                        (C) {new Date().getFullYear()} {siteName} // ALL_RECORDS_LOGGED
                    </span>
                    <div className="flex gap-4 sm:gap-8 text-center">
                        <span>BUILD_V_2026.01.11</span>
                        <span className="hidden sm:inline">ENC: AES_256_GCM</span>
                    </div>
                    <Link href="/login" className="hover:text-primary dark:hover:text-primary hover:opacity-100 text-foreground dark:text-foreground">
                        ACCESS_CONSOLE
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
