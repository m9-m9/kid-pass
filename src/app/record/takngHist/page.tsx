"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/header/Header";
import Container from "@/elements/container/Container";
import { Label } from "@/elements/label/Label";
import Spacer from "@/elements/spacer/Spacer";
import Button from "@/elements/button/Button";
import SearchListPicker from "@/components/searchListPicker/SearchListPicker";
import TextAreaForm from "@/components/textArea/TextArea";
import CustomDateTimePicker from "@/components/customDateTimePicker/CustomDateTimePicker";
import useAuth from "@/hook/useAuth";

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

const App: React.FC = () => {
  const router = useRouter();
  const { getToken } = useAuth();

  const [selectedDate, setSelectedDate] = useState<Date>();
  const [medicine, setMedicine] = useState("");
  const [memo, setMemo] = useState("");

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
          type: "MEDICINE",
          startTime: selectedDate,
          medicine,
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

  return (
    <Container className="container" full>
      <Header title="약 기록하기" onBack={() => router.back()} />
      <Spacer height={30} />
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", flex: 1 }}
      >
        <Label css="inputForm" text="복용 시간" />
        <Spacer height={10} />
        <CustomDateTimePicker
          selected={selectedDate}
          onSelect={(date) => setSelectedDate(date)}
        />
        <Spacer height={30} />

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

        <div style={{ flex: 1 }} />
        <Button label="등록하기" size="L" />
      </form>
    </Container>
  );
};

export default App;
