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
      <Label css="profileLabel" text="아이의 나이대가<br>어떻게 되나요?" />
      <Spacer height={56} />
      <Grid
        items={[
          <Item txt={"신생아"} />,
          <Item txt={"육아"} />,
          <Item txt={`초등<br/>저학년`} />,
          <Item txt={`초등<br/>저학년`} />,
        ]}
        column={2}
      />
    </div>
  );
};

export default Chapter1;
