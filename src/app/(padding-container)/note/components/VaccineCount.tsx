'use client'

import React, { useEffect, useState } from "react";
import styles from "../styles/note.module.css";
import Container from "@/elements/container/Container";
import { Label } from "@/elements/label/Label";
import { VacntnInfo } from "../page";
import { useRouter } from "next/navigation";
import { VACCINE_LIST } from '../vaccine';

interface VaccineCountProps {
    vacntnInfo: VacntnInfo[];
}

const VaccineCount = ({ vacntnInfo }: VaccineCountProps) => {
    const router = useRouter();
    const [currentKid, setCurrentKid] = useState<string>('');

    useEffect(() => {
        setCurrentKid(localStorage.getItem("currentkid") ?? '');
    }, []);

    const handleVaccineClick = (vaccineName: string) => {
        router.push(`/note/detail/${vaccineName}?currentKid=${currentKid}`);
    };

    // vacntnInfo에서 특정 백신의 접종 정보를 찾는 함수
    const findVaccineInfo = (vaccineName: string) => {
        return vacntnInfo.find(info => info.vacntnIctsd === vaccineName);
    };

    return (
        <Container className="vaccineCount">
            {VACCINE_LIST.map((vaccine) => {
                const vaccineInfo = findVaccineInfo(vaccine.name);

                return (
                    <div
                        className={styles.vaccineList}
                        key={vaccine.id}
                        onClick={() => handleVaccineClick(vaccine.name)}
                    >
                        <div style={{ flex: 5 }}>
                            <Label
                                text={vaccine.name}
                                css="vaccine"
                            />
                        </div>

                        <div className="horizonFlexbox align-center gap-4" style={{ flex: 3 }}>
                            {Array.from({ length: vaccine.requiredCount }, (_, i) => (
                                <span
                                    key={`${vaccine.id}-${i}`}
                                    className={`${styles.circle} ${vaccineInfo && i < vaccineInfo.vacntnOdr
                                        ? styles.vaccineComplete
                                        : styles.vaccineIncomplete
                                        }`}
                                />
                            ))}
                        </div>
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M8 4l8 8-8 8"
                                stroke="black"
                                strokeWidth="3"
                                fill="none"
                            />
                        </svg>
                    </div>
                );
            })}
        </Container>
    );
};

export default VaccineCount;