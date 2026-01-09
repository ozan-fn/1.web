import { useRef } from 'react';

export function usePostForm() {
    const editorRef = useRef<any>(null);
    const prevImagesRef = useRef<Set<string>>(new Set());
    const dataRef = useRef<any>(null);

    const extractImages = (html: string) => {
        if (!html) return [] as string[];
        const matches = html.match(/<img[^>]+src=["']([^"']+)["']/gi);
        if (!matches) return [] as string[];
        return matches
            .map((m) => {
                const srcMatch = /src=["']([^"']+)["']/.exec(m);
                return srcMatch ? srcMatch[1] : '';
            })
            .filter(Boolean);
    };

    return {
        editorRef,
        prevImagesRef,
        dataRef,
        extractImages,
    };
}
