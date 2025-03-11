import { createFileRoute } from "@tanstack/react-router";
import { DataTable } from "@/components/DataTable";
import { type ColumnDef } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useEffect } from "react";
import { useUserStore, type TUser } from "@/components/userStore";

export const columns: (cb: (id: string) => void) => ColumnDef<TUser>[] = (handleDelete) => [
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
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleDelete(row.original.id)}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const { users, setUsers, deleteUser } = useUserStore();

  const { isPending, error, data } = useQuery({
    queryKey: ["usersData"],
    queryFn: () => fetch("https://jsonplaceholder.typicode.com/users").then((res) => res.json()),
  });

  useEffect(() => {
    if (data) setUsers(data);
  }, [data]);

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <DataTable columns={columns(deleteUser)} data={users} />
    </div>
  );
}
