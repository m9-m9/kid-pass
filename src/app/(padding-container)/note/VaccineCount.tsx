

import React  from "react";
import styles from "./note.module.css";
import Container from "@/elements/container/Container";
import { Label } from "@/elements/label/Label";
import { VacntnInfo } from "./page";

interface VaccineCountProps {
    vacntnInfo: VacntnInfo[];
}


const VaccineCount = ({vacntnInfo}: VaccineCountProps) => {

  

    return (
        <>
            <div className="verticalFlexbox gap-16 mt-32">
                {vacntnInfo.map((vaccineItem, index) => (
                    <Container className="vaccineCount" key={index}>
                        <div className="flex-7">
                            <Label
                                text={vaccineItem.vacntnIctsd}
                                css="vaccine"
                            ></Label>
                        </div>

                        <div className="horizonFlexbox align-center gap-4 flex-2">
                            {Array.from({
                                length: vaccineItem.vacntnOdr,
                            }).map((_, i) => (
                                <span
                                    key={i}
                                    className={`${styles.circle} ${styles.dosesCompleted}`}
                                />
                            ))}
                            {/* dosesRemaining 원 생성 */}
                            {Array.from({
                                length: vaccineItem.vacntnCnt,
                            }).map((_, i) => (
                                <span
                                    key={i}
                                    className={`${styles.circle} ${styles.dosesRemaining}`}
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
        </>
    );
};

export default VaccineCount;
