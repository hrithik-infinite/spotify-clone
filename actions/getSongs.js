import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";

const getSongs = async () => {
  const supabase = createServerComponentClient({
    header: headers,
    cookies: cookies,
  });

  const { data, error } = await supabase.from("songs").select("*").order("created_at", { ascending: false });

  if (error) {
    console.log(error.message);
  }

  return data || [];
};

export default getSongs;
