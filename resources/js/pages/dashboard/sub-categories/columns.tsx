import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
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
    is_nav: boolean;
    category: Category;
}

const SortableHeader = ({ column, title }: any) => (
    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        {title} <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
);

export const columns = (onEdit: (s: SubCategory) => void, onDelete: (s: SubCategory) => void): ColumnDef<SubCategory>[] => [
    { id: 'no', header: 'No', cell: ({ row }) => row.index + 1 },
    { accessorKey: 'order', header: (p) => <SortableHeader {...p} title="Order" /> },
    { accessorKey: 'category.name', header: 'Parent Category', cell: ({ row }) => <div className="font-semibold text-blue-600">{row.original.category?.name}</div> },
    { accessorKey: 'name', header: (p) => <SortableHeader {...p} title="Name" />, cell: ({ row }) => <div className="font-medium">{row.original.name}</div> },
    { accessorKey: 'description', header: 'Description', cell: ({ row }) => <div className="hidden text-muted-foreground italic md:block">{row.original.description || '-'}</div> },
    { accessorKey: 'is_nav', header: 'In Nav', cell: ({ row }) => <span className={`rounded-full px-2 py-1 text-xs ${row.original.is_nav ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>{row.original.is_nav ? 'Visible' : 'Hidden'}</span> },
    {
        id: 'actions',
        cell: ({ row }) => (
            <div className="text-right">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => onEdit(row.original)}>
                            <Edit2 className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-500" onClick={() => onDelete(row.original)}>
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        ),
    },
];
