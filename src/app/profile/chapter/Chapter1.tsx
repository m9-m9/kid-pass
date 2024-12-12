"use client";

import React from "react";
import { useProfileStore } from "@/store/useProfileStore";
import { Label } from "@/elements/label/Label";
import { ChapterProps } from "@/hook/useChapter";
import styles from "../profile.module.css";
import Grid from "@/elements/grid/Grid";
import Spacer from "@/elements/spacer/Spacer";

const Chapter1: React.FC<ChapterProps> = ({ onNext }) => {
    const setAge = useProfileStore((state) => state.setAge);
    const ageTypes = ["NWNBB", "BABY", "INFANT", "CHILD"] as const;

    const texts = [
        <>
            신생아
            <br />
            (태아 ~ 1개월)
        </>,
        <>
            영아
            <br />
            (1개월 ~ 1년)
        </>,
        <>
            유아
            <br />
            (1년~6년)
        </>,
        <>
            소아
            <br />
            (6년~12년)
        </>,
    ];

    const handleAgeSelection = (index: number) => {
        setAge(ageTypes[index]);
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
            className={styles.profileContainer_item}
            onClick={() => handleAgeSelection(index)}
        >
            {children}
        </div>
    );

    return (
        <div>
            <Label
                css="profileLabel"
                text="아이의 나이대가<br>어떻게 되나요?"
            />
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
