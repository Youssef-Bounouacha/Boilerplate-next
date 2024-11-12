"use client";

import { DataTableSearch } from "@/components/ui/table/data-table-search";
import { GENDER_OPTIONS, useUserTableFilters } from "./use-user-table-filters";
import { DataTableFilterBox } from "@/components/ui/table/data-table-filter-box";
import { DataTableResetFilter } from "@/components/ui/table/data-table-reset-filter";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/table/dataTable";
import { User } from "../../../../../../types/User";

export default function UserTable({
  data,
  totalData,
}: {
  data: User[];
  totalData: number;
}) {
  const {
    roleFilter,
    setRoleFilter,
    isAnyFilterActive,
    resetFilters,
    searchQuery,
    setPage,
    setSearchQuery,
  } = useUserTableFilters();

  return (
    <div className="space-y-4 ">
      <div className="flex flex-wrap items-center gap-4">
        <DataTableSearch
          searchKey="name"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setPage={setPage}
        />
        <DataTableFilterBox
          filterKey="role"
          title="Role"
          options={GENDER_OPTIONS}
          setFilterValue={setRoleFilter}
          filterValue={roleFilter}
        />
        <DataTableResetFilter
          isFilterActive={isAnyFilterActive}
          onReset={resetFilters}
        />
      </div>
      <DataTable columns={columns} data={data} totalItems={totalData} />
    </div>
  );
}
