import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
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
import { Transaction, transactionTypes, useStore } from "@/lib/store";

export function TransactionsTable() {
  const { transactions, balances, goals } = useStore();

  const columns = [
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) => {
        return new Date(row.getValue("createdAt")).toLocaleDateString();
      },
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => {
        const amount = row.getValue<number>("amount");
        return amount?.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        });
      },
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => {
        const type = row.getValue<Transaction["type"]>("type");
        return transactionTypes.find((t) => t.key === type)?.value ?? "-";
      },
    },
    {
      accessorKey: "balanceId",
      header: "Balance",
      cell: ({ row }) => {
        const balanceId = row.getValue("balanceId");
        const balance = balances.find((b) => b.id === balanceId);
        return balance?.name ?? "-";
      },
    },
    {
      accessorKey: "balanceToId",
      header: "Balance To",
      cell: ({ row }) => {
        const balanceId = row.getValue("balanceToId");
        const balance = balances.find((b) => b.id === balanceId);
        return balance?.name ?? "-";
      },
    },
    {
      accessorKey: "goalId",
      header: "Goal",
      cell: ({ row }) => {
        const goalId = row.getValue("goalId");
        const goal = goals.find((g) => g.id === goalId);
        return goal?.name ?? "-";
      },
    },
  ] as ColumnDef<Transaction>[];

  const table = useReactTable({
    data: transactions,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id} className="border-b">
            {headerGroup.headers.map((header) => (
              <TableHead
                key={header.id}
                className="px-4 py-2 text-left cursor-pointer select-none"
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id} className="hover:bg-gray-100">
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id} className="px-4 py-2 border-t">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
