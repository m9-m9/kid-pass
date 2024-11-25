"use client";

import React from "react";
import { Label } from "@/elements/label/Label";
import Button from "@/elements/button/Button";
import { ChapterProps } from "@/hook/useChapter";

const Chapter3: React.FC<ChapterProps> = ({ onNext }) => {
    return (
        <div>
            <Label
                css="profileLabel"
                text="김아기의 과거 증상과
진료 기룍을 알려주세요"
            />
            <Button css="nextBtn" onClick={onNext} label="다음"></Button>
        </div>
    );
};

export default Chapter3;
