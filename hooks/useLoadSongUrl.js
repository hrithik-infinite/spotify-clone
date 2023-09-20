import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useLoadSongUrl = (song) => {
  const supabaseClient = useSupabaseClient();
  if (!song) {
    return "";
  }
  const { data: songData } = supabaseClient.storage.from("songs").getPublicUrl(song.songs_path);
  return songData;
};

export default useLoadSongUrl;
