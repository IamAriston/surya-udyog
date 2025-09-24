"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconDotsVertical } from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";

const schema = z.object({
  id: z.number(),
  active: z.boolean(),
  name: z.string(),
  mobile: z.string(),
  aadhaar: z.string(),
  pan: z.string(),
  email: z.string(),
  address: z.string(),
  salary: z.string(),
  advance: z.string(),
  last_increment: z.string(),
  last_increment_amount: z.string(),
  created_at: z.string(),
});

export const SalaryColumns: ColumnDef<z.infer<typeof schema>>[] = [
  {
    id: "sr",
    cell: ({ row }) => {
      const idx = row.index + 1;
      return (
        <div className="flex items-center justify-center">{`${idx}.`}</div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Worker Name",
    cell: ({ row }) => {
      // return <TableCellViewer item={row.original} />;
      return <div className="font-medium">{row.original.name}</div>;
    },
    enableHiding: false,
  },
  {
    accessorKey: "mobile",
    header: "Mobile Number",
    cell: ({ row }) => {
      const mobile = row.original.mobile?.toString();
      const formattedMobile =
        mobile?.length === 10
          ? `+91 ${mobile.slice(0, 5)} - ${mobile.slice(5)}`
          : mobile;
      // Return
      return <div className="font-medium">{formattedMobile}</div>;
    },
    enableHiding: false,
  },
  {
    accessorKey: "salaryPerDay",
    header: () => "Salary Per Day", // <div className="w-full text-right">Limit</div>
    cell: ({ row }) => {
      const salary = parseFloat(row.original.salary);
      const perDayAmount = salary / 30;

      // Format the amount as a INR Amount
      const formattedPerDayAmount = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "INR",
      }).format(perDayAmount);
      // Return
      return <div className="font-medium">{formattedPerDayAmount}</div>;
    },
  },
  {
    accessorKey: "salary",
    header: "Salary",
    cell: ({ row }) => {
      const salary = parseFloat(row.getValue("salary"));

      // Format the amount as a INR Amount
      const formattedSalary = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "INR",
      }).format(salary);
      // Return
      return <div className="font-medium">{formattedSalary}</div>;
    },
  },
  {
    accessorKey: "advance",
    header: () => "Advance", // <div className="w-full text-right">Target</div>
    cell: ({ row }) => {
      const raw = parseFloat(row.getValue("advance"));

      const formattedAmount = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 0,
      }).format(isNaN(raw) ? 0 : raw);

      return <div className="font-medium">{formattedAmount}</div>;
    },
  },
  {
    accessorKey: "calculated",
    header: () => "Calculated", // <div className="w-full text-right">Target</div>
    cell: ({ row }) => {
      const raw = parseFloat(row.getValue("advance"));

      const formattedAmount = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 0,
      }).format(isNaN(raw) ? 0 : raw);

      return <div className="font-medium underline">{formattedAmount}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "lastIncrement",
    header: "Last Increment",
    cell: ({ row }) => {
      const lastIncrement = parseFloat(row.original.last_increment_amount);
      if (!lastIncrement) {
        return (
          <Badge variant="outline" className="text-muted-foreground px-1.5">
            —
          </Badge>
        );
      }
      // Format the amount as a INR Amount
      const formattedLastIncrement = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "INR",
      }).format(lastIncrement);
      // Return
      return <div className="font-medium">{formattedLastIncrement}</div>;
    },
  },
  {
    accessorKey: "lastIncrementDate",
    header: "Last Increment Date",
    cell: ({ row }) => {
      const raw = row.original.last_increment;
      if (!raw) {
        return (
          <Badge variant="outline" className="text-muted-foreground px-1.5">
            —
          </Badge>
        );
      }
      const date = new Date(raw);
      if (isNaN(date.getTime())) {
        return (
          <Badge variant="outline" className="text-muted-foreground px-1.5">
            Invalid date
          </Badge>
        );
      }

      return new Intl.DateTimeFormat("en-IN", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }).format(date);
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
            size="icon"
          >
            <IconDotsVertical />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem variant="default">Update Salary</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="default">Advance</DropdownMenuItem>
          <DropdownMenuItem variant="default">Increment</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
