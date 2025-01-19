"use client";

import Container from "@/elements/container/Container";
import { Label } from "@/elements/label/Label";
import { useEffect, useState } from "react";
import Spacer from "@/elements/spacer/Spacer";
import Button from "@/elements/button/Button";
import useFetch from "@/hook/useFetch";
import Header from "@/components/header/Header";
import { useRouter } from "next/navigation";
import SearchListPicker from "@/components/searchListPicker/SearchListPicker";
import styles from "./styles.module.css";
import CustomDateTimePicker from "@/components/customDateTimePicker/CustomDateTimePicker";
import TextAreaForm from "@/components/textArea/TextArea";

const medicines = [
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

  const [selectedDate, setSelectedDate] = useState<Date>();
  const [mealAmount, setMealAmount] = useState("");
  const [mealTy, setMealTy] = useState("");
  const [mealMemo, setMealMemo] = useState("");
  const [memo, setMemo] = useState("");

  const { sendRequest, responseData, loading } = useFetch();

  const onSubmit = (e: any) => {
    e.preventDefault();

    sendRequest({
      url: "report/createMealHist",
      method: "POST",
      body: {
        mealTy,
        mealAmount,
        mealUnit: "ml",
        mealMemo,
      },
    });
  };

  return (
    <Container className="container" full>
      <Header title="약 기록하기" onBack={() => router.back()} />
      <Spacer height={30} />
      <form
        onSubmit={onSubmit}
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
          items={medicines}
          mode={"single"}
          onSelect={() => {}}
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
