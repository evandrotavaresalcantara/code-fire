"use client";

import {
    ColumnDef,
    ColumnFiltersState,
    getFilteredRowModel,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import React, { cloneElement, ReactElement, ReactNode, useState } from "react";
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    searchFor?: string,
    searchBar?: ReactNode;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    searchFor,
    searchBar,
}: DataTableProps<TData, TValue>) {

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 5,
    });

    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    );

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        state: {
            columnFilters,
            pagination
        },
    });

    const nomeColumn = searchFor ? table.getColumn(searchFor) : table.getColumn("nome");

    return (
        <div className="w-full">
            {searchBar && (
                <div className=" flex  w-full  justify-center gap-5 items-center">
                    {cloneElement(searchBar as ReactElement, {
                        filterValue: (nomeColumn?.getFilterValue() as string) ?? "",
                        setFilterValue: (value: string) => nomeColumn?.setFilterValue(value),
                    })}
                </div>
            )}
            <div className="rounded-md border w-full mt-6">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    );
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
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
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
                                    Sem resultados.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-between space-x-2 py-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">Exibir {pagination.pageSize} linhas</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuRadioGroup
                            value={pagination.pageSize.toString()}
                            onValueChange={(value) => setPagination({ ...pagination, pageSize: parseInt(value) })}
                        >
                            <DropdownMenuRadioItem value="5">5 linhas</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="10">10 linhas</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="15">15 linhas</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Anterior
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Próximo
                    </Button>
                </div>
            </div>
        </div>
    );
}
