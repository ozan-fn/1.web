import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Edit2, MoreHorizontal, Trash2 } from 'lucide-react';

export interface Tag {
    id: number;
    name: string;
    description: string | null;
    created_at: string;
}

const SortableHeader = ({ column, title }: any) => (
    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        {title} <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
);

export const columns = (onEdit: (tag: Tag) => void, onDelete: (tag: Tag) => void): ColumnDef<Tag>[] => [
    { id: 'no', header: 'No', cell: ({ row }) => row.index + 1 },
    { accessorKey: 'name', header: (p) => <SortableHeader {...p} title="Name" />, cell: ({ row }) => <div className="font-medium">{row.original.name}</div> },
    { accessorKey: 'description', header: 'Description', cell: ({ row }) => <div className="hidden text-muted-foreground italic md:block">{row.original.description || '-'}</div> },
    { accessorKey: 'created_at', header: (p) => <SortableHeader {...p} title="Created At" />, cell: ({ row }) => <div>{new Date(row.original.created_at).toLocaleDateString()}</div> },
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
