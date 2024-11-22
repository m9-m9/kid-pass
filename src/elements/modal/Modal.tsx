import { useModalStore } from "@/store/useModalStore";
import React from "react";
import styles from "./modal.module.css"
import Button from "../button/Button";

const ProfileModal: React.FC = () => {
    const { isOpen, closeModal } = useModalStore();

    if (!isOpen) return null;

    return (
        <div className={styles.modalbackDrop} onClick={closeModal}>
            <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                        <p>김아기 프로필<br/>
                           등록완료!
                        </p>
                </div>
                <div className={styles.modalSubDesc}>
                    <p>
                    아이가 더 효과적인 치료를<br/>
                    받을 수 있게 도와드릴게요!
                    </p>
                </div>
            <Button  css="profileBtn" label="작성 완료" onClick={closeModal}></Button>
            </div>
        </div>
    );
};

export default ProfileModal;
