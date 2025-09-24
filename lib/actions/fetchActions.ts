import { createClient } from "@/utils/supabase/server";

export async function fetchUserDetails() {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    // console.log("Error fetching user:", error.message);
    // throw new Error("Unable to fetch user details");
    return { status: false, response: userError?.message };
  }

  return { status: true, response: { email: user.email, phone: user.phone } };
}
