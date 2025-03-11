import { createFileRoute } from "@tanstack/react-router";
import { type ColumnDef } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useEffect } from "react";
import { Main } from "@/shared/components/layout/main";
import { UserDashboardTable } from "@/widgets/UserDashboard";
import { useUserStore, type TUser } from "@/entities/User/model/userStore";
import { AppHeader } from "@/widgets/AppHeader";

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

  const convertJsonToCsv = (jsonData: any) => {
    const header = Object.keys(jsonData[0]);
    const rows = jsonData.map((item: any) =>
      header.map((fieldName) => JSON.stringify(item[fieldName], (_, value) => (value === null ? "" : value))).join(",")
    );
    return [header.join(","), ...rows].join("\n");
  };

  // Function to trigger download of CSV file
  const downloadJsonToCsv = () => {
    const csv = convertJsonToCsv(users);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "data.csv";
    link.click();
  };

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <AppHeader />
      <Main>
        <div className="mb-2 flex items-center justify-between space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">User Management Dashboard</h1>
          <div className="flex items-center space-x-2">
            <Button onClick={() => downloadJsonToCsv()}>Download</Button>
          </div>
        </div>

        <UserDashboardTable columns={columns(deleteUser)} data={users} />
      </Main>
    </div>
  );
}
