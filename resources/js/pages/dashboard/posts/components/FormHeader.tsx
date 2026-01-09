import { Button } from '@/components/ui/button';
import dashboard from '@/routes/dashboard';
import { Link } from '@inertiajs/react';
import { ChevronLeft } from 'lucide-react';

interface FormHeaderProps {
    isEdit: boolean;
}

export function FormHeader({ isEdit }: FormHeaderProps) {
    return (
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild className="-ml-2">
                <Link href={dashboard.posts.index().url}>
                    <ChevronLeft className="h-5 w-5" />
                </Link>
            </Button>
            <h1 className="text-2xl font-semibold tracking-tight">
                {isEdit ? 'Edit Post' : 'Create New Post'}
            </h1>
        </div>
    );
}
