"use client";

import { useEffect, useState } from "react";
import { Label } from "@/elements/label/Label";
import InputForm from "@/components/form/InputForm";
import Spacer from "@/elements/spacer/Spacer";

interface TemperatureFieldsProps {
  data: any;
  onChange: (data: any) => void;
}

const TemperatureFields = ({ data, onChange }: TemperatureFieldsProps) => {
  const [temperature, setTemperature] = useState(
    data.temperature?.toString() ?? ""
  );

  useEffect(() => {
    onChange({
      temperature: temperature ? parseFloat(temperature) : null,
    });
  }, [temperature, onChange]);

  return (
    <>
      <Label text={`다음의 경우 즉시 병원 방문을 권장합니다.`} css={"home_2"} />
      <Spacer height={10} />
      <Label text={`39도 이상의 고열이 지속될 때`} css={"home_2"} />
      <Label text={`심한 호흡 곤란이 있을 때`} css={"home_2"} />
      <Label text={`심한 탈수 증상이 있을 때`} css={"home_2"} />
      <Spacer height={30} />

      <InputForm
        labelText="체온"
        placeholder="체온을 입력하세요"
        labelCss="inputForm"
        value={temperature}
        onChange={setTemperature}
        unit="℃"
        type="number"
      />
    </>
  );
};

export default TemperatureFields;
