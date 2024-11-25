"use client";

import React from "react";
import { Label } from "@/elements/label/Label";
import Button from "@/elements/button/Button";
import { ChapterProps } from "@/hook/useChapter";

const Chapter2: React.FC<ChapterProps> = ({ onNext }) => {
    return (
        <div>
            <Label css="profileLabel" text="아이의 정보를 등록해주세요" />
            <Button css="nextBtn" onClick={onNext} label="다음"></Button>
        </div>
    );
};

export default Chapter2;
