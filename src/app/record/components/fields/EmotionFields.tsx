"use client";

import { useEffect, useState } from "react";
import { Label } from "@/elements/label/Label";
import Grid from "@/elements/grid/Grid";
import Spacer from "@/elements/spacer/Spacer";
import Image from "next/image";
import SelectableButton from "@/app/components/button/SelectableButton";

const EMOTIONS = [
  "행복해요",
  "활발해요",
  "평온해요",
  "나른해요",
  "불편해요",
  "슬퍼요",
];

const SPECIALS = [
  "없음",
  "놀이를 했어요",
  "외출했어요",
  "예방접종 했어요",
  "손님이 왔어요",
  "친구륾 만났어요",
];

interface EmotionFieldsProps {
  data: any;
  onChange: (data: any) => void;
}

const EmotionFields = ({ data, onChange }: EmotionFieldsProps) => {
  const [emotion, setEmotion] = useState(data.emotion ?? "");
  const [special, setSpecial] = useState(data.special ?? "");

  useEffect(() => {
    onChange({
      emotion,
      special,
    });
  }, [emotion, special, onChange]);

  const emotions = EMOTIONS.map((v, i) => (
    <SelectableButton
      key={i}
      isSelected={emotion === v}
      onClick={() => setEmotion(v)}
    >
      <Image
        src={`/images/emotion${i + 1}.png`}
        alt={v}
        width={64}
        height={64}
      />
      {v}
    </SelectableButton>
  ));

  const specials = SPECIALS.map((v, i) => (
    <SelectableButton
      key={i}
      isSelected={special === v}
      onClick={() => setSpecial(v)}
    >
      {v}
    </SelectableButton>
  ));

  return (
    <>
      <Label css="inputForm" text="아이의 기분은 어떤가요?" />
      <Spacer height={10} />
      <Grid items={emotions} column={3} />

      <Spacer height={30} />
      <Label css="inputForm" text="특별한 일이 있나요?" />
      <Spacer height={10} />
      <Grid items={specials} column={2} />
    </>
  );
};

export default EmotionFields;
