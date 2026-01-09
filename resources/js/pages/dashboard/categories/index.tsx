import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import dashboard from '@/routes/dashboard';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { SortingState } from '@tanstack/react-table';
import { CheckCircle2, ChevronLeft, ChevronRight, Plus, Search } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { Category, columns } from './columns';
import { DataTable } from './data-table';

const breadcrumbs = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Categories', href: '/dashboard/categories' },
];

interface PaginationProps {
    data: Category[];
    prev_page_url: string | null;
    next_page_url: string | null;
    current_page: number;
    from: number;
    to: number;
    total: number;
}

export default function CategoryIndex({ categories, filters }: { categories: PaginationProps; filters: any }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [editData, setEditData] = useState<Category | null>(null);
    const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
    const [search, setSearch] = useState(filters.search || '');
    const { flash } = usePage<any>().props;

    const [sorting, setSorting] = useState<SortingState>(filters.field ? [{ id: filters.field, desc: filters.direction === 'desc' }] : []);

    // 1. Fungsi Pusat Sinkronisasi URL (Search, Sort, & Page)
    const syncURL = useCallback((newSearch: string, newSorting: SortingState) => {
        router.get(
            dashboard.categories.index().url,
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

    // 3. Form Handling (Create/Edit)
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
        order: 0,
        is_nav: true,
        is_homepage: false,
    });

    const onOpenModal = (category?: Category) => {
        if (category) {
            setEditData(category);
            setData({
                name: category.name,
                description: category.description || '',
                order: category.order,
                is_nav: category.is_nav,
                is_homepage: category.is_homepage,
            });
        } else {
            setEditData(null);
            reset();
        }
        setIsOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const url = editData ? dashboard.categories.update(editData.id).url : dashboard.categories.store().url;
        const method = editData ? patch : post;
        method(url, {
            onSuccess: () => {
                setIsOpen(false);
                reset();
            },
        });
    };

    // 4. Delete Handling
    const handleDelete = () => {
        if (categoryToDelete) {
            destroy(dashboard.categories.destroy(categoryToDelete.id).url, {
                onSuccess: () => {
                    setIsDeleteOpen(false);
                    setCategoryToDelete(null);
                },
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 p-4">
                {/* Status Messages */}
                {flash.success && (
                    <Alert className="border-green-500/50 bg-green-50 text-green-700">
                        <CheckCircle2 className="h-4 w-4" />
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription>{flash.success}</AlertDescription>
                    </Alert>
                )}

                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold tracking-tight">Manage Categories</h2>
                    <Button onClick={() => onOpenModal()}>
                        <Plus className="mr-2 h-4 w-4" /> Add Category
                    </Button>
                </div>

                {/* Filters */}
                <div className="relative max-w-sm">
                    <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search categories..." className="pl-8" value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>

                {/* Data Table */}
                <div className="space-y-4">
                    <DataTable
                        columns={columns(onOpenModal, (c) => {
                            setCategoryToDelete(c);
                            setIsDeleteOpen(true);
                        })}
                        data={categories.data}
                        sorting={sorting}
                        onSortingChange={(updater: any) => {
                            const next = typeof updater === 'function' ? updater(sorting) : updater;
                            setSorting(next);
                            syncURL(search, next);
                        }}
                    />

                    {/* Pagination Controls */}
                    <div className="flex items-center justify-between px-2">
                        <div className="text-sm text-muted-foreground">
                            Showing {categories.from} to {categories.to} of {categories.total} results
                        </div>
                        <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm" onClick={() => router.get(categories.prev_page_url || '')} disabled={!categories.prev_page_url}>
                                <ChevronLeft className="mr-1 h-4 w-4" /> Previous
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => router.get(categories.next_page_url || '')} disabled={!categories.next_page_url}>
                                Next <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Modal Create/Edit */}
                <Dialog open={isOpen} onOpenChange={(val) => !val && setIsOpen(false)}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{editData ? 'Edit' : 'Create'} Category</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                                {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea id="description" value={data.description} onChange={(e) => setData('description', e.target.value)} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="order">Order</Label>
                                    <Input id="order" type="number" value={data.order} onChange={(e) => setData('order', parseInt(e.target.value) || 0)} />
                                </div>
                                <div className="flex flex-col justify-end gap-3 pb-2">
                                    <div className="flex items-center gap-2">
                                        <Switch id="is_nav" checked={data.is_nav} onCheckedChange={(v) => setData('is_nav', v)} />
                                        <Label htmlFor="is_nav" className="text-xs">
                                            Navbar
                                        </Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Switch id="is_home" checked={data.is_homepage} onCheckedChange={(v) => setData('is_homepage', v)} />
                                        <Label htmlFor="is_home" className="text-xs">
                                            Home
                                        </Label>
                                    </div>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="button" variant="ghost" onClick={() => setIsOpen(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    {editData ? 'Update' : 'Save'}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>

                {/* Confirm Delete */}
                <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Delete Category?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Are you sure? This will permanently delete <strong>{categoryToDelete?.name}</strong>.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setCategoryToDelete(null)}>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                                Delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </AppLayout>
    );
}
