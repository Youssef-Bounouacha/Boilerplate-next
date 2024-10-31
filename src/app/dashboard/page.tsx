"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "../../../store/AuthStore";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const router = useRouter();
  const { logout, user, isAuthenticated, checkToken } = useAuthStore();

  useEffect(() => {
    // Check token on mount
    checkToken();

    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router, checkToken]);

  if (!isAuthenticated || !user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="p-4">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          {"Welcome"}, {user.role}
        </h1>
      </header>
    </div>
  );
};

export default Dashboard;
