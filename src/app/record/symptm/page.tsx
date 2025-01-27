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
import Grid from "@/elements/grid/Grid";
import styles from "./styles.module.css";

const symptoms = [
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

const STR = ["약함", "보통", "심함"];

const App: React.FC = () => {
  const router = useRouter();

  const [mealAmount, setMealAmount] = useState("");
  const [mealTy, setMealTy] = useState("");
  const [mealMemo, setMealMemo] = useState("");

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
        <Label text="특이증상" css="inputForm" />
        <Spacer height={10} />
        <SearchListPicker
          items={symptoms}
          mode={"single"}
          onSelect={() => {}}
        />

        <Spacer height={30} />
        <Label css="inputForm" text="기타 사항" />
        <Spacer height={10} />
        <Grid items={strs} column={3} />

        <div style={{ flex: 1 }} />
        <Button label="등록하기" size="L" />
      </form>
    </Container>
  );
};

export default App;
