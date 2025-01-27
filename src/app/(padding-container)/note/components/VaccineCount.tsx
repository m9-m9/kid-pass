'use client'

import React, { useEffect, useState } from "react";
import styles from "../note.module.css";
import Container from "@/elements/container/Container";
import { Label } from "@/elements/label/Label";
import { VacntnInfo } from "../page";
import { useRouter } from "next/navigation";

interface VaccineCountProps {
    vacntnInfo: VacntnInfo[];
}

const VaccineCount = ({ vacntnInfo }: VaccineCountProps) => {
    const router = useRouter();
    const [currentKid, setCurrentKid] = useState<string>('');

    useEffect(() => {


        setCurrentKid(localStorage.getItem("currentkid") ?? '');
    }, []);

    const handleVaccineClick = (vacntnIctsd: string) => {
        router.push(`/note/detail/${vacntnIctsd}?currentKid=${currentKid}`);
    };

    return (
        <div className="verticalFlexbox gap-16 mt-32">
            {vacntnInfo.map((vaccineItem) => (
                <Container
                    className="vaccineCount"
                    key={vaccineItem.vacntnNo}
                    onClick={() => handleVaccineClick(vaccineItem.vacntnIctsd)}
                    style={{ cursor: 'pointer' }}
                >
                    <div className="flex-7">
                        <Label
                            text={vaccineItem.vacntnIctsd}
                            css="vaccine"
                        ></Label>
                    </div>

                    <div className="horizonFlexbox align-center gap-4 flex-2">
                        {Array.from({ length: vaccineItem.vacntnCnt }, (_, i) => (
                            <span
                                key={`${vaccineItem.vacntnNo}-${i}`}
                                className={`${styles.circle} ${i < vaccineItem.vacntnOdr ? styles.vaccineComplete : styles.vaccineIncomplete
                                    }`}
                            />
                        ))}
                    </div>
                    <svg
                        className="flex-1"
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
                </Container>
            ))}
        </div>
    );
};

export default VaccineCount;