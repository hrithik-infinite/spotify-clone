"use client";

import useUploadModal from "@/hooks/UseUploadModal";
import Modal from "./Modal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { toast } from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import uniqid from "uniqid";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

const UploadModal = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const uploadModal = useUploadModal();
  const supabaseClient = useSupabaseClient();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null,
    },
  });
  const { user, subscription } = useUser();

  const onChange = (open) => {
    if (typeof open === "boolean") {
      if (!open) {
        reset();
        uploadModal.onClose();
      }
    }
  };
  const onSubmit = async (values) => {
    try {
      setIsLoading(true);
      const imgFile = values.image?.[0];
      const songFile = values.song?.[0];

      if (!imgFile || !songFile || !user) {
        toast.error("Missing fields!");
        return;
      }
      const uniqueId = uniqid();
      const { data: songData, error: songError } = await supabaseClient.storage.from("songs").upload(`song-${values.title}-${uniqueId}`, songFile, {
        cacheControl: "3600",
        upsert: false,
      });
      if (songError) {
        setIsLoading(false);
        return toast.error("Failed to upload Song");
      }
      const { data: imgData, error: imgError } = await supabaseClient.storage.from("images").upload(`image-${values.title}-${uniqueId}`, imgFile, {
        cacheControl: "3600",
        upsert: false,
      });
      if (imgError) {
        setIsLoading(false);
        return toast.error("Failed to upload Image");
      }
      const { error: supabaseError } = await supabaseClient.from("songs").insert({
        user_id: user.id,
        title: values.title,
        author: values.author,
        image_path: imgData.path,
        song_path: songData.path,
      });
      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.meesage);
      }
      router.refresh();
      setIsLoading(false);
      toast.success("SOng Created!");
      reset();
      uploadModal.onClose();
    } catch (error) {
      toast.error("Something Went Wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal title="Add a song" desc="Upload an mp3 file" isOpen={uploadModal.isOpen} onChange={onChange}>
      <form className="flex flex-col gap-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input id="title" disabled={isLoading} {...register("title", { required: true })} placeholder="Song Title" />
        <Input id="author" disabled={isLoading} {...register("author", { required: true })} placeholder="Song Author" />
        <div>
          <div className="pb-1">Select a Song File</div>
          <Input id="song" type="file" disabled={isLoading} accept=".mp3" {...register("song", { required: true })} />
        </div>
        <div>
          <div className="pb-1">Select an Image</div>
          <Input id="image" type="file" disabled={isLoading} accept="image/*" {...register("image", { required: true })} />
        </div>
        <Button disabled={isLoading} type="submit">
          Create
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
