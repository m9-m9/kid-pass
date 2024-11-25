"use client";

import { useState, useEffect } from "react";

export interface ChapterProps {
    onNext: () => void;
}

export interface UseChapterProps {
    totalChapters: number;
    onComplete?: () => void;
}

export const useChapter = ({ totalChapters, onComplete }: UseChapterProps) => {
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

    useEffect(() => {
        // React Native와 통신
        window.ReactNativeWebView?.postMessage(JSON.stringify({ chapter }));
    }, [chapter]);

    return { chapter, nextChapter, previousChapter };
};
