"use client";

import React from "react";
import { useChapter } from "../../../hook/useChapter";
import Chapter1 from "./Chapter1";
import Chapter2 from "./Chapter2";
import Chapter3 from "./Chapter3";
import Chapter4 from "./Chapter4";
import Chapter5 from "./Chapter5";

const ProfileChapters: React.FC = () => {
    const { chapter, nextChapter } = useChapter({
        totalChapters: 5,
        onComplete: () => {
            console.log("프로필 등록 완료");
        },
    });

    return (
        <div>
            {chapter === 1 && <Chapter1 onNext={nextChapter} />}
            {chapter === 2 && <Chapter2 onNext={nextChapter} />}
            {chapter === 3 && <Chapter3 onNext={nextChapter} />}
            {chapter === 4 && <Chapter4 onNext={nextChapter} />}
            {chapter === 5 && <Chapter5 onNext={nextChapter} />}
        </div>
    );
};

export default ProfileChapters;
