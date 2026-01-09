import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import dashboard from '@/routes/dashboard';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { SortingState } from '@tanstack/react-table';
import { CheckCircle2, ChevronLeft, ChevronRight, Plus, Search } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { columns, SubCategory } from './columns';
import { DataTable } from './data-table';

export default function SubCategoryIndex({ subCategories, categories, filters }: any) {
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [editData, setEditData] = useState<SubCategory | null>(null);
    const [targetDelete, setTargetDelete] = useState<SubCategory | null>(null);
    const [search, setSearch] = useState(filters.search || '');
    const { flash } = usePage<any>().props;

    const [sorting, setSorting] = useState<SortingState>(filters.field ? [{ id: filters.field, desc: filters.direction === 'desc' }] : []);

    const syncURL = useCallback((s: string, sort: SortingState) => {
        router.get(
            dashboard.subCategories.index().url,
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
        category_id: '',
        name: '',
        description: '',
        order: 0,
        is_nav: true,
    });

    const onOpenModal = (item?: SubCategory) => {
        if (item) {
            setEditData(item);
            setData({ category_id: item.category_id.toString(), name: item.name, description: item.description || '', order: item.order, is_nav: item.is_nav });
        } else {
            setEditData(null);
            reset();
        }
        setIsOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const action = editData ? patch(dashboard.subCategories.update(editData.id).url) : post(dashboard.subCategories.store().url);
        action.onSuccess = () => {
            setIsOpen(false);
            reset();
        };
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Sub Categories', href: '#' }]}>
            <Head title="Sub Categories" />
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 p-4">
                {flash.success && (
                    <Alert className="border-green-500 bg-green-50 text-green-700">
                        <CheckCircle2 className="h-4 w-4" />
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription>{flash.success}</AlertDescription>
                    </Alert>
                )}

                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold tracking-tight">Manage Sub Categories</h2>
                    <Button onClick={() => onOpenModal()}>
                        <Plus className="mr-2 h-4 w-4" /> Add Sub Category
                    </Button>
                </div>

                <div className="relative max-w-sm">
                    <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search..." className="pl-8" value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>

                <DataTable
                    columns={columns(onOpenModal, (c) => {
                        setTargetDelete(c);
                        setIsDeleteOpen(true);
                    })}
                    data={subCategories.data}
                    sorting={sorting}
                    onSortingChange={(u: any) => {
                        const next = typeof u === 'function' ? u(sorting) : u;
                        setSorting(next);
                        syncURL(search, next);
                    }}
                />

                {/* Server-side Pagination UI */}
                <div className="flex items-center justify-between px-2">
                    <div className="text-sm text-muted-foreground">
                        Showing {subCategories.from} to {subCategories.to} of {subCategories.total}
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => router.get(subCategories.prev_page_url!)} disabled={!subCategories.prev_page_url}>
                            <ChevronLeft className="mr-1 h-4 w-4" /> Prev
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => router.get(subCategories.next_page_url!)} disabled={!subCategories.next_page_url}>
                            Next <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{editData ? 'Edit' : 'Create'} Sub Category</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="grid gap-4 py-2">
                            <div className="grid gap-2">
                                <Label>Parent Category</Label>
                                <Select value={data.category_id} onValueChange={(v) => setData('category_id', v)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Parent" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((c: any) => (
                                            <SelectItem key={c.id} value={c.id.toString()}>
                                                {c.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.category_id && <p className="text-xs text-red-500">{errors.category_id}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label>Name</Label>
                                <Input value={data.name} onChange={(e) => setData('name', e.target.value)} />
                                {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label>Description</Label>
                                <Textarea value={data.description} onChange={(e) => setData('description', e.target.value)} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label>Order</Label>
                                    <Input type="number" value={data.order} onChange={(e) => setData('order', parseInt(e.target.value) || 0)} />
                                </div>
                                <div className="flex items-center gap-2 pt-6">
                                    <Switch checked={data.is_nav} onCheckedChange={(v) => setData('is_nav', v)} />
                                    <Label>Navbar</Label>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" disabled={processing}>
                                    {editData ? 'Update' : 'Save'}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>

                <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Delete Sub Category?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Permanently delete <strong>{targetDelete?.name}</strong>?
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className="bg-red-600" onClick={() => targetDelete && destroy(dashboard.subCategories.destroy(targetDelete.id).url, { onSuccess: () => setIsDeleteOpen(false) })}>
                                Delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </AppLayout>
    );
}
