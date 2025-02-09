"use client";

import React, { useState } from "react";
import { Label } from "@/elements/label/Label";
import Button from "@/elements/button/Button";
import { ChapterProps } from "@/hook/useChapter";
import InputForm from "@/components/form/InputForm";
import styles from "../kid.module.css";
import { useChldrnInfoStore } from "@/store/useChldrnInfoStore";

const Chapter3: React.FC<ChapterProps> = ({ onNext }) => {
  const setDetails = useChldrnInfoStore((state) => state.setDetails);
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [head, setHead] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    birthDate: "",
    weight: "",
    height: "",
    head: "",
  });

  const validateBirthDate = (value: string) => {
    const regex = /^\d{8}$/;
    if (!regex.test(value)) {
      setErrors((prev) => ({
        ...prev,
        birthDate: "YYYYMMDD 형식으로 입력해주세요 (예: 20240101)",
      }));
      return false;
    }

    const year = parseInt(value.substring(0, 4));
    const month = parseInt(value.substring(4, 6));
    const day = parseInt(value.substring(6, 8));

    const date = new Date(year, month - 1, day);
    const isValidDate =
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day;

    if (!isValidDate) {
      setErrors((prev) => ({ ...prev, birthDate: "유효하지 않은 날짜입니다" }));
      return false;
    }

    setErrors((prev) => ({ ...prev, birthDate: "" }));
    return true;
  };

  const handleNameChange = (value: string) => {
    setName(value);
    if (!value) {
      setErrors((prev) => ({ ...prev, name: "이름을 입력해주세요" }));
    } else {
      setErrors((prev) => ({ ...prev, name: "" }));
    }
  };

  const handleBirthDateChange = (value: string) => {
    if (/[^\d]/.test(value)) {
      setErrors((prev) => ({ ...prev, birthDate: "숫자로만 입력해주세요" }));
      return;
    }

    const numbersOnly = value.replace(/[^\d]/g, "");
    setBirthDate(numbersOnly);

    if (numbersOnly.length > 0 && numbersOnly.length !== 8) {
      setErrors((prev) => ({
        ...prev,
        birthDate: "20241212 와 같이 입력해주세요",
      }));
      return;
    }

    if (numbersOnly.length === 0) {
      setErrors((prev) => ({ ...prev, birthDate: "출생일을 입력해주세요" }));
      return;
    }

    setErrors((prev) => ({ ...prev, birthDate: "" }));
  };

  const handleWeightChange = (value: string) => {
    setWeight(value);
    if (!value) {
      setErrors((prev) => ({ ...prev, weight: "몸무게를 입력해주세요" }));
    } else if (!/^\d+(\.\d{1,2})?$/.test(value)) {
      setErrors((prev) => ({
        ...prev,
        weight: "올바른 형식으로 입력해주세요",
      }));
    } else {
      setErrors((prev) => ({ ...prev, weight: "" }));
    }
  };

  const handleHeightChange = (value: string) => {
    setHeight(value);
    if (!value) {
      setErrors((prev) => ({ ...prev, height: "키를 입력해주세요" }));
    } else if (!/^\d+(\.\d)?$/.test(value)) {
      setErrors((prev) => ({
        ...prev,
        height: "올바른 형식으로 입력해주세요",
      }));
    } else {
      setErrors((prev) => ({ ...prev, height: "" }));
    }
  };

  const handleHeadChange = (value: string) => {
    setHead(value);
    if (!value) {
      setErrors((prev) => ({ ...prev, head: "머리둘레를 입력해주세요" }));
    } else if (!/^\d+(\.\d)?$/.test(value)) {
      setErrors((prev) => ({ ...prev, head: "올바른 형식으로 입력해주세요" }));
    } else {
      setErrors((prev) => ({ ...prev, head: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 모든 필드의 유효성 검사
    if (!name || !birthDate || !weight || !height || !head) {
      setErrors({
        name: name ? "" : "이름을 입력해주세요",
        birthDate: birthDate ? "" : "출생일을 입력해주세요",
        weight: weight ? "" : "몸무게를 입력해주세요",
        height: height ? "" : "키를 입력해주세요",
        head: head ? "" : "머리둘레를 입력해주세요",
      });
      return;
    }

    // 출생일 형식 검증
    const isValid = validateBirthDate(birthDate);
    if (!isValid) return;

    // 모든 검증을 통과하면 다음으로 진행
    setDetails([name, birthDate, weight, height, head]);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Label css="profileLabel" text="아이의 정보를<br>등록해주세요" />
      <div className={styles.inputArea}>
        <InputForm
          labelText="이름"
          labelCss="inputForm"
          value={name}
          onChange={handleNameChange}
          placeholder="홍길동"
          errorMessage={errors.name}
        />
        <InputForm
          labelText="출생일"
          labelCss="inputForm"
          value={birthDate}
          onChange={handleBirthDateChange}
          placeholder="YYYYMMDD"
          errorMessage={errors.birthDate}
        />
        <InputForm
          labelText="몸무게"
          labelCss="inputForm"
          value={weight}
          onChange={handleWeightChange}
          placeholder="8.xx 소수점 2자리까지 입력해주세요"
          errorMessage={errors.weight}
        />
        <InputForm
          labelText="키"
          labelCss="inputForm"
          value={height}
          onChange={handleHeightChange}
          placeholder="30.x 소수점 1자리까지 입력해주세요"
          errorMessage={errors.height}
        />
        <InputForm
          labelText="머리둘레"
          labelCss="inputForm"
          value={head}
          onChange={handleHeadChange}
          placeholder="50.x 소수점 1자리까지 입력해주세요"
          errorMessage={errors.head}
        />
      </div>
      <Button css="nextBtn" type="submit" label="다음"></Button>
    </form>
  );
};

export default Chapter3;
