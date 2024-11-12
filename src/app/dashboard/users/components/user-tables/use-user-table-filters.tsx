"use client";

import { searchParams } from "@/lib/searchparams";
import { useQueryState } from "nuqs";
import { useCallback, useMemo } from "react";

export const GENDER_OPTIONS = [
  { value: "Admin", label: "Admin" },
  { value: "User", label: "User" },
];

export function useUserTableFilters() {
  const [searchQuery, setSearchQuery] = useQueryState(
    "q",
    searchParams.q
      .withOptions({ shallow: false, throttleMs: 1000 })
      .withDefault(""),
  );

  const [roleFilter, setRoleFilter] = useQueryState(
    "role",
    searchParams.role.withOptions({ shallow: false }).withDefault(""),
  );

  const [page, setPage] = useQueryState(
    "page",
    searchParams.page.withDefault(1),
  );

  const resetFilters = useCallback(() => {
    setSearchQuery(null);
    setRoleFilter(null);

    setPage(1);
  }, [setSearchQuery, setRoleFilter, setPage]);

  const isAnyFilterActive = useMemo(() => {
    return !!searchQuery || !!roleFilter;
  }, [searchQuery, roleFilter]);

  return {
    searchQuery,
    setSearchQuery,
    roleFilter,
    setRoleFilter,
    page,
    setPage,
    resetFilters,
    isAnyFilterActive,
  };
}
