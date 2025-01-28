'use client';

import Header from '@/components/header/Header';
import useAuth from '@/hook/useAuth';
import styles from "../../note.module.css";
import { useParams, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Label } from '@/elements/label/Label';
import instance from '@/utils/axios';
import Spacer from '@/elements/spacer/Spacer';
import Button from '@/elements/button/Button';


interface VaccineDetail {
    chldrnNo: number,
    vacntnInoclDt: string,
    chldrn: {
        chldrnNo: number
    },
    vacntnList: [
        {
            vacntnCnt: number,
            vacntnEra: string,
            vacntnIctsd: string,
            mthNm: "string",
            vacntnOdr: number,
            vacntnMthList: [],
        }
    ],
    hsptlList: [
        {
            mdexmnRcord: {
                chldrnNo: number
            }
        }
    ]
}

export default function VaccineDetailPage() {
    const { getToken } = useAuth();
    const token = getToken();
    const params = useParams();
    const searchParams = useSearchParams();
    const [vaccineDetail, setVaccineDetail] = useState<VaccineDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);  // 로딩 상태 추가

    const vacntnId = decodeURIComponent(params?.vacntnId as string);
    const currentKid = searchParams.get('currentKid');

    useEffect(() => {
        const fetchVaccineDetail = async () => {
            if (currentKid && vacntnId) {
                try {
                    setIsLoading(true);  // 데이터 로딩 시작
                    const response = await instance.get(
                        `api/v1/babyNote/getVacntnIctsdDtl?chldrnNo=${currentKid}&vacntnIctsd=${vacntnId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    });

                    if (response.data.data && response.data.data[0]) {
                        setVaccineDetail(response.data.data[0]);
                    }


                } catch (error) {
                    console.error('Error fetching vaccine detail:', error);
                } finally {
                    setIsLoading(false);  // 데이터 로딩 완료
                }
            }
        };

        fetchVaccineDetail();
    }, [currentKid, vacntnId, token]);

    console.log(vaccineDetail)


    // 로딩 중이거나 데이터가 없을 때 보여줄 UI
    if (isLoading) {
        return (
            <>
                <Header title="예방접종 기록" />
                <div className={styles.container}>
                    <p>로딩 중...</p>
                </div>
            </>
        );
    }


    return (
        <>
            <Header title="예방접종 기록" />
            <div className={styles.container}>
                <h1 className={styles.title}>{vaccineDetail?.vacntnList[0].vacntnIctsd}</h1>
                <Spacer height={36} />
                <div className={styles.vacccineStatus}>
                    <div className={styles.vacccineStatus_Count}>
                        <Label
                            text={`완료 ${vaccineDetail?.vacntnList[0].vacntnOdr}`}
                            css="completed"
                        />
                        <div className="divider"></div>
                        <Label
                            text={`미접종 ${vaccineDetail?.vacntnList[0].vacntnCnt}`}
                            css="incomplete"
                        />
                    </div>
                    <div className="horizonFlexbox align-center gap-8">
                        {vaccineDetail && Array.from({ length: vaccineDetail.vacntnList[0].vacntnCnt }).map((_, index) => (
                            <span
                                key={`circle-${index}`}
                                className={`${styles.circle} ${index < vaccineDetail.vacntnList[0].vacntnOdr
                                    ? styles.vaccineComplete
                                    : styles.vaccineIncomplete
                                    }`}
                            />
                        ))}
                    </div>
                </div>
                <Spacer height={16} />
                {vaccineDetail && Array.from({ length: vaccineDetail.vacntnList[0].vacntnCnt }).map((_, index) => (
                    <React.Fragment key={`record-${index}`}>
                        {index < vaccineDetail.vacntnList[0].vacntnOdr ? (
                            // 완료된 백신 기록
                            <div className={styles.completeVaccineRecords}>
                                <Button
                                    size='S'
                                    label={`${index + 1}차`}
                                    css="completeVaccnineOrderBtn"
                                />
                                <div className={styles.completeVaccine}>
                                    <p>완료</p>
                                </div>

                            </div>
                        ) : (
                            // 미완료된 백신 기록
                            <div className={styles.vaccineRecords}>
                                <Button
                                    size='S'
                                    label={`${index + 1}차`}
                                    css="vaccnineOrderBtn"
                                />
                                <div className={styles.addVaccine}>
                                    <img
                                        src="/add_vaccine.svg"
                                        width={18}
                                        height={18}
                                        alt="백신 추가"
                                    />
                                    <p>등록하기</p>
                                </div>
                            </div>
                        )}
                        <Spacer height={16} />
                    </React.Fragment>
                ))}
            </div>
        </>
    )
}