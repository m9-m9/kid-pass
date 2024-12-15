"use client";

import React, { useState } from "react";
import { Label } from "@/elements/label/Label";
import Button from "@/elements/button/Button";
import { ChapterProps } from "@/hook/useChapter";
import ListInput from "@/elements/input/ListInput";
import Circleline from "@/elements/svg/Checkbox";
import styles from "../profile.module.css";
import XIcon from "@/elements/svg/XIcon";
import { useProfileStore } from "@/store/useProfileStore";

const Chapter4: React.FC<ChapterProps> = ({ onNext }) => {
    const [symptomInputValue, setSymptomInputValue] = useState("");
    const [allergicInputValue, setAllergicInputValue] = useState("");
    const [symptomList, setSymptomList] = useState<string[]>([]);
    const [allergicList, setAllergicList] = useState<string[]>([]);

    const setSymptom = useProfileStore((state) => state.setSymptom);
    const setAllergic = useProfileStore((state) => state.setAllergic);

    // 증상 추가
    const addSymptom = () => {
        const trimmedValue = symptomInputValue.trim();
        if (trimmedValue && !symptomList.includes(trimmedValue)) {
            setSymptomList((prev) => [...prev, trimmedValue]);
            setSymptomInputValue("");
        }
    };

    // 증상 입력
    const handleSymptomKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        // 한글 입력 중이면 무시
        if (e.nativeEvent.isComposing) {
            return;
        }

        if (e.key === "Enter") {
            e.preventDefault();
            addSymptom();
        }
    };

    // 증상 삭제
    const removeSymptom = (index: number) => {
        setSymptomList((prev) => prev.filter((_, i) => i !== index));
    };

    // 알레르기 추가 함수
    const addAllergic = () => {
        const trimmedValue = allergicInputValue.trim();
        console.log("입력된 값:", trimmedValue); // 입력값 확인

        if (trimmedValue && !allergicList.includes(trimmedValue)) {
            console.log("추가되기 전 리스트:", allergicList); // 현재 리스트 확인
            setAllergicList((prev) => {
                console.log("업데이트될 리스트:", [...prev, trimmedValue]); // 업데이트될 리스트 확인
                return [...prev, trimmedValue];
            });
            setAllergicInputValue("");
        }
    };

    // 알레르기 입력
    const handleAllergicKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
    ) => {
        // 한글 입력 중이면 무시
        if (e.nativeEvent.isComposing) {
            return;
        }

        if (e.key === "Enter") {
            e.preventDefault();
            addAllergic();
        }
    };
    // 알레르기 삭제
    const removeAllergic = (index: number) => {
        setAllergicList((prev) => prev.filter((_, i) => i !== index));
    };

    const handleNext = () => {
        // Zustand store에 저장
        setSymptom(symptomList);
        setAllergic(allergicList);

        // 부모 컴포넌트로 이동
        onNext();
    };

    return (
        <div>
            <Label
                css="profileLabel"
                text="김아기의 과거 증상과<br>
진료 기록을 알려주세요"
            />
            <div className={`${styles.listInputArea} mt-48 `}>
                <Label
                    text="과거에 진단받은 질환이 있나요?"
                    css="profileDesc"
                />
                <div className="flex gap-12">
                    <ListInput
                        type="text"
                        className="listInputForm"
                        value={symptomInputValue}
                        placeholder="ex:아토피"
                        onChange={(e) => setSymptomInputValue(e.target.value)}
                        onKeyDown={handleSymptomKeyDown}
                    />
                    <Circleline
                        color="#729BED"
                        className="symptomInputCheckbox"
                        onClick={addSymptom}
                    />
                </div>
            </div>
            <div className="mt-20 verticalFlexbox gap-8 mb-48">
                {symptomList.map((symptom, index) => (
                    <div key={index} className={styles.symptomList}>
                        <Label css="profSymtomp" text={symptom} />
                        <XIcon
                            color="#222222"
                            onClick={() => removeSymptom(index)}
                        />
                    </div>
                ))}
            </div>

            <Label
                text="약품이나 식품에<br>알러지가 있다면 적어주세요"
                css="profileDesc"
            />
            <div className={`${styles.listInputArea}`}>
                <div className="flex gap-12">
                    <ListInput
                        type="text"
                        className="listInputForm"
                        value={allergicInputValue}
                        placeholder="ex:땅콩"
                        onChange={(e) => setAllergicInputValue(e.target.value)}
                        onKeyDown={handleAllergicKeyDown}
                    />
                    <Circleline
                        color="#729BED"
                        className="allergicInputCheckbox"
                        onClick={addAllergic}
                    />
                </div>
            </div>
            <div className="mt-20 verticalFlexbox gap-8 mb-120">
                {allergicList.map((allergic, index) => (
                    <div key={index} className={styles.symptomList}>
                        <Label css="profSymtomp" text={allergic} />

                        <XIcon
                            color="#222222"
                            onClick={() => removeAllergic(index)}
                        />
                    </div>
                ))}
            </div>
            <Button css="nextBtn" onClick={handleNext} label="다음"></Button>
        </div>
    );
};

export default Chapter4;
