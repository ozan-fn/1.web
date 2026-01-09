import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';

export function DataTable<TData, TValue>({
    columns,
    data,
    sorting,
    onSortingChange,
}: any) {
    const table = useReactTable({
        data,
        columns,
        onSortingChange,
        manualSorting: true,
        state: { sorting },
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="space-y-4">
            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((hg) => (
                            <TableRow key={hg.id}>
                                {hg.headers.map((h) => (
                                    <TableHead key={h.id}>
                                        {h.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  h.column.columnDef.header,
                                                  h.getContext(),
                                              )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((c) => (
                                        <TableCell key={c.id}>
                                            {flexRender(
                                                c.column.columnDef.cell,
                                                c.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
