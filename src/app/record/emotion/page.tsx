"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/header/Header";
import Container from "@/elements/container/Container";
import { Label } from "@/elements/label/Label";
import Spacer from "@/elements/spacer/Spacer";
import Button from "@/elements/button/Button";
import Grid from "@/elements/grid/Grid";
import Image from "next/image";
import TextAreaForm from "@/components/textArea/TextArea";
import CustomDateTimePicker from "@/components/customDateTimePicker/CustomDateTimePicker";
import useAuth from "@/hook/useAuth";
import styles from "./emotion.module.css";

const EMOTIONS = [
  "행복해요",
  "활발해요",
  "평온해요",
  "나른해요",
  "불편해요",
  "슬퍼요",
];

const SPECIALS = [
  "없음",
  "놀이를 했어요",
  "외출했어요",
  "예방접종 했어요",
  "손님이 왔어요",
  "친구륾 만났어요",
];

const App: React.FC = () => {
  const router = useRouter();
  const { getToken } = useAuth();

  const [selectedDate, setSelectedDate] = useState<Date>();
  const [emotion, setEmotion] = useState("");
  const [special, setSpecial] = useState("");
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
          type: "EMOTION",
          startTime: selectedDate,
          emotion,
          special,
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

  const emotions = EMOTIONS.map((v, i) => (
    <button
      key={i}
      className={`${styles.kindButton} ${emotion === v ? styles.selected : ""}`}
      style={{ paddingTop: 8 }}
      onClick={() => setEmotion(v)}
      type="button"
    >
      <Image
        src={`/images/emotion${i + 1}.png`}
        alt={v}
        width={64}
        height={64}
      />
      {v}
    </button>
  ));

  const specials = SPECIALS.map((v, i) => (
    <button
      key={i}
      className={`${styles.kindButton} ${special === v ? styles.selected : ""}`}
      onClick={() => setSpecial(v)}
      type="button"
    >
      {v}
    </button>
  ));

  return (
    <Container className="container">
      <Header title="감정 기록하기" onBack={() => router.back()} />
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
        <Label css="inputForm" text="아이의 기분은 어떤가요?" />
        <Spacer height={10} />
        <Grid items={emotions} column={3} />

        <Spacer height={30} />
        <Label css="inputForm" text="특별한 일이 있나요?" />
        <Spacer height={10} />
        <Grid items={specials} column={2} />

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
