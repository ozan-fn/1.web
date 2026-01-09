import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import dashboard from '@/routes/dashboard';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { SortingState } from '@tanstack/react-table';
import { CheckCircle2, ChevronLeft, ChevronRight, Plus, Search } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { Post, columns } from './columns';
import { DataTable } from './data-table';

const breadcrumbs = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Posts', href: '/dashboard/posts' },
];

export default function PostIndex({
    posts,
    filters,
}: {
    posts: any; // Menerima object Paginator dari Laravel
    filters: { search?: string; field?: string; direction?: string };
}) {
    const { flash } = usePage<any>().props;
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [postToDelete, setPostToDelete] = useState<Post | null>(null);
    const [search, setSearch] = useState(filters.search || '');

    const [sorting, setSorting] = useState<SortingState>(filters.field ? [{ id: filters.field, desc: filters.direction === 'desc' }] : []);

    // 1. Fungsi Pusat Sinkronisasi URL (Search, Sort, & Page)
    const syncURL = useCallback((newSearch: string, newSorting: SortingState) => {
        router.get(
            dashboard.posts.index().url,
            {
                search: newSearch,
                field: newSorting[0]?.id,
                direction: newSorting[0]?.desc ? 'desc' : 'asc',
            },
            { preserveState: true, replace: true },
        );
    }, []);

    // 2. Efek Debounce Search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (search !== (filters.search || '')) syncURL(search, sorting);
        }, 300);
        return () => clearTimeout(timer);
    }, [search, syncURL]);

    // 3. Delete Handler
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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Posts" />
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 p-4 sm:p-6">
                {/* Flash Notifications */}
                {flash.success && (
                    <Alert className="border-green-500/50 bg-green-50 text-green-700">
                        <CheckCircle2 className="h-4 w-4" />
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription>{flash.success}</AlertDescription>
                    </Alert>
                )}

                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Manage Posts</h2>
                    <Button asChild>
                        <Link href={dashboard.posts.create().url}>
                            <Plus className="mr-2 h-4 w-4" /> Add Post
                        </Link>
                    </Button>
                </div>

                {/* Filter Area */}
                <div className="relative max-w-sm">
                    <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search title or excerpt..." className="bg-white pl-8 dark:bg-zinc-950" value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>

                {/* Table Section */}
                <div className="space-y-4">
                    <DataTable
                        columns={columns((p) => {
                            setPostToDelete(p);
                            setIsDeleteOpen(true);
                        })}
                        data={posts.data} // Mengambil array data dari paginator
                        sorting={sorting}
                        onSortingChange={(updater: any) => {
                            const next = typeof updater === 'function' ? updater(sorting) : updater;
                            setSorting(next);
                            syncURL(search, next);
                        }}
                    />

                    {/* Pagination Controls */}
                    <div className="flex items-center justify-between px-2 py-4">
                        <div className="text-sm text-muted-foreground">
                            Showing {posts.from} to {posts.to} of {posts.total} posts
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" onClick={() => router.get(posts.prev_page_url)} disabled={!posts.prev_page_url}>
                                <ChevronLeft className="mr-1 h-4 w-4" /> Previous
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => router.get(posts.next_page_url)} disabled={!posts.next_page_url}>
                                Next <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Delete Confirmation */}
                <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Delete Post?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Are you sure? This will permanently delete <strong>{postToDelete?.title || 'this post'}</strong> and all its associated images.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setPostToDelete(null)}>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
                                Delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </AppLayout>
    );
}
