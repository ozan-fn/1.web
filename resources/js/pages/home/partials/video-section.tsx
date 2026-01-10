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
        <div className="relative overflow-hidden bg-black px-6 py-16 lg:px-12 lg:py-24">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 -mt-20 -mr-20 h-64 w-64 rounded-full bg-primary/20 blur-[100px]"></div>

            <div className="relative z-10 mx-auto max-w-7xl">
                <SectionHeader title="REPORTASE VIDEO" color="bg-primary" />

                <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12">
                    {/* Main Video Case */}
                    <div className="group relative cursor-pointer lg:col-span-8">
                        <div className="relative overflow-hidden shadow-2xl ring-1 ring-white/10">
                            {mainVideo ? (
                                <>
                                    <img src={mainVideo.thumbnail_url || ''} className="aspect-video w-full object-cover opacity-60 transition-all duration-700 group-hover:scale-105 group-hover:opacity-80" alt={mainVideo.title} />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-white/20 bg-black/40 text-white backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:border-primary group-hover:bg-primary">
                                            <svg className="h-8 w-8 fill-current" viewBox="0 0 24 24">
                                                <path d="M7 6v12l10-6z" />
                                            </svg>
                                            <div className="absolute -inset-4 animate-ping rounded-full border border-primary/40 opacity-0 group-hover:opacity-100"></div>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 w-full p-8 lg:p-12">
                                        <span className="mb-4 inline-block bg-primary px-3 py-1 text-[10px] font-black tracking-widest text-primary-foreground uppercase">Exclusive</span>
                                        <h3 className="max-w-2xl text-3xl leading-tight font-black text-white md:text-4xl lg:text-5xl">{mainVideo.title}</h3>
                                    </div>
                                </>
                            ) : (
                                <div className="aspect-video w-full animate-pulse bg-white/5" />
                            )}
                        </div>
                    </div>

                    {/* Industrial Style Playlist */}
                    <div className="lg:col-span-4">
                        <div className="flex h-full flex-col gap-6">
                            <h4 className="flex items-center gap-2 text-[10px] font-black tracking-[0.3em] text-white/40 uppercase">
                                <span className="h-[1px] w-6 bg-white/20"></span>
                                Daftar Putar
                            </h4>
                            <div className="flex flex-col gap-8">
                                {playlist.map((item, idx) => (
                                    <div key={item.id} className="group flex cursor-pointer items-center gap-6">
                                        <div className="relative aspect-video w-32 shrink-0 overflow-hidden ring-1 ring-white/5">
                                            <img src={item.thumbnail_url || ''} className="h-full w-full object-cover opacity-50 grayscale transition-all duration-300 group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0" alt={item.title} />
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-100 group-hover:bg-primary/20">
                                                <span className="text-[10px] font-black text-white italic">0{idx + 1}</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <h4 className="line-clamp-2 text-sm leading-snug font-black text-white/80 transition-colors group-hover:text-primary">{item.title}</h4>
                                            <span className="text-[9px] font-bold tracking-widest text-white/30 uppercase">{new Date(item.published_at).toLocaleDateString('id-ID')}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button className="mt-auto flex items-center justify-center gap-2 border border-white/10 py-4 text-[10px] font-black tracking-[0.2em] text-white uppercase transition-all hover:bg-white hover:text-black">
                                Lihat Semua Video
                                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoSection;
