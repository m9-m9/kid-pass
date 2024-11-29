"use client";

import React from "react";
import { useProfileStore } from "@/store/useProfileStore"; 
import { Label } from "@/elements/label/Label";
import { ChapterProps } from "@/hook/useChapter";
import styles from "../profile.module.css";

const Chapter1: React.FC<ChapterProps> = ({ onNext }) => {
    const setAge = useProfileStore((state) => state.setAge); 

    const handleAgeSelection = (event: React.MouseEvent<HTMLDivElement>) => {
        const selectedAge = (event.target as HTMLElement).innerHTML.trim(); // innerHTML 가져오기
        setAge(selectedAge); 
        onNext(); 
    };

    return (
        <div>
            <Label
                css="profileLabel"
                text="아이의 나이대가<br>어떻게 되나요?"
            />
            <div className={`${styles.profileContainer} mt-48`}>
                <div
                    className={styles.profileContainer_item}
                    onClick={handleAgeSelection}
                >
                    신생아
                </div>
                <div
                    className={styles.profileContainer_item}
                    onClick={handleAgeSelection}
                >
                    육아
                </div>
                <div
                    className={styles.profileContainer_item}
                    onClick={handleAgeSelection}
                >
                    초등
                    <br />
                    저학년
                </div>
                <div
                    className={styles.profileContainer_item}
                    onClick={handleAgeSelection}
                >
                    초등
                    <br />
                    고학년
                </div>
            </div>
        </div>
    );
};

export default Chapter1;
