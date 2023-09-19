"use client";

import useAuthModal from "@/hooks/UseAuthModal";
import { useUser } from "@/hooks/useUser";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LikeButton = ({ songId }) => {
  const router = useRouter();
  const { supabaseClient } = useSessionContext();
  const authModal = useAuthModal();
  const { user } = useUser();
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if(!user.id){
        returnl
    }
    const fethData = async () =>{
        const {data, error} = await supabaseClient.from('liked_song').select('*')
    }
  })
  return (
    <div>hii</div>
  );
};
export default LikeButton;
