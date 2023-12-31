import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";

const getLikedSongs = async () => {
  const supabase = createServerComponentClient({
    header: headers,
    cookies: cookies,
  });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data, error } = await supabase.from("liked_songs").select("*, songs(*)").eq("user_id", session?.user?.id).order("created_at", { ascending: false });

  if (error) {
    console.log(error.message);
    return [];
  }
  if (!data) {
    return [];
  }

  return data.map((item) => ({
    ...item.songs,
  }));
};

export default getLikedSongs;
