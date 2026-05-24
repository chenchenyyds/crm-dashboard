"use client";

import { Cross2Icon, DownloadIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";

import { statuses } from "../table-data/data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { Account } from "../table-data/schema";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

function exportToCSV(rows: Account[]) {
  const headers = ["Name", "Email", "Status", "Assigned To", "Created"];
  const csvRows = rows.map((row) => {
    const assigned = (row.assigned_to_user as { name?: string } | null)?.name ?? "";
    const created = row.createdAt ? new Date(row.createdAt).toISOString().slice(0, 10) : "";
    return [row.name, row.email, row.status, assigned, created]
      .map((v) => `"${String(v ?? "").replace(/"/g, '""')}"`)
      .join(",");
  });

  const BOM = "﻿";
  const csv = BOM + [headers.join(","), ...csvRows].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `accounts-export-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const handleExport = () => {
    const rows = table.getFilteredRowModel().rows.map((r) => r.original as unknown as Account);
    exportToCSV(rows);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter accounts ..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={handleExport} className="h-8">
          <DownloadIcon className="mr-1 h-4 w-4" />
          CSV
        </Button>
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
