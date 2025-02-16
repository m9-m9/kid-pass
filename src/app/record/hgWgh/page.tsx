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

  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [headSize, setHeadSize] = useState("");
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
          type: "GROWTH",
          startTime: selectedDate,
          weight: weight ? parseFloat(weight) : null,
          height: height ? parseFloat(height) : null,
          headSize: headSize ? parseFloat(headSize) : null,
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
      <Header title="몸무게・키・두위 기록하기" onBack={() => router.back()} />
      <Spacer height={30} />
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", flex: 1 }}
      >
        <Label text={`아침에 측정하는 것이 가장 정확해요`} css={"home_2"} />
        <Label text={`식사 전에 측정하는 것이 좋아요`} css={"home_2"} />
        <Label text={`같은 시간대에 측정하면 더 정확해요`} css={"home_2"} />
        <Spacer height={30} />

        <Label css="inputForm" text="측정 시간" />
        <Spacer height={10} />
        <CustomDateTimePicker
          selected={selectedDate}
          onSelect={(date) => setSelectedDate(date)}
        />
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

        <div style={{ flex: 1 }} />
        <Button label="등록하기" size="L" />
      </form>
    </Container>
  );
};

export default App;
