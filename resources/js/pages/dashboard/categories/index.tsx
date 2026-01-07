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
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import dashboard from '@/routes/dashboard';
import { BreadcrumbItem } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { SortingState } from '@tanstack/react-table';
import { AlertCircle, CheckCircle2, Plus, Search } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Category, columns } from './columns';
import { DataTable } from './data-table';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Categories', href: '/dashboard/categories' },
];

export default function CategoryIndex({
    categories,
    filters,
}: {
    categories: Category[];
    filters: {
        search?: string;
        field?: string;
        direction?: string;
    };
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [editData, setEditData] = useState<Category | null>(null);
    const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
        null,
    );
    const [search, setSearch] = useState(filters.search || '');
    const { flash } = usePage<{ flash: { success?: string; error?: string } }>()
        .props;

    const [sorting, setSorting] = useState<SortingState>(
        filters.field
            ? [{ id: filters.field, desc: filters.direction === 'desc' }]
            : [],
    );

    useEffect(() => {
        const timer = setTimeout(() => {
            if (search !== (filters.search || '')) {
                router.get(
                    dashboard.categories.index().url,
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
            dashboard.categories.index().url,
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
        name: '',
        description: '',
        order: 0,
        is_nav: true,
        is_homepage: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editData) {
            patch(dashboard.categories.update(editData.id).url, {
                onSuccess: () => closeModal(),
            });
        } else {
            post(dashboard.categories.store().url, {
                onSuccess: () => closeModal(),
            });
        }
    };

    const openEdit = (category: Category) => {
        setEditData(category);
        setData({
            name: category.name,
            description: category.description || '',
            order: category.order,
            is_nav: category.is_nav,
            is_homepage: category.is_homepage,
        });
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setEditData(null);
        reset();
    };

    const openDelete = (category: Category) => {
        setCategoryToDelete(category);
        setIsDeleteOpen(true);
    };

    const confirmDelete = () => {
        if (categoryToDelete) {
            destroy(dashboard.categories.destroy(categoryToDelete.id).url, {
                onSuccess: () => {
                    setIsDeleteOpen(false);
                    setCategoryToDelete(null);
                },
            });
        }
    };

    const tableColumns = columns(openEdit, openDelete);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 p-2 sm:p-4 md:p-6">
                {flash.success && (
                    <Alert
                        variant="default"
                        className="border-green-500/50 bg-green-50 text-green-700 dark:bg-green-950/20 dark:text-green-400"
                    >
                        <CheckCircle2 className="h-4 w-4" />
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription>{flash.success}</AlertDescription>
                    </Alert>
                )}

                {flash.error && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{flash.error}</AlertDescription>
                    </Alert>
                )}

                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold tracking-tight">
                        Manage Categories
                    </h2>
                    <Dialog
                        open={isOpen}
                        onOpenChange={(val) => !val && closeModal()}
                    >
                        <DialogTrigger asChild>
                            <Button onClick={() => setIsOpen(true)}>
                                <Plus className="mr-2 h-4 w-4" /> Add Category
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>
                                    {editData ? 'Edit' : 'Create'} Category
                                </DialogTitle>
                            </DialogHeader>
                            <form
                                onSubmit={handleSubmit}
                                className="grid gap-4 py-4"
                            >
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
                                                id="is_nav"
                                                checked={data.is_nav}
                                                onCheckedChange={(val) =>
                                                    setData('is_nav', val)
                                                }
                                            />
                                            <Label htmlFor="is_nav">
                                                In Navbar
                                            </Label>
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-end gap-2 pb-2">
                                        <div className="flex items-center space-x-2">
                                            <Switch
                                                id="is_homepage"
                                                checked={data.is_homepage}
                                                onCheckedChange={(val) =>
                                                    setData('is_homepage', val)
                                                }
                                            />
                                            <Label htmlFor="is_homepage">
                                                In Home
                                            </Label>
                                        </div>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="submit" disabled={processing}>
                                        {editData ? 'Update' : 'Save'} Category
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
                            placeholder="Search categories..."
                            className="pl-8"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <DataTable
                    columns={tableColumns}
                    data={categories}
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
                                permanently delete the category{' '}
                                <strong>{categoryToDelete?.name}</strong>.
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
