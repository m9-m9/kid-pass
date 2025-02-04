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
import { useModalStore } from '@/store/useModalStore';
import ScrollPicker from '../../components/ScrollPicker';
import { useDateStore } from '@/store/useDateStore';



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
    const [isLoading, setIsLoading] = useState(true);
    const { openModal, setComp } = useModalStore();
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
                    setIsLoading(false);
                }
            }
        };

        fetchVaccineDetail();
    }, [currentKid, vacntnId, token]);


    const handleConfirm = async () => {
        try {
            const { year, month, day } = useDateStore.getState();

            const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} 00:00:00`;
            console.log(formattedDate);

            const body = {
                chldrnNo: vaccineDetail?.chldrnNo,
                vacntnNo: vaccineDetail?.vacntnList[0].vacntnCnt,
                hsptlNo: 1,
                hsptlDrctr: "병원명",
                vacntnInoclDt: formattedDate,
            };

            const response = await instance.post(
                "http://localhost:8071/api/v1/babyNote/createVacntnRecord",
                body,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            console.log("Request successful:", response.data);
        } catch (error) {
            console.error("Error occurred while creating vaccination record:", error);
        }
    };

    useEffect(() => {



        setComp(
            <div className={styles.pickerContainer}>
                <div className={styles.pickerTitle}>
                    <p>접종일</p>
                </div>
                <div className={styles.pickerContents}>
                    <ScrollPicker />
                </div>
                <div className={styles.subbitArea}>
                    <Button label="취소" css="pickerCancel"></Button>
                    <Button label="확인" css="pickerSubmit" onClick={handleConfirm}></Button>
                </div>
            </div>


            , 'center'
        );
    }, [vaccineDetail]);

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
                {vaccineDetail && Array.from({ length: vaccineDetail.vacntnList[0].vacntnCnt }).map((_, index) => {

                    const orderNumber = index + 1;

                    return (
                        <React.Fragment key={`vaccine-${orderNumber}차`}>
                            {index < vaccineDetail.vacntnList[0].vacntnOdr ? (
                                <div className={styles.completeVaccineRecords}>
                                    <Button
                                        size='S'
                                        label={`${orderNumber}차`}
                                        css="completeVaccnineOrderBtn"
                                    />
                                    <div className={styles.completeVaccine}>
                                        <p>완료</p>
                                    </div>
                                </div>
                            ) : (
                                <div className={styles.vaccineRecords}
                                    onClick={() => { openModal(); }}
                                >
                                    <Button
                                        size='S'
                                        label={`${orderNumber}차`}
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
                    );
                })}
            </div>
        </>
    )
}