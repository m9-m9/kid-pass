"use client";

import React from "react";
import { useProfileStore } from "@/store/useProfileStore";
import useChapter from "@/hook/useChapter";
import Chapter1 from "./Chapter1";
import Chapter2 from "./Chapter2";
import Chapter3 from "./Chapter3";
import Chapter4 from "./Chapter4";
import Chapter5 from "./Chapter5";

const ProfileChapters: React.FC = () => {
  const { chapter, nextChapter, goToChapter } = useChapter({
    totalChapters: 5,
    onComplete: () => {
      const age = useProfileStore.getState().age;
      const detail = useProfileStore.getState().details;
      const symptom = useProfileStore.getState().symptom;
      const allergic = useProfileStore.getState().allergic;
      const etc = useProfileStore.getState().etc;

      console.log("나이:", { age });
      console.log("정보:", { detail });
      console.log("증상", { symptom });
      console.log("알러지", { allergic });
      console.log("알러지", { etc });
    },
  });

  return (
    <div>
      {chapter === 1 && <Chapter1 onNext={nextChapter} goToChapter={() => {}} />}
      {chapter === 2 && <Chapter2 onNext={nextChapter} goToChapter={() => {}} />}
      {chapter === 3 && <Chapter3 onNext={nextChapter} goToChapter={goToChapter} />}
      {chapter === 4 && <Chapter4 onNext={nextChapter} goToChapter={() => {}} />}
      {chapter === 5 && <Chapter5 onNext={nextChapter} goToChapter={() => {}} />}
    </div>
  );
};

export default ProfileChapters;
