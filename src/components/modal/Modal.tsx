"use client";

import React from "react";
import styles from "./modal.module.css";
import { useModalStore } from "@/store/useModalStore";

const CustomModal: React.FC = () => {
  const { isOpen, closeModal, comp, position } = useModalStore();
  if (!isOpen) return null;

  return (
    <div className={`${styles.modalbackDrop} ${position === 'center' ? styles.centerAlign : ''}`} onClick={closeModal}>
      <div
        className={`${styles.modalContainer} ${position === 'center' ? styles.centerContainer : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {comp && comp}
      </div>
    </div>
  );
};

export default CustomModal;