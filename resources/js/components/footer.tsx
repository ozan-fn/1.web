import { Link, usePage } from '@inertiajs/react';
import { Facebook, Instagram, Mail, Twitter, Youtube } from 'lucide-react';
import React from 'react';

interface SiteSettings {
    site_name: string;
    tagline: string | null;
}

interface Props {
    siteSettings?: SiteSettings | null;
}

const Footer: React.FC<Props> = ({ siteSettings: propSiteSettings }) => {
    const { props } = usePage<any>();
    const siteSettings = propSiteSettings || props.siteSettings;

    return (
        <footer className="mt-20 border-t border-border py-12 lg:ml-20">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
                    <div className="flex flex-col items-center gap-4 md:items-start">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                                <span className="font-sans text-sm font-black text-primary-foreground">{siteSettings?.site_name?.charAt(0)}</span>
                            </div>
                            <span className="text-xl font-black tracking-tighter text-foreground uppercase italic">{siteSettings?.site_name}</span>
                        </Link>
                        <p className="text-[10px] font-black tracking-[0.4em] text-muted-foreground uppercase">{siteSettings?.tagline}</p>
                    </div>

                    <div className="flex items-center gap-6">
                        {[Twitter, Instagram, Facebook, Youtube, Mail].map((Icon, i) => (
                            <Link key={i} href="#" className="text-muted-foreground transition-colors hover:text-primary">
                                <Icon className="h-5 w-5" />
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-border/50 pt-8 md:flex-row">
                    <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                        © {new Date().getFullYear()} {siteSettings?.site_name}. All rights reserved.
                    </p>
                    <nav className="flex gap-8 text-[10px] font-black tracking-widest text-muted-foreground uppercase">
                        <Link href="#" className="transition-colors hover:text-primary">
                            Privacy
                        </Link>
                        <Link href="#" className="transition-colors hover:text-primary">
                            Terms
                        </Link>
                        <Link href="#" className="transition-colors hover:text-primary">
                            Contact
                        </Link>
                    </nav>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
