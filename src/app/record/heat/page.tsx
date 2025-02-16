"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/header/Header";
import Container from "@/elements/container/Container";
import { Label } from "@/elements/label/Label";
import Spacer from "@/elements/spacer/Spacer";
import Button from "@/elements/button/Button";
import InputForm from "@/components/form/InputForm";
import useAuth from "@/hook/useAuth";
import CustomDateTimePicker from "@/components/customDateTimePicker/CustomDateTimePicker";

const App: React.FC = () => {
  const router = useRouter();
  const { getToken } = useAuth();

  const [temperature, setTemperature] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = await getToken();
      const currentKid = localStorage.getItem("currentKid");

      if (!token || !currentKid || !selectedDate) {
        return;
      }

      const response = await fetch("/api/record", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          childId: currentKid,
          type: "TEMPERATURE",
          startTime: selectedDate,
          temperature: parseFloat(temperature),
        }),
      });

      if (response.ok) {
        router.back();
      }
    } catch (error) {
      console.error("기록 저장 에러:", error);
    }
  };

  return (
    <Container className="container" full>
      <Header title="체온 기록하기" onBack={() => router.back()} />
      <Spacer height={30} />
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", flex: 1 }}
      >
        <Label
          text={`다음의 경우 즉시 병원 방문을 권장합니다.`}
          css={"home_2"}
        />
        <Spacer height={10} />
        <Label text={`39도 이상의 고열이 지속될 때`} css={"home_2"} />
        <Label text={`심한 호흡 곤란이 있을 때`} css={"home_2"} />
        <Label text={`심한 탈수 증상이 있을 때`} css={"home_2"} />
        <Spacer height={30} />

        <Label css="inputForm" text="체온 기록 시간" />
        <Spacer height={10} />
        <CustomDateTimePicker
          selected={selectedDate}
          onSelect={(date) => setSelectedDate(date)}
        />
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
        <div style={{ flex: 1 }} />
        <Button label="등록하기" size="L" />
      </form>
    </Container>
  );
};

export default App;
