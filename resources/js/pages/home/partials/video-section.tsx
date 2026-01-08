import React from 'react';
import SectionHeader from './section-header';
import { NewsItem } from './types';

interface Props {
    news: NewsItem[];
}

const VideoSection: React.FC<Props> = ({ news }) => {
    const mainVideo = news[0];
    const playlist = news.slice(1, 5);

    return (
        <div className="relative overflow-hidden rounded-sm bg-[#1a1a1a] p-6 text-white shadow-xl lg:p-10">
            <div className="relative z-10">
                <SectionHeader
                    title="VIDEO TERPILIH"
                    color="bg-red-600"
                    textColor="text-white"
                />
                <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-5 lg:gap-12">
                    {/* Main Video */}
                    <div className="group relative cursor-pointer overflow-hidden rounded-sm bg-black md:col-span-3">
                        {mainVideo ? (
                            <>
                                <img
                                    src={mainVideo.thumbnail_url || ''}
                                    className="aspect-video w-full object-cover opacity-80 transition-opacity duration-500 group-hover:opacity-100"
                                    alt={mainVideo.title}
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600/90 text-white shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-red-600">
                                        <svg
                                            className="h-6 w-6 fill-current"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M7 6v12l10-6z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-black/40 to-transparent p-6">
                                    <span className="mb-2 inline-block text-[11px] font-black tracking-widest text-red-500 uppercase">
                                        {mainVideo.category?.name || 'Video'}
                                    </span>
                                    <h3 className="text-lg leading-tight font-black sm:text-xl md:text-2xl">
                                        {mainVideo.title}
                                    </h3>
                                </div>
                            </>
                        ) : (
                            <div className="aspect-video w-full animate-pulse bg-gray-800" />
                        )}
                    </div>
                    {/* Playlist */}
                    <div className="flex h-full flex-col gap-5 overflow-y-auto pr-2 md:col-span-2">
                        {playlist.map((item, idx) => (
                            <div
                                key={item.id}
                                className="group -m-2 flex cursor-pointer items-start gap-4 rounded-sm p-2 transition-colors hover:bg-white/5"
                            >
                                <div className="relative aspect-video w-28 shrink-0 overflow-hidden rounded-sm bg-gray-800">
                                    <img
                                        src={item.thumbnail_url || ''}
                                        className="h-full w-full object-cover opacity-70 transition-opacity group-hover:opacity-100"
                                        alt={item.title}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                                        <svg
                                            className="h-6 w-6 fill-white"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] font-black tracking-wider text-red-500 uppercase">
                                        Eps. 0{idx + 1}
                                    </span>
                                    <h4 className="line-clamp-2 text-sm leading-snug font-extrabold text-gray-100 group-hover:text-red-400">
                                        {item.title}
                                    </h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoSection;
