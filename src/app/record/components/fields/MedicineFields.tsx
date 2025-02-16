"use client";

import { useEffect, useState } from "react";
import { Label } from "@/elements/label/Label";
import Spacer from "@/elements/spacer/Spacer";
import SearchListPicker from "@/components/searchListPicker/SearchListPicker";

interface SearchItem {
  id: string;
  name: string;
}

const MEDICINES = [
  { id: "1", name: "타이레놀 시럽" },
  { id: "2", name: "아티푸스 시럽" },
  { id: "3", name: "케토라신 시럽" },
  { id: "4", name: "어린이용 부루펜" },
  { id: "5", name: "무코판 시럽" },
  { id: "6", name: "씨프로바이 시럽" },
  { id: "7", name: "메디퓨드 시럽" },
  { id: "8", name: "푸로탈 시럽" },
  { id: "9", name: "액티피드 시럽" },
  { id: "10", name: "베나돌 시럽" },
  { id: "11", name: "테라플루 시럽" },
  { id: "12", name: "페니라민 시럽" },
  { id: "13", name: "클래리틴 시럽" },
  { id: "14", name: "진코민 시럽" },
  { id: "15", name: "데코푸린 시럽" },
];

interface MedicineFieldsProps {
  data: any;
  onChange: (data: any) => void;
}

const MedicineFields = ({ data, onChange }: MedicineFieldsProps) => {
  const [medicine, setMedicine] = useState(data.medicine ?? "");

  useEffect(() => {
    onChange({
      medicine,
    });
  }, [medicine, onChange]);

  return (
    <>
      <Label text="어떤 약을 먹었나요?" css="inputForm" />
      <Spacer height={10} />
      <SearchListPicker
        items={MEDICINES}
        mode="single"
        onSelect={(selected: SearchItem | SearchItem[]) => {
          const items = Array.isArray(selected) ? selected : [selected];
          setMedicine(items[0]?.name || "");
        }}
        selectedItems={
          medicine
            ? MEDICINES.find((item) => item.name === medicine)
            : undefined
        }
      />
    </>
  );
};

export default MedicineFields;
