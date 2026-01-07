import { Link } from '@inertiajs/react';
import React from 'react';

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface Props {
    categories: Category[];
}

const Navbar: React.FC<Props> = ({ categories }) => {
    return (
        <header className="sticky top-0 z-50 bg-white shadow-sm">
            {/* Top Bar */}
            <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
                <div className="flex items-center gap-4">
                    {/* Hamburger Icon */}
                    <button className="rounded-lg p-2 hover:bg-gray-100 lg:hidden">
                        <div className="w-6 space-y-1.5">
                            <span className="block h-0.5 w-full bg-red-600"></span>
                            <span className="block h-0.5 w-3/4 bg-red-600"></span>
                            <span className="block h-0.5 w-full bg-red-600"></span>
                        </div>
                    </button>
                    {/* Logo */}
                    <Link href="/" className="flex flex-col leading-none">
                        <span className="text-2xl font-black tracking-tighter text-red-600 uppercase italic">
                            NEWS<span className="text-gray-900">PORTAL</span>
                        </span>
                        <span className="text-[9px] font-bold tracking-[0.2em] text-gray-400 uppercase">
                            Informasi Terpercaya
                        </span>
                    </Link>
                </div>

                {/* Search Bar (Hidden on Mobile) */}
                <div className="mx-8 hidden max-w-md flex-1 rounded-sm border-b border-gray-200 bg-white px-2 py-2 transition-colors focus-within:border-red-600 md:flex">
                    <input
                        type="text"
                        placeholder="Cari berita..."
                        className="w-full bg-transparent text-sm font-medium text-gray-800 placeholder-gray-400 outline-none"
                    />
                    <button className="px-2 text-gray-400 transition-colors hover:text-red-600">
                        <svg
                            className="h-4 w-4 fill-none stroke-current stroke-2"
                            viewBox="0 0 24 24"
                        >
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </button>
                </div>

                {/* Social / Auth */}
                <div className="flex items-center gap-3">
                    <Link
                        href="/login"
                        className="rounded-sm bg-red-600 px-5 py-2 text-xs font-black tracking-widest text-white uppercase transition hover:bg-black"
                    >
                        Masuk
                    </Link>
                </div>
            </div>

            {/* Navigation Menu (Scrollable) */}
            <nav className="border-t border-gray-100 bg-white">
                <div className="no-scrollbar container mx-auto max-w-7xl overflow-x-auto px-4">
                    <div className="flex gap-8 py-3 text-[13px] font-black tracking-tight whitespace-nowrap text-gray-900 uppercase">
                        <Link
                            href="/"
                            className="border-b-2 border-red-600 text-red-600"
                        >
                            Home
                        </Link>
                        {categories.map((cat) => (
                            <Link
                                key={cat.id}
                                href={`/${cat.slug}`}
                                className="transition-colors hover:text-red-600"
                            >
                                {cat.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
