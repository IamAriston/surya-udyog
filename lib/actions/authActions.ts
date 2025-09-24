"use server";

import { loginFormSchema } from "@/types/formSchema";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "../../utils/supabase/server";

// export async function login(values: z.infer<typeof loginFormSchema>) {
//   const supabase = await createClient();
//   const { error } = await supabase.auth.signInWithPassword(values);

//   if (error) {
//     return { status: false, response: error.message };
//   }

//   revalidatePath("/", "layout");
//   return { status: true, response: "Credentials verified successfully!" };
// }

export async function login(values: z.infer<typeof loginFormSchema>) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword(values);

  if (error) {
    return { status: false, response: error.message };
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      status: false,
      response: "Logged in, but failed to retrieve user info.",
    };
  }

  revalidatePath("/", "layout");

  return {
    status: true,
    response: "Credentials verified successfully!",
    user,
  };
}

export async function logout() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    return { status: false, response: error.message };
  }

  return { status: true, response: "Logged out successfully" };
}

// export async function signup(formData: FormData) {
//   const supabase = await createClient();

//   // type-casting here for convenience
//   // in practice, you should validate your inputs
//   const data = {
//     email: formData.get("email") as string,
//     password: formData.get("password") as string,
//   };

//   const { error } = await supabase.auth.signUp(data);

//   if (error) {
//     redirect("/error");
//   }

//   revalidatePath("/", "layout");
//   redirect("/");
// }
