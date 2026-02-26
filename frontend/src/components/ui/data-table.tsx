import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  type RowSelectionState,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Button } from "./button";
import { ArrowLeft, ArrowRight } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "./separator";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  loading: boolean;
  total: number;
  limit: number;
  page: number;
  onPagechange: (page: number) => void;
  onLimitChange: (page: number) => void;
  onSelectChange?: (rows: TData[]) => void;
  children?: React.ReactNode;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  total,
  limit,
  page,
  onPagechange,
  loading,
  onLimitChange,
  onSelectChange,
  children,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnFilters, rowSelection },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    enableColumnResizing: false,
    columnResizeMode: "onChange",
  });

  useEffect(() => {
    if (onSelectChange) {
      const selectedData = table
        .getSelectedRowModel()
        .rows.map((r) => r.original);

      onSelectChange(selectedData);
    }
  }, [rowSelection, onSelectChange, table]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="  border">
      {/** FILTERS COMPONENT */}
      {children}
      <Table className="table-fixed">
        <TableHeader className="bg-border">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    style={{ width: header.getSize() }}
                    className="border relative"
                  >
                    {header.isPlaceholder ? null : (
                      <>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {header.column.getCanResize() && (
                          <div
                            onMouseDown={header.getResizeHandler()}
                            onTouchStart={header.getResizeHandler()}
                            className="absolute right-0 top-0 h-full w-1 cursor-col-resize bg-border hover:bg-primary"
                          />
                        )}
                      </>
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center animate-pulse"
              >
                loading data...
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="border"
                    style={{ width: cell.column.getSize() }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Separator />
      <div className="  justify-end flex gap-2 items-center w-full p-4">
        <Select onValueChange={(value) => onLimitChange(Number(value))}>
          <SelectTrigger className="w-fit">
            <SelectValue placeholder="rows" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="3">3 rows</SelectItem>
              <SelectItem value="5">5 rows</SelectItem>
              <SelectItem value="10">10 rows</SelectItem>
              <SelectItem value="30">30 rows</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <span className="text-xs text-nowrap">
          page {page} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPagechange(page - 1)}
          disabled={page === 0}
        >
          <ArrowLeft />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPagechange(page + 1)}
          disabled={page >= totalPages}
        >
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
}
