import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import dashboard from '@/routes/dashboard';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Edit2, Eye, MoreHorizontal, Trash2 } from 'lucide-react';

export interface Post {
    id: number;
    title: string;
    slug: string;
    thumbnail: string | null;
    status: 'draft' | 'published' | 'archived';
    is_featured: boolean;
    views: number;
    created_at: string;
    category: { name: string };
    user: { name: string };
}

export const columns = (onDelete: (post: Post) => void): ColumnDef<Post>[] => [
    {
        id: 'no',
        header: 'No',
        cell: ({ row }) => row.index + 1,
    },
    {
        accessorKey: 'thumbnail',
        header: 'Thumbnail',
        cell: ({ row }) => {
            const thumbnail = row.getValue('thumbnail') as string;
            return thumbnail ? (
                <img
                    src={`/storage/${thumbnail}`}
                    alt="Thumbnail"
                    className="h-10 w-16 rounded object-cover"
                />
            ) : (
                <div className="flex h-10 w-16 items-center justify-center rounded bg-muted text-[10px] text-muted-foreground">
                    No image
                </div>
            );
        },
    },
    {
        accessorKey: 'title',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }
            >
                Title
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div
                className="max-w-[300px] truncate font-medium"
                title={row.getValue('title')}
            >
                {row.getValue('title')}
            </div>
        ),
    },
    {
        accessorKey: 'category.name',
        header: 'Category',
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const status = row.getValue('status') as string;
            const colors = {
                draft: 'bg-yellow-100 text-yellow-700',
                published: 'bg-green-100 text-green-700',
                archived: 'bg-gray-100 text-gray-700',
            };
            return (
                <span
                    className={`rounded-full px-2 py-1 text-xs capitalize ${colors[status as keyof typeof colors]}`}
                >
                    {status}
                </span>
            );
        },
    },
    {
        accessorKey: 'views',
        header: 'Views',
        cell: ({ row }) => (
            <div className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {row.getValue('views')}
            </div>
        ),
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const post = row.original;

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
                        <DropdownMenuItem asChild>
                            <Link href={dashboard.posts.edit(post.id).url}>
                                <Edit2 className="mr-2 h-4 w-4" /> Edit
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="text-red-500"
                            onClick={() => onDelete(post)}
                        >
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
