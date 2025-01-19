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
    <Container className="container" full>
      <Header title="몸무게・키・두위 기록하기" onBack={() => router.back()} />
      <Spacer height={30} />
      <form
        onSubmit={onSubmit}
        style={{ display: "flex", flexDirection: "column", flex: 1 }}
      >
        <Label text={`아침에 측정하는 것이 가장 정확해요`} css={"home_2"} />
        <Label text={`식사 전에 측정하는 것이 좋아요`} css={"home_2"} />
        <Label text={`같은 시간대에 측정하면 더 정확해요`} css={"home_2"} />
        <Spacer height={30} />

        <InputForm
          labelText="몸무게"
          placeholder=""
          labelCss="inputForm"
          value={mealAmount}
          onChange={setMealAmount}
          unit="kg"
        />
        <Spacer height={10} />

        <Spacer height={30} />
        <InputForm
          labelText="키"
          placeholder=""
          labelCss="inputForm"
          value={mealAmount}
          onChange={setMealAmount}
          unit="cm"
        />
        <Spacer height={10} />

        <Spacer height={30} />
        <InputForm
          labelText="두위 (머리둘레)"
          placeholder=""
          labelCss="inputForm"
          value={mealAmount}
          onChange={setMealAmount}
          unit="cm"
        />

        <div style={{ flex: 1 }} />
        <Button label="등록하기" size="L" />
      </form>
    </Container>
  );
};

export default App;
