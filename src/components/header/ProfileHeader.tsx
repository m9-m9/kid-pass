'use client'

import { Label } from "@/elements/label/Label";
import Profile from "@/elements/svg/Profile";
import styles from "./Header.module.css"
import { useEffect, useRef, useState } from "react";
import useChldrnList from "@/hook/useChldrnList";
import useChldrnListStore, { ChildInfo } from "@/store/useChldrnListStore";



const ProfileHeader = () => {
    const [showModal, setShowModal] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLButtonElement>(null);
    const { getChldrnList } = useChldrnList();
    const setCurrentKid = useChldrnListStore((state) => state.setCurrentKid);
    const currentKid = useChldrnListStore((state) => state.currentKid); // currentKid 구독

    // 컴포넌트에서 자녀 목록 가져오기
    const childrenList = getChldrnList();

    // 현재 선택된 아이 정보 찾기
    const currentChild = childrenList?.find((child: { chldrnNo: { toString: () => string | null; }; }) => child.chldrnNo.toString() === currentKid) || childrenList?.[0];

    const handleChildSelect = (childNo: number) => {
        // localStorage,zustand 업데이트
        setCurrentKid(childNo.toString());
        localStorage.setItem("currentkid", childNo.toString());
        // 모달 닫기
        setShowModal(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (modalRef.current && !modalRef.current.contains(target) &&
                profileRef.current && !profileRef.current.contains(target)) {
                setShowModal(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.infoBarWrapper}>
                <div className={styles.leftSection}>
                    <Label text={currentChild?.chldrnNm} css="babyName" />
                    <Label text="12주" css="babyName" />
                    <div className="divider"></div>
                    <Label text="김아기 D+32" css="countDown"></Label>
                </div>
                <button
                    ref={profileRef}
                    className={styles.profileWrapper}
                    onClick={() => setShowModal(!showModal)}
                >
                    <Profile />
                </button>
            </div>

            {showModal && (
                <div ref={modalRef} className={styles.modal}>
                    {childrenList.map((list: ChildInfo, index: number) => (
                        <div key={list.chldrnNo}>
                            <div className={styles.menuItem} onClick={() => handleChildSelect(list.chldrnNo)} >
                                <p>{list.chldrnNm}</p>
                            </div>
                            {index !== childrenList.length - 1 && <div className={styles.divider} />}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProfileHeader;
