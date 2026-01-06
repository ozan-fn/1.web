import React from 'react';

// --- 1. TYPES & INTERFACES (PROTOTYPE STRUCTURE) ---

interface NewsItem {
    id: number;
    category: string;
    title: string;
    imageUrl: string;
    timestamp?: string; // Optional: "2 Jam lalu"
}

interface VideoItem {
    id: number;
    title: string;
    thumbnail: string;
}

// --- 2. MOCK DATA (DATA DUMMY UNTUK PROTOTYPE) ---

const HERO_NEWS: NewsItem = {
    id: 1,
    category: 'Kampus',
    title: 'Mahasiswa Berprestasi Lensapublik.ac.id Raih Penghargaan Internasional di Ajang Inovasi Teknologi',
    imageUrl: 'https://placehold.co/800x500',
};

const SIDE_HERO_NEWS: NewsItem[] = [
    {
        id: 2,
        category: 'Akademik',
        title: 'Rektorat Umumkan Kebijakan Baru Terkait Kurikulum Merdeka Belajar',
        imageUrl: 'https://placehold.co/400x250',
    },
    {
        id: 3,
        category: 'Beasiswa',
        title: 'Pendaftaran Beasiswa Unggulan Telah Dibuka, Simak Syarat Lengkapnya',
        imageUrl: 'https://placehold.co/400x250',
    },
];

const NASIONAL_NEWS: NewsItem[] = Array.from({ length: 4 }).map((_, i) => ({
    id: i + 10,
    category: i % 2 === 0 ? 'Pendidikan' : 'Riset',
    title: 'Kementerian Pendidikan Dorong Digitalisasi Kampus di Seluruh Indonesia',
    imageUrl: `https://placehold.co/300x200?text=News+${i + 10}`,
    timestamp: `${i + 1} Jam yang lalu`,
}));

const LINTAS_DAERAH: NewsItem[] = Array.from({ length: 4 }).map((_, i) => ({
    id: i + 20,
    category: 'Pengabdian',
    title: 'KKN Mahasiswa di Desa Binong Berhasil Tingkatkan UMKM Lokal',
    imageUrl: `https://placehold.co/400x300?text=Daerah+${i + 20}`,
    timestamp: '3 Hari yang lalu',
}));

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

// --- 3. REUSABLE COMPONENTS ---

// Komponen Header Judul Section
const SectionHeader: React.FC<{
    title: string;
    color?: string;
    textColor?: string;
}> = ({ title, color = 'bg-[#3357a7]', textColor = 'text-black' }) => (
    <div
        className={`mb-4 flex items-center justify-between border-b ${textColor === 'text-white' ? 'border-gray-700' : 'border-gray-200'} pb-2`}
    >
        <div className="flex items-center">
            <div className={`h-8 w-1 ${color} mr-3 rounded-full`}></div>
            <h2
                className={`font-['Roboto'] text-xl font-bold md:text-2xl ${textColor} uppercase`}
            >
                {title}
            </h2>
        </div>
        <a
            href="#"
            className={`text-sm ${textColor} flex items-center opacity-70 transition-opacity hover:opacity-100`}
        >
            Lihat Semua <span className="ml-1">→</span>
        </a>
    </div>
);

// Komponen Kartu Berita Overlay (Untuk Hero)
const OverlayCard: React.FC<{ item: NewsItem; height?: string }> = ({
    item,
    height = 'h-64',
}) => (
    <div
        className={`group relative overflow-hidden rounded-lg ${height} w-full shadow-md`}
    >
        <img
            src={item.imageUrl}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-4 md:p-6">
            <span className="mb-2 inline-block rounded bg-[#3357a7] px-2 py-1 text-[10px] font-bold tracking-widest text-white uppercase">
                {item.category}
            </span>
            <h3 className="cursor-pointer font-['Roboto'] text-lg leading-snug font-bold text-white hover:underline md:text-xl">
                {item.title}
            </h3>
        </div>
    </div>
);

