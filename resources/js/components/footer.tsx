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
        <footer className="mt-20 border-t-[8px] border-foreground bg-background text-foreground transition-colors selection:bg-foreground selection:text-background sm:mt-40 sm:border-t-[15px] dark:border-foreground dark:bg-background dark:text-foreground dark:selection:bg-foreground dark:selection:text-background">
            {/* MASSIVE TITULAR FOOTER BLOCK */}
            <div className="border-b-2 border-foreground px-4 py-12 sm:border-b-4 sm:px-8 sm:py-20 lg:px-16 lg:py-40 dark:border-foreground">
                <div className="mx-auto max-w-[1700px]">
                    <div className="grid grid-cols-1 gap-12 sm:gap-20 lg:grid-cols-12 lg:items-center">
                        <div className="lg:col-span-8">
                            <h2 className="text-[10vw] leading-[0.8] font-[900] tracking-[-0.05em] text-foreground uppercase sm:text-[12vw] md:text-[8vw] lg:text-[10vw] dark:text-foreground">
                                {siteName.split(' ')[0]} <br />
                                <span className="text-primary italic dark:text-primary">{siteName.split(' ').slice(1).join('_') || 'NETWORK'}</span>
                            </h2>
                        </div>
                        <div className="flex flex-col gap-6 sm:gap-8 lg:col-span-4 lg:items-end">
                            <div className="text-center lg:text-right">
                                <p className="text-[10px] font-black tracking-[0.2em] uppercase opacity-40 sm:text-xs sm:tracking-[0.3em]">Operational_Status</p>
                                <p className="text-xl font-black text-primary uppercase italic sm:text-2xl dark:text-primary">// ONLINE_ACTIVE //</p>
                            </div>
                            <div className="flex justify-center gap-2 sm:gap-4 lg:justify-end">
                                {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                                    <button key={i} className="flex h-12 w-12 translate-y-0 items-center justify-center border-2 border-foreground transition-all hover:-translate-y-2 hover:bg-foreground hover:text-background sm:h-16 sm:w-16 sm:border-4 dark:border-foreground dark:hover:bg-foreground dark:hover:text-background">
                                        <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* DIRECTORY GRID */}
            <div className="border-b-2 border-foreground px-4 py-12 sm:border-b-4 sm:px-8 sm:py-20 lg:px-16 dark:border-foreground">
                <div className="mx-auto max-w-[1700px]">
                    <div className="grid grid-cols-1 gap-8 sm:gap-16 md:grid-cols-2 lg:grid-cols-4">
                        {/* Sector: Distribution */}
                        <div className="flex flex-col gap-6 sm:gap-8">
                            <h3 className="flex items-center gap-3 text-xs font-black tracking-[0.3em] text-foreground uppercase italic sm:gap-4 sm:text-sm sm:tracking-[0.4em] dark:text-foreground">
                                <span className="h-3 w-3 bg-primary sm:h-4 sm:w-4 dark:bg-primary"></span>
                                SECTOR_DISTRIBUTION
                            </h3>
                            <ul className="flex flex-col gap-3 text-2xl font-black tracking-tighter uppercase italic sm:gap-4 sm:text-3xl">
                                {categories.slice(0, 5).map((cat: any) => (
                                    <li key={cat.id}>
                                        <Link href={`/${cat.slug}`} className="group flex items-center gap-2 text-foreground transition-all hover:text-primary dark:text-foreground dark:hover:text-primary">
                                            {cat.name}
                                            <ArrowUpRight className="h-5 w-5 opacity-0 group-hover:opacity-100 sm:h-6 sm:w-6" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Sector: Information */}
                        <div className="flex flex-col gap-6 sm:gap-8">
                            <h3 className="flex items-center gap-3 text-xs font-black tracking-[0.3em] text-foreground uppercase italic sm:gap-4 sm:text-sm sm:tracking-[0.4em] dark:text-foreground">
                                <span className="h-3 w-3 bg-foreground/20 sm:h-4 sm:w-4 dark:bg-foreground/20"></span>
                                SYSTEM_INFO
                            </h3>
                            <ul className="flex flex-col gap-4 text-[10px] font-black tracking-[0.15em] uppercase opacity-60 sm:gap-6 sm:text-[11px] sm:tracking-[0.2em]">
                                {['ABOUT_US', 'EDITORIAL_CODE', 'RED_DESK_PROTOCOL', 'PRIVACY_ENCRYPTION', 'DISCLAIMER_LOG'].map((link) => (
                                    <li key={link}>
                                        <Link href="#" className="text-foreground hover:text-primary hover:opacity-100 dark:text-foreground dark:hover:text-primary">
                                            {link}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Sector: Connection */}
                        <div className="flex flex-col gap-6 sm:gap-8">
                            <h3 className="flex items-center gap-3 text-xs font-black tracking-[0.3em] text-foreground uppercase italic sm:gap-4 sm:text-sm sm:tracking-[0.4em] dark:text-foreground">
                                <span className="h-3 w-3 bg-foreground/20 sm:h-4 sm:w-4 dark:bg-foreground/20"></span>
                                SOURCE_LINKS
                            </h3>
                            <div className="grid grid-cols-1 gap-3 sm:gap-4">
                                <div className="border-2 border-foreground p-4 sm:border-4 sm:p-6 dark:border-foreground">
                                    <span className="text-[8px] font-black uppercase opacity-40 sm:text-[10px]">BASE_ADDR</span>
                                    <p className="mt-2 text-[10px] font-black text-foreground uppercase sm:text-xs dark:text-foreground">{siteSettings?.address || 'COORDINATES_NOT_SET'}</p>
                                </div>
                                <div className="border-2 border-foreground p-4 sm:border-4 sm:p-6 dark:border-foreground">
                                    <span className="text-[8px] font-black uppercase opacity-40 sm:text-[10px]">COMM_FREQ</span>
                                    <p className="mt-2 text-[10px] font-black text-foreground uppercase sm:text-xs dark:text-foreground">{siteSettings?.email || 'NULL@NETWORK'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Sector: Identity */}
                        <div className="flex flex-col gap-6 sm:gap-8">
                            <div className="bg-foreground p-6 text-background sm:p-10 dark:bg-foreground dark:text-background">
                                <Cpu className="mb-4 h-8 w-8 text-primary sm:mb-6 sm:h-12 sm:w-12 dark:text-primary" />
                                <h4 className="text-lg leading-none font-black tracking-tighter uppercase italic sm:text-2xl">
                                    HARDWARE_SUPPORT <br /> READY_FOR_DEPL
                                </h4>
                                <Link href="#" className="mt-6 flex items-center justify-between border-b border-background/20 pb-2 text-[8px] font-black uppercase transition-colors hover:text-primary sm:mt-8 sm:text-[10px] dark:border-background/20 dark:hover:text-primary">
                                    CONTACT_SYSTEM_ADM
                                    <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* LOWER TERMINAL BAR */}
            <div className="px-4 py-6 sm:px-8 sm:py-8 lg:px-16">
                <div className="mx-auto flex max-w-[1700px] flex-col items-center justify-between gap-4 text-[8px] font-black tracking-[0.3em] uppercase opacity-30 sm:gap-6 sm:text-[9px] sm:tracking-[0.4em] md:flex-row">
                    <span className="text-center md:text-left">
                        (C) {new Date().getFullYear()} {siteName} // ALL_RECORDS_LOGGED
                    </span>
                    <div className="flex gap-4 text-center sm:gap-8">
                        <span>BUILD_V_2026.01.11</span>
                        <span className="hidden sm:inline">ENC: AES_256_GCM</span>
                    </div>
                    <Link href="/login" className="text-foreground hover:text-primary hover:opacity-100 dark:text-foreground dark:hover:text-primary">
                        ACCESS_CONSOLE
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
