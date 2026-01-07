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

const Footer: React.FC<Props> = ({ categories = [], siteSettings }) => {
    // Split site name for styling
    const siteNameParts = siteSettings?.site_name.split(' ') || [
        'NEWS',
        'PORTAL',
    ];
    const firstPart = siteNameParts[0];
    const restParts = siteNameParts.slice(1).join(' ');

    const socials = [
        { key: 'FB', url: siteSettings?.social_facebook },
        { key: 'IG', url: siteSettings?.social_instagram },
        { key: 'TW', url: siteSettings?.social_twitter },
        { key: 'YT', url: siteSettings?.social_youtube },
    ].filter((s) => s.url);

    return (
        <footer className="mt-20 border-t-4 border-red-600 bg-black pt-16 pb-12 text-gray-500">
            <div className="container mx-auto max-w-7xl px-4">
                <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
                    {/* Brand Info */}
                    <div className="col-span-1">
                        <div className="mb-6">
                            <h2 className="text-3xl font-black tracking-tighter text-white uppercase italic">
                                {firstPart}
                                <span className="text-gray-400">
                                    {' '}
                                    {restParts}
                                </span>
                            </h2>
                            <p className="mt-2 text-[10px] font-bold tracking-[0.3em] text-red-600 uppercase">
                                {siteSettings?.tagline ||
                                    'Informasi Terpercaya'}
                            </p>
                        </div>
                        <p className="mb-6 text-sm leading-relaxed text-gray-400">
                            {siteSettings?.description ||
                                'Portal berita masa kini yang menyajikan informasi tercepat, akurat, dan mendalam dari seluruh penjuru negeri hingga mancanegara.'}
                        </p>

                        {siteSettings?.address && (
                            <p className="mb-4 text-xs leading-normal text-gray-400">
                                <span className="mb-1 block text-gray-600">
                                    Kantor:
                                </span>
                                {siteSettings.address}
                            </p>
                        )}

                        <div className="mb-8 space-y-2">
                            {siteSettings?.email && (
                                <p className="text-xs text-gray-400">
                                    <span className="text-gray-600">
                                        Email:
                                    </span>{' '}
                                    {siteSettings.email}
                                </p>
                            )}
                            {siteSettings?.phone && (
                                <p className="text-xs text-gray-400">
                                    <span className="text-gray-600">
                                        Phone:
                                    </span>{' '}
                                    {siteSettings.phone}
                                </p>
                            )}
                        </div>

                        {socials.length > 0 && (
                            <div className="flex gap-4">
                                {socials.map((social) => (
                                    <a
                                        key={social.key}
                                        href={social.url!}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-sm border border-zinc-800 bg-zinc-900 transition-all hover:border-red-600 hover:bg-red-600 hover:text-white"
                                    >
                                        <span className="text-[10px] font-black">
                                            {social.key}
                                        </span>
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
                        <ul className="grid grid-cols-1 gap-4 text-xs font-bold tracking-tight uppercase">
                            {categories.length > 0
                                ? categories.slice(0, 6).map((cat) => (
                                      <li key={cat.id}>
                                          <a
                                              href={`/${cat.slug}`}
                                              className="transition-colors hover:text-red-600"
                                          >
                                              {cat.name}
                                          </a>
                                      </li>
                                  ))
                                : [
                                      'Nasional',
                                      'Ekonomi',
                                      'Teknologi',
                                      'Otomotif',
                                      'Hiburan',
                                      'Gaya Hidup',
                                  ].map((link) => (
                                      <li key={link}>
                                          <a
                                              href="#"
                                              className="transition-colors hover:text-red-600"
                                          >
                                              {link}
                                          </a>
                                      </li>
                                  ))}
                        </ul>
                    </div>

                    {/* Info Links */}
                    <div className="col-span-1">
                        <h3 className="mb-8 border-l-4 border-red-600 pl-4 text-sm font-black tracking-widest text-white uppercase">
                            Informasi
                        </h3>
                        <ul className="space-y-4 text-xs font-bold tracking-tight uppercase">
                            {[
                                'Tentang Kami',
                                'Redaksi',
                                'Pedoman Media Siber',
                                'Disclaimer',
                                'Kebijakan Privasi',
                            ].map((link) => (
                                <li key={link}>
                                    <a
                                        href="#"
                                        className="transition-colors hover:text-red-500"
                                    >
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="col-span-1">
                        <h3 className="mb-8 border-l-4 border-red-600 pl-4 text-sm font-black tracking-widest text-white uppercase">
                            Newsletter
                        </h3>
                        <p className="mb-6 text-sm text-gray-400">
                            Langganan berita harian pilihan kami.
                        </p>
                        <div className="flex flex-col gap-3">
                            <input
                                type="email"
                                placeholder="Email Anda"
                                className="rounded-sm border border-zinc-800 bg-zinc-900 px-4 py-3 text-xs text-white transition-colors outline-none focus:border-red-600"
                            />
                            <button className="rounded-sm bg-red-600 px-4 py-3 text-xs font-black tracking-widest text-white uppercase transition hover:bg-white hover:text-black">
                                Berlangganan
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-zinc-900 pt-8 text-center md:flex md:items-center md:justify-between">
                    <p className="text-[11px] font-medium tracking-widest uppercase">
                        © {new Date().getFullYear()}{' '}
                        {siteSettings?.site_name || 'NEWS PORTAL'}. ALL RIGHTS
                        RESERVED.
                    </p>
                    <div className="mt-4 flex justify-center gap-6 md:mt-0">
                        <a
                            href="#"
                            className="text-[10px] font-bold uppercase hover:text-white"
                        >
                            Terms
                        </a>
                        <a
                            href="#"
                            className="text-[10px] font-bold uppercase hover:text-white"
                        >
                            Privacy
                        </a>
                        <a
                            href="#"
                            className="text-[10px] font-bold uppercase hover:text-white"
                        >
                            Cookies
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
