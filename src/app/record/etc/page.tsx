"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/header/Header";
import Container from "@/elements/container/Container";
import { Label } from "@/elements/label/Label";
import Spacer from "@/elements/spacer/Spacer";
import Button from "@/elements/button/Button";
import Grid from "@/elements/grid/Grid";
import TextAreaForm from "@/components/textArea/TextArea";
import CustomDateTimePicker from "@/components/customDateTimePicker/CustomDateTimePicker";
import useAuth from "@/hook/useAuth";
import styles from "./styles.module.css";

const CATEGORIES = ["신생아 반사행동", "성장 행동"];

const App: React.FC = () => {
  const router = useRouter();
  const { getToken } = useAuth();

  const [selectedDate, setSelectedDate] = useState<Date>();
  const [category, setCategory] = useState("");
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
          type: "ETC",
          startTime: selectedDate,
          category,
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

  const categoryButtons = CATEGORIES.map((v, i) => (
    <button
      key={i}
      className={`${styles.kindButton} ${
        category === v ? styles.selected : ""
      }`}
      onClick={() => setCategory(v)}
      type="button"
    >
      {v}
    </button>
  ));

  return (
    <Container className="container" full>
      <Header title="기타 기록하기" onBack={() => router.back()} />
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

        <Label css="inputForm" text="성장발달 종류" />
        <Spacer height={10} />
        <Grid items={categoryButtons} column={2} />
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
