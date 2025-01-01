"use client";

import React, { useEffect, useState } from "react";
import { useProfileStore } from "@/store/useProfileStore";
import useChapter from "@/hook/useChapter";
import Chapter1 from "./Chapter1";
import Chapter2 from "./Chapter2";
import Chapter3 from "./Chapter3";
import Chapter4 from "./Chapter4";
import Chapter5 from "./Chapter5";
import axios from "axios";
import useAuth from "@/hook/useAuth";
import Chapter6 from "./Chapter6";

const Register: React.FC = () => {
    const { getToken } = useAuth();
    const [token, setToken] = useState();

    useEffect(() => {
        const accessToken = getToken();
        setToken(accessToken);
    }, []);
    const { chapter, nextChapter, goToChapter } = useChapter({
        totalChapters: 6,
        onComplete: async () => {
            try {
                const age = useProfileStore.getState().age;
                const details = useProfileStore.getState().details;
                const symptmsNm = useProfileStore.getState().symptom;
                const allrgyNm = useProfileStore.getState().allergic;
                const chldrnMemo = useProfileStore.getState().etc;

                const [
                    chldrnNm,
                    chldrnBrthdy,
                    chldrnBdwgh,
                    chldrnHeight,
                    chldrnHead,
                ] = details;

                const sanitizeArray = (arr: string[]) => {
                    if (!Array.isArray(arr)) return [];
                    // 중복 제거, 빈 문자열 제거, 공백 제거
                    return [
                        ...new Set(
                            arr
                                .filter((item) => item && item.trim())
                                .map((item) => item.trim()),
                        ),
                    ];
                };

                const body = {
                    chldrnTy: age,
                    chldrnNm: chldrnNm,
                    chldrnBrthdy: chldrnBrthdy,
                    chldrnBdwgh: parseFloat(chldrnBdwgh) || 0,
                    chldrnHeight: parseFloat(chldrnHeight) || 0,
                    chldrnHead: parseFloat(chldrnHead) || 0,
                    allrgyNm: sanitizeArray(allrgyNm),
                    symptmsNm: sanitizeArray(symptmsNm),
                    chldrnMemo: chldrnMemo,
                };

                console.log("Sending data:", JSON.stringify(body, null, 2));

                const response = await axios.post(
                    "http://localhost:8071/api/v1/chldrn/createChldrnInfo",
                    body,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );

                console.log(response.data);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error("API Error:", {
                        message: error.message,
                        response: error.response?.data,
                        status: error.response?.status,
                    });
                    alert(
                        `저장 중 오류가 발생했습니다: ${
                            error.response?.data?.message || error.message
                        }`,
                    );
                } else {
                    console.error("Unknown Error:", error);
                    alert("알 수 없는 오류가 발생했습니다.");
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
                <Chapter3 onNext={nextChapter} goToChapter={() => {}} />
            )}
            {chapter === 4 && (
                <Chapter4 onNext={nextChapter} goToChapter={goToChapter} />
            )}
            {chapter === 5 && (
                <Chapter5 onNext={nextChapter} goToChapter={() => {}} />
            )}
            {chapter === 6 && (
                <Chapter6 onNext={nextChapter} goToChapter={() => {}} />
            )}
        </div>
    );
};

export default Register;
