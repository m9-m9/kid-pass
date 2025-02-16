"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/header/Header";
import Container from "@/elements/container/Container";
import { Label } from "@/elements/label/Label";
import Spacer from "@/elements/spacer/Spacer";
import Button from "@/elements/button/Button";
import Grid from "@/elements/grid/Grid";
import ButtonChecked from "@/elements/button/Button.checked";
import TextAreaForm from "@/components/textArea/TextArea";
import CustomDateTimePicker from "@/components/customDateTimePicker/CustomDateTimePicker";
import useAuth from "@/hook/useAuth";

const TYPES = ["낮잠", "밤잠"];

const App: React.FC = () => {
  const router = useRouter();
  const { getToken } = useAuth();

  const [sleepType, setSleepType] = useState("");
  const [startTime, setStartTime] = useState<Date>();
  const [endTime, setEndTime] = useState<Date>();
  const [memo, setMemo] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = await getToken();
      const currentKid = localStorage.getItem("currentKid");

      if (!token || !currentKid || !startTime) {
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
          type: "SLEEP",
          startTime,
          endTime,
          sleepType,
          memo,
        }),
      });

      if (response.ok) {
        router.back();
      }
    } catch (error) {
      console.error("기록 저장 에러:", error);
    }
  };

  const types = TYPES.map((v, i) => (
    <ButtonChecked v={v} i={i} state={sleepType} setState={setSleepType} />
  ));

  return (
    <Container className="container">
      <Header title="수면 기록하기" onBack={() => router.back()} />
      <Spacer height={30} />
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          height: "100vh",
        }}
      >
        <Label css="inputForm" text="취침 시작" />
        <Spacer height={10} />
        <CustomDateTimePicker
          selected={startTime}
          onSelect={(date) => setStartTime(date)}
        />

        <Spacer height={10} />
        <Label css="inputForm" text="취침 종료" />
        <Spacer height={10} />
        <CustomDateTimePicker
          selected={endTime}
          onSelect={(date) => setEndTime(date)}
        />

        <Spacer height={30} />
        <Label css="inputForm" text="취침 종류" />
        <Spacer height={10} />
        <Grid items={types} column={2} />

        <Spacer height={30} />
        <TextAreaForm
          labelText="메모"
          labelCss="inputForm"
          value={memo}
          onChange={setMemo}
          placeholder="메모를 입력해주세요"
          maxLength={200}
          errorMessage={memo.length > 200 ? "200자를 초과할 수 없습니다" : ""}
        />

        <Spacer height={30} />
        <Button label="등록하기" size="L" />
      </form>
    </Container>
  );
};

export default App;
