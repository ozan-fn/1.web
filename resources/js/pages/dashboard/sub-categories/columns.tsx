import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Edit2, MoreHorizontal, Trash2 } from 'lucide-react';

export interface Category {
    id: number;
    name: string;
}

export interface SubCategory {
    id: number;
    category_id: number;
    name: string;
    description: string | null;
    order: number;
    is_show: boolean;
    category: Category;
}

export const columns = (
    onEdit: (subCategory: SubCategory) => void,
    onDelete: (subCategory: SubCategory) => void,
): ColumnDef<SubCategory>[] => [
    {
        id: 'no',
        header: 'No',
        cell: ({ row }) => row.index + 1,
    },
    {
        accessorKey: 'order',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Order
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: 'category.name',
        header: 'Category',
        cell: ({ row }) => (
            <div className="font-medium">{row.original.category?.name}</div>
        ),
    },
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="font-medium">{row.getValue('name')}</div>
        ),
    },
    {
        accessorKey: 'description',
        header: 'Description',
        cell: ({ row }) => (
            <div className="hidden text-muted-foreground italic md:block">
                {row.getValue('description') || '-'}
            </div>
        ),
    },
    {
        accessorKey: 'is_show',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const isShow = row.getValue('is_show') as boolean;
            return (
                <span
                    className={`rounded-full px-2 py-1 text-xs ${isShow ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}
                >
                    {isShow ? 'Visible' : 'Hidden'}
                </span>
            );
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const subCategory = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => onEdit(subCategory)}>
                            <Edit2 className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="text-red-500"
                            onClick={() => onDelete(subCategory)}
                        >
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
