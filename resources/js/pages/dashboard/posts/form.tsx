import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { resizeImage } from '@/lib/image-compression'; // Fungsi resize Anda
import { BreadcrumbItem, SharedData } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import axios from 'axios';
import { CheckCircle2 } from 'lucide-react';
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
import { UrlExtractor } from './components/UrlExtractor';

export default function PostForm() {
    const { props } = usePage<SharedData>();
    const { categories = [], sub_categories = [], tags = [], post = null, flash = {} } = (props as any) || {};

    const isEdit = Boolean(post);
    const editorRef = useRef<any>(null);
    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(post?.thumbnail_url || null);
    const [isSmallScreen, setIsSmallScreen] = useState(typeof window !== 'undefined' && window.innerWidth < 1024);
    const [useDarkMode, setUseDarkMode] = useState(() => typeof document !== 'undefined' && document.documentElement.classList.contains('dark'));

    const { data, setData, processing, errors } = useForm<{
        category_id: number | null;
        category_name: string;
        sub_category_id: number | null;
        title: string;
        slug: string;
        excerpt: string;
        content: string;
        status: string;
        is_featured: boolean;
        thumbnail: File | null;
        tags: string[];
        published_at: string | null;
    }>({
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
        published_at: post?.published_at || (!post ? new Date().toISOString().split('T')[0] : null),
    });

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

    const handleUrlExtractSuccess = useCallback(
        async (extractedData: { title: string; thumbnail: string; content: string; tags: string[] }) => {
            if (extractedData.title) {
                handleTitleChange(extractedData.title);
            }
            if (extractedData.content) {
                setData('content', extractedData.content);
            }
            if (extractedData.thumbnail) {
                try {
                    const response = await axios.get(extractedData.thumbnail, {
                        responseType: 'blob',
                        headers: { 'Accept': 'image/*' },
                    });
                    const blob = response.data;
                    const filename = extractedData.thumbnail.split('/').pop()?.split('?')[0] || 'thumbnail.jpg';
                    const file = new File([blob], filename, { type: blob.type || 'image/jpeg' });
                    const objectUrl = URL.createObjectURL(blob);
                    setThumbnailPreview(objectUrl);
                    setData('thumbnail', file);
                } catch (error) {
                    console.error('Failed to fetch thumbnail:', error);
                }
            }
            if (extractedData.tags && Array.isArray(extractedData.tags)) {
                const newTags = extractedData.tags
                    .map((tag: string) => tag.toLowerCase().trim())
                    .filter((tag: string) => tag && !data.tags.includes(tag));
                if (newTags.length > 0) {
                    setData('tags', [...data.tags, ...newTags]);
                }
            }
        },
        [handleTitleChange, setData, data.tags],
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

                {!isEdit && (
                    <UrlExtractor onExtractSuccess={handleUrlExtractSuccess} isLoading={processing} />
                )}

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                    {/* AREA KIRI: EDITOR UTAMA */}
                    <div className="space-y-6 lg:col-span-9">
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
                                        onChange={(val: string) => {
                                            setData('category_id', parseInt(val));
                                            setData('category_name', '');
                                            setData('sub_category_id', null);
                                        }}
                                        onCreateCategory={(name: string) => {
                                            setData('category_id', null);
                                            setData('category_name', name);
                                            setData('sub_category_id', null);
                                        }}
                                        error={errors.category_id || errors.category_name}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label className="text-xs tracking-wider text-muted-foreground uppercase">Sub Category</Label>
                                    <SubCategorySelect 
                                        subCategories={sub_categories} 
                                        categoryId={data.category_id || 0} 
                                        value={data.sub_category_id} 
                                        onChange={(val: string | null) => setData('sub_category_id', val ? parseInt(val) : null)} 
                                        error={errors.sub_category_id} 
                                    />
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
