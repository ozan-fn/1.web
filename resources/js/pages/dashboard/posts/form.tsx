import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { resizeImage } from '@/lib/image-compression';
import dashboard from '@/routes/dashboard';
import { BreadcrumbItem, SharedData } from '@/types';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import {
    AlertCircle,
    CheckCircle2,
    ChevronLeft,
    Loader2,
    Plus,
    Upload,
    X,
} from 'lucide-react';
import {
    ChangeEvent,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

interface Category {
    id: number;
    name: string;
}

export default function PostForm() {
    const { props } = usePage<SharedData>();
    const {
        categories = [],
        sub_categories = [],
        tags = [],
        post = null,
        flash = {},
    } = (props as any) || {};

    const isEdit = Boolean(post);
    const editorRef = useRef<any>(null);
    const tagContainerRef = useRef<HTMLDivElement>(null);
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

    const [previewUrl, setPreviewUrl] = useState<string | null>(() => {
        if (!post) return null;
        if (post.thumbnail_url) return post.thumbnail_url;
        if (post.thumbnail) {
            if (
                post.thumbnail.startsWith('http') ||
                post.thumbnail.startsWith('/')
            ) {
                return post.thumbnail;
            }
            return `/storage/${post.thumbnail}`;
        }
        return null;
    });
    const [tagInput, setTagInput] = useState('');
    const [showTagSuggestions, setShowTagSuggestions] = useState(false);

    const [isSmallScreen, setIsSmallScreen] = useState<boolean>(() =>
        typeof window !== 'undefined'
            ? window.matchMedia('(max-width: 768px)').matches
            : false,
    );

    const useDarkMode =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                tagContainerRef.current &&
                !tagContainerRef.current.contains(event.target as Node)
            ) {
                setShowTagSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const m = window.matchMedia('(max-width: 768px)');
        const handler = (ev: MediaQueryListEvent) =>
            setIsSmallScreen(ev.matches);
        try {
            m.addEventListener('change', handler);
        } catch (e) {
            // Safari
            // @ts-ignore
            m.addListener(handler);
        }
        return () => {
            try {
                m.removeEventListener('change', handler);
            } catch (e) {
                // @ts-ignore
                m.removeListener(handler);
            }
        };
    }, []);

    // initialize prevImagesRef from initial content so deletions are tracked
    useEffect(() => {
        prevImagesRef.current = new Set(extractImages(data.content || ''));
    }, []);

    const {
        data,
        setData,
        post: postReq,
        put,
        processing,
        errors,
    } = useForm<PostFormData>({
        category_id:
            post?.category_id || (categories.length > 0 ? categories[0].id : 0),
        sub_category_id: (post?.sub_category_id || 'none') as
            | string
            | number
            | null,
        title: post?.title || '',
        excerpt: post?.excerpt || '',
        content: post?.content || '',
        status: post?.status || 'draft',
        is_featured: post?.is_featured || false,
        thumbnail: null as File | null,
        tags: post?.tags?.map((t: any) => t.name) || ([] as string[]),
    });

    dataRef.current = data;

    interface PostFormData {
        category_id: number;
        sub_category_id: string | number | null;
        title: string;
        excerpt: string;
        content: string;
        status: string;
        is_featured: boolean;
        thumbnail: File | null;
        tags: string[];
    }

    const imageHandler = useCallback(
        async (file: File) => {
            const resizedFile = await resizeImage(file, 800, undefined, 0.7);
            const formData = new FormData();
            formData.append('image', resizedFile);
            if (post) {
                formData.append('news_id', post.id.toString());
            }

            const res = await axios.post(
                '/dashboard/posts/upload-image',
                formData,
            );
            return res.data.url;
        },
        [post],
    );

    const autoSave = useCallback(
        (contentOverride?: string) => {
            const currentData = dataRef.current;
            const payload = {
                ...currentData,
                content: contentOverride ?? currentData.content,
                sub_category_id:
                    currentData.sub_category_id === 'none'
                        ? null
                        : currentData.sub_category_id,
            };

            if (isEdit && post) {
                router.post(dashboard.posts.update(post.id).url, {
                    ...payload,
                    _method: 'PUT',
                });
            } else {
                router.post(dashboard.posts.store().url, payload);
            }
        },
        [isEdit, post],
    );

    const DEFAULT_HEIGHT = '1200px';

    const tinymceInit = useMemo(
        () => ({
            height: DEFAULT_HEIGHT,
            plugins: [
                'accordion',
                'advlist',
                'anchor',
                'autolink',
                'autoresize',
                'charmap',
                'code',
                'codesample',
                'directionality',
                'emoticons',
                'fullscreen',
                'help',
                'image',
                'importcss',
                'insertdatetime',
                'link',
                'lists',
                'media',
                'nonbreaking',
                'pagebreak',
                'preview',
                'quickbars',
                'save',
                'searchreplace',
                'table',
                'visualblocks',
                'visualchars',
                'wordcount',
            ],
            relative_urls: false,
            remove_script_host: true,
            convert_urls: true,
            automatic_uploads: true,
            paste_data_images: false,
            images_upload_handler: (blobInfo: any) => {
                return new Promise(async (resolve, reject) => {
                    try {
                        const file = new File(
                            [blobInfo.blob()],
                            blobInfo.filename(),
                            {
                                type: blobInfo.blob().type,
                            },
                        );
                        const url = await imageHandler(file);
                        resolve(url);

                        setTimeout(() => {
                            const editor = editorRef.current;
                            if (editor) {
                                const content = editor.getContent();
                                setData('content', content);
                                autoSave(content);
                            }
                        }, 500);
                    } catch (e) {
                        reject('Image upload failed');
                    }
                });
            },
            editimage_cors_hosts: ['picsum.photos'],
            menubar: 'file edit view insert format tools table help',
            toolbar:
                'undo redo | fullscreen | accordion accordionremove | blocks fontfamily fontsize | bold italic underline strikethrough | align numlist bullist | link image | table media | lineheight outdent indent| forecolor backcolor removeformat | charmap emoticons | code preview | save print | pagebreak anchor codesample | ltr rtl',
            image_advtab: true,
            link_list: [],
            image_list: [],
            image_class_list: [
                { title: 'None', value: '' },
                { title: 'Responsive', value: 'img-fluid' },
            ],
            importcss_append: true,
            file_picker_callback: async (
                callback: any,
                value: any,
                meta: any,
            ) => {
                if (meta.filetype === 'image') {
                    const input = document.createElement('input');
                    input.setAttribute('type', 'file');
                    input.setAttribute('accept', 'image/*');
                    input.onchange = async function () {
                        const file = (this as HTMLInputElement).files?.[0];
                        if (file) {
                            try {
                                const url = await imageHandler(file);
                                callback(url, { alt: file.name });

                                setTimeout(() => {
                                    const editor = editorRef.current;
                                    if (editor) {
                                        const content = editor.getContent();
                                        setData('content', content);
                                        autoSave(content);
                                    }
                                }, 100);
                            } catch (e) {
                                console.error('Upload failed:', e);
                            }
                        }
                    };
                    input.click();
                    return;
                }
            },
            image_caption: true,
            quickbars_selection_toolbar:
                'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
            noneditable_class: 'mceNonEditable',
            toolbar_mode: 'sliding',
            contextmenu: 'link image table',
            skin: useDarkMode ? 'oxide-dark' : 'oxide',
            content_css: useDarkMode ? 'dark' : 'default',
            content_style:
                'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',
        }),
        [imageHandler, autoSave, isSmallScreen, useDarkMode],
    );

    const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            setData('thumbnail', file as File);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const addTag = (tagName: string) => {
        const normalized = tagName.trim();
        if (normalized && !data.tags.includes(normalized)) {
            setData('tags', [...data.tags, normalized]);
        }
        setTagInput('');
        setShowTagSuggestions(false);
    };

    const removeTag = (tagName: string) => {
        setData(
            'tags',
            data.tags.filter((t) => t !== tagName),
        );
    };

    const filteredTags = (tags || []).filter(
        (tag: any) =>
            tag.name.toLowerCase().includes(tagInput.toLowerCase()) &&
            !data.tags.includes(tag.name),
    );

    const filteredSubCategories = (sub_categories || []).filter(
        (s: any) => s.category_id === data.category_id,
    );

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: dashboard.posts.index().url },
        { title: 'Posts', href: dashboard.posts.index().url },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Ensure state is up to date with editor content
        const latestContent = editorRef.current?.getContent() || data.content;

        const finalData = {
            ...data,
            content: latestContent,
            sub_category_id:
                data.sub_category_id === 'none' ? null : data.sub_category_id,
        };

        if (isEdit && post) {
            router.post(
                dashboard.posts.update(post.id).url,
                {
                    ...finalData,
                    _method: 'PUT',
                },
                {
                    preserveScroll: true,
                    preserveState: true,
                },
            );
        } else {
            router.post(dashboard.posts.store().url, finalData);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEdit ? 'Edit Post' : 'Create Post'} />

            <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 p-2 sm:p-4 md:p-6">
                {flash.success && (
                    <Alert
                        variant="default"
                        className="border-green-500/50 bg-green-50 text-green-700 dark:bg-green-950/20 dark:text-green-400"
                    >
                        <CheckCircle2 className="h-4 w-4" />
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription>{flash.success}</AlertDescription>
                    </Alert>
                )}

                {flash.error && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{flash.error}</AlertDescription>
                    </Alert>
                )}

                {Object.keys(errors).length > 0 && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Validation Error</AlertTitle>
                        <AlertDescription>
                            Please fix the errors below before submitting the
                            form.
                        </AlertDescription>
                    </Alert>
                )}

                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        asChild
                        className="-ml-2"
                    >
                        <Link href={dashboard.posts.index().url}>
                            <ChevronLeft className="h-5 w-5" />
                        </Link>
                    </Button>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        {isEdit ? 'Edit Post' : 'Create New Post'}
                    </h1>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 gap-6 lg:grid-cols-3"
                >
                    <div className="space-y-6 lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Post Content</CardTitle>
                                <CardDescription>
                                    Write the main information for your post.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={(e) =>
                                            setData('title', e.target.value)
                                        }
                                        placeholder="Enter post title"
                                        required
                                    />
                                    {errors.title && (
                                        <p className="text-sm text-red-500">
                                            {errors.title}
                                        </p>
                                    )}
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="excerpt">Excerpt</Label>
                                    <Textarea
                                        id="excerpt"
                                        value={data.excerpt || ''}
                                        onChange={(e) =>
                                            setData('excerpt', e.target.value)
                                        }
                                        placeholder="Short summary of the post"
                                        rows={3}
                                    />
                                    {errors.excerpt && (
                                        <p className="text-sm text-red-500">
                                            {errors.excerpt}
                                        </p>
                                    )}
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="content">Content</Label>
                                    <div className="relative min-h-[400px] rounded-md border bg-background p-2">
                                        <Editor
                                            apiKey="0rl4abq6pz1sf2afw9izxs2pxqr7jbh970rxtxb8r85zwil4"
                                            onInit={(evt, editor) =>
                                                (editorRef.current = editor)
                                            }
                                            value={data.content || ''}
                                            onEditorChange={async (content) => {
                                                setData('content', content);

                                                const current = new Set(
                                                    extractImages(content),
                                                );
                                                const prev =
                                                    prevImagesRef.current;
                                                const removed: string[] = [];

                                                prev.forEach((url) => {
                                                    if (!current.has(url))
                                                        removed.push(url);
                                                });

                                                prevImagesRef.current = current;

                                                for (const url of removed) {
                                                    try {
                                                        if (
                                                            url.includes(
                                                                '/storage/',
                                                            )
                                                        ) {
                                                            await axios.post(
                                                                '/dashboard/posts/delete-image',
                                                                {
                                                                    url,
                                                                    news_id:
                                                                        post?.id,
                                                                },
                                                            );
                                                        }
                                                    } catch (e) {
                                                        console.error(
                                                            'Failed to delete image',
                                                            url,
                                                            e,
                                                        );
                                                    }
                                                }
                                            }}
                                            init={tinymceInit as any}
                                        />
                                    </div>
                                    {errors.content && (
                                        <p className="text-sm text-red-500">
                                            {errors.content}
                                        </p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Settings</CardTitle>
                                <CardDescription>
                                    Classification and Status
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="category">Category</Label>
                                    <Select
                                        value={data.category_id.toString()}
                                        onValueChange={(val) =>
                                            setData(
                                                'category_id',
                                                parseInt(val),
                                            )
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((cat: any) => (
                                                <SelectItem
                                                    key={cat.id}
                                                    value={cat.id.toString()}
                                                >
                                                    {cat.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.category_id && (
                                        <p className="text-sm text-red-500">
                                            {errors.category_id}
                                        </p>
                                    )}
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="sub_category">
                                        Sub Category
                                    </Label>
                                    <Select
                                        value={
                                            data.sub_category_id?.toString() ||
                                            'none'
                                        }
                                        onValueChange={(val) =>
                                            setData(
                                                'sub_category_id',
                                                val === 'none'
                                                    ? null
                                                    : parseInt(val),
                                            )
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Sub Category (Optional)" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="none">
                                                None
                                            </SelectItem>
                                            {filteredSubCategories.map(
                                                (sc: any) => (
                                                    <SelectItem
                                                        key={sc.id}
                                                        value={sc.id.toString()}
                                                    >
                                                        {sc.name}
                                                    </SelectItem>
                                                ),
                                            )}
                                        </SelectContent>
                                    </Select>
                                    {errors.sub_category_id && (
                                        <p className="text-sm text-red-500">
                                            {errors.sub_category_id}
                                        </p>
                                    )}
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="status">Status</Label>
                                    <Select
                                        value={data.status}
                                        onValueChange={(val) =>
                                            setData('status', val as any)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="draft">
                                                Draft
                                            </SelectItem>
                                            <SelectItem value="published">
                                                Published
                                            </SelectItem>
                                            <SelectItem value="archived">
                                                Archived
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.status && (
                                        <p className="text-sm text-red-500">
                                            {errors.status}
                                        </p>
                                    )}
                                </div>

                                <div className="flex items-center justify-between space-x-2 pt-2">
                                    <Label
                                        htmlFor="is_featured"
                                        className="flex cursor-pointer flex-col gap-1"
                                    >
                                        <span>Featured Post</span>
                                        <span className="text-xs font-normal text-wrap text-muted-foreground">
                                            Show this post in featured section
                                        </span>
                                    </Label>
                                    <Switch
                                        id="is_featured"
                                        checked={data.is_featured}
                                        onCheckedChange={(val) =>
                                            setData('is_featured', val)
                                        }
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Thumbnail</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex flex-col items-center gap-4">
                                    {previewUrl ? (
                                        <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                                            <img
                                                src={previewUrl}
                                                alt="Thumbnail preview"
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex aspect-video w-full flex-col items-center justify-center rounded-lg border-2 border-dashed text-muted-foreground">
                                            <Upload className="mb-2 h-8 w-8" />
                                            <span className="text-xs">
                                                No image selected
                                            </span>
                                        </div>
                                    )}
                                    <Label className="w-full cursor-pointer">
                                        <div className="flex h-9 items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80">
                                            {previewUrl
                                                ? 'Change Image'
                                                : 'Upload Image'}
                                        </div>
                                        <Input
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleThumbnailChange}
                                        />
                                    </Label>
                                    {errors.thumbnail && (
                                        <p className="text-sm text-red-500">
                                            {errors.thumbnail}
                                        </p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Tags</CardTitle>
                                <CardDescription>
                                    Add tags to categorize your post.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex flex-wrap gap-2">
                                    {data.tags.map((tagName) => (
                                        <Badge
                                            key={tagName}
                                            variant="secondary"
                                            className="flex items-center gap-1 px-2 py-1"
                                        >
                                            {tagName}
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeTag(tagName)
                                                }
                                                className="ml-1 rounded-full p-0.5 hover:bg-muted-foreground/20"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </Badge>
                                    ))}
                                </div>

                                <div className="relative" ref={tagContainerRef}>
                                    <div className="flex gap-2">
                                        <Input
                                            placeholder="Type a tag name..."
                                            value={tagInput}
                                            onChange={(e) => {
                                                setTagInput(e.target.value);
                                                setShowTagSuggestions(true);
                                            }}
                                            onFocus={() =>
                                                setShowTagSuggestions(true)
                                            }
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    addTag(tagInput);
                                                }
                                            }}
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="icon"
                                            onClick={() => addTag(tagInput)}
                                        >
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>

                                    {showTagSuggestions && tagInput && (
                                        <Card className="absolute right-0 left-0 z-50 mt-1 max-h-[200px] overflow-y-auto border shadow-lg">
                                            <div className="p-1">
                                                {filteredTags.length > 0 ? (
                                                    filteredTags.map(
                                                        (tag: any) => (
                                                            <button
                                                                key={tag.id}
                                                                type="button"
                                                                className="w-full rounded-sm px-3 py-2 text-left text-sm hover:bg-muted"
                                                                onClick={() =>
                                                                    addTag(
                                                                        tag.name,
                                                                    )
                                                                }
                                                            >
                                                                {tag.name}
                                                            </button>
                                                        ),
                                                    )
                                                ) : (
                                                    <button
                                                        type="button"
                                                        className="w-full px-3 py-2 text-left text-sm text-muted-foreground"
                                                        onClick={() =>
                                                            addTag(tagInput)
                                                        }
                                                    >
                                                        Create new tag "
                                                        {tagInput}"
                                                    </button>
                                                )}
                                            </div>
                                        </Card>
                                    )}
                                </div>

                                {errors.tags && (
                                    <p className="text-sm text-red-500">
                                        {errors.tags}
                                    </p>
                                )}
                            </CardContent>
                        </Card>

                        <div className="flex gap-2">
                            <Button
                                type="submit"
                                disabled={processing}
                                className="flex-1"
                            >
                                {processing && (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                {isEdit ? 'Update Post' : 'Save Post'}
                            </Button>
                            <Button type="button" variant="outline" asChild>
                                <Link href={dashboard.posts.index().url}>
                                    Cancel
                                </Link>
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
