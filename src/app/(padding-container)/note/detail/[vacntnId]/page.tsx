'use client';

import Header from '@/components/header/Header';
import useAuth from '@/hook/useAuth';
import styles from '../../styles/note.module.css';
import { useParams, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Label } from '@/elements/label/Label';
import instance from '@/utils/axios';
import Spacer from '@/elements/spacer/Spacer';
import Button from '@/elements/button/Button';
import { useModalStore } from '@/store/useModalStore';
import ScrollPicker from '../../components/ScrollPicker';
import { useDateStore } from '@/store/useDateStore';
import { VACCINE_LIST, getVaccineTotalCount } from '../../vaccine'; // 상수 데이터 import

interface VacntnInfo {
    id: string;
    vacntnId: string;
    vacntnIctsd: string;
    vacntnDoseNumber: number;
    vacntnInoclDt: string;
    childId: string;
}

export default function VaccineDetailPage() {
    const { getToken } = useAuth();
    const token = getToken();
    const params = useParams();
    const searchParams = useSearchParams();
    const [vaccineRecords, setVaccineRecords] = useState<VacntnInfo[]>([]);
    const { openModal, setComp } = useModalStore();

    // URL에서 vaccineId 추출 (문자열에서 숫자로 변환)
    const vaccineId = parseInt(params?.vacntnId as string, 10);
    const currentKid = searchParams.get('currentKid');

    // 백신 ID가 유효한지 확인
    const vaccineData = VACCINE_LIST.find((v) => v.id === vaccineId);

    // 백신의 총 접종 횟수 계산
    const totalDoses = vaccineData ? getVaccineTotalCount(vaccineId) : 0;

    useEffect(() => {
        // 백신 데이터가 유효하고 현재 아이 ID가 있는 경우에만 데이터 가져오기 시도
        if (vaccineData && currentKid) {
            const fetchVaccineRecords = async () => {
                try {
                    const response = await instance.get(
                        `/child/vacntnInfo?chldrnNo=${currentKid}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );

                    if (response.data?.data?.vacntnInfo) {
                        // vacntnId가 현재 백신 ID와 일치하는 기록만 필터링
                        const records = response.data.data.vacntnInfo.filter(
                            (record: VacntnInfo) =>
                                record.vacntnId === vaccineId.toString()
                        );
                        setVaccineRecords(records);
                    }
                } catch (error) {
                    console.error('백신 데이터 가져오기 실패:', error);
                    // 오류가 발생해도 UI는 계속 그려짐 (빈 배열 상태 유지)
                }
            };

            fetchVaccineRecords();
        }
    }, [currentKid, vaccineId, token, vaccineData]);

    // 모달 설정
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
                    <Button
                        label="확인"
                        css="pickerSubmit"
                        onClick={handleConfirm}
                    ></Button>
                </div>
            </div>,
            'center'
        );
    }, [setComp]);

    const handleConfirm = async () => {
        try {
            const { year, month, day } = useDateStore.getState();
            const formattedDate = `${year}-${month
                .toString()
                .padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

            // 다음 접종 차수 계산 (기존 접종 기록 + 1)
            const nextDoseNumber = vaccineRecords.length + 1;

            if (!vaccineData) return;

            // 다음 접종에 사용할 백신 코드 결정
            let nextVaccineCode = '';
            let foundDose = false;

            // 백신과 차수에 맞는 코드 찾기
            for (const vaccine of vaccineData.vaccines) {
                for (const dose of vaccine.doses) {
                    if (dose.doseNumber === nextDoseNumber) {
                        nextVaccineCode = vaccine.code;
                        foundDose = true;
                        break;
                    }
                }
                if (foundDose) break;
            }

            // 백신 코드를 찾지 못했으면 첫 번째 백신 코드 사용
            if (!nextVaccineCode && vaccineData.vaccines.length > 0) {
                nextVaccineCode = vaccineData.vaccines[0].code;
            }

            const body = {
                childId: currentKid,
                vaccinationData: {
                    vacntnId: vaccineId.toString(),
                    vacntnIctsd: nextVaccineCode,
                    vacntnDoseNumber: nextDoseNumber,
                    vacntnInoclDt: formattedDate,
                },
            };

            await instance.post('/child/vacntnInfo', body, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            // 성공 후 페이지 새로고침 또는 상태 업데이트
            window.location.reload();
        } catch (error) {
            console.error('백신 접종 기록 생성 중 오류 발생:', error);
        }
    };

    // 백신 ID가 유효하지 않으면 에러 메시지 표시
    if (!vaccineData) {
        return (
            <>
                <Header title="예방접종 기록" />
                <div className={styles.container}>
                    <p>유효하지 않은 백신 정보입니다.</p>
                </div>
            </>
        );
    }

    // 완료된 접종 횟수
    const completedDoses = vaccineRecords.length;

    // 각 접종 차수별 상태 계산
    const doseStatus = [];
    let currentDoseNumber = 1;

    // 모든 백신 종류와 접종 차수 순회
    for (const vaccine of vaccineData.vaccines) {
        for (const dose of vaccine.doses) {
            // 해당 차수의 접종 기록 찾기
            const record = vaccineRecords.find(
                (r) =>
                    r.vacntnDoseNumber === dose.doseNumber &&
                    r.vacntnIctsd === vaccine.code
            );

            doseStatus.push({
                doseNumber: currentDoseNumber,
                vaccineCode: vaccine.code,
                vaccineName: vaccine.name,
                isCompleted: !!record,
                vaccinationDate: record?.vacntnInoclDt || null,
            });

            currentDoseNumber++;
        }
    }

    return (
        <>
            <Header title="예방접종 기록" />
            <div className={styles.container}>
                <h1 className={styles.title}>{vaccineData.name}</h1>
                <Spacer height={36} />
                <div className={styles.vacccineStatus}>
                    <div className={styles.vacccineStatus_Count}>
                        <Label
                            text={`완료 ${completedDoses}`}
                            css="completed"
                        />
                        <div className="divider"></div>
                        <Label
                            text={`미접종 ${totalDoses - completedDoses}`}
                            css="incomplete"
                        />
                    </div>
                    <div className="horizonFlexbox align-center gap-8">
                        {Array.from({ length: totalDoses }).map((_, index) => (
                            <span
                                key={`circle-${index}`}
                                className={`${styles.circle} ${
                                    index < completedDoses
                                        ? styles.vaccineComplete
                                        : styles.vaccineIncomplete
                                }`}
                            />
                        ))}
                    </div>
                </div>
                <Spacer height={16} />
                {doseStatus.map((dose, index) => (
                    <React.Fragment key={`vaccine-${dose.doseNumber}차`}>
                        {dose.isCompleted ? (
                            <div className={styles.completeVaccineRecords}>
                                <Button
                                    size="S"
                                    label={`${dose.doseNumber}차 (${dose.vaccineCode})`}
                                    css="completeVaccnineOrderBtn"
                                />
                                <div className={styles.completeVaccine}>
                                    <p>
                                        완료{' '}
                                        {dose.vaccinationDate
                                            ? `(${new Date(
                                                  dose.vaccinationDate
                                              ).toLocaleDateString()})`
                                            : ''}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div
                                className={styles.vaccineRecords}
                                onClick={() => {
                                    openModal();
                                }}
                            >
                                <Button
                                    size="S"
                                    label={`${dose.doseNumber}차 (${dose.vaccineCode})`}
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
    );
}
