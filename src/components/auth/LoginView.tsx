// /components/SignInView.tsx
import { Metadata } from "next";
import Link from "next/link";

import Image from "next/image"; // Ensure you import Image from Next.js
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import UserAuthForm from "./LoginForm";
import LogoHardiot from "../images";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};
export const company = {
  name: "Hardiot",
  logo: LogoHardiot,
};
export default function LoginViewPage() {
  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/examples/authentication"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 hidden md:right-8 md:top-8",
        )}
      >
        {"Login"}
      </Link>
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <div className="flex gap-2 py-2 text-sidebar-accent-foreground ">
            <div className="flex aspect-square size-20 items-center justify-center rounded-lg bg-transparent text-sidebar-primary-foreground">
              <company.logo />
            </div>
            <div className="grid flex-1 text-3xl text-left leading-tight items-center">
              <span className="truncate font-semibold">{company.name}</span>
            </div>
          </div>
        </div>
        <div className="relative z-20 mt-auto"></div>
      </div>
      <div className="flex h-full items-center p-4 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              {"Sign In"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {" Enter your email and password to sign in."}
            </p>
          </div>
          <UserAuthForm />
        </div>
      </div>
    </div>
  );
}
