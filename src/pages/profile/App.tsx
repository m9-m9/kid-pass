import { Label } from "@/elements/label/Label";

import React, { useState } from "react";

const Profile: React.FC = () => {
    const [chapter, setChapter] = useState(1);

    const nextChapter = () => {
        setChapter((prev) => (prev < 5 ? prev + 1 : prev));
    };

    const prevChapter = () => {
        setChapter((prev) => (prev > 1 ? prev - 1 : prev));
    };

    const chapters: { [key: number]: JSX.Element } = {
        1: (
            <div>
                <Label
                    css="profileLabel"
                    text="아이의 나이대가 어떻게 되나요?"
                ></Label>
                {/* 나이대 선택 컴포넌트 */}
            </div>
        ),
        2: (
            <div>
                <Label
                    css="profileLabel"
                    text="아이의 정보를 등록해주세요"
                ></Label>
                {/* 정보 입력 폼 */}
            </div>
        ),
        3: (
            <div>
                <Label
                    css="profileLabel"
                    text="과거 증상과 진료 기록을 알려주세요"
                ></Label>
                {/* 과거 증상 입력 컴포넌트 */}
            </div>
        ),
        4: (
            <div>
                <Label
                    css="profileLabel"
                    text="아이에 대해 더 알려줄 것이 있나요?"
                ></Label>
                {/* 추가 정보 입력 폼 */}
            </div>
        ),
        5: (
            <div>
                <Label css="profileLabel" text="등록 완료 메시지"></Label>
                {/* 완료 메시지 */}
            </div>
        ),
    };

    return (
        <div>
            {chapters[chapter]}

            <div>
                <button onClick={prevChapter} disabled={chapter === 1}>
                    이전
                </button>
                <button onClick={nextChapter} disabled={chapter === 5}>
                    다음
                </button>
            </div>
        </div>
    );
};

export default Profile;
