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

    const handleAgeSelection = (event: React.MouseEvent<HTMLDivElement>) => {
        const selectedAge = (event.target as HTMLElement).innerHTML.trim(); // innerHTML 가져오기
        setAge(selectedAge);
        onNext();
    };

    const Item = ({ txt }: { txt: string }) => (
        <div
            className={styles.profileContainer_item}
            onClick={handleAgeSelection}
            dangerouslySetInnerHTML={{ __html: txt }}
        />
    );

    return (
        <div>
            <Label
                css="profileLabel"
                text="아이의 나이대가<br>어떻게 되나요?"
            />
            <Spacer height={56} />
            <Grid
                items={[
                    <Item txt={"신생아<br/>(태아 ~ 1개월)"} />,
                    <Item txt={"영아<br/>(1개월 ~ 1년)"} />,
                    <Item txt={`유아<br/>(1년~6년)`} />,
                    <Item txt={`소아<br/>(6년~12년)`} />,
                ]}
                column={2}
            />
        </div>
    );
};

export default Chapter1;
