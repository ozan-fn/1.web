import React from 'react';

interface NewsItem {
    id: number;
    category: string;
    title: string;
    imageUrl: string;
    timestamp?: string;
}

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

const Sidebar: React.FC = () => {
    return (
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
    );
};

export default Sidebar;