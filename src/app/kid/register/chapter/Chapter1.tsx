"use client";

import React from "react";
import { useChldrnInfoStore } from "@/store/useChldrnInfoStore";
import { Label } from "@/elements/label/Label";
import { ChapterProps } from "@/hook/useChapter";
import styles from "../kid.module.css";
import Grid from "@/elements/grid/Grid";
import Spacer from "@/elements/spacer/Spacer";

const Chapter1: React.FC<ChapterProps> = ({ onNext }) => {
    const setAge = useChldrnInfoStore((state) => state.setAge);
    const ageTypes = ["NWNBB", "BABY", "INFANT", "CHILD"] as const;

    const texts = [
        <>
            <img src="/images/nwnbb.png" />
            <div className={styles.desc}>
                <p className={styles.title}>신생아</p>
                <p className={styles.age}>(태아 ~ 1개월)</p>
            </div>
        </>
        ,
        <><img src="/images/baby.png" />
            <div className={styles.desc}>
                <p className={styles.title}>영아</p>
                <p className={styles.age}>(1개월 ~ 1년)</p>
            </div>
        </>,
        <>
            <img src="/images/infant.png" />
            <div className={styles.desc}>
                <p className={styles.title}>유아</p>
                <p className={styles.age}>(1년 ~ 6년)</p>
            </div></>,
        <>
            <img src="/images/child.png" />
            <div className={styles.desc}>
                <p className={styles.title}>소아</p>
                <p className={styles.age}>(6년 ~ 12년)</p>
            </div>
        </>
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
            className={styles.ageContainer_item}
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
