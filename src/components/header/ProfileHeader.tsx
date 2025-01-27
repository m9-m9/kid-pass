'use client'

import { Label } from "@/elements/label/Label";
import Profile from "@/elements/svg/Profile";
import styles from "./Header.module.css"
import { useEffect, useRef, useState } from "react";

const ProfileHeader = () => {
    const [showModal, setShowModal] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLDivElement>(null);

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
                    <Label text="김아기," css="babyName" />
                    <Label text="12주" css="babyName" />
                    <div className="divider"></div>
                    <Label text="김아기 D+32" css="countDown"></Label>
                </div>
                <div
                    ref={profileRef}
                    className={styles.profileWrapper}
                    onClick={() => setShowModal(!showModal)}
                >
                    <Profile />
                </div>
            </div>

            {showModal && (
                <div ref={modalRef} className={styles.modal}>
                    <div className={styles.menuItem}>프로필 설정</div>
                    <div className={styles.menuItem}>로그아웃</div>
                </div>
            )}
        </div>
    );
};

export default ProfileHeader;
