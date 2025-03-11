import type { ColumnDef } from "@tanstack/table-core";
import { DeleteUser } from "@/features/DeleteUser";
import type { TUser } from "@/entities/User";

export const columns: ColumnDef<TUser>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "company.name",
    header: "Company",
    enableGlobalFilter: false,
  },
  {
    accessorKey: "address.city",
    header: "City",
    enableGlobalFilter: false,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return <DeleteUser userId={row.original.id} />;
    },
  },
];
