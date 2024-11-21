import React, { useState, useEffect } from "react";
import { useModalStore } from "@/store/useModalStore";
import { Label } from "@/elements/label/Label";
import Modal from "@/components/Modal";

const Profile: React.FC = () => {
    const [chapter, setChapter] = useState(1);
    const { openModal, closeModal } = useModalStore();

    const nextChapter = () => {
        if (chapter === 5) {
            openModal(); // 마지막 챕터에서 모달 열기
        } else {
            setChapter((prev) => (prev < 5 ? prev + 1 : prev));
        }
    };

    useEffect(() => {
        // 현재 챕터가 변경될 때마다 RN으로 챕터 정보를 전달
        window.ReactNativeWebView?.postMessage(JSON.stringify({ chapter }));
    }, [chapter]);

    const chapters: { [key: number]: JSX.Element } = {
        1: (
            <div>
                <Label
                    css="profileLabel"
                    text="아이의 나이대가 어떻게 되나요?"
                />
            </div>
        ),
        2: (
            <div>
                <Label css="profileLabel" text="아이의 정보를 등록해주세요" />
            </div>
        ),
        3: (
            <div>
                <Label
                    css="profileLabel"
                    text="과거 증상과 진료 기록을 알려주세요"
                />
            </div>
        ),
        4: (
            <div>
                <Label
                    css="profileLabel"
                    text="아이에 대해 더 알려줄 것이 있나요?"
                />
            </div>
        ),
        5: (
            <div>
                <Label css="profileLabel" text="등록 완료 메시지" />
            </div>
        ),
    };

    return (
        <div>
            {chapters[chapter]}
            <button onClick={nextChapter}>
                {chapter === 5 ? "등록 완료" : "다음"}
            </button>

            {/* Modal에 동적으로 내용 전달 */}
            <Modal>
                <div>
                    <p>등록 완료 메시지입니다.</p>
                    <button onClick={closeModal}>닫기</button>
                </div>
            </Modal>
        </div>
    );
};

export default Profile;
