"use client";

import React, { useState } from "react";
import { Label } from "@/elements/label/Label";
import Button from "@/elements/button/Button";
import { ChapterProps } from "@/hook/useChapter";
import InputForm from "@/components/form/InputForm";
import styles from "../profile.module.css";
import { useProfileStore } from "@/store/useProfileStore";

const Chapter2: React.FC<ChapterProps> = ({ onNext }) => {
  const setDetails = useProfileStore((state) => state.setDetails);

  // 각 입력 필드의 상태를 관리
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [headCircumference, setHeadCircumference] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 폼의 기본 동작(페이지 리로드)을 막음
    setDetails([name, birthDate, weight, height, headCircumference]);
    onNext(); // 다음으로 이동
  };

  return (
    <form onSubmit={handleSubmit}>
      <Label css="profileLabel" text="아이의 정보를<br>등록해주세요" />
      <div className={styles.inputArea}>
        <InputForm
          labelText="이름"
          labelCss="inputForm"
          value={name}
          onChange={setName}
          placeholder="홍길동"
          required={true}
          errorMessage="이름을 입력해주세요"
        />
        <InputForm
          labelText="출생일"
          labelCss="inputForm"
          value={birthDate}
          onChange={setBirthDate}
          placeholder="YYYY-MM-DD"
          required={true}
          errorMessage="출생일을 입력해주세요"
        />
        <InputForm
          labelText="몸무게"
          labelCss="inputForm"
          value={weight}
          onChange={setWeight}
          placeholder="8.xx 소수점 2자리까지 입력해주세요"
          required={true}
          errorMessage="몸무게를 입력해주세요"
        />
        <InputForm
          labelText="키"
          labelCss="inputForm"
          value={height}
          onChange={setHeight}
          placeholder="30.x 소수점 1자리까지 입력해주세요"
          required={true}
          errorMessage="키를 입력해주세요"
        />
        <InputForm
          labelText="머리둘레"
          labelCss="inputForm"
          value={headCircumference}
          onChange={setHeadCircumference}
          placeholder="50.x 소수점 1자리까지 입력해주세요"
          required={true}
          errorMessage="머리둘레를 입력해주세요"
        />
      </div>

      <Button css="nextBtn" type="submit" label="다음"></Button>
    </form>
  );
};

export default Chapter2;
