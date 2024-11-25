"use client";

import React from "react";
import { Label } from "@/elements/label/Label";
import Button from "@/elements/button/Button";
import { ChapterProps } from "@/hook/useChapter";

const Chapter5: React.FC<ChapterProps> = ({ onNext }) => {
    return (
        <div>
            <Label
                css="profileLabel"
                text="김아기에 대해
더 알려줄 것이 있나요?"
            />
            <Button css="nextBtn" onClick={onNext} label="작성 완료"></Button>
        </div>
    );
};

export default Chapter5;
