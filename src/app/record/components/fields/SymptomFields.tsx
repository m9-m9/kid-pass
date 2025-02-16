"use client";

import { useEffect, useState } from "react";
import { Label } from "@/elements/label/Label";
import Grid from "@/elements/grid/Grid";
import Spacer from "@/elements/spacer/Spacer";
import SearchListPicker from "@/components/searchListPicker/SearchListPicker";
import SelectableButton from "@/app/components/button/SelectableButton";

interface SearchItem {
  id: string;
  name: string;
}

const SYMPTOMS = [
  { id: "1", name: "수유 거부" },
  { id: "2", name: "설사" },
  { id: "3", name: "발진" },
  { id: "4", name: "발열" },
  { id: "5", name: "콧물" },
  { id: "6", name: "기침" },
  { id: "7", name: "구토" },
  { id: "8", name: "보챔" },
  { id: "9", name: "식욕 부진" },
  { id: "10", name: "잦은 울음" },
  { id: "11", name: "수면 장애" },
  { id: "12", name: "코막힘" },
  { id: "13", name: "가래" },
  { id: "14", name: "젖병 거부" },
  { id: "15", name: "이유식 거부" },
  { id: "16", name: "묽은 변" },
  { id: "17", name: "땀이 많음" },
  { id: "18", name: "눈곱" },
  { id: "19", name: "열성 경련" },
  { id: "20", name: "중이염" },
];

const SEVERITY = ["약함", "보통", "심함"];

interface SymptomFieldsProps {
  data: any;
  onChange: (data: any) => void;
}

const SymptomFields = ({ data, onChange }: SymptomFieldsProps) => {
  const [symptom, setSymptom] = useState(data.symptom ?? "");
  const [severity, setSeverity] = useState(data.severity ?? "");

  useEffect(() => {
    onChange({
      symptom,
      severity,
    });
  }, [symptom, severity, onChange]);

  const severityButtons = SEVERITY.map((v, i) => (
    <SelectableButton
      key={i}
      isSelected={severity === v}
      onClick={() => setSeverity(v)}
    >
      {v}
    </SelectableButton>
  ));

  return (
    <>
      <Label text="특이증상" css="inputForm" />
      <Spacer height={10} />
      <SearchListPicker
        items={SYMPTOMS}
        mode="single"
        onSelect={(selected: SearchItem | SearchItem[]) => {
          const items = Array.isArray(selected) ? selected : [selected];
          setSymptom(items[0]?.name || "");
        }}
        selectedItems={
          symptom ? SYMPTOMS.find((item) => item.name === symptom) : undefined
        }
      />

      <Spacer height={30} />
      <Label css="inputForm" text="증상 정도" />
      <Spacer height={10} />
      <Grid items={severityButtons} column={3} />
    </>
  );
};

export default SymptomFields;
