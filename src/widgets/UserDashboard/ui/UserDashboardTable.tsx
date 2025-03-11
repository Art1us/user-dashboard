import { useEffect } from "react";
import { UserTable } from "./UserTable";
import { useUserStore, type TUser } from "@/entities/User";
import { useQuery } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/table-core";
import { DeleteUser } from "@/features/DeleteUser";

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

export function UserDashboardTable() {
  const { users, setUsers } = useUserStore();

  const { isPending, error, data } = useQuery({
    queryKey: ["usersData"],
    queryFn: () => fetch("https://jsonplaceholder.typicode.com/users").then((res) => res.json()),
  });

  useEffect(() => {
    if (data) setUsers(data);
  }, [data]);

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return <UserTable columns={columns} data={users} />;
}
