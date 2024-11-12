import AppSidebar from "@/components/layouts/app-sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account",
  description: "",
};

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppSidebar>{children}</AppSidebar>
    </>
  );
}
