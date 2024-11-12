import { searchParamsCache } from "@/lib/searchparams";
import React from "react";
import EmployeeListingPage from "./components/user-listing-page";
import { SearchParams } from "nuqs";

type pageProps = {
  searchParams: SearchParams;
};

// export const metadata = {
//   title: "Dashboard : Users",
// };

export default async function Page({ searchParams }: pageProps) {
  // Allow nested RSCs to access the search params (in a type-safe way)
  await searchParamsCache.parse(searchParams);

  return <EmployeeListingPage searchParams={searchParams} />;
}
