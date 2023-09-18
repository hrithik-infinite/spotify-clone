"use client";
import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import useAuthModal from "@/hooks/UseAuthModal";
import useUploadModal from "@/hooks/UseUploadModal";
import { useUser } from "@/hooks/useUser";
import MediaItem from "./MediaItem";

const Library = ({ songs }) => {
  const authModal = useAuthModal();
  const { user, subscription } = useUser();

  const uploadModal = useUploadModal();
  const onClick = () => {
    if (!user) {
      return authModal.onOpen();
    }
    return uploadModal.onOpen();
  };
  return (
    <div className="flex flex-col">
      <div
        className="flex items-center justify-between
    px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist className="text-neutral-400" size={26} />
          <p className="text-neutral-400 font-medium text-md">Your Lib</p>
        </div>
        <AiOutlinePlus
          onClick={onClick}
          size={20}
          className="text-neutral-400 
        cursor-pointer hover:text-white transition"
        />
      </div>
      <div
        className="
      flex flex-col gap-y-2
      mt-4 px-3">
        {songs.map((item) => (
          <MediaItem key={item.id} data={item} onClick={() => {}} />
        ))}
      </div>
    </div>
  );
};

export default Library;
