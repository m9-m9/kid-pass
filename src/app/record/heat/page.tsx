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

  return (
    <Container className="container">
      <Header title="체온 기록하기" onBack={() => router.back()} />
      <Spacer height={30} />
      <form
        onSubmit={onSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          height: "100vh",
        }}
      >
        <Label
          text={`다음의 경우 즉시 병원 방문을 권장합니다.`}
          css={"home_2"}
        />
        <Spacer height={10} />
        <Label text={`39도 이상의 고열이 지속될 때`} css={"home_2"} />
        <Label text={`심한 호흡 곤란이 있을 때`} css={"home_2"} />
        <Label text={`심한 탈수 증상이 있을 때`} css={"home_2"} />
        <Spacer height={30} />

        <InputForm
          labelText="체온"
          placeholder=""
          labelCss="inputForm"
          value={mealAmount}
          onChange={setMealAmount}
          unit="℃"
        />
        <div style={{ flex: 1 }} />
        <Button label="등록하기" size="L" />
      </form>
    </Container>
  );
};

export default App;
