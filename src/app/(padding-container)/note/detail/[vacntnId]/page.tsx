'use client';

import Header from '@/components/header/Header';
import useAuth from '@/hook/useAuth';
import styles from '../../styles/note.module.css';
import { useParams, useSearchParams } from 'next/navigation';
import React, { useEffect, useState, useCallback } from 'react';
import { Label } from '@/elements/label/Label';
import instance from '@/utils/axios';
import Spacer from '@/elements/spacer/Spacer';
import Button from '@/elements/button/Button';
import { useModalStore } from '@/store/useModalStore';
import ScrollPicker from '../../components/ScrollPicker';
import { useDateStore } from '@/store/useDateStore';

// 백신 기록 데이터 타입
interface VacntnInfo {
	id: string;
	vacntnId: string;
	vacntnIctsd: string;
	vacntnDoseNumber: number;
	vacntnInoclDt: string;
	childId: string;
}

// 접종 차수별 상태 정보
interface DoseStatus {
	doseNumber: number;
	vaccineCode: string;
	vaccineName: string;
	isCompleted: boolean;
	vaccinationDate: string | null;
	recordId: string | null;
}

// 백신 상세 정보 응답 타입
interface VaccineDetailResponse {
	vaccineId: number;
	vaccineName: string;
	totalDoses: number;
	completedDoses: number;
	doseStatus: DoseStatus[];
	nextVaccineInfo: {
		vaccineCode: string;
		doseNumber: number;
	} | null;
	vaccineRecords: VacntnInfo[];
}

export default function VaccineDetailPage() {
	const { getToken } = useAuth();
	const token = getToken();
	const params = useParams();
	const searchParams = useSearchParams();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [vaccineDetail, setVaccineDetail] =
		useState<VaccineDetailResponse | null>(null);
	const { openModal, setComp, closeModal } = useModalStore();

	// URL에서 vaccineId 추출
	const vaccineId = params?.vacntnId as string;
	const currentKid = searchParams.get('currentKid');

	// 백신 상세 정보 가져오기
	const fetchVaccineDetail = useCallback(async () => {
		if (!vaccineId || !currentKid) return;

		try {
			setLoading(true);
			const response = await instance.get(
				`/child/vacntnDetail?chldrnNo=${currentKid}&vaccineId=${vaccineId}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response.data?.data) {
				setVaccineDetail(response.data.data);
			}
			setError(null);
		} catch (error) {
			console.error('백신 상세 정보 가져오기 실패:', error);
			setError('백신 정보를 불러오는데 실패했습니다.');
		} finally {
			setLoading(false);
		}
	}, [currentKid, vaccineId]);

	useEffect(() => {
		fetchVaccineDetail();
	}, [fetchVaccineDetail]);

	// 백신 접종 등록
	const handleConfirm = useCallback(async () => {
		if (!vaccineDetail?.nextVaccineInfo || !currentKid) return;

		try {
			const { year, month, day } = useDateStore.getState();
			const formattedDate = `${year}-${month
				.toString()
				.padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

			const body = {
				childId: currentKid,
				vaccinationData: {
					vacntnId: vaccineId,
					vacntnIctsd: vaccineDetail.nextVaccineInfo.vaccineCode,
					vacntnDoseNumber: vaccineDetail.nextVaccineInfo.doseNumber,
					vacntnInoclDt: formattedDate,
				},
			};

			await instance.post('/child/vacntnDetail', body, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			});

			// 성공 후 데이터 다시 불러오기
			await fetchVaccineDetail();
			closeModal();
		} catch (error) {
			console.error('백신 접종 기록 생성 중 오류 발생:', error);
		}
	}, [
		vaccineDetail,
		currentKid,
		vaccineId,
		token,
		fetchVaccineDetail,
		closeModal,
	]);

	// 모달 콘텐츠 설정 및 열기
	const handleOpenVaccineModal = useCallback(() => {
		const ModalContent = (
			<div className={styles.pickerContainer}>
				<div className={styles.pickerTitle}>
					<p>접종일</p>
				</div>
				<div className={styles.pickerContents}>
					<ScrollPicker />
				</div>
				<div className={styles.subbitArea}>
					<Button
						label="취소"
						css="pickerCancel"
						onClick={closeModal}
					/>
					<Button
						label="확인"
						css="pickerSubmit"
						onClick={handleConfirm}
					/>
				</div>
			</div>
		);

		setComp(ModalContent, 'center');
		openModal();
	}, [setComp, openModal, closeModal, handleConfirm]);

	// 로딩 중 화면
	if (loading) {
		return (
			<>
				<Header title="예방접종 기록" />
				<div className={styles.container}>
					<p>백신 정보를 불러오는 중입니다...</p>
				</div>
			</>
		);
	}

	// 에러 화면
	if (error || !vaccineDetail) {
		return (
			<>
				<Header title="예방접종 기록" />
				<div className={styles.container}>
					<p>{error || '유효하지 않은 백신 정보입니다.'}</p>
				</div>
			</>
		);
	}

	// 완료된 백신 렌더링
	const renderCompletedVaccine = (dose: DoseStatus) => (
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
	);

	// 미완료 백신 렌더링
	const renderIncompleteVaccine = (dose: DoseStatus) => (
		<div className={styles.vaccineRecords} onClick={handleOpenVaccineModal}>
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
	);

	return (
		<>
			<Header title="예방접종 기록" />
			<div className={styles.container}>
				<h1 className={styles.title}>{vaccineDetail.vaccineName}</h1>
				<Spacer height={36} />
				<div className={styles.vacccineStatus}>
					<div className={styles.vacccineStatus_Count}>
						<Label
							text={`완료 ${vaccineDetail.completedDoses}`}
							css="completed"
						/>
						<div className="divider"></div>
						<Label
							text={`미접종 ${
								vaccineDetail.totalDoses -
								vaccineDetail.completedDoses
							}`}
							css="incomplete"
						/>
					</div>
					<div className="horizonFlexbox align-center gap-8">
						{Array.from({ length: vaccineDetail.totalDoses }).map(
							(_, index) => (
								<span
									key={`circle-${index}`}
									className={`${styles.circle} ${
										index < vaccineDetail.completedDoses
											? styles.vaccineComplete
											: styles.vaccineIncomplete
									}`}
								/>
							)
						)}
					</div>
				</div>
				<Spacer height={16} />
				{vaccineDetail.doseStatus &&
					vaccineDetail.doseStatus.map((dose, index) => (
						<React.Fragment key={`vaccine-${dose.doseNumber}차`}>
							{dose.isCompleted
								? renderCompletedVaccine(dose)
								: renderIncompleteVaccine(dose)}
							<Spacer height={16} />
						</React.Fragment>
					))}
			</div>
		</>
	);
}
