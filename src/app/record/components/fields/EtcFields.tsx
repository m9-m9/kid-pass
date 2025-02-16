"use client";

import { useEffect, useState } from "react";
import { Label } from "@/elements/label/Label";
import SearchListPicker from "@/components/searchListPicker/SearchListPicker";
import Spacer from "@/elements/spacer/Spacer";

interface SearchItem {
  id: string;
  name: string;
}

const CATEGORIES = [
  { id: "1", name: "신생아 반사행동" },
  { id: "2", name: "성장 행동" },
  { id: "3", name: "기타" },
];

interface EtcFieldsProps {
  data: any;
  onChange: (data: any) => void;
}

const EtcFields = ({ data, onChange }: EtcFieldsProps) => {
  const [category, setCategory] = useState(data.category ?? "");

  useEffect(() => {
    onChange({
      category,
    });
  }, [category, onChange]);

  return (
    <>
      <Label text="카테고리" css="inputForm" />
      <Spacer height={10} />
      <SearchListPicker
        items={CATEGORIES}
        mode="single"
        onSelect={(selected: SearchItem | SearchItem[]) => {
          const items = Array.isArray(selected) ? selected : [selected];
          setCategory(items[0]?.name || "");
        }}
        selectedItems={
          category
            ? CATEGORIES.find((item) => item.name === category)
            : undefined
        }
      />
    </>
  );
};

export default EtcFields;
