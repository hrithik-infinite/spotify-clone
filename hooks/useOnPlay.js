import usePlayer from "./UsePlayer";
import useAuthModal from "./UseAuthModal";
import { useUser } from "./useUser";
import UseSubscribeModal from "@/hooks/UseSubscribeModal";

const useOnPlay = (songs) => {
  const subscribeModal = UseSubscribeModal();
  const player = usePlayer();
  const authModal = useAuthModal();
  const { user, subscription } = useUser();

  const onPlay = (id) => {
    if (!user) {
      return authModal.onOpen();
    }
    if (!subscription) {
      return subscribeModal.onOpen();
    }

    player.setId(id);
    player.setIds(songs.map((song) => song.id));
  };

  return onPlay;
};

export default useOnPlay;
