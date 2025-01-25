'use client';

import Header from '@/components/header/Header';
import useAuth from '@/hook/useAuth';
import useFetch from '@/hook/useFetch';
import styles from "../../note.module.css";
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Label } from '@/elements/label/Label';


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
    const { sendRequest, responseData, loading, destroy } = useFetch();
    const [vaccineDetail, setVaccineDetail] = useState<VaccineDetail | null>(null);

    const vacntnId = decodeURIComponent(params?.vacntnId as string);
    const currentKid = searchParams.get('currentKid');

    useEffect(() => {
        const fetchVaccineDetail = async () => {
            if (currentKid && vacntnId) {
                try {
                    const response = await sendRequest({
                        url: `api/v1/babyNote/getVacntnIctsdDtl?chldrnNo=${currentKid}&vacntnIctsd=${vacntnId}`,
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    });


                    setVaccineDetail(response.data[0]);
                } catch (error) {

                }
            }
        };



        fetchVaccineDetail();
    }, [currentKid, vacntnId, sendRequest, token]);



    return (
        <>
            <Header title="예방접종 기록" />
            <div className={styles.container}>
                <h1 className={styles.title}>{vaccineDetail?.vacntnList[0].vacntnIctsd}</h1>
                <div className={styles.vacccineStatus}>
                    <div className={styles.vacccineStatus_Count}>
                        <Label text={`완료 ${vaccineDetail?.vacntnList[0].vacntnOdr}`} css="" />
                        <Label text={`완료 ${vaccineDetail?.vacntnList[0].vacntnOdr}`} css="" />
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        </>
    );
}