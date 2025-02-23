'use client';

import React from 'react';
import styles from '../styles/note.module.css';
import Container from '@/elements/container/Container';
import { Label } from '@/elements/label/Label';
import { VacntnInfo } from '../page';
import { useRouter } from 'next/navigation';
import { VACCINE_LIST } from '../vaccine';
import useChldrnListStore from '@/store/useChldrnListStore';

export interface VaccineStatusInfo {
	totalDoses: number;
	completedDoses: number;
	vaccineName: string;
	vaccineRecords: VacntnInfo[];
}

interface VaccineCountProps {
	vaccineStatusMap: Record<string, VaccineStatusInfo>;
}

const VaccineCount = ({ vaccineStatusMap = {} }: VaccineCountProps) => {
	const router = useRouter();
	const currentKid = useChldrnListStore((state) => state.currentKid);

	const handleVaccineClick = (vaccineId: number) => {
		router.push(`/note/detail/${vaccineId}?currentKid=${currentKid}`);
	};

	return (
		<Container className="vaccineCount">
			{VACCINE_LIST.map((vaccine) => {
				// 백엔드에서 제공한 상태 정보 사용
				const status = vaccineStatusMap[vaccine.id.toString()] || {
					totalDoses: 0,
					completedDoses: 0,
				};

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
							{Array.from(
								{ length: status.totalDoses },
								(_, i) => (
									<span
										key={`${vaccine.id}-${i}`}
										className={`${styles.circle} ${
											i < status.completedDoses
												? styles.vaccineComplete
												: styles.vaccineIncomplete
										}`}
									/>
								)
							)}
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
