'use client';

import Container from '../../../elements/container/Container';
import { Label } from '../../../elements/label/Label';
import VaccineCount, { VaccineStatusInfo } from './components/VaccineCount';
import ProgressBar from '@/components/progressBar/progressBar';
import useAuth from '@/hook/useAuth';
import { useEffect, useState } from 'react';
import instance from '@/utils/axios';
import ProfileHeader from '@/components/header/ProfileHeader';
import useChldrnListStore from '@/store/useChldrnListStore';
import BottomNavigation from '@/components/bottomNavigation/BottomNavigation';
import Spacer from '@/elements/spacer/Spacer';
import LoadingFullScreen from '@/components/loading/LoadingFullScreen';

export interface VacntnInfo {
	id: string; // 백신 기록 ID
	vacntnId: string; // 백신 질병 ID (VACCINE_LIST의 id 참조)
	vacntnIctsd: string; // 백신 종류 코드 (DTaP, Tdap 등)
	vacntnDoseNumber: number; // 현재 접종 차수 (1차, 2차...)
	vacntnInoclDt: string; // 접종 날짜 (ISO 형식의 날짜 문자열)
	childId: string; // 연결된 아이 ID
	createdAt: Date; // 생성 시간
	updatedAt: Date; // 수정 시간
}

interface VaccinationData {
	vacntnInfo: VacntnInfo[];
	totalCompletedDoses: number;
	totalRequiredDoses: number;
	completionPercentage: number;
	vaccineStatusMap: Record<string, VaccineStatusInfo>; // 이 속성 추가
}
const App = () => {
	const { getToken } = useAuth();
	const token = getToken();
	const [isLoading, setIsLoading] = useState(false);
	const [vaccinationData, setVaccinationData] = useState<VaccinationData>({
		vacntnInfo: [],
		totalCompletedDoses: 0,
		totalRequiredDoses: 0,
		completionPercentage: 0,
		vaccineStatusMap: {},
	});

	// Zustand store에서 currentKid 가져오기
	const currentKid = useChldrnListStore((state) => state.currentKid);

	useEffect(() => {
		const fetchData = async () => {
			if (currentKid) {
				setIsLoading(true);

				try {
					const response = await instance.get(
						`/child/vacntnInfo?chldrnNo=${currentKid}`,
						{
							headers: {
								Authorization: `Bearer ${token}`,
							},
						}
					);

					// 백엔드에서 모든 필요한 데이터를 받아 상태 업데이트
					setVaccinationData(response.data.data);
				} catch (error) {
					console.error('데이터 불러오기 실패:', error);
					// 에러 발생 시 기본값으로 초기화
					setVaccinationData({
						vacntnInfo: [],
						totalCompletedDoses: 0,
						totalRequiredDoses: 0,
						completionPercentage: 0,
						vaccineStatusMap: {},
					});
				} finally {
					setIsLoading(false);
				}
			}
		};

		// 컴포넌트 마운트 시 초기 데이터 로드
		fetchData();
	}, [currentKid]);

	return (
		<>
			<LoadingFullScreen
				isVisible={isLoading}
				text="백신 정보를 불러오는 중입니다..."
			/>

			<ProfileHeader
				icon={<i className="ri-calendar-line" />}
				path="/note/calendar"
			/>
			<Label text="예방접종 진행률" css="metricsValue" />
			<Container className="rateContainer" backgroundColor="#F4F4F4">
				<div className="horizonFlexbox space-between">
					<div className="horizonFlexbox gap-4">
						<Container
							className="vaccinationRate"
							backgroundColor="#729BED"
						>
							<Label text="완료" css="vaccinationTF" />
							<Label
								text={vaccinationData.totalCompletedDoses}
								css="vaccinationTF"
							/>
						</Container>
						<Container
							className="vaccinationRate"
							backgroundColor="#BFBFBF"
						>
							<Label text="미접종" css="vaccinationTF" />
							<Label
								text={vaccinationData.totalRequiredDoses}
								css="vaccinationTF"
							/>
						</Container>
					</div>
					<Label
						text={`${vaccinationData.completionPercentage}%`}
						css="vaccineRate"
					/>
				</div>

				<ProgressBar
					completed={vaccinationData.completionPercentage}
					total={100}
				/>
			</Container>
			<Label text="예방접종 자세히 보기" css="metricsValue" />
			<VaccineCount vaccineStatusMap={vaccinationData.vaccineStatusMap} />

			<Spacer height={50} />
			<BottomNavigation />
		</>
	);
};

export default App;
