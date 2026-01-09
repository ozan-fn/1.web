import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import dashboard from '@/routes/dashboard';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { SortingState } from '@tanstack/react-table';
import { CheckCircle2, ChevronLeft, ChevronRight, Plus, Search } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { Tag, columns } from './columns';
import { DataTable } from './data-table';

export default function TagIndex({ tags, filters }: any) {
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [editData, setEditData] = useState<Tag | null>(null);
    const [targetDelete, setTargetDelete] = useState<Tag | null>(null);
    const [search, setSearch] = useState(filters.search || '');
    const { flash } = usePage<any>().props;

    const [sorting, setSorting] = useState<SortingState>(filters.field ? [{ id: filters.field, desc: filters.direction === 'desc' }] : []);

    const syncURL = useCallback((s: string, sort: SortingState) => {
        router.get(
            dashboard.tags.index().url,
            {
                search: s,
                field: sort[0]?.id,
                direction: sort[0]?.desc ? 'desc' : 'asc',
            },
            { preserveState: true, replace: true },
        );
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (search !== (filters.search || '')) syncURL(search, sorting);
        }, 300);
        return () => clearTimeout(timer);
    }, [search, syncURL]);

    const {
        data,
        setData,
        post,
        patch,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        name: '',
        description: '',
    });

    const onOpenModal = (tag?: Tag) => {
        if (tag) {
            setEditData(tag);
            setData({ name: tag.name, description: tag.description || '' });
        } else {
            setEditData(null);
            reset();
        }
        setIsOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const action = editData ? patch(dashboard.tags.update(editData.id).url) : post(dashboard.tags.store().url);
        action.onSuccess = () => {
            setIsOpen(false);
            reset();
        };
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Tags', href: '#' }]}>
            <Head title="Tags" />
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 p-4">
                {flash.success && (
                    <Alert className="border-green-500 bg-green-50 text-green-700">
                        <CheckCircle2 className="h-4 w-4" />
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription>{flash.success}</AlertDescription>
                    </Alert>
                )}

                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold tracking-tight">Manage Tags</h2>
                    <Button onClick={() => onOpenModal()}>
                        <Plus className="mr-2 h-4 w-4" /> Add Tag
                    </Button>
                </div>

                <div className="relative max-w-sm">
                    <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search tags..." className="pl-8" value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>

                <div className="space-y-4">
                    <DataTable
                        columns={columns(onOpenModal, (t) => {
                            setTargetDelete(t);
                            setIsDeleteOpen(true);
                        })}
                        data={tags.data}
                        sorting={sorting}
                        onSortingChange={(u: any) => {
                            const next = typeof u === 'function' ? u(sorting) : u;
                            setSorting(next);
                            syncURL(search, next);
                        }}
                    />

                    {/* Pagination Controls */}
                    <div className="flex items-center justify-between px-2">
                        <p className="text-sm text-muted-foreground">
                            Showing {tags.from} to {tags.to} of {tags.total}
                        </p>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => router.get(tags.prev_page_url!)} disabled={!tags.prev_page_url}>
                                <ChevronLeft className="mr-1 h-4 w-4" /> Prev
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => router.get(tags.next_page_url!)} disabled={!tags.next_page_url}>
                                Next <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Form Dialog */}
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{editData ? 'Edit' : 'Create'} Tag</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="grid gap-4 py-2">
                            <div className="grid gap-2">
                                <Label>Tag Name</Label>
                                <Input value={data.name} onChange={(e) => setData('name', e.target.value)} />
                                {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label>Description</Label>
                                <Textarea value={data.description} onChange={(e) => setData('description', e.target.value)} />
                            </div>
                            <DialogFooter>
                                <Button type="submit" disabled={processing}>
                                    {editData ? 'Update' : 'Save'}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>

                {/* Delete Dialog */}
                <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Delete Tag?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Permanently delete <strong>{targetDelete?.name}</strong>?
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={() => targetDelete && destroy(dashboard.tags.destroy(targetDelete.id).url, { onSuccess: () => setIsDeleteOpen(false) })}>
                                Delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </AppLayout>
    );
}
