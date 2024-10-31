"use client";

import { useForm, ControllerRenderProps } from "react-hook-form";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { z } from "zod";
import useAuthStore from "../../../store/AuthStore";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {
  const router = useRouter();
  const toast = useToast();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();
  const form = useForm<UserFormValue>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: UserFormValue) => {
    setLoading(true);

    try {
      await login(data.email, data.password);
      toast.toast({
        title: "Success",
        description: "Signed In Successfully!",
        variant: "default",
      });

      router.push(callbackUrl ?? "/dashboard");
      router.refresh();
    } catch (error) {
      console.error("Login error:", error);
      toast.toast({
        title: "Error",
        description: "Invalid email or password",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
        <FormField
          control={form.control}
          name="email"
          render={({
            field,
          }: {
            field: ControllerRenderProps<UserFormValue, "email">;
          }) => (
            <FormItem>
              <FormLabel>{"Email"}</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your email..."
                  disabled={loading}
                  {...field}
                />
              </FormControl>
              {form.formState.errors.email && (
                <FormMessage>{form.formState.errors.email.message}</FormMessage>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({
            field,
          }: {
            field: ControllerRenderProps<UserFormValue, "password">;
          }) => (
            <FormItem>
              <FormLabel>{"Password"}</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password..."
                  disabled={loading}
                  {...field}
                />
              </FormControl>
              {form.formState.errors.password && (
                <FormMessage>
                  {form.formState.errors.password.message}
                </FormMessage>
              )}
            </FormItem>
          )}
        />

        <Button disabled={loading} className="ml-auto w-full" type="submit">
          {"Sign In"}
        </Button>
      </form>
    </Form>
  );
}
