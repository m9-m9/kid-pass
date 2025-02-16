"use client";

import { useEffect, useState } from "react";
import { Label } from "@/elements/label/Label";
import InputForm from "@/components/form/InputForm";
import Spacer from "@/elements/spacer/Spacer";

interface GrowthFieldsProps {
  data: any;
  onChange: (data: any) => void;
}

const GrowthFields = ({ data, onChange }: GrowthFieldsProps) => {
  const [weight, setWeight] = useState(data.weight?.toString() ?? "");
  const [height, setHeight] = useState(data.height?.toString() ?? "");
  const [headSize, setHeadSize] = useState(data.headSize?.toString() ?? "");

  useEffect(() => {
    onChange({
      weight: weight ? parseFloat(weight) : null,
      height: height ? parseFloat(height) : null,
      headSize: headSize ? parseFloat(headSize) : null,
    });
  }, [weight, height, headSize, onChange]);

  return (
    <>
      <Label text={`다음의 경우 더 정확한 측정이 가능합니다.`} css={"home_2"} />
      <Spacer height={10} />
      <Label text={`식사 전에 측정하는 것이 좋아요`} css={"home_2"} />
      <Label text={`같은 시간대에 측정하면 더 정확해요`} css={"home_2"} />
      <Spacer height={30} />

      <InputForm
        labelText="몸무게"
        placeholder="몸무게를 입력하세요"
        labelCss="inputForm"
        value={weight}
        onChange={setWeight}
        unit="kg"
        type="number"
      />
      <Spacer height={30} />

      <InputForm
        labelText="키"
        placeholder="키를 입력하세요"
        labelCss="inputForm"
        value={height}
        onChange={setHeight}
        unit="cm"
        type="number"
      />
      <Spacer height={30} />

      <InputForm
        labelText="두위 (머리둘레)"
        placeholder="두위를 입력하세요"
        labelCss="inputForm"
        value={headSize}
        onChange={setHeadSize}
        unit="cm"
        type="number"
      />
    </>
  );
};

export default GrowthFields;
