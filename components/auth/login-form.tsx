"use client";
import { login } from "@/lib/actions/authActions";
import { cn } from "@/lib/utils";
import { loginDefaultValues } from "@/types/defaultValues";
import { loginFormSchema } from "@/types/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { SmartButton } from "../common/smart-button";
import { ZodTextInput } from "../common/zod-inputs";
import { Form } from "../ui/form";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // Zod-Form
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: loginDefaultValues,
  });
  // Handle Login
  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    // ✅ This will be type-safe and validated.
    try {
      setLoading(true);
      const res = await login(values);
      // Check response
      if (!res.status) {
        // Error toast
        toast.error("Login failed", {
          description: res.response,
        });
        return;
      }

      // Success toast
      toast.success("Welcome!", {
        description: res.response,
      });
      router.push("/");
    } catch {
      toast.error("Unexpected error occurred", {
        description: "Something went wrong. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        className={cn("flex flex-col gap-6", className)}
        onSubmit={form.handleSubmit(onSubmit)}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </div>
        <div className="grid gap-6">
          <ZodTextInput
            form={form}
            name="email"
            label="Email"
            placeholder="m@example.com"
          />
          <ZodTextInput
            form={form}
            type="password"
            name="password"
            label="Password"
          />
          <SmartButton
            loading={loading}
            type="submit"
            className="w-full"
            label="Submit"
          />
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background text-muted-foreground relative z-10 px-2">
              Or
            </span>
          </div>
        </div>
        <div className="text-center text-sm">
          <a
            href="#"
            className="ml-auto text-sm underline-offset-4 hover:underline"
          >
            Forgot your password?
          </a>
        </div>
      </form>
    </Form>
  );
}
