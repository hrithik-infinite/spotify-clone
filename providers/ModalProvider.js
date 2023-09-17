"use client";

import Modal from "@/components/Modal";
import { useEffect, useState } from "react";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Modal title="Test Modal" desc="text desc" isOpen onChange={() => {}}>
        Test Childs
      </Modal>
    </>
  );
};
export default ModalProvider;
