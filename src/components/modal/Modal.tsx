"use client";

import React from "react";
import styles from "./modal.module.css";
import Button from "../../elements/button/Button";
import { useModalStore } from "@/store/useModalStore";

const CustomModal: React.FC = () => {
  const { isOpen, closeModal, comp } = useModalStore();
  if (!isOpen) return;

  return (
    <div className={styles.modalbackDrop} onClick={closeModal}>
      <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
        {comp && comp}
      </div>
    </div>
  );
};

export default CustomModal;
