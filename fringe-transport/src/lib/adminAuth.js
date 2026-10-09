import { supabase } from "./supabase";

export async function verifyFringeAdmin() {
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError) throw sessionError;

  const user = sessionData.session?.user;
  if (!user) return { allowed: false, user: null };

  const { data, error } = await supabase.rpc("is_fringe_admin");

  if (error) {
    throw new Error(
      "Administrator verification failed. Check the is_fringe_admin() database function and its permissions."
    );
  }

  const allowed =
    data === true ||
    data?.is_fringe_admin === true ||
    (Array.isArray(data) && data[0] === true);

  return { allowed, user };
}
