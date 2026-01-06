import React from 'react';
import SectionHeader from './section-header';

const VideoSection: React.FC = () => (
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
                            <span className="text-2xl text-white">▶</span>
                        </div>
                    </div>
                    <div className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent p-4">
                        <h3 className="text-sm leading-tight font-bold md:text-base">
                            Live Streaming: Wisuda Angkatan XX
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
                                    Dokumenter Kegiatan Kampus Part {v}
                                </h4>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

export default VideoSection;
