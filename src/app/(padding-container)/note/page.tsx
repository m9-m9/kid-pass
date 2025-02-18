'use client';

import Container from '../../../elements/container/Container';
import { Label } from '../../../elements/label/Label';
import VaccineCount from './components/VaccineCount';
import ProgressBar from '@/components/progressBar/progressBar';
import useAuth from '@/hook/useAuth';
import { useEffect, useState } from 'react';
import instance from '@/utils/axios';
import ProfileHeader from '@/components/header/ProfileHeader';
import useChldrnListStore from '@/store/useChldrnListStore';
import BottomNavigation from '@/components/bottomNavigation/BottomNavigation';
import Spacer from '@/elements/spacer/Spacer';

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
const App = () => {
    const { getToken } = useAuth();
    const token = getToken();
    const [vacntnInfo, setVacntnInfo] = useState<VacntnInfo[]>([]);
    const TOTALCOUNT = 57;
    const [totalVacntnOdr, setTotalVacntnOdr] = useState(0);

    // Zustand store에서 currentKid 가져오기
    const currentKid = useChldrnListStore((state) => state.currentKid);

    useEffect(() => {
        const fetchData = async () => {
            if (currentKid) {
                try {
                    const response = await instance.get(
                        `/child/vacntnInfo?chldrnNo=${currentKid}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );

                    // 데이터가 있는 경우
                    if (
                        response.data.data.vacntnInfo &&
                        response.data.data.vacntnInfo.length > 0
                    ) {
                        setVacntnInfo(response.data.data.vacntnInfo);

                        // 접종 횟수 계산
                        const completedDoses =
                            response.data.data.vacntnInfo.length;
                        setTotalVacntnOdr(completedDoses);
                    } else {
                        // 데이터가 없는 경우 - 빈 배열로 초기화
                        setVacntnInfo([]);
                        setTotalVacntnOdr(0);
                    }
                } catch (error) {
                    console.error('데이터 불러오기 실패:', error);
                    // 에러 발생 시 빈 상태로 초기화
                    setVacntnInfo([]);
                    setTotalVacntnOdr(0);
                }
            }
        };

        // 컴포넌트 마운트 시 초기 데이터 로드
        fetchData();
    }, [currentKid]);

    const calculateVaccineSums = (vacntnInfo: any[]) => {
        if (!Array.isArray(vacntnInfo)) {
            console.error('vacntnInfo가 배열이 아닙니다:', vacntnInfo);
            return { cntSum: 0, odrSum: 0 };
        }

        return vacntnInfo.reduce(
            (acc, item) => ({
                cntSum: acc.cntSum + (item?.vacntnCnt || 0),
                odrSum: acc.odrSum + (item?.vacntnOdr || 0),
            }),
            { cntSum: 0, odrSum: 0 }
        );
    };

    const calculatePercentage = () => {
        return Math.round((totalVacntnOdr / TOTALCOUNT) * 100);
    };

    return (
        <>
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
                            <Label text={totalVacntnOdr} css="vaccinationTF" />
                        </Container>
                        <Container
                            className="vaccinationRate"
                            backgroundColor="#BFBFBF"
                        >
                            <Label text="미접종" css="vaccinationTF" />
                            <Label text={TOTALCOUNT} css="vaccinationTF" />
                        </Container>
                    </div>
                    <Label
                        text={`${calculatePercentage()}%`}
                        css="vaccineRate"
                    />
                </div>

                <ProgressBar completed={calculatePercentage()} total={100} />
            </Container>
            <Label text="예방접종 자세히 보기" css="metricsValue" />
            <VaccineCount vacntnInfo={vacntnInfo} />

            <Spacer height={50} />
            <BottomNavigation />
        </>
    );
};

export default App;
