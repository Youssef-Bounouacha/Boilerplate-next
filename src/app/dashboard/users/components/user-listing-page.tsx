import PageContainer from "@/components/layouts/page-container";
import { Heading } from "@/components/ui/heading";
import { Plus } from "lucide-react";
import { Separator } from "@radix-ui/react-dropdown-menu";
import EmployeeTable from "./user-tables";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import usersData from "@mocks/Users.json";
import { User } from "../../../../../types/User";

// Define the async page function that receives the searchParams directly
interface SearchParams {
  page?: string;
  q?: string;
  role?: string;
  limit?: string;
}

export default async function EmployeeListingPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  // Extract parameters directly from the searchParams object
  const page = parseInt(searchParams.page ?? "1");
  const search = searchParams.q || "";
  const role = searchParams.role || "";
  const pageLimit = parseInt(searchParams.limit ?? "10");

  let filteredUsers = usersData.map((user) => ({
    ...user,
    role: user.role as "Admin" | "User",
  }));

  // Apply search filter
  if (search) {
    filteredUsers = filteredUsers.filter((user) =>
      user.name.toLowerCase().includes(search),
    );
  }

  // Apply role filter
  if (role) {
    filteredUsers = filteredUsers.filter((user) => user.role === role);
  }

  // Apply pagination
  const totalUsers = filteredUsers.length;
  const startIndex = (page - 1) * pageLimit;
  const employee: User[] = filteredUsers
    .slice(startIndex, startIndex + pageLimit)
    .map((user) => ({
      ...user,
      first_name: user.name.split(" ")[0] || "",
      last_name: user.name.split(" ")[1] || "",
      phone: user.phone || "",
      role: user.role || "",
    }));

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading title={`Users (${totalUsers})`} description="Manage Users" />

          {/* <Link
            href={"/dashboard/employee/new"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link> */}
        </div>
        <Separator />
        <EmployeeTable data={employee} totalData={totalUsers} />
      </div>
    </PageContainer>
  );
}
