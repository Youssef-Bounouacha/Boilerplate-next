// /app/(auth)/layout.tsx
"use client";
import AuthLayout from "@/components/layouts/AuthLayout";

const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default AuthenticatedLayout;
