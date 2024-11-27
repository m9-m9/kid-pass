"use client";

import React from "react";
import { Label } from "@/elements/label/Label";
import Button from "@/elements/button/Button";
import { ChapterProps } from "@/hook/useChapter";
import ListInput from "@/elements/input/ListInput";
import Circleline from "@/elements/svg/Checkbox";
import styles from "../profile.module.css";
import XIcon from "@/elements/svg/XIcon";

const Chapter4: React.FC<ChapterProps> = ({ onNext }) => {
    return (
        <div>
            <Label
                css="profileLabel"
                text="김아기의 과거 증상과<br>
진료 기룍을 알려주세요"
            />
            <div className={`${styles.listInputArea} mt-48`}>
                <Label
                    text="과거에 진단받은 질환이 있나요?"
                    css="profileDesc"
                />
                <ListInput
                    type="text"
                    className="listInputForm"
                    placeholder="ex:아토피"
                />
                <Circleline color="#729BED" className="listInputCheckbox" />
            </div>
            <div className="mt-20 verticalFlexbox gap-8">
                <div className={styles.symptomList}>
                    <Label css="profSymtomp" text="아토피" />
                    <XIcon color="#222222" />
                </div>
            </div>
            <div className={`${styles.listInputArea} mt-48 mb-120`}>
                <Label
                    text="약품이나 식품에<br>
알러지가 있다면 적어주세요"
                    css="profileDesc"
                />
                <ListInput
                    type="text"
                    className="listInputForm"
                    placeholder="ex:땅콩"
                />
                <Circleline color="#729BED" className="listInputCheckbox" />
            </div>
            <Button css="nextBtn" onClick={onNext} label="다음"></Button>
        </div>
    );
};

export default Chapter4;
