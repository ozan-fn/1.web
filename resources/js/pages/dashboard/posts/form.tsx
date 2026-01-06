import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
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
import dashboard from '@/routes/dashboard';
import { BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { ChevronLeft, Loader2, Upload } from 'lucide-react';
import { ChangeEvent, useEffect, useState } from 'react';

interface Category {
    id: number;
    name: string;
}

interface SubCategory {
    id: number;
    category_id: number;
    name: string;
}

interface Tag {
    id: number;
    name: string;
}

interface Post {
    id: number;
    category_id: number;
    sub_category_id: number | null;
    title: string;
    excerpt: string | null;
    content: string;
    status: 'draft' | 'published' | 'archived';
    is_featured: boolean;
    thumbnail: string | null;
    tags: { id: number }[];
}

interface FormProps {
    post?: Post;
    categories: Category[];
    subCategories: SubCategory[];
    tags: Tag[];
}

export default function PostForm({
    post,
    categories,
    subCategories,
    tags,
}: FormProps) {
    const isEdit = !!post;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Posts', href: dashboard.posts.index().url },
        { title: isEdit ? 'Edit Post' : 'Create Post', href: '#' },
    ];

    const {
        data,
        setData,
        post: postReq,
        put,
        processing,
        errors,
    } = useForm({
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
        tags: post?.tags.map((t) => t.id) || ([] as number[]),
    });

    const [filteredSubCategories, setFilteredSubCategories] = useState<
        SubCategory[]
    >([]);
    const [previewUrl, setPreviewUrl] = useState<string | null>(
        post?.thumbnail ? `/storage/${post.thumbnail}` : null,
    );

    useEffect(() => {
        if (data.category_id) {
            setFilteredSubCategories(
                subCategories.filter(
                    (sc) => sc.category_id === Number(data.category_id),
                ),
            );
        } else {
            setFilteredSubCategories([]);
        }
    }, [data.category_id, subCategories]);

    const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('thumbnail', file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleTagToggle = (tagId: number) => {
        const currentTags = [...data.tags];
        const index = currentTags.indexOf(tagId);
        if (index > -1) {
            currentTags.splice(index, 1);
        } else {
            currentTags.push(tagId);
        }
        setData('tags', currentTags);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Laravel doesn't support multipart/form-data with PUT/PATCH easily,
        // using _method: PUT with post() is a common Inertia workaround but Inertia handles it automatically with post() if you use useForm's data.
        if (isEdit && post) {
            router.post(dashboard.posts.update(post.id).url, {
                ...data,
                _method: 'PUT',
            });
        } else {
            postReq(dashboard.posts.store().url);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEdit ? 'Edit Post' : 'Create Post'} />

            <div className="mx-auto flex max-w-5xl flex-col gap-4 p-2 sm:p-4 md:p-6">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href={dashboard.posts.index().url}>
                            <ChevronLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                        {isEdit ? 'Edit Post' : 'Create New Post'}
                    </h2>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6"
                >
                    <div className="space-y-4 lg:col-span-2 lg:space-y-6">
                        <Card>
                            <CardHeader className="p-4 sm:p-6">
                                <CardTitle>Post Content</CardTitle>
                                <CardDescription>
                                    Write the main information for your post.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4 p-4 pt-0 sm:p-6 sm:pt-0">
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
                                    <Textarea
                                        id="content"
                                        value={data.content}
                                        onChange={(e) =>
                                            setData('content', e.target.value)
                                        }
                                        placeholder="Full story goes here..."
                                        rows={15}
                                        required
                                    />
                                    {errors.content && (
                                        <p className="text-sm text-red-500">
                                            {errors.content}
                                        </p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-4 lg:space-y-6">
                        <Card>
                            <CardHeader className="p-4 sm:p-6">
                                <CardTitle>Settings</CardTitle>
                                <CardDescription>
                                    Classification and Status
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4 p-4 pt-0 sm:p-6 sm:pt-0">
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
                                            {categories.map((cat) => (
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
                                            {filteredSubCategories.map((sc) => (
                                                <SelectItem
                                                    key={sc.id}
                                                    value={sc.id.toString()}
                                                >
                                                    {sc.name}
                                                </SelectItem>
                                            ))}
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
                            <CardHeader className="p-4 sm:p-6">
                                <CardTitle>Thumbnail</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 p-4 pt-0 sm:p-6 sm:pt-0">
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
                            <CardHeader className="p-4 sm:p-6">
                                <CardTitle>Tags</CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
                                <div className="grid max-h-[200px] grid-cols-2 gap-2 overflow-y-auto pr-2">
                                    {tags.map((tag) => (
                                        <div
                                            key={tag.id}
                                            className="flex items-center space-x-2"
                                        >
                                            <Checkbox
                                                id={`tag-${tag.id}`}
                                                checked={data.tags.includes(
                                                    tag.id,
                                                )}
                                                onCheckedChange={() =>
                                                    handleTagToggle(tag.id)
                                                }
                                            />
                                            <Label
                                                htmlFor={`tag-${tag.id}`}
                                                className="cursor-pointer text-sm font-normal"
                                            >
                                                {tag.name}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                                {errors.tags && (
                                    <p className="mt-2 text-sm text-red-500">
                                        {errors.tags}
                                    </p>
                                )}
                                {tags.length === 0 && (
                                    <p className="text-sm text-muted-foreground">
                                        No tags available.
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
