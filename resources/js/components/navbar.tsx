import React from 'react';

const CATEGORIES = [
    'Trending',
    'Akademik',
    'Mahasiswa',
    'Beasiswa',
    'Riset',
    'Pengabdian',
    'Opini',
    'Kampus',
    'Teknologi',
];

const Navbar: React.FC = () => {
    return (
        <header className="sticky top-0 z-50 bg-white shadow-sm">
            {/* Top Bar */}
            <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
                <div className="flex items-center gap-4">
                    {/* Hamburger Icon */}
                    <button className="rounded-lg p-2 hover:bg-gray-100 lg:hidden">
                        <div className="w-6 space-y-1.5">
                            <span className="block h-0.5 w-full bg-[#3357a7]"></span>
                            <span className="block h-0.5 w-3/4 bg-[#3357a7]"></span>
                            <span className="block h-0.5 w-full bg-[#3357a7]"></span>
                        </div>
                    </button>
                    {/* Logo */}
                    <div className="flex flex-col leading-none">
                        <span className="text-2xl font-black tracking-tighter text-[#3357a7] uppercase">
                            LENSAPUBLIK
                        </span>
                        <span className="text-[9px] tracking-widest text-gray-500 uppercase">
                            Academic News Portal
                        </span>
                    </div>
                </div>

                {/* Search Bar (Hidden on Mobile) */}
                <div className="mx-8 hidden max-w-md flex-1 rounded-full border border-gray-200 bg-gray-100 px-4 py-2 transition-colors focus-within:border-[#3357a7] md:flex">
                    <input
                        type="text"
                        placeholder="Cari berita, jurnal, atau kegiatan..."
                        className="w-full bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
                    />
                    <button className="text-gray-400 hover:text-[#3357a7]">
                        🔍
                    </button>
                </div>

                {/* Social / Auth */}
                <div className="flex items-center gap-3">
                    <button className="rounded bg-[#3357a7] px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-blue-800">
                        Masuk
                    </button>
                </div>
            </div>

            {/* Navigation Menu (Scrollable) */}
            <nav className="border-t border-gray-100 bg-white shadow-sm">
                <div className="no-scrollbar container mx-auto max-w-7xl overflow-x-auto px-4">
                    <div className="flex gap-6 py-3 text-sm font-medium whitespace-nowrap text-gray-600">
                        <a
                            href="#"
                            className="border-b-2 border-[#3357a7] font-bold text-[#3357a7]"
                        >
                            Home
                        </a>
                        {CATEGORIES.slice(0, 6).map((cat) => (
                            <a
                                key={cat}
                                href="#"
                                className="rounded px-2 transition-colors hover:bg-gray-50 hover:text-[#3357a7]"
                            >
                                {cat}
                            </a>
                        ))}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
