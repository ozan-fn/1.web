import React from 'react';
import SectionHeader from './section-header';
import { NewsItem } from './types';

interface Props {
    news: NewsItem[];
}

const VideoSection: React.FC<Props> = ({ news }) => {
    const mainVideo = news[0];
    const playlist = news.slice(1, 4);

    return (
        <div className="relative overflow-hidden rounded-2xl bg-[#0a0a0a] p-6 text-white shadow-2xl lg:p-10">
            <div className="relative z-10">
                <div className="mb-6 flex items-center gap-3">
                    <div className="h-2 w-10 bg-[#0455A4]"></div>
                    <SectionHeader title="Video Pilihan" textColor="text-white" />
                </div>
                <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-5 lg:gap-10">
                    {/* Main Video */}
                    <div className="group relative cursor-pointer overflow-hidden rounded-xl bg-black md:col-span-3">
                        {mainVideo ? (
                            <>
                                <img src={mainVideo.thumbnail_url || ''} className="aspect-video w-full object-cover opacity-70 transition-opacity duration-700 group-hover:opacity-90" alt={mainVideo.title} />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 text-white shadow-2xl backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-[#0455A4]">
                                        <svg className="h-8 w-8 fill-current" viewBox="0 0 24 24">
                                            <path d="M7 6v12l10-6z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-black/60 to-transparent p-8">
                                    <span className="mb-3 inline-block rounded bg-[#0455A4] px-2 py-0.5 text-[11px] font-bold text-white uppercase">{mainVideo.category?.name || 'Video'}</span>
                                    <h3 className="text-xl leading-tight font-bold text-white transition-colors group-hover:text-gray-200 sm:text-2xl md:text-3xl">{mainVideo.title}</h3>
                                </div>
                            </>
                        ) : (
                            <div className="aspect-video w-full animate-pulse bg-gray-800" />
                        )}
                    </div>

                    {/* Playlist */}
                    <div className="flex flex-col gap-6 md:col-span-2">
                        {playlist.map((item, idx) => (
                            <div key={item.id} className="group flex cursor-pointer items-center gap-4 transition-transform hover:translate-x-1">
                                <div className="relative aspect-video w-32 shrink-0 overflow-hidden rounded-lg bg-gray-800">
                                    <img src={item.thumbnail_url || ''} className="h-full w-full object-cover opacity-60 transition-opacity group-hover:opacity-100" alt={item.title} />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                                        <svg className="h-6 w-6 fill-white" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h4 className="line-clamp-2 text-[15px] leading-snug font-bold text-gray-200 transition-colors group-hover:text-[#0455A4]">{item.title}</h4>
                                    <span className="text-[10px] font-medium text-gray-500 uppercase">{item.category?.name}</span>
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
