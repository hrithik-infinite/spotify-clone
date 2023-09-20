const { useSupabaseClient } = require("@supabase/auth-helpers-react");

const useLoadSongUrl = (song) => {
  const supabaseClient = useSupabaseClient();
  if (!song) {
    return "";
  }

  const { songData } = supabaseClient.storage.from("songs").getPublicUrl(song.songs_path);
  return songData.publicUrl;
};

export default useLoadSongUrl;
