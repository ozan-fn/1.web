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
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#0a0a0a] p-8 text-white shadow-2xl lg:p-12">
            {/* Background Glows */}
            <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/20 blur-[100px]"></div>
            <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-primary/10 blur-[100px]"></div>

            <div className="relative z-10">
                <SectionHeader title="RUANG VISUAL" color="bg-primary" textColor="text-white" />

                <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
                    {/* Main Video Feature */}
                    <div className="group relative cursor-pointer overflow-hidden rounded-3xl bg-black shadow-2xl ring-1 ring-white/10 lg:col-span-8">
                        {mainVideo ? (
                            <>
                                <img src={mainVideo.thumbnail_url || ''} className="aspect-video w-full object-cover opacity-60 transition-all duration-700 group-hover:scale-105 group-hover:opacity-80" alt={mainVideo.title} />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/95 text-primary-foreground shadow-[0_0_50px_rgba(var(--primary),0.5)] transition-all duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:shadow-[0_0_80px_rgba(var(--primary),0.8)]">
                                        <svg className="ml-1 h-8 w-8 fill-current" viewBox="0 0 24 24">
                                            <path d="M7 6v12l10-6z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-black/60 to-transparent p-8 md:p-12">
                                    <div className="mb-4 flex items-center gap-2">
                                        <span className="h-2 w-2 animate-pulse rounded-full bg-red-600"></span>
                                        <span className="text-[10px] font-black tracking-widest text-primary uppercase">EXCLUSIVELY SWARA</span>
                                    </div>
                                    <h3 className="text-2xl leading-tight font-black md:text-4xl lg:max-w-2xl">{mainVideo.title}</h3>
                                </div>
                            </>
                        ) : (
                            <div className="aspect-video w-full animate-pulse bg-white/5" />
                        )}
                    </div>

                    {/* Sidebar Playlist */}
                    <div className="flex flex-col gap-6 lg:col-span-4">
                        <div className="mb-2 flex items-center justify-between">
                            <span className="text-[10px] font-black tracking-widest text-white/40 uppercase">NEXT UP</span>
                        </div>
                        <div className="flex flex-col gap-6">
                            {playlist.map((item, idx) => (
                                <div key={item.id} className="group flex cursor-pointer items-center gap-5 rounded-2xl p-3 transition-all hover:bg-white/5">
                                    <div className="relative aspect-video w-32 shrink-0 overflow-hidden rounded-xl bg-white/5">
                                        <img src={item.thumbnail_url || ''} className="h-full w-full object-cover opacity-60 transition-opacity group-hover:opacity-100" alt={item.title} />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                                            <svg className="h-4 w-4 fill-white" viewBox="0 0 24 24">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[9px] font-black tracking-widest text-primary uppercase">EPISODE {idx + 2}</span>
                                        <h4 className="line-clamp-2 text-sm font-bold text-gray-200 transition-colors group-hover:text-white">{item.title}</h4>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="mt-4 w-full rounded-xl border border-white/10 py-4 text-[10px] font-black tracking-widest text-white/60 uppercase transition-all hover:border-white hover:bg-white hover:text-black">View Full Playlist</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoSection;
