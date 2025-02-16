"use client";

import { useEffect, useState } from "react";
import { Label } from "@/elements/label/Label";
import Grid from "@/elements/grid/Grid";
import Spacer from "@/elements/spacer/Spacer";
import ButtonChecked from "@/elements/button/Button.checked";

const BUS = ["대변", "소변"];
const COLORS = ["노란색", "갈색", "검은색", "빨간색", "흰색", "회색"];
const COLORSVALUE = [
  "#D1B905",
  "#844A2A",
  "#444444",
  "#D13805",
  "#E8E8E8",
  "#8D8D8D",
];
const STLES = ["물변", "딱딱함", "적당함"];
const AMTS = ["적음", "보통", "많음"];

interface DiaperFieldsProps {
  data: any;
  onChange: (data: any) => void;
}

const DiaperFields = ({ data, onChange }: DiaperFieldsProps) => {
  const [diaperType, setDiaperType] = useState(data.diaperType ?? "");
  const [diaperColor, setDiaperColor] = useState(data.diaperColor ?? "");
  const [diaperShape, setDiaperShape] = useState(data.diaperShape ?? "");
  const [diaperAmount, setDiaperAmount] = useState(data.diaperAmount ?? "");

  useEffect(() => {
    onChange({
      diaperType,
      diaperColor,
      diaperShape,
      diaperAmount,
    });
  }, [diaperType, diaperColor, diaperShape, diaperAmount, onChange]);

  const bus = BUS.map((v, i) => (
    <ButtonChecked v={v} i={i} state={diaperType} setState={setDiaperType} />
  ));

  const colors = COLORS.map((v, i) => (
    <ButtonChecked
      v={v}
      i={i}
      children={
        <div
          style={{
            display: "flex",
            gap: 3,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: COLORSVALUE[i],
              width: 24,
              height: 24,
              borderRadius: 24,
            }}
          />
          {v}
        </div>
      }
      state={diaperColor}
      setState={setDiaperColor}
    />
  ));

  const stles = STLES.map((v, i) => (
    <ButtonChecked v={v} i={i} state={diaperShape} setState={setDiaperShape} />
  ));

  const amts = AMTS.map((v, i) => (
    <ButtonChecked
      v={v}
      i={i}
      state={diaperAmount}
      setState={setDiaperAmount}
    />
  ));

  return (
    <>
      <Label css="inputForm" text="종류" />
      <Spacer height={10} />
      <Grid items={bus} column={2} />

      <Spacer height={30} />
      <Label css="inputForm" text="색깔" />
      <Spacer height={10} />
      <Grid items={colors} column={3} />

      <Spacer height={30} />
      <Label css="inputForm" text="형태" />
      <Spacer height={10} />
      <Grid items={stles} column={3} />

      <Spacer height={30} />
      <Label css="inputForm" text="양" />
      <Spacer height={10} />
      <Grid items={amts} column={3} />
    </>
  );
};

export default DiaperFields;
