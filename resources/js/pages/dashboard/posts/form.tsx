import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { resizeImage } from '@/lib/image-compression'; // Fungsi resize Anda
import { BreadcrumbItem, SharedData } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import axios from 'axios';
import { CheckCircle2, Wand2 } from 'lucide-react';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';

// Component Imports
import { CategorySelect } from './components/CategorySelect';
import { ContentEditor } from './components/ContentEditor';
import { ExcerptInput } from './components/ExcerptInput';
import { FeaturedToggle } from './components/FeaturedToggle';
import { FormActions } from './components/FormActions';
import { FormHeader } from './components/FormHeader';
import { PublishDateInput } from './components/PublishDateInput';
import { StatusSelect } from './components/StatusSelect';
import { SubCategorySelect } from './components/SubCategorySelect';
import { TagsInput } from './components/TagsInput';
import { ThumbnailUpload } from './components/ThumbnailUpload';
import { TitleSlugInput } from './components/TitleSlugInput';

export default function PostForm() {
    const { props } = usePage<SharedData>();
    const { categories = [], sub_categories = [], tags = [], post = null, flash = {} } = (props as any) || {};

    const isEdit = Boolean(post);
    const editorRef = useRef<any>(null);
    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(post?.thumbnail_url || null);
    const [isSmallScreen, setIsSmallScreen] = useState(typeof window !== 'undefined' && window.innerWidth < 1024);
    const [useDarkMode, setUseDarkMode] = useState(() => typeof document !== 'undefined' && document.documentElement.classList.contains('dark'));
    const [autoFillUrl, setAutoFillUrl] = useState('');
    const [autoFillError, setAutoFillError] = useState<string | null>(null);
    const [autoFillLoading, setAutoFillLoading] = useState(false);

    const { data, setData, processing, errors } = useForm<any>({
        category_id: post?.category_id || null,
        category_name: '',
        sub_category_id: post?.sub_category_id || null,
        title: post?.title || '',
        slug: post?.slug || '',
        excerpt: post?.excerpt || '',
        content: post?.content || '',
        status: post?.status || 'published',
        is_featured: post?.is_featured || false,
        thumbnail: null,
        tags: post?.tags.map((t: any) => t.name) || [],
        published_at: post?.published_at || (!post ? new Date().toISOString() : null),
    });

    const setThumbnailFromUrl = useCallback(
        async (url: string) => {
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error('Failed to fetch thumbnail');
                const blob = await response.blob();
                const filename = url.split('/').pop() || 'thumbnail.jpg';
                const file = new File([blob], filename, { type: blob.type || 'image/jpeg' });
                setThumbnailPreview(url);
                setData('thumbnail', file);
            } catch (error) {
                console.error('Error fetching thumbnail:', error);
            }
        },
        [setData],
    );

    const handleTitleChange = useCallback(
        (value: string) => {
            setData('title', value);
            if (!isEdit)
                setData(
                    'slug',
                    value
                        .toLowerCase()
                        .trim()
                        .replace(/[^\w\s-]/g, '')
                        .replace(/[\s_-]+/g, '-')
                        .replace(/^-+|-+$/g, ''),
                );
        },
        [setData, isEdit],
    );

    const handleAutoFill = useCallback(async () => {
        const targetUrl = autoFillUrl.trim();
        if (!targetUrl) return;
        setAutoFillLoading(true);
        setAutoFillError(null);

        try {
            const { data: extracted } = await axios.get('https://test1-gl4j.vercel.app/extract', {
                params: { url: targetUrl },
            });

            if (extracted?.title) handleTitleChange(extracted.title);
            if (extracted?.content) setData('content', extracted.content);
            if (extracted?.tags?.length) setData('tags', [...new Set(extracted.tags.map((tag: string) => tag.toLowerCase().trim()).filter(Boolean))]);
            if (extracted?.thumbnail) await setThumbnailFromUrl(extracted.thumbnail);
        } catch (error) {
            console.error('Auto fill failed:', error);
            setAutoFillError('Gagal mengambil data dari URL. Coba lagi.');
        } finally {
            setAutoFillLoading(false);
        }
    }, [autoFillUrl, handleTitleChange, setData, setThumbnailFromUrl]);

    // HANDLER THUMBNAIL DENGAN RESIZE
    const handleThumbnailChange = useCallback(
        async (e: ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (!file) return;

            try {
                // Kita resize thumbnail ke ukuran standar (misal 1200x800)
                const resizedBlob = await resizeImage(file, 1200, 800);
                // Buat File object baru dari blob hasil resize
                const resizedFile = new File([resizedBlob], file.name, { type: file.type });

                setThumbnailPreview(URL.createObjectURL(resizedFile));
                setData('thumbnail', resizedFile);
            } catch (error) {
                console.error('Failed to resize thumbnail:', error);
            }
        },
        [setData],
    );

    const addTag = useCallback(
        (tag: string) => {
            const normalized = tag.toLowerCase().trim();
            if (normalized && !data.tags.includes(normalized)) setData('tags', [...data.tags, normalized]);
        },
        [data.tags, setData],
    );

    const removeTag = useCallback(
        (tag: string) => {
            setData(
                'tags',
                data.tags.filter((t: any) => t !== tag),
            );
        },
        [data.tags, setData],
    );

    const imageHandler = useCallback(
        async (blobInfo: any) => {
            try {
                const resized = await resizeImage(blobInfo.blob(), 1200, 800);
                const formData = new FormData();
                formData.append('image', resized, blobInfo.filename());
                if (isEdit && post?.id) formData.append('news_id', post.id.toString());
                const { data: res } = await axios.post('/dashboard/posts/upload-image', formData);
                return res.url;
            } catch {
                throw new Error('Upload failed');
            }
        },
        [isEdit, post?.id],
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const content = editorRef.current?.getContent() || data.content;
        router.post(
            isEdit ? `/dashboard/posts/${post?.id}` : '/dashboard/posts',
            {
                ...data,
                content,
                _method: isEdit ? 'PUT' : 'POST',
            },
            { forceFormData: true },
        );
    };

    useEffect(() => {
        const handleResize = () => setIsSmallScreen(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Posts', href: '/dashboard/posts' },
        { title: isEdit ? 'Edit' : 'Create', href: '#' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${isEdit ? 'Edit' : 'Create'} Post`} />

            <form onSubmit={handleSubmit} className="mx-auto max-w-[98%] space-y-4 p-4">
                <div className="flex items-center justify-between">
                    <FormHeader isEdit={isEdit} />
                    <FormActions isEdit={isEdit} processing={processing} />
                </div>

                {flash?.success && (
                    <Alert className="border-green-500/50 bg-green-500/5">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <AlertDescription className="text-green-600">{flash.success}</AlertDescription>
                    </Alert>
                )}

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                    {/* AREA KIRI: EDITOR UTAMA */}
                    <div className="space-y-6 lg:col-span-9">
                        {!isEdit && (
                            <Card>
                                <CardHeader className="space-y-1">
                                    <CardTitle className="text-lg">Auto Fill</CardTitle>
                                    <CardDescription>Masukkan URL artikel untuk mengisi otomatis judul, konten, tag, dan thumbnail.</CardDescription>
                                </CardHeader>
                                <CardContent className="grid gap-3">
                                    <div className="flex flex-col gap-2 sm:flex-row">
                                        <Input placeholder="https://..." value={autoFillUrl} onChange={(e) => setAutoFillUrl(e.target.value)} />
                                        <Button type="button" onClick={handleAutoFill} disabled={autoFillLoading || !autoFillUrl.trim()}>
                                            <Wand2 className="mr-2 h-4 w-4" />
                                            {autoFillLoading ? 'Mengisi...' : 'Auto Fill'}
                                        </Button>
                                    </div>
                                    {autoFillError && <p className="text-sm font-medium text-destructive">{autoFillError}</p>}
                                </CardContent>
                            </Card>
                        )}

                        <Card>
                            <CardHeader className="space-y-1">
                                <CardTitle className="text-lg">Content</CardTitle>
                                <CardDescription>Write your post title and body here.</CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-6">
                                <TitleSlugInput title={data.title} slug={data.slug} isEdit={isEdit} onTitleChange={handleTitleChange} onSlugChange={(val) => setData('slug', val)} errors={errors} />

                                <div className="grid gap-2">
                                    <Label className="text-sm font-semibold">Body Content</Label>
                                    <ContentEditor ref={editorRef} value={data.content} onChange={(content) => setData('content', content)} imageHandler={imageHandler} useDarkMode={useDarkMode} isSmallScreen={isSmallScreen} error={errors.content} />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="space-y-1">
                                <CardTitle className="text-lg">Summary</CardTitle>
                                <CardDescription>Brief summary for SEO. If left empty, it will be generated from content.</CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-2">
                                <ExcerptInput value={data.excerpt} onChange={(val) => setData('excerpt', val)} error={errors.excerpt} />
                            </CardContent>
                        </Card>
                    </div>

                    {/* AREA KANAN: SIDEBAR SETTINGS */}
                    <div className="space-y-6 lg:col-span-3">
                        <Card>
                            <CardHeader className="space-y-1">
                                <CardTitle className="text-base">Publishing</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label className="text-xs tracking-wider text-muted-foreground uppercase">Post Status</Label>
                                    <StatusSelect value={data.status} onChange={(val) => setData('status', val)} error={errors.status} />
                                </div>

                                {data.status === 'published' && (
                                    <div className="grid gap-2">
                                        <Label className="text-xs tracking-wider text-muted-foreground uppercase">Publish Date</Label>
                                        <PublishDateInput value={data.published_at} onChange={(val) => setData('published_at', val)} error={errors.published_at} />
                                    </div>
                                )}

                                <FeaturedToggle value={data.is_featured} onChange={(val) => setData('is_featured', val)} />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="space-y-1">
                                <CardTitle className="text-base">Organization</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label className="text-xs tracking-wider text-muted-foreground uppercase">Category</Label>
                                    <CategorySelect
                                        categories={categories}
                                        value={data.category_id ? String(data.category_id) : ''}
                                        onChange={(val) => {
                                            setData('category_id', parseInt(val));
                                            setData('category_name', '');
                                            setData('sub_category_id', null);
                                        }}
                                        onCreateCategory={(name) => {
                                            setData('category_id', null);
                                            setData('category_name', name);
                                            setData('sub_category_id', null);
                                        }}
                                        error={errors.category_id || errors.category_name}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label className="text-xs tracking-wider text-muted-foreground uppercase">Sub Category</Label>
                                    <SubCategorySelect subCategories={sub_categories} categoryId={data.category_id} value={data.sub_category_id} onChange={(val) => setData('sub_category_id', val)} error={errors.sub_category_id} />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="space-y-1">
                                <CardTitle className="text-base">Media & Tags</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label className="text-center text-xs tracking-wider text-muted-foreground uppercase">Thumbnail</Label>
                                    <ThumbnailUpload previewUrl={thumbnailPreview} onChange={handleThumbnailChange} error={errors.thumbnail} />
                                </div>
                                <div className="grid gap-2 border-t pt-4">
                                    <Label className="text-xs tracking-wider text-muted-foreground uppercase">Post Tags</Label>
                                    <TagsInput tags={data.tags} availableTags={tags} onAddTag={addTag} onRemoveTag={removeTag} error={errors.tags} />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </form>
        </AppLayout>
    );
}
