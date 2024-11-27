"use client";

import React from "react";
import { Label } from "@/elements/label/Label";
import Button from "@/elements/button/Button";
import { ChapterProps } from "@/hook/useChapter";
import styles from "../profile.module.css";
import Input from "@/elements/input/Input";

const Chapter5: React.FC<ChapterProps> = ({ onNext }) => {
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
                />
            </div>
            <Button css="nextBtn" onClick={onNext} label="작성 완료"></Button>
        </div>
    );
};

export default Chapter5;
