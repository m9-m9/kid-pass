"use client";

import Container from "@/elements/container/Container";
import { Label } from "@/elements/label/Label";
import { useState } from "react";
import Spacer from "@/elements/spacer/Spacer";
import Button from "@/elements/button/Button";
import useFetch from "@/hook/useFetch";
import Header from "@/components/header/Header";
import { useRouter } from "next/navigation";
import Grid from "@/elements/grid/Grid";
import styles from "./styles.module.css";
import TextAreaForm from "@/components/textArea/TextArea";
import CustomDateTimePicker from "@/components/customDateTimePicker/CustomDateTimePicker";

const STR = ["신생아 반사행동", "성장 행동"];

const App: React.FC = () => {
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [mealMemo, setMealMemo] = useState("");
  const [memo, setMemo] = useState("");
  const { sendRequest, responseData, loading } = useFetch();

  const onSubmit = (e: any) => {
    e.preventDefault();

    sendRequest({
      url: "report/createMealHist",
      method: "POST",
      body: {},
    });
  };

  const strs = STR.map((v, i) => (
    <button
      key={i}
      className={`${styles.kindButton} ${
        mealMemo === v ? styles.selected : ""
      }`}
      onClick={() => setMealMemo(v)}
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
        onSubmit={onSubmit}
        style={{ display: "flex", flexDirection: "column", flex: 1 }}
      >
        <Label css="inputForm" text="일시" />
        <Spacer height={10} />
        <CustomDateTimePicker
          selected={selectedDate}
          onSelect={(date) => date && setSelectedDate(date)}
        />
        <Spacer height={30} />

        <Label css="inputForm" text="성장발달 종류" />
        <Spacer height={10} />
        <Grid items={strs} column={2} />
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
