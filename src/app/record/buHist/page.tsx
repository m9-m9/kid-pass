"use client";

import InputForm from "@/components/form/InputForm";
import Container from "@/elements/container/Container";
import { Label } from "@/elements/label/Label";
import { useState } from "react";
import Spacer from "@/elements/spacer/Spacer";
import Button from "@/elements/button/Button";
import useFetch from "@/hook/useFetch";
import Header from "@/components/header/Header";
import { useRouter } from "next/navigation";
import CustomDateTimePicker from "@/components/customDateTimePicker/CustomDateTimePicker";
import styles from "./buHist.module.css";
import Grid from "@/elements/grid/Grid";
import ButtonChecked from "@/elements/button/Button.checked";
import useAuth from "@/hook/useAuth";

const BUS = ["대변", "소변"];
const COLORS = ["노란색", "갈색", "검은색", "빨간색", "흰색", "회색"];
const COLORSVALUE = [
  "#D1B905",
  "#844A2A",
  "#444444",
  "#D13805",
  "#E8E8E8",
  "#8D8D8D",
];
const STLES = ["물변", "딱딱함", "적당함"];
const AMTS = ["적음", "보통", "많음"];

const App: React.FC = () => {
  const router = useRouter();
  const { getToken } = useAuth();

  const [diaperType, setDiaperType] = useState(""); // 대변/소변
  const [diaperColor, setDiaperColor] = useState(""); // 색깔
  const [diaperShape, setDiaperShape] = useState(""); // 형태
  const [diaperAmount, setDiaperAmount] = useState(""); // 양
  const [selectedDate, setSelectedDate] = useState<Date>();

  const { sendRequest, responseData, loading } = useFetch();

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
          type: "DIAPER",
          startTime: selectedDate,
          diaperType, // 대변/소변
          diaperColor, // 색깔
          diaperShape, // 형태
          diaperAmount, // 양
        }),
      });

      if (response.ok) {
        router.back();
      }
    } catch (error) {
      console.error("기록 저장 에러:", error);
    }
  };

  const bus = BUS.map((v, i) => (
    <ButtonChecked v={v} i={i} state={diaperType} setState={setDiaperType} />
  ));

  const colors = COLORS.map((v, i) => (
    <ButtonChecked
      v={v}
      i={i}
      children={
        <div
          style={{
            display: "flex",
            gap: 3,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: COLORSVALUE[i],
              width: 24,
              height: 24,
              borderRadius: 24,
            }}
          />
          {v}
        </div>
      }
      state={diaperColor}
      setState={setDiaperColor}
    />
  ));

  const stles = STLES.map((v, i) => (
    <ButtonChecked v={v} i={i} state={diaperShape} setState={setDiaperShape} />
  ));

  const amts = AMTS.map((v, i) => (
    <ButtonChecked
      v={v}
      i={i}
      state={diaperAmount}
      setState={setDiaperAmount}
    />
  ));

  return (
    <Container className="container">
      <Header title="배변 기록하기" onBack={() => router.back()} />
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
        <Label css="inputForm" text="일시" />
        <Spacer height={10} />
        <CustomDateTimePicker
          selected={selectedDate}
          onSelect={(date) => setSelectedDate(date)}
        />

        <Spacer height={30} />
        <Label css="inputForm" text="종류" />
        <Spacer height={10} />
        <Grid items={bus} column={2} />

        <Spacer height={30} />
        <Label css="inputForm" text="색깔" />
        <Spacer height={10} />
        <Grid items={colors} column={3} />

        <Spacer height={30} />
        <Label css="inputForm" text="형태" />
        <Spacer height={10} />
        <Grid items={stles} column={3} />

        <Spacer height={30} />
        <Label css="inputForm" text="양" />
        <Spacer height={10} />
        <Grid items={amts} column={3} />

        <Spacer height={30} />
        <Button label="등록하기" size="L" />
      </form>
    </Container>
  );
};

export default App;
