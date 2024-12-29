"use client";

import InputForm from "@/components/form/InputForm";
import Container from "@/elements/container/Container";
import Grid from "@/elements/grid/Grid";
import Input from "@/elements/input/Input";
import { Label } from "@/elements/label/Label";
import { useEffect, useState } from "react";
import styles from "./feeding.module.css";
import Spacer from "@/elements/spacer/Spacer";
import Carousel from "@/components/carousel/Carousel";
import Button from "@/elements/button/Button";
import DateRangePicker from "@/components/dateRangePicker/DateRangePicker";
import useFetch from "@/hook/useFetch";

const SLIDES = ["30ml", "90ml", "120ml", "150ml", "모름"];
enum MealType {
  MHRSM = "모유",
  FOMULA = "분유",
  BABYFD = "이유식",
  MIXED = "혼합",
}

const MEALTYPES = [
  { key: MealType.MHRSM, value: "모유" },
  { key: MealType.FOMULA, value: "분유" },
  { key: MealType.BABYFD, value: "이유식" },
  { key: MealType.MIXED, value: "혼합" },
];

const MEALMEMO = ["🤮 토했어요", "🤚 수유 거부"];

const App: React.FC = () => {
  const [mealAmount, setMealAmount] = useState("");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [mealTy, setMealTy] = useState("");
  const [mealMemo, setMealMemo] = useState("");

  const { sendRequest, responseData, loading, destroy } = useFetch();

  useEffect(() => {
    return () => {
      destroy();
    };
  }, []);

  const etcs = MEALMEMO.map((v, i) => (
    <button
      key={i}
      className={`${styles.kindButton} ${mealMemo === v ? styles.selected : ""}`}
      onClick={() => setMealMemo(v)}
      type="button"
    >
      {v}
    </button>
  ));

  const kinds = MEALTYPES.map((v, i) => (
    <button
      key={i}
      className={`${styles.kindButton} ${mealTy === v.key ? styles.selected : ""}`}
      onClick={() => setMealTy(v.key)}
      type="button"
    >
      {v.value}
    </button>
  ));

  const handleSelect = (index: number) => {
    setSelectedItems([index]);
  };

  useEffect(() => {
    if (selectedItems[0] === 0) {
      setMealAmount("30");
    } else if (selectedItems[0] === 1) {
      setMealAmount("90");
    } else if (selectedItems[0] === 2) {
      setMealAmount("120");
    } else if (selectedItems[0] === 3) {
      setMealAmount("150");
    }
  }, [selectedItems]);

  const handleDateChange = (dates: any) => {
    const [start, end] = dates;
    console.log("시작일:", start);
    console.log("종료일:", end);
    // 여기서 원하는 처리를 하시면 됩니다
  };

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
    <Container className="container">
      <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <Label css="inputForm" text="수유 시간" />
        <Spacer height={10} />
        <DateRangePicker onChange={handleDateChange} />
        <Spacer height={30} />

        <Label css="inputForm" text="수유 종류" />
        <Spacer height={10} />
        <Grid items={kinds} column={2} />
        <Spacer height={30} />

        <InputForm
          labelText="수유량"
          placeholder="60"
          labelCss="inputForm"
          value={mealAmount}
          onChange={setMealAmount}
          unit="ml"
        />
        <Spacer height={10} />
        <div>
          <Carousel
            slides={SLIDES}
            options={{
              useButton: false,
              useIndex: false,
              dragFree: true,
              selectedItems: selectedItems,
              onSelect: handleSelect,
            }}
          />
        </div>
        <Spacer height={30} />
        <Label css="inputForm" text="기타 사항" />
        <Spacer height={10} />
        <Grid items={etcs} column={2} />

        <div style={{ flex: 1 }} />
        <Button label="등록하기" size="L" />
      </form>
    </Container>
  );
};

export default App;
