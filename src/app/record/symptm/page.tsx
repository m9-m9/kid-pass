"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/header/Header";
import Container from "@/elements/container/Container";
import { Label } from "@/elements/label/Label";
import Spacer from "@/elements/spacer/Spacer";
import Button from "@/elements/button/Button";
import Grid from "@/elements/grid/Grid";
import SearchListPicker from "@/components/searchListPicker/SearchListPicker";
import useAuth from "@/hook/useAuth";
import CustomDateTimePicker from "@/components/customDateTimePicker/CustomDateTimePicker";
import styles from "./styles.module.css";

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

const App: React.FC = () => {
  const router = useRouter();
  const { getToken } = useAuth();

  const [selectedDate, setSelectedDate] = useState<Date>();
  const [symptom, setSymptom] = useState("");
  const [severity, setSeverity] = useState("");

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
          type: "SYMPTOM",
          startTime: selectedDate,
          symptom,
          severity,
        }),
      });

      if (response.ok) {
        router.back();
      }
    } catch (error) {
      console.error("기록 저장 에러:", error);
    }
  };

  const severityButtons = SEVERITY.map((v, i) => (
    <button
      key={i}
      className={`${styles.kindButton} ${
        severity === v ? styles.selected : ""
      }`}
      onClick={() => setSeverity(v)}
      type="button"
    >
      {v}
    </button>
  ));

  return (
    <Container className="container" full>
      <Header title="특이증상 기록하기" onBack={() => router.back()} />
      <Spacer height={30} />
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", flex: 1 }}
      >
        <Label css="inputForm" text="일시" />
        <Spacer height={10} />
        <CustomDateTimePicker
          selected={selectedDate}
          onSelect={(date) => setSelectedDate(date)}
        />

        <Spacer height={30} />
        <Label text="특이증상" css="inputForm" />
        <Spacer height={10} />
        <SearchListPicker
          items={SYMPTOMS}
          mode="single"
          onSelect={(selected: SearchItem | SearchItem[]) => {
            const items = Array.isArray(selected) ? selected : [selected];
            setSymptom(items[0]?.name || "");
          }}
        />

        <Spacer height={30} />
        <Label css="inputForm" text="증상 정도" />
        <Spacer height={10} />
        <Grid items={severityButtons} column={3} />

        <div style={{ flex: 1 }} />
        <Button label="등록하기" size="L" />
      </form>
    </Container>
  );
};

export default App;
