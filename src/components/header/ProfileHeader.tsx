"use client";

import { Label } from "@/elements/label/Label";
import Profile from "@/elements/svg/Profile";
import styles from "./Header.module.css";
import { useEffect, useRef, useState } from "react";
import useChldrnList from "@/hook/useChldrnList";
import useChldrnListStore, { ChildInfo } from "@/store/useChldrnListStore";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useRouter } from "next/navigation";


interface ProfileHeaderProps {
    icon: React.ReactNode;
}


const ProfileHeader = ({ icon }: ProfileHeaderProps) => {
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLButtonElement>(null);
    const { getChldrnList } = useChldrnList();
    const setCurrentKid = useChldrnListStore((state) => state.setCurrentKid);
    const currentKid = useChldrnListStore((state) => state.currentKid);
    const today = format(new Date(), "M월 d일", { locale: ko });
    const childrenList = getChldrnList();

    // 현재 선택된 아이 정보 찾기
    const currentChild = childrenList?.find(
        (child: { chldrnNo: { toString: () => string | null } }) =>
            child.chldrnNo.toString() === currentKid
    ) || childrenList?.[0];

    const handleChildSelect = (childNo: number) => {
        setCurrentKid(childNo.toString());
        localStorage.setItem("currentkid", childNo.toString());
        setShowModal(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (
                modalRef.current && !modalRef.current.contains(target) &&
                profileRef.current && !profileRef.current.contains(target)
            ) {
                setShowModal(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const storedKid = localStorage.getItem("currentkid");
        if (storedKid) {
            setCurrentKid(storedKid);
        }
    }, [setCurrentKid]);

    const handleCalendarClick = () => {
        router.push('/note/calendar');
    };

    return (
        <div className={styles.container}>
            <div className={styles.infoBarWrapper}>
                <div className={styles.leftSection}>
                    <Label text={`${today}, 오늘`} css="babyName" />
                    <div className="divider"></div>
                    <Label text={`${currentChild?.chldrnNm} D+32`} css="countDown"></Label>
                </div>
                <div className={styles.rightSection}>
                    <div onClick={handleCalendarClick}>
                        {icon}
                    </div>
                    <button
                        ref={profileRef}
                        className={styles.profileWrapper}
                        onClick={() => setShowModal(!showModal)}
                    >
                        <Profile />
                    </button>
                </div>

            </div>

            {showModal && (
                <div ref={modalRef} className={styles.modal}>
                    {childrenList.map((list: ChildInfo, index: number) => (
                        <div key={list.chldrnNo}>
                            <div
                                className={styles.menuItem}
                                onClick={() => handleChildSelect(list.chldrnNo)}
                            >
                                <p>{list.chldrnNm}</p>
                            </div>
                            {index !== childrenList.length - 1 && (
                                <div className={styles.divider} />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProfileHeader;
