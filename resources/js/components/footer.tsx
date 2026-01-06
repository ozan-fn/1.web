import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="mt-20 border-t-4 border-[#3357a7] bg-[#1a1a1a] pt-16 pb-8 text-gray-400">
            <div className="container mx-auto max-w-7xl px-4">
                <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
                    {/* Brand Info */}
                    <div className="col-span-1">
                        <h2 className="mb-4 text-3xl font-black tracking-tighter text-white uppercase">
                            LENSAPUBLIK
                        </h2>
                        <p className="mb-6 text-sm leading-relaxed">
                            Portal berita akademik terpercaya menyajikan
                            informasi terkini seputar dunia pendidikan,
                            riset, dan pengabdian masyarakat.
                        </p>
                        <div className="flex gap-3">
                            {['FB', 'IG', 'TW', 'YT'].map((social) => (
                                <div
                                    key={social}
                                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-800 transition-all hover:bg-[#3357a7] hover:text-white"
                                >
                                    <span className="text-xs font-bold">
                                        {social}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="col-span-1">
                        <h3 className="mb-6 inline-block border-b border-gray-700 pb-2 text-lg font-bold text-white">
                            Kategori
                        </h3>
                        <ul className="space-y-3 text-sm">
                            {[
                                'Berita Kampus',
                                'Akademik',
                                'Kemahasiswaan',
                                'Riset & Inovasi',
                                'Pengumuman',
                            ].map((link) => (
                                <li key={link}>
                                    <a
                                        href="#"
                                        className="inline-block transition-all hover:translate-x-1 hover:text-[#3357a7]"
                                    >
                                        › {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Info Links */}
                    <div className="col-span-1">
                        <h3 className="mb-6 inline-block border-b border-gray-700 pb-2 text-lg font-bold text-white">
                            Informasi
                        </h3>
                        <ul className="space-y-3 text-sm">
                            {[
                                'Tentang Kami',
                                'Redaksi',
                                'Pedoman Media Siber',
                                'Disclaimer',
                                'Kerjasama',
                            ].map((link) => (
                                <li key={link}>
                                    <a
                                        href="#"
                                        className="transition-colors hover:text-[#3357a7]"
                                    >
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="col-span-1">
                        <h3 className="mb-6 inline-block border-b border-gray-700 pb-2 text-lg font-bold text-white">
                            Berlangganan
                        </h3>
                        <p className="mb-4 text-sm">
                            Dapatkan update berita pilihan langsung di email
                            Anda.
                        </p>
                        <div className="flex flex-col gap-2">
                            <input
                                type="email"
                                placeholder="Alamat Email Anda"
                                className="rounded bg-gray-800 px-4 py-3 text-sm text-white outline-none focus:ring-1 focus:ring-[#3357a7]"
                            />
                            <button className="rounded bg-[#3357a7] px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-900/20 transition hover:bg-blue-800">
                                Langganan Sekarang
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-between border-t border-gray-800 pt-8 text-xs md:flex-row">
                    <p>
                        &copy; 2026 lensapublik.ac.id. All Rights Reserved.
                    </p>
                    <div className="mt-4 flex gap-4 md:mt-0">
                        <a href="#" className="hover:text-white">
                            Privacy Policy
                        </a>
                        <a href="#" className="hover:text-white">
                            Terms of Service
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;