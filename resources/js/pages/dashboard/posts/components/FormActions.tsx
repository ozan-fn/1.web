import { Button } from '@/components/ui/button';
import dashboard from '@/routes/dashboard';
import { Link } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';

interface FormActionsProps {
    isEdit: boolean;
    processing: boolean;
}

export function FormActions({ isEdit, processing }: FormActionsProps) {
    return (
        <div className="flex gap-2">
            <Button type="submit" disabled={processing} className="flex-1">
                {processing && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isEdit ? 'Update Post' : 'Save Post'}
            </Button>
            <Button type="button" variant="outline" asChild>
                <Link href={dashboard.posts.index().url}>Cancel</Link>
            </Button>
        </div>
    );
}
