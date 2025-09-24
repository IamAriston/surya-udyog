"use server";

import { addWorkerFormSchema } from "@/types/formSchema";
import { createClient } from "@/utils/supabase/server";
import { z } from "zod";

export async function addWorker(values: z.infer<typeof addWorkerFormSchema>) {
  const supabase = await createClient();

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (!session || sessionError) {
    return {
      status: false,
      response: "User not authenticated",
    };
  }

  const { data: existing, error: fetchError } = await supabase
    .from("workers")
    .select("id")
    .or(
      `mobile.eq.${values.mobile},email.eq.${values.email},aadhaar.eq.${values.aadhaar},pan.eq.${values.pan}`
    );

  if ((existing && existing.length > 0) || fetchError) {
    return {
      status: false,
      response:
        "A worker with the same mobile, email, Aadhaar, or PAN already exists.",
    };
  }

  const { error } = await supabase.from("workers").insert([
    {
      name: values.name,
      mobile: values.mobile,
      email: values.email,
      aadhaar: values.aadhaar,
      pan: values.pan,
      address: values.address,
      salary: values.salary,
    },
  ]);

  if (error) {
    return { status: false, response: error.message };
  }

  return {
    status: true,
    response: "Worker Added successfully!",
  };
}

export async function workerList() {
  const supabase = await createClient();
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (!session || sessionError) {
    return {
      status: false,
      response: "User not authenticated",
    };
  }

  const { data, error } = await supabase.from("workers").select("*");

  if (error) {
    return { status: false, response: error.message };
  }

  return {
    status: true,
    response: data,
  };
}

export async function workerDetails(id: string) {
  const supabase = await createClient();
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();
  if (!session || sessionError) {
    return {
      status: false,
      response: "User not authenticated",
    };
  }
  const { data, error } = await supabase
    .from("workers")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return { status: false, response: error.message };
  }
  if (!data) {
    return { status: false, response: "Worker not found" };
  }
  return {
    status: true,
    response: data,
  };
}

// export async function deleteWorker(id: string) {
//   const supabase = await createClient();
//   const {
//     data: { session },
//     error: sessionError,
//   } = await supabase.auth.getSession();

//   if (!session || sessionError) {
//     return {
//       status: false,
//       response: "User not authenticated",
//     };
//   }

//   const { error } = await supabase.from("workers").delete().eq("id", id);

//   if (error) {
//     return { status: false, response: error.message };
//   }

//   return {
//     status: true,
//     response: "Worker deleted successfully!",
//   };
// }
