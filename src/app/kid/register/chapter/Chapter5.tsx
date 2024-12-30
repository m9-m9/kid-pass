"use client";

import React, { useEffect, useState } from "react";
import { Label } from "@/elements/label/Label";
import Button from "@/elements/button/Button";
import { ChapterProps } from "@/hook/useChapter";
import styles from "../profile.module.css";
import { useProfileStore } from "@/store/useProfileStore";
import { useModalStore } from "@/store/useModalStore";

const Chapter5: React.FC<ChapterProps> = ({ onNext }) => {
    const [etcInput, setEtcInput] = useState("");
    const setEtc = useProfileStore((state) => state.setEtc);
    const { openModal, setComp, closeModal } = useModalStore();

    useEffect(() => {
        setComp(
            <>
                <div className={styles.modalHeader}>
                    <p>
                        김아기 프로필
                        <br />
                        등록완료!
                    </p>
                </div>
                <div className={styles.modalSubDesc}>
                    <p>
                        아이가 더 효과적인 치료를
                        <br />
                        받을 수 있게 도와드릴게요!
                    </p>
                </div>
                <Button
                    css="profileBtn"
                    label="작성 완료"
                    onClick={closeModal}
                ></Button>
            </>,
        );
    }, []);

    const handleNext = () => {
        setEtc(etcInput);
        onNext();
        openModal();
    };

    return (
        <div>
            <Label
                css="profileLabel"
                text="김아기에 대해<br>
더 알려줄 것이 있나요?"
            />
            <div className={styles.etcArea}>
                <textarea
                    className={styles.etcInput}
                    placeholder={`병원에서 미리 알아두면 좋을\n특이 사항이 있다면 적어주세요`}
                    value={etcInput}
                    onChange={(e) => setEtcInput(e.target.value)}
                />
            </div>
            <Button
                css="nextBtn"
                onClick={handleNext}
                label="작성 완료"
            ></Button>
        </div>
    );
};

export default Chapter5;
