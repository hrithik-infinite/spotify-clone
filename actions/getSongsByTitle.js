import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import getSongs from "./getSongs";
const getSongsByTitle = async (title) => {
  const supabase = createServerComponentClient({
    header: headers,
    cookies: cookies,
  });
  if (!title) {
    const allSongs = await getSongs();
    return allSongs;
  }
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

  if (sessionError) {
    console.log(sessionError.message);
    return [];
  }

  const { data, error } = await await supabase.from("songs").select("*").ilike("title", `%${title}%`).eq("user_id", sessionData.session?.user.id).order("created_at", { ascending: false });
  if (error) {
    console.log(error);
  }
  return data || [];
};

export default getSongsByTitle;
