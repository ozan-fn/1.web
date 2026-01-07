import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import dashboard from '@/routes/dashboard';
import { BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { SortingState } from '@tanstack/react-table';
import { Plus, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Post, columns } from './columns';
import { DataTable } from './data-table';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Posts', href: '/dashboard/posts' },
];

export default function PostIndex({
    posts,
    filters,
}: {
    posts: Post[];
    filters: { search?: string; field?: string; direction?: string };
}) {
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [postToDelete, setPostToDelete] = useState<Post | null>(null);
    const [search, setSearch] = useState(filters.search || '');

    const [sorting, setSorting] = useState<SortingState>(
        filters.field
            ? [{ id: filters.field, desc: filters.direction === 'desc' }]
            : [],
    );

    useEffect(() => {
        const timer = setTimeout(() => {
            if (search !== (filters.search || '')) {
                router.get(
                    dashboard.posts.index().url,
                    {
                        search,
                        field: sorting[0]?.id,
                        direction: sorting[0]
                            ? sorting[0].desc
                                ? 'desc'
                                : 'asc'
                            : undefined,
                    },
                    { preserveState: true, replace: true },
                );
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [search]);

    const handleSortingChange = (updaterOrValue: any) => {
        const nextSorting =
            typeof updaterOrValue === 'function'
                ? updaterOrValue(sorting)
                : updaterOrValue;

        setSorting(nextSorting);

        router.get(
            dashboard.posts.index().url,
            {
                search,
                field: nextSorting[0]?.id,
                direction: nextSorting[0]
                    ? nextSorting[0].desc
                        ? 'desc'
                        : 'asc'
                    : undefined,
            },
            { preserveState: true, replace: true },
        );
    };

    const openDelete = (post: Post) => {
        setPostToDelete(post);
        setIsDeleteOpen(true);
    };

    const confirmDelete = () => {
        if (postToDelete) {
            router.delete(dashboard.posts.destroy(postToDelete.id).url, {
                onSuccess: () => {
                    setIsDeleteOpen(false);
                    setPostToDelete(null);
                },
            });
        }
    };

    const tableColumns = columns(openDelete);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Posts" />
            <div className="flex flex-col gap-4 p-4 sm:p-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold tracking-tight">
                        Manage Posts
                    </h2>
                    <Button asChild>
                        <Link href={dashboard.posts.create().url}>
                            <Plus className="mr-2 h-4 w-4" /> Add Post
                        </Link>
                    </Button>
                </div>

                <div className="flex items-center gap-2">
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search posts..."
                            className="pl-8"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <DataTable
                    columns={tableColumns}
                    data={posts}
                    sorting={sorting}
                    onSortingChange={handleSortingChange}
                />

                <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete the post{' '}
                                <strong>{postToDelete?.title}</strong>.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={confirmDelete}
                                className="bg-red-600 hover:bg-red-700 hover:text-white"
                            >
                                Delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </AppLayout>
    );
}
