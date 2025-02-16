"use client";

import { useEffect, useState } from "react";
import { Label } from "@/elements/label/Label";
import Grid from "@/elements/grid/Grid";
import InputForm from "@/components/form/InputForm";
import Carousel from "@/components/carousel/Carousel";
import Spacer from "@/elements/spacer/Spacer";
import SelectableButton from "@/app/components/button/SelectableButton";

const SLIDES = ["30ml", "90ml", "120ml", "150ml", "모름"];
enum MealType {
  MHRSM = "모유",
  FOMULA = "분유",
  BABYFD = "이유식",
  MIXED = "혼합",
}

const MEALTYPES = [
  { key: MealType.MHRSM, value: "모유" },
  { key: MealType.FOMULA, value: "분유" },
  { key: MealType.BABYFD, value: "이유식" },
  { key: MealType.MIXED, value: "혼합" },
];

interface FeedingFieldsProps {
  data: any;
  onChange: (data: any) => void;
}

const FeedingFields = ({ data, onChange }: FeedingFieldsProps) => {
  const [mealAmount, setMealAmount] = useState(data.amount?.toString() ?? "");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [mealTy, setMealTy] = useState(data.mealType ?? "");

  useEffect(() => {
    onChange({
      mealType: mealTy,
      amount: parseFloat(mealAmount),
      unit: "ml",
    });
  }, [mealTy, mealAmount, onChange]);

  useEffect(() => {
    if (selectedItems[0] === 0) setMealAmount("30");
    else if (selectedItems[0] === 1) setMealAmount("90");
    else if (selectedItems[0] === 2) setMealAmount("120");
    else if (selectedItems[0] === 3) setMealAmount("150");
  }, [selectedItems]);

  const kinds = MEALTYPES.map((v, i) => (
    <SelectableButton
      key={i}
      isSelected={mealTy === v.key}
      onClick={() => setMealTy(v.key)}
    >
      {v.value}
    </SelectableButton>
  ));

  return (
    <>
      <Label css="inputForm" text="수유 종류" />
      <Spacer height={10} />
      <Grid items={kinds} column={2} />
      <Spacer height={30} />

      <InputForm
        labelText="수유량"
        placeholder="60"
        labelCss="inputForm"
        value={mealAmount}
        onChange={setMealAmount}
        unit="ml"
      />
      <Spacer height={10} />
      <div>
        <Carousel
          slides={SLIDES}
          options={{
            useButton: false,
            useIndex: false,
            dragFree: true,
            selectedItems: selectedItems,
            onSelect: (index: number) => setSelectedItems([index]),
          }}
        />
      </div>
    </>
  );
};

export default FeedingFields;
