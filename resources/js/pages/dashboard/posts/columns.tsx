import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import dashboard from '@/routes/dashboard';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Copy, Edit2, Eye, Image as ImageIcon, MoreHorizontal, Trash2 } from 'lucide-react';

export interface Post {
    id: number;
    title: string | null;
    slug: string | null;
    thumbnail_url: string | null;
    status: 'draft' | 'published' | 'archived';
    views: number;
    category: { name: string; slug: string } | null;
    sub_category: { name: string; slug: string } | null;
    user: { name: string };
}

// Helper Header Sortable agar konsisten dengan modul lain
const SortableHeader = ({ column, title }: any) => (
    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} className="-ml-4">
        {title} <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
);

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
            const url = row.original.thumbnail_url;
            return url ? (
                <img src={url} alt="Thumb" className="h-10 w-16 rounded border object-cover" />
            ) : (
                <div className="flex h-10 w-16 items-center justify-center rounded bg-muted">
                    <ImageIcon className="h-4 w-4 text-muted-foreground/50" />
                </div>
            );
        },
    },
    {
        accessorKey: 'title',
        header: (p) => <SortableHeader {...p} title="Title" />,
        cell: ({ row }) => (
            <div className="max-w-[300px] truncate font-medium" title={row.original.title ?? ''}>
                {row.original.title || 'Untitled'}
            </div>
        ),
    },
    {
        accessorKey: 'category.name',
        header: 'Category',
        cell: ({ row }) => <span className="text-muted-foreground">{row.original.category?.name || '-'}</span>,
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const status = row.original.status;
            const variants = {
                draft: 'bg-slate-100 text-slate-700 border-slate-200',
                published: 'bg-emerald-100 text-emerald-700 border-emerald-200',
                archived: 'bg-orange-100 text-orange-700 border-orange-200',
            };
            return <span className={`rounded-full border px-2 py-0.5 text-[11px] font-medium capitalize ${variants[status]}`}>{status}</span>;
        },
    },
    {
        accessorKey: 'views',
        header: (p) => <SortableHeader {...p} title="Views" />,
        cell: ({ row }) => (
            <div className="flex items-center gap-1.5 text-muted-foreground">
                <Eye className="h-3.5 w-3.5" />
                <span className="text-xs">{row.original.views.toLocaleString()}</span>
            </div>
        ),
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const handleCopyLink = () => {
                const post = row.original;
                let url = '';
                if (post.category && post.slug) {
                    url = post.sub_category
                        ? `/${post.category.slug}/${post.sub_category.slug}/${post.slug}`
                        : `/${post.category.slug}/${post.slug}`;
                }
                if (url) {
                    navigator.clipboard.writeText(window.location.origin + url);
                }
            };
            return (
                <div className="text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={handleCopyLink}>
                                <Copy className="mr-2 h-4 w-4" /> Copy Link
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href={dashboard.posts.edit(row.original.id).url}>
                                    <Edit2 className="mr-2 h-4 w-4" /> Edit Post
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => onDelete(row.original)}>
                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            );
        },
    },
];
