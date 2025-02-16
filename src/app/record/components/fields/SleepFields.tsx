"use client";

import { useEffect, useState } from "react";
import { Label } from "@/elements/label/Label";
import Grid from "@/elements/grid/Grid";
import Spacer from "@/elements/spacer/Spacer";
import ButtonChecked from "@/elements/button/Button.checked";

const TYPES = ["낮잠", "밤잠"];

interface SleepFieldsProps {
  data: any;
  onChange: (data: any) => void;
}

const SleepFields = ({ data, onChange }: SleepFieldsProps) => {
  const [sleepType, setSleepType] = useState(data.sleepType ?? "");

  useEffect(() => {
    onChange({
      sleepType,
    });
  }, [sleepType, onChange]);

  const types = TYPES.map((v, i) => (
    <ButtonChecked
      key={i}
      v={v}
      i={i}
      state={sleepType}
      setState={setSleepType}
    />
  ));

  return (
    <>
      <Label css="inputForm" text="취침 종류" />
      <Spacer height={10} />
      <Grid items={types} column={2} />
    </>
  );
};

export default SleepFields;
