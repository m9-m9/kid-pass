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
    const [birthDateError, setBirthDateError] = useState("");

    const validateBirthDate = (value: string) => {
        // YYYYMMDD 형식 검사
        const regex = /^\d{8}$/;
        if (!regex.test(value)) {
            setBirthDateError("YYYYMMDD 형식으로 입력해주세요 (예: 20240101)");
            return false;
        }

        // 년도, 월, 일 추출
        const year = parseInt(value.substring(0, 4));
        const month = parseInt(value.substring(4, 6));
        const day = parseInt(value.substring(6, 8));

        // 유효한 날짜인지 검사
        const date = new Date(year, month - 1, day);
        const isValidDate =
            date.getFullYear() === year &&
            date.getMonth() === month - 1 &&
            date.getDate() === day;

        if (!isValidDate) {
            setBirthDateError("유효하지 않은 날짜입니다");
            return false;
        }

        setBirthDateError("");
        return true;
    };

    const handleBirthDateChange = (value: string) => {
        // 숫자가 아닌 문자가 있는지 체크
        if (/[^\d]/.test(value)) {
            setBirthDateError("숫자로만 입력해주세요");
            return;
        }

        // 숫자만 남기고 저장
        const numbersOnly = value.replace(/[^\d]/g, "");
        setBirthDate(numbersOnly);

        // 길이 체크
        if (numbersOnly.length > 0 && numbersOnly.length !== 8) {
            setBirthDateError("20241212 와 같이 입력해주세요");
            return;
        }

        if (numbersOnly.length === 0) {
            setBirthDateError("출생일을 입력해주세요");
            return;
        }

        // 정상 입력인 경우 에러메시지 제거
        setBirthDateError("");
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // 빈칸 체크
        if (!birthDate) {
            setBirthDateError("출생일을 입력해주세요");
            return; // 상태 업데이트 후 리턴하여 리렌더링 보장
        }

        // 출생일 형식 검증
        const isValid = validateBirthDate(birthDate);
        if (!isValid) {
            return; // 유효하지 않은 경우 리턴
        }

        // 20241212 형식 체크 (년도와 월일이 유효한지)
        const year = parseInt(birthDate.substring(0, 4));
        const month = parseInt(birthDate.substring(4, 6));
        const day = parseInt(birthDate.substring(6, 8));
        const date = new Date(year, month - 1, day);

        if (
            date.getFullYear() !== year ||
            date.getMonth() !== month - 1 ||
            date.getDate() !== day
        ) {
            setBirthDateError("20241212 와 같이 입력해주세요");
            return;
        }

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
                    onChange={setName}
                    placeholder="홍길동"
                    required={true}
                    errorMessage=""
                />
                <InputForm
                    labelText="출생일"
                    labelCss="inputForm"
                    value={birthDate}
                    onChange={handleBirthDateChange}
                    placeholder="YYYYMMDD"
                    required={true}
                    errorMessage={birthDateError}
                />
                <InputForm
                    labelText="몸무게"
                    labelCss="inputForm"
                    value={weight}
                    onChange={setWeight}
                    placeholder="8.xx 소수점 2자리까지 입력해주세요"
                    required={true}
                    errorMessage=""
                />
                <InputForm
                    labelText="키"
                    labelCss="inputForm"
                    value={height}
                    onChange={setHeight}
                    placeholder="30.x 소수점 1자리까지 입력해주세요"
                    required={true}
                    errorMessage=""
                />
                <InputForm
                    labelText="머리둘레"
                    labelCss="inputForm"
                    value={head}
                    onChange={setHead}
                    placeholder="50.x 소수점 1자리까지 입력해주세요"
                    required={true}
                    errorMessage=""
                />
            </div>

            <Button css="nextBtn" type="submit" label="다음"></Button>
        </form>
    );
};

export default Chapter3;
