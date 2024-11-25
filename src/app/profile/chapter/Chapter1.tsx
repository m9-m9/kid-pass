"use client";

import React from "react";
import { Label } from "@/elements/label/Label";
import { ChapterProps } from "@/hook/useChapter";
import styles from "../profile.module.css";

const Chapter1: React.FC<ChapterProps> = ({ onNext }) => {
    return (
        <div>
            <Label
                css="profileLabel"
                text="아이의 나이대가<br>어떻게 되나요?"
            />
            <div className={styles.profileContainer}>
                <div className={styles.profileContainer_item} onClick={onNext}>
                    신생아
                </div>
                <div className={styles.profileContainer_item} onClick={onNext}>
                    육아
                </div>
                <div className={styles.profileContainer_item} onClick={onNext}>
                    초등
                    <br />
                    저학년
                </div>
                <div className={styles.profileContainer_item} onClick={onNext}>
                    초등
                    <br />
                    고학년
                </div>
            </div>
            {/* <Button css="nextBtn" onClick={onNext} label="다음"></Button> */}
        </div>
    );
};

export default Chapter1;
