import React from "react";
import styles from "./note.module.css";
import Container from "@/elements/container/Container";
import { Label } from "@/elements/label/Label";

type Vaccine = {
    vaccine: string;
    dosesCompleted: number;
    dosesRemaining: number;
};

const vaccineName: Vaccine[] = [
    {
        vaccine: "결핵",
        dosesCompleted: 3,
        dosesRemaining: 2,
    },
    {
        vaccine: "B형간염",
        dosesCompleted: 2,
        dosesRemaining: 2,
    },
];

const VaccineCount = () => {
    return (
        <>
            <div className="verticalFlexbox gap-16 mt-32">
                {vaccineName.map((vaccineItem, index) => (
                    <Container className="vaccineCount" key={index}>
                        <div className="flex-7">
                            <Label
                                text={vaccineItem.vaccine}
                                css="vaccine"
                            ></Label>
                        </div>

                        <div className="horizonFlexbox align-center gap-4 flex-2">
                            {/* dosesCompleted 원 생성 */}
                            {Array.from({
                                length: vaccineItem.dosesCompleted,
                            }).map((_, i) => (
                                <span
                                    key={i}
                                    className={`${styles.circle} ${styles.dosesCompleted}`}
                                />
                            ))}
                            {/* dosesRemaining 원 생성 */}
                            {Array.from({
                                length: vaccineItem.dosesRemaining,
                            }).map((_, i) => (
                                <span
                                    key={i}
                                    className={`${styles.circle} ${styles.dosesRemaining}`}
                                />
                            ))}
                        </div>
                        <svg
                            className="flex-1"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M8 4l8 8-8 8"
                                stroke="black"
                                strokeWidth="1"
                                fill="none"
                            />
                        </svg>
                    </Container>
                ))}
            </div>
        </>
    );
};

export default VaccineCount;
