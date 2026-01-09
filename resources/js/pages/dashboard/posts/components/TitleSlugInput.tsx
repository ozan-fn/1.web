import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface TitleSlugInputProps {
    title: string;
    slug: string;
    onTitleChange: (value: string) => void;
    onSlugChange: (value: string) => void;
    isEdit: boolean;
    errors?: { title?: string; slug?: string };
}

export function TitleSlugInput({
    title,
    slug,
    onTitleChange,
    onSlugChange,
    isEdit,
    errors,
}: TitleSlugInputProps) {
    return (
        <>
            <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                    id="title"
                    value={title}
                    onChange={(e) => onTitleChange(e.target.value)}
                    placeholder="Enter post title"
                    required
                />
                {errors?.title && (
                    <p className="text-sm text-red-500">{errors.title}</p>
                )}
            </div>

            <div className="grid gap-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                    id="slug"
                    value={slug}
                    onChange={(e) => onSlugChange(e.target.value)}
                    placeholder="post-slug"
                    disabled={isEdit}
                />
                {errors?.slug && (
                    <p className="text-sm text-red-500">{errors.slug}</p>
                )}
            </div>
        </>
    );
}
