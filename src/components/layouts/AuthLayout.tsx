"use client";
import { useEffect } from "react";
import useAuthStore from "../../../store/AuthStore";
import { useRouter } from "next/navigation";
import AuthenticatedLayout from "@/app/(auth)/layout";

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, checkToken } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    checkToken();
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, checkToken, router]); // Add checkToken and router to dependencies

  return isAuthenticated ? (
    <div>
      <AuthenticatedLayout>{children}</AuthenticatedLayout>
    </div>
  ) : null;
};

export default AuthLayout;
