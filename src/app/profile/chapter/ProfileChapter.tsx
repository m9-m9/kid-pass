"use client";

import React from "react";
import { useProfileStore } from "@/store/useProfileStore"; // Zustand Store import
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
            const age = useProfileStore.getState().age; // Zustand 상태 직접 가져오기
            console.log("프로필 등록 완료:", { age }); // 상태 출력
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
