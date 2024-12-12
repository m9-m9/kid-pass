"use client";

import React, { useState } from "react";
import { useProfileStore } from "@/store/useProfileStore";
import useChapter from "@/hook/useChapter";
import Chapter1 from "./Chapter1";
import Chapter2 from "./Chapter2";
import Chapter3 from "./Chapter3";
import Chapter4 from "./Chapter4";
import Chapter5 from "./Chapter5";
import axios from "axios";

const ProfileChapters: React.FC = () => {
    const { chapter, nextChapter, goToChapter } = useChapter({
        totalChapters: 5,

        onComplete: async () => {
            try {
                // Zustand에서 필요한 데이터 가져오기
                const age = useProfileStore.getState().age; // chldrnTy
                const details = useProfileStore.getState().details; // [chldrnNm, chldrnBrthdy, chldrnBdwgh, chldrnHeight, chldrnHead]
                const symptmsNm = useProfileStore.getState().symptom; // 증상 리스트
                const allrgyNm = useProfileStore.getState().allergic; // 알러지 리스트
                const chldrnMemo = useProfileStore.getState().etc; // 추가 메모

                // details에서 각 필드를 추출
                const [
                    chldrnNm,
                    chldrnBrthdy,
                    chldrnBdwgh,
                    chldrnHeight,
                    chldrnHead,
                ] = details;

                // Body 데이터 생성
                const body = {
                    // chldrnTy: age,
                    chldrnNm: chldrnNm || "",
                    chldrnBrthdy: chldrnBrthdy || "",
                    chldrnBdwgh: parseFloat(chldrnBdwgh) || 0,
                    chldrnHeight: parseFloat(chldrnHeight) || 0,
                    chldrnHead: parseFloat(chldrnHead) || 0,
                    allrgyNm: allrgyNm || [],
                    symptmsNm: symptmsNm || [],
                    chldrnMemo: chldrnMemo || "",
                };

                console.log("아이 생성 데이터 ", body);

                const token =
                    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJrZWtlMiIsImF1dGgiOiJST0xFX0dOUkwiLCJleHAiOjE3MzQ2MTYzNDd9.qHkRvfBvlyiyB9IhYo5cpTqKwSKoQL1mWZc77Ln-P34IIMdSX1G_ScRkcxOmruMo0T0kFmy-Ej-bK8OQ-R4aqQ";
                // Axios POST 요청
                const response = await axios.post(
                    "http://localhost:8071/api/v1/chldrn/createChldrnInfo",
                    body,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`, // JWT 토큰 추가
                        },
                    },
                );

                // 성공 응답 처리
                console.log("Response:", response.data);
            } catch (error) {
                // 에러 처리
                if (axios.isAxiosError(error)) {
                    console.error(
                        "Axios Error:",
                        error.response?.data || error.message,
                    );
                } else {
                    console.error("서버 요청 실패", error);
                }
            }
        },
    });

    return (
        <div>
            {chapter === 1 && (
                <Chapter1 onNext={nextChapter} goToChapter={() => {}} />
            )}
            {chapter === 2 && (
                <Chapter2 onNext={nextChapter} goToChapter={() => {}} />
            )}
            {chapter === 3 && (
                <Chapter3 onNext={nextChapter} goToChapter={goToChapter} />
            )}
            {chapter === 4 && (
                <Chapter4 onNext={nextChapter} goToChapter={() => {}} />
            )}
            {chapter === 5 && (
                <Chapter5 onNext={nextChapter} goToChapter={() => {}} />
            )}
        </div>
    );
};

export default ProfileChapters;
