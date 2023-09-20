import usePlayer from "./UsePlayer";
import useAuthModal from "./UseAuthModal";
import { useUser } from "./useUser";

const useOnPlay = (songs) => {
  const player = usePlayer();
  const authModal = useAuthModal();
  const { user } = useUser();

  const onPlay = (id) => {
    if (!user) {
      return authModal.onOpen();
    }

    player.setId(id);
    player.setIds(songs.map((song) => song.id));
  };

  return onPlay;
};

export default useOnPlay;