// Komponen Kartu Berita List (Gambar di kiri, Teks di kanan)
const ListCard: React.FC<{ item: NewsItem }> = ({ item }) => (
    <div className="group mb-4 flex cursor-pointer items-start gap-4 rounded-lg border border-transparent bg-white p-2 transition-all hover:border-gray-100 hover:shadow-sm">
        <div className="relative aspect-[4/3] w-1/3 shrink-0 overflow-hidden rounded-md">
            <img
                src={item.imageUrl}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
        </div>
        <div className="flex h-full w-2/3 flex-col justify-between">
            <div>
                <span className="mb-1 block text-[10px] font-bold tracking-widest text-[#3357a7] uppercase">
                    {item.category}
                </span>
                <h3 className="line-clamp-3 font-['Roboto'] text-sm leading-snug font-semibold text-gray-800 transition-colors group-hover:text-[#3357a7]">
                    {item.title}
                </h3>
            </div>
            {item.timestamp && (
                <span className="mt-2 flex items-center text-[10px] text-gray-400">
                    <span className="mr-1 h-1.5 w-1.5 rounded-full bg-gray-300"></span>
                    {item.timestamp}
                </span>
            )}
        </div>
    </div>
);

// Komponen Bubble Kategori (Seperti Instagram Story)
const CategoryBubble: React.FC<{ label: string }> = ({ label }) => (
    <div className="group flex min-w-[70px] cursor-pointer flex-col items-center gap-2">
        <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-[#ea3a7e] via-[#20aadb] to-[#23e0b3] p-[2px] transition-transform group-hover:scale-105">
            <div className="h-full w-full overflow-hidden rounded-full border-[3px] border-white bg-gray-100">
                <img
                    src={`https://placehold.co/60x60?text=${label.charAt(0)}`}
                    alt={label}
                    className="h-full w-full object-cover opacity-80 group-hover:opacity-100"
                />
            </div>
        </div>
        <span className="w-full truncate text-center text-[11px] font-medium text-gray-700 group-hover:text-[#3357a7]">
            {label}
        </span>
    </div>
);

// --- 4. MAIN PAGE COMPONENT ---

export default function Index() {
    return (
        <div className="min-h-screen overflow-x-hidden bg-[#f3f4f6] font-sans text-gray-900">
            {/* HEADER SECTION */}
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

            {/* MAIN CONTENT */}
            <main className="container mx-auto max-w-7xl px-4 py-6">
                {/* Banner Ad */}
                <div className="mb-8 w-full overflow-hidden rounded-xl shadow-sm">
                    <img
                        src="https://placehold.co/1200x150?text=Iklan+Penerimaan+Mahasiswa+Baru"
                        alt="Ads"
                        className="h-auto min-h-[100px] w-full object-cover"
                    />
                </div>

                {/* Story Categories */}
                <section className="mb-8 overflow-x-auto scroll-smooth pb-2">
                    <div className="flex min-w-max gap-4 px-2 md:justify-center">
                        {CATEGORIES.map((cat, idx) => (
                            <CategoryBubble key={idx} label={cat} />
                        ))}
                    </div>
                </section>

                {/* HERO SECTION */}
                <section className="mb-12">
                    <SectionHeader title="FOKUS UTAMA" />
                    <div className="grid h-auto grid-cols-1 gap-6 lg:h-[500px] lg:grid-cols-12">
                        {/* Main Feature (Kiri) */}
                        <div className="h-[400px] lg:col-span-8 lg:h-full">
                            <OverlayCard item={HERO_NEWS} height="h-full" />
                        </div>

                        {/* Sub Features (Kanan) */}
                        <div className="flex h-full flex-col gap-6 lg:col-span-4">
                            {SIDE_HERO_NEWS.map((item) => (
                                <OverlayCard
                                    key={item.id}
                                    item={item}
                                    height="h-full"
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* GRID CONTENT LAYOUT */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                    {/* LEFT COLUMN (Main Feed) */}
                    <div className="space-y-10 lg:col-span-8">
                        {/* Nasional */}
                        <div>
                            <SectionHeader title="Kabar Kampus & Nasional" />
                            <div className="grid grid-cols-1 gap-x-6 gap-y-2 md:grid-cols-2">
                                {NASIONAL_NEWS.map((item) => (
                                    <ListCard key={item.id} item={item} />
                                ))}
                            </div>
                        </div>

                        {/* Video Section (Dark Mode) */}
                        <div className="relative overflow-hidden rounded-xl bg-gray-900 p-6 text-white shadow-lg">
                            <div className="relative z-10">
                                <SectionHeader
                                    title="LensaPublik TV"
                                    color="bg-[#dd0000]"
                                    textColor="text-white"
                                />
                                <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-5">
                                    {/* Main Video */}
                                    <div className="group relative cursor-pointer overflow-hidden rounded-lg border border-gray-700 md:col-span-3">
                                        <img
                                            src="https://placehold.co/600x350"
                                            className="aspect-video w-full object-cover"
                                            alt="Main Video"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition group-hover:bg-black/10">
                                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 pl-1 shadow-lg transition-transform group-hover:scale-110">
                                                <span className="text-2xl text-white">
                                                    ▶
                                                </span>
                                            </div>
                                        </div>
                                        <div className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent p-4">
                                            <h3 className="text-sm leading-tight font-bold md:text-base">
                                                Live Streaming: Wisuda Angkatan
                                                XX
                                            </h3>
                                        </div>
                                    </div>
                                    {/* Playlist */}
                                    <div className="scrollbar-thin scrollbar-thumb-gray-700 flex h-full max-h-[300px] flex-col gap-3 overflow-y-auto pr-2 md:col-span-2">
                                        {[1, 2, 3, 4].map((v) => (
                                            <div
                                                key={v}
                                                className="group flex cursor-pointer items-center gap-3 rounded p-2 transition hover:bg-gray-800"
                                            >
                                                <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded bg-gray-800">
                                                    <img
                                                        src={`https://placehold.co/100x70?text=V${v}`}
                                                        className="h-full w-full object-cover"
                                                        alt={`Video ${v}`}
                                                    />
                                                </div>
                                                <div>
                                                    <span className="text-[10px] font-bold tracking-wider text-red-500 uppercase">
                                                        Video
                                                    </span>
                                                    <h4 className="line-clamp-2 text-xs font-medium text-gray-300 group-hover:text-white">
                                                        Dokumenter Kegiatan
                                                        Kampus Part {v}
                                                    </h4>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Gaya Hidup */}
                        <div>
                            <SectionHeader title="Prestasi & Inovasi" />
                            <div className="flex flex-col gap-6 md:flex-row">
                                <div className="h-80 md:h-auto md:w-2/3">
                                    <OverlayCard
                                        item={{
                                            id: 99,
                                            category: 'Teknologi',
                                            title: 'Mahasiswa Teknik Ciptakan Robot Pemilah Sampah Otomatis',
                                            imageUrl:
                                                'https://placehold.co/600x400',
                                        }}
                                        height="h-full"
                                    />
                                </div>
                                <div className="flex flex-col gap-2 md:w-1/3">
                                    {NASIONAL_NEWS.slice(0, 3).map((item) => (
                                        <ListCard
                                            key={item.id}
                                            item={{
                                                ...item,
                                                category: 'Sains',
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Horizontal Ad */}
                        <div className="flex aspect-[5/1] w-full items-center justify-center rounded-lg border border-gray-300 bg-gray-200 font-bold text-gray-400">
                            SPACE IKLAN KAMPUS
                        </div>

                        {/* Lintas Daerah (Grid Cards) */}
                        <div>
                            <SectionHeader title="Pengabdian Masyarakat" />
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                {LINTAS_DAERAH.map((item) => (
                                    <div
                                        key={item.id}
                                        className="group cursor-pointer rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                                    >
                                        <div className="relative mb-4 h-48 overflow-hidden rounded-lg">
                                            <img
                                                src={item.imageUrl}
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                alt={item.title}
                                            />
                                            <span className="absolute top-2 left-2 rounded bg-[#3357a7] px-2 py-1 text-[10px] font-bold text-white shadow">
                                                {item.category}
                                            </span>
                                        </div>
                                        <h3 className="mb-2 text-lg leading-snug font-bold text-gray-800 transition-colors group-hover:text-[#3357a7]">
                                            {item.title}
                                        </h3>
                                        <div className="flex items-center text-xs text-gray-400">
                                            <span>📅 {item.timestamp}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
                            <div className="mt-10 flex items-center justify-center gap-2">
                                <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2196f3] text-sm font-bold text-white shadow-lg shadow-blue-200">
                                    1
                                </button>
                                <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-sm font-bold text-gray-600 transition hover:bg-gray-50">
                                    2
                                </button>
                                <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-sm font-bold text-gray-600 transition hover:bg-gray-50">
                                    3
                                </button>
                                <span className="text-gray-400">...</span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN (Sidebar) */}
                    <aside className="space-y-8 lg:col-span-4">
                        {/* Widget: Trending Numbered List */}
                        <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
                            <div className="border-b border-l-4 border-[#3357a7] border-gray-100 bg-gray-50 px-5 py-4">
                                <h3 className="text-lg font-bold text-gray-800">
                                    Populer Minggu Ini
                                </h3>
                            </div>
                            <div className="p-0">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div
                                        key={i}
                                        className="group flex cursor-pointer gap-4 border-b border-gray-100 p-4 transition last:border-0 hover:bg-gray-50"
                                    >
                                        <div className="text-4xl leading-none font-black text-gray-200 italic transition-colors group-hover:text-[#3357a7]">
                                            0{i}
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-bold tracking-wide text-[#3357a7] uppercase">
                                                Viral
                                            </span>
                                            <h4 className="mt-1 text-sm leading-snug font-medium text-gray-700 decoration-1 underline-offset-2 group-hover:text-black group-hover:underline">
                                                Artikel populer nomor {i}{' '}
                                                tentang kegiatan akademik yang
                                                sedang hangat diperbincangkan
                                            </h4>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Sidebar Ad (Square) */}
                        <div className="w-full rounded-xl border border-gray-200 bg-white p-2 shadow-sm">
                            <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-lg bg-gray-100">
                                <img
                                    src="https://placehold.co/400x400?text=Info+Seminar"
                                    className="h-full w-full object-cover"
                                    alt="Ads"
                                />
                                <span className="absolute top-2 right-2 rounded bg-white/80 px-1 text-[10px] text-gray-400">
                                    Info
                                </span>
                            </div>
                        </div>

                        {/* Widget: Update Terbaru (List) */}
                        <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
                            <div className="border-b border-l-4 border-[#dd0000] border-gray-100 bg-gray-50 px-5 py-4">
                                <h3 className="text-lg font-bold text-gray-800">
                                    Terbaru
                                </h3>
                            </div>
                            <div className="flex flex-col gap-2 p-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <ListCard
                                        key={i}
                                        item={{
                                            id: i + 100,
                                            category: 'Agenda',
                                            title: 'Jadwal Ujian Akhir Semester Genap Tahun Ajaran 2025/2026',
                                            imageUrl: `https://placehold.co/150x150?text=Update+${i}`,
                                            timestamp: `${i * 10} Menit lalu`,
                                        }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Tags Cloud */}
                        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                            <h3 className="mb-4 text-lg font-bold text-gray-800">
                                Tag Populer
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    'Kampus Merdeka',
                                    'Beasiswa',
                                    'Jurnal',
                                    'Wisuda',
                                    'Teknologi',
                                    'Sains',
                                    'Mahasiswa',
                                ].map((tag) => (
                                    <span
                                        key={tag}
                                        className="cursor-pointer rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-[#3357a7] hover:text-white"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </main>

            {/* FOOTER */}
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
        </div>
    );
}
