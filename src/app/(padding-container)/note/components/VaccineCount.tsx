'use client';

import React, { useEffect, useState } from 'react';
import styles from '../styles/note.module.css';
import Container from '@/elements/container/Container';
import { Label } from '@/elements/label/Label';
import { VacntnInfo } from '../page';
import { useRouter } from 'next/navigation';
import { VACCINE_LIST } from '../vaccine';

interface VaccineCountProps {
    vacntnInfo: VacntnInfo[];
}

const VaccineCount = ({ vacntnInfo }: VaccineCountProps) => {
    const router = useRouter();
    const [currentKid, setCurrentKid] = useState<string>('');

    useEffect(() => {
        setCurrentKid(localStorage.getItem('currentkid') ?? '');
    }, []);

    const handleVaccineClick = (vaccineId: number) => {
        router.push(`/note/detail/${vaccineId}?currentKid=${currentKid}`);
    };

    // 백신별 접종 상태 계산
    const getVaccineStatus = (vaccineId: number) => {
        // 해당 백신의 접종 데이터 찾기
        const vaccineRecords = vacntnInfo.filter(
            (record) => record.vacntnId === vaccineId.toString()
        );

        // 백신 정의 찾기
        const vaccine = VACCINE_LIST.find((v) => v.id === vaccineId);
        if (!vaccine) return { totalDoses: 0, completedDoses: 0 };

        // 전체 접종 차수 계산
        const totalDoses = vaccine.vaccines.reduce(
            (sum, v) => sum + v.doses.length,
            0
        );

        // 완료된 접종 차수
        const completedDoses = vaccineRecords.length;

        return { totalDoses, completedDoses };
    };

    return (
        <Container className="vaccineCount">
            {VACCINE_LIST.map((vaccine) => {
                const { totalDoses, completedDoses } = getVaccineStatus(
                    vaccine.id
                );

                return (
                    <div
                        className={styles.vaccineList}
                        key={vaccine.id}
                        onClick={() => handleVaccineClick(vaccine.id)}
                    >
                        <div style={{ flex: 5 }}>
                            <Label text={vaccine.name} css="vaccine" />
                        </div>

                        <div
                            className="horizonFlexbox align-center gap-4"
                            style={{ flex: 3 }}
                        >
                            {Array.from({ length: totalDoses }, (_, i) => (
                                <span
                                    key={`${vaccine.id}-${i}`}
                                    className={`${styles.circle} ${
                                        i < completedDoses
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
