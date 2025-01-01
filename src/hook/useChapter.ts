"use client";

import { useState, useEffect } from "react";

export interface ChapterProps {
    onNext: () => void;
    goToChapter: (targetNumber: number) => void;
}

export interface UseChapterProps {
    totalChapters: number;
    onComplete?: () => void;
}

const useChapter = ({ totalChapters, onComplete }: UseChapterProps) => {
    const [chapter, setChapter] = useState(1);

    const nextChapter = () => {
        if (chapter < totalChapters) {
            setChapter((prev) => prev + 1);
        } else if (onComplete) {
            onComplete();
        }
    };

    const previousChapter = () => {
        if (chapter > 1) {
            setChapter((prev) => prev - 1);
        }
    };

    const goToChapter = (targetChapter: number) => {
        if (targetChapter >= 1 && targetChapter <= totalChapters) {
            setChapter(targetChapter);
        }
    };

    useEffect(() => {
        window.ReactNativeWebView?.postMessage(JSON.stringify({ chapter }));
    }, [chapter]);

    return { chapter, nextChapter, previousChapter, goToChapter };
};

export default useChapter;
