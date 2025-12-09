"use client"

import {
    type ColumnDef,
    type RowSelectionState,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import type { PaginationData } from "@/types/types"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    pagination?: PaginationData
    onPageChange?: (page: number) => void
    rowSelection?: RowSelectionState
    setRowSelection?: React.Dispatch<React.SetStateAction<RowSelectionState>>
}

const DataTable = <TData, TValue>({
    columns,
    data,
    pagination,
    onPageChange,
    rowSelection,
    setRowSelection,
}: DataTableProps<TData, TValue>) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        onRowSelectionChange: setRowSelection,
        state: {
            rowSelection,
        },
        enableRowSelection: true,
    })

    return (
        <div className="space-y-4">
            <div className="rounded-md border border-gray-200 bg-white shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="bg-gray-50 hover:bg-gray-50 border-b border-gray-200">
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className="h-10 px-4 text-xs font-semibold uppercase tracking-wider text-gray-500 [&:has([role=checkbox])]:pr-0">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className="border-b border-gray-100 hover:bg-gray-50/50 data-[state=selected]:bg-gray-50 transition-colors"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="p-3 align-middle text-sm text-gray-700 [&:has([role=checkbox])]:pr-0">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center text-sm text-gray-500">
                                    No results found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {pagination && onPageChange && (
                <div className="flex items-center justify-between px-2">
                    <div className="text-sm text-muted-foreground">
                        Showing {(pagination.page - 1) * 10 + 1} to {Math.min(pagination.page * 10, pagination.totalPages * 10)} of {pagination.totalPages * 10} results
                    </div>
                    <Pagination className="justify-end w-auto mx-0">
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        if (pagination.page > 1) onPageChange(pagination.page - 1)
                                    }}
                                    aria-disabled={pagination.page <= 1}
                                    className={pagination.page <= 1 ? "pointer-events-none opacity-50" : "hover:bg-gray-100 bg-white border border-gray-200"}
                                />
                            </PaginationItem>



                            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).slice(0, 7).map((page) => (
                                <PaginationItem key={page}>
                                    <PaginationLink
                                        href="#"
                                        isActive={page === pagination.page}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            onPageChange(page)
                                        }}
                                        className={page === pagination.page ? "bg-black text-white hover:bg-black/90 hover:text-white" : "hover:bg-gray-100 bg-white border border-gray-200"}
                                    >
                                        {page}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            {pagination.totalPages > 7 && (
                                <PaginationItem>
                                    <span className="flex h-9 w-9 items-center justify-center text-gray-400">...</span>
                                </PaginationItem>
                            )}

                            <PaginationItem>
                                <PaginationNext
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        if (pagination.page < pagination.totalPages) onPageChange(pagination.page + 1)
                                    }}
                                    aria-disabled={pagination.page >= pagination.totalPages}
                                    className={pagination.page >= pagination.totalPages ? "pointer-events-none opacity-50" : "hover:bg-gray-100 bg-white border border-gray-200"}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </div>
    )
}
export default DataTable
