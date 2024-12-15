"use client";

import React from "react";
import { Label } from "@/elements/label/Label";
import { ChapterProps } from "@/hook/useChapter";
import styles from "../profile.module.css";
import Grid from "@/elements/grid/Grid";

const Chapter3: React.FC<ChapterProps> = ({ goToChapter }) => {
    const items = [
        <div
            className={styles.profileContainer_item}
            onClick={() => goToChapter(4)}
        >
            있어요
        </div>,
        <div
            className={styles.profileContainer_item}
            onClick={() => goToChapter(5)}
        >
            없어요
        </div>,
    ];

    return (
        <div>
            <Label
                css="profileLabel"
                text="김아기의 과거 증상과<br>
진료 기록을 알려주세요"
            />

            <div className="mt-48">
                <Label
                    text="과거에 진단받은 질환이 있나요?"
                    css="profileDesc"
                />
                <div className={`${styles.profileContainer} mt-12`}>
                    <Grid items={items} column={2} />
                </div>
            </div>
        </div>
    );
};

export default Chapter3;
