"use client";

import InputForm from "@/components/form/InputForm";
import Container from "@/elements/container/Container";
import Grid from "@/elements/grid/Grid";
import { Label } from "@/elements/label/Label";
import { useEffect, useState } from "react";
import styles from "./feeding.module.css";
import Spacer from "@/elements/spacer/Spacer";
import Carousel from "@/components/carousel/Carousel";
import Button from "@/elements/button/Button";
import Header from "@/components/header/Header";
import { useRouter, useSearchParams } from "next/navigation";
import CustomDateTimePicker from "@/components/customDateTimePicker/CustomDateTimePicker";
import useAuth from "@/hook/useAuth";

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

const FeedingPage = () => {
  const { getToken } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const recordId = searchParams.get("id");
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState(/* 초기값 */);

  const [mealAmount, setMealAmount] = useState("");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [mealTy, setMealTy] = useState("");
  const [mealMemo, setMealMemo] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>();

  const etcs = MEALMEMO.map((v, i) => (
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

  const kinds = MEALTYPES.map((v, i) => (
    <button
      key={i}
      className={`${styles.kindButton} ${
        mealTy === v.key ? styles.selected : ""
      }`}
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

  useEffect(() => {
    if (recordId) {
      setIsEdit(true);
      // 기존 데이터 조회
      fetchRecord(recordId);
    }
  }, [recordId]);

  const fetchRecord = async (id: string) => {
    try {
      const token = await getToken();
      const response = await fetch(`/api/record/${id}?type=FEEDING`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const { data } = await response.json();
        setSelectedDate(new Date(data.startTime));
        setMealTy(data.mealType);
        setMealAmount(data.amount?.toString() ?? "");
        setMealMemo(data.memo ?? "");
        // 수유량에 따른 selectedItems 설정
        const amountMap: Record<string, number> = {
          "30": 0,
          "90": 1,
          "120": 2,
          "150": 3,
        };
        if (data.amount) {
          setSelectedItems([amountMap[data.amount.toString()] ?? 4]);
        }
      }
    } catch (error) {
      console.error("기록 조회 에러:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = await getToken();
      const currentKid = localStorage.getItem("currentKid");

      if (!token || !currentKid) {
        return;
      }

      const response = await fetch(
        isEdit ? `/api/record/${recordId}` : "/api/record",
        {
          method: isEdit ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            childId: currentKid,
            type: "FEEDING",
            startTime: selectedDate,
            mealType: mealTy,
            amount: parseFloat(mealAmount),
            unit: "ml",
            memo: mealMemo,
          }),
        }
      );

      if (response.ok) {
        router.back();
      }
    } catch (error) {
      console.error("기록 저장 에러:", error);
    }
  };

  return (
    <Container className="container">
      <Header
        title={`수유 ${isEdit ? "수정" : "등록"}`}
        onBack={() => router.back()}
      />
      <Spacer height={30} />
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", flex: 1 }}
      >
        <Label css="inputForm" text="수유 시간" />
        <Spacer height={10} />
        <CustomDateTimePicker
          selected={selectedDate}
          onSelect={(date) => setSelectedDate(date)}
        />
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
        <Spacer height={30} />
        <Button label={recordId ? "수정하기" : "등록하기"} size="L" />
      </form>
    </Container>
  );
};

export default FeedingPage;
