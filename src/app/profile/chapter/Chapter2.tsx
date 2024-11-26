"use client";

import React from "react";
import { Label } from "@/elements/label/Label";
import Button from "@/elements/button/Button";
import { ChapterProps } from "@/hook/useChapter";
import InputForm from "@/components/form/InputForm";
import styles from "../profile.module.css";

const Chapter2: React.FC<ChapterProps> = ({ onNext }) => {
    return (
        <div>
            <Label css="profileLabel" text="아이의 정보를<br>등록해주세요" />
            <div className={styles.inputArea}>
                <InputForm labelText="이름" labelCss="inputForm" />
                <InputForm labelText="출생일" labelCss="inputForm" />
                <InputForm labelText="몸무게" labelCss="inputForm" />
                <InputForm labelText="키" labelCss="inputForm" />
                <InputForm labelText="머리둘레" labelCss="inputForm" />
            </div>

            <Button css="nextBtn" onClick={onNext} label="다음"></Button>
        </div>
    );
};

export default Chapter2;
