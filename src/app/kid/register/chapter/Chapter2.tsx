"use client";

import React from "react";
import { useProfileStore } from "@/store/useProfileStore";
import { Label } from "@/elements/label/Label";
import { ChapterProps } from "@/hook/useChapter";
import styles from "../kid.module.css";
import Grid from "@/elements/grid/Grid";
import Spacer from "@/elements/spacer/Spacer";

const Chapter1: React.FC<ChapterProps> = ({ onNext }) => {
    const setChldrnSexdstn = useProfileStore((state) => state.setChldrnSexdstn);
    const chldrnSexdstnType = ["M", "F"] as const;

    const texts = [
        <>
            <div className={styles.genderSelection}>
                <img src="/boySign.png" />
                남자
            </div>
        </>,
        <>
            <div className={styles.genderSelection}>
                <img src="/girlSign.png" />
                여자
            </div>
        </>,
    ];

    const handleSexSelection = (index: number) => {
        setChldrnSexdstn(chldrnSexdstnType[index]);
        onNext();
    };

    const Item = ({
        children,
        index,
    }: {
        children: React.ReactNode;
        index: number;
    }) => (
        <div
            className={styles.gender_item}
            onClick={() => handleSexSelection(index)}
        >
            {children}
        </div>
    );

    return (
        <div>
            <Label css="profileLabel" text="아이의 성별은<br/>무엇인가요?" />
            <Spacer height={56} />
            <Grid
                items={texts.map((text, index) => (
                    <Item key={index} index={index}>
                        {text}
                    </Item>
                ))}
                column={2}
            />
        </div>
    );
};

export default Chapter1;
