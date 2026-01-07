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
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
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
import { Head, router, useForm } from '@inertiajs/react';
import { SortingState } from '@tanstack/react-table';
import { Plus, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Category, columns, SubCategory } from './columns';
import { DataTable } from './data-table';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Sub Categories', href: '/dashboard/sub-categories' },
];

export default function SubCategoryIndex({
    subCategories,
    categories,
    filters,
}: {
    subCategories: SubCategory[];
    categories: Category[];
    filters: { search?: string; field?: string; direction?: string };
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [editData, setEditData] = useState<SubCategory | null>(null);
    const [subCategoryToDelete, setSubCategoryToDelete] =
        useState<SubCategory | null>(null);
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
                    dashboard.subCategories.index().url,
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
            dashboard.subCategories.index().url,
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
        is_show: true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editData) {
            patch(dashboard.subCategories.update(editData.id).url, {
                onSuccess: () => closeModal(),
            });
        } else {
            post(dashboard.subCategories.store().url, {
                onSuccess: () => closeModal(),
            });
        }
    };

    const openEdit = (subCategory: SubCategory) => {
        setEditData(subCategory);
        setData({
            category_id: subCategory.category_id.toString(),
            name: subCategory.name,
            description: subCategory.description || '',
            order: subCategory.order,
            is_show: subCategory.is_show,
        });
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setEditData(null);
        reset();
    };

    const openDelete = (subCategory: SubCategory) => {
        setSubCategoryToDelete(subCategory);
        setIsDeleteOpen(true);
    };

    const confirmDelete = () => {
        if (subCategoryToDelete) {
            destroy(
                dashboard.subCategories.destroy(subCategoryToDelete.id).url,
                {
                    onSuccess: () => {
                        setIsDeleteOpen(false);
                        setSubCategoryToDelete(null);
                    },
                },
            );
        }
    };

    const tableColumns = columns(openEdit, openDelete);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Sub Categories" />
            <div className="flex flex-col gap-4 p-4 sm:p-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold tracking-tight">
                        Manage Sub Categories
                    </h2>
                    <Dialog
                        open={isOpen}
                        onOpenChange={(val) => !val && closeModal()}
                    >
                        <DialogTrigger asChild>
                            <Button onClick={() => setIsOpen(true)}>
                                <Plus className="mr-2 h-4 w-4" /> Add Sub
                                Category
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>
                                    {editData ? 'Edit' : 'Create'} Sub Category
                                </DialogTitle>
                            </DialogHeader>
                            <form
                                onSubmit={handleSubmit}
                                className="grid gap-4 py-4"
                            >
                                <div className="grid gap-2">
                                    <Label htmlFor="category_id">
                                        Parent Category
                                    </Label>
                                    <Select
                                        value={data.category_id}
                                        onValueChange={(val) =>
                                            setData('category_id', val)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a category" />
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
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData('name', e.target.value)
                                        }
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-red-500">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="description">
                                        Description (Optional)
                                    </Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                'description',
                                                e.target.value,
                                            )
                                        }
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="order">
                                            Display Order
                                        </Label>
                                        <Input
                                            id="order"
                                            type="number"
                                            value={data.order}
                                            onChange={(e) =>
                                                setData(
                                                    'order',
                                                    parseInt(e.target.value) ||
                                                        0,
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="flex flex-col justify-end gap-2 pb-2">
                                        <div className="flex items-center space-x-2">
                                            <Switch
                                                id="is_show"
                                                checked={data.is_show}
                                                onCheckedChange={(val) =>
                                                    setData('is_show', val)
                                                }
                                            />
                                            <Label htmlFor="is_show">
                                                Visible
                                            </Label>
                                        </div>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="submit" disabled={processing}>
                                        {editData ? 'Update' : 'Save'} Sub
                                        Category
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="flex items-center gap-2">
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search sub categories..."
                            className="pl-8"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <DataTable
                    columns={tableColumns}
                    data={subCategories}
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
                                permanently delete the sub category{' '}
                                <strong>{subCategoryToDelete?.name}</strong>.
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
