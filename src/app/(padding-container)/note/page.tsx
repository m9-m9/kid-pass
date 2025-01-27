'use client'

import Container from "../../../elements/container/Container";
import { Label } from "../../../elements/label/Label";
import VaccineCount from "./components/VaccineCount";
import ProgressBar from "@/components/progressBar/progressBar";
import useAuth from "@/hook/useAuth";
import { useEffect, useState } from "react";
import instance from "@/utils/axios";
import ProfileHeader from "@/components/header/ProfileHeader";



export interface VacntnInfo {

    vacntnCnt: number;
    vacntnEra: string;
    vacntnIctsd: string;
    vacntnInoclDt: string;
    vacntnMthNo: number;
    vacntnNo: number;
    vacntnOdr: number;
}



const App = () => {

    const { getToken } = useAuth();
    const token = getToken();
    const [vacntnInfo, setVacntnInfo] = useState<VacntnInfo[]>([])
    const [totalVacntnCnt, setTotalVacntnCnt] = useState(0)
    const [totalVacntnOdr, setTotalVacntnOdr] = useState(0)
    const currentKid = localStorage.getItem("currentkid");
    useEffect(() => {
        const fetchData = async () => {
            if (currentKid) {
                try {
                    const response = await instance.get(`/api/v1/chldrn/findChldrnProfileInfo?chldrnNo=${currentKid}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (response.data.data.vacntnInfo) {
                        setVacntnInfo(response.data.data.vacntnInfo);
                        const sums = calculateVaccineSums(response.data.data.vacntnInfo);
                        setTotalVacntnCnt(sums.cntSum);
                        setTotalVacntnOdr(sums.odrSum);
                    }

                } catch (error) {
                    console.error('데이터 불러오기 실패:', error);
                }
            }
        };

        fetchData();
    }, [currentKid]);


    useEffect(() => {

    }, [])

    const calculateVaccineSums = (vacntnInfo: any[]) => {
        if (!Array.isArray(vacntnInfo)) {
            console.error('vacntnInfo가 배열이 아닙니다:', vacntnInfo);
            return { cntSum: 0, odrSum: 0 };
        }

        return vacntnInfo.reduce((acc, item) => ({
            cntSum: acc.cntSum + (item?.vacntnCnt || 0),
            odrSum: acc.odrSum + (item?.vacntnOdr || 0)
        }), { cntSum: 0, odrSum: 0 });
    };

    const calculatePercentage = () => {


        return Math.round((totalVacntnOdr / totalVacntnCnt) * 100);
    };




    return (
        <>
            <ProfileHeader />
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
                            <Label text={totalVacntnCnt} css="vaccinationTF" />
                        </Container>
                    </div>
                    <Label text={`${calculatePercentage()}%`} css="vaccineRate" />
                </div>

                <ProgressBar completed={calculatePercentage()} total={100} />
            </Container>
            {/* <div className="horizonFlexbox gap-8">
                <div className={styles.noteBtn}>
                    <Label text="달력보기" css="noteBtn"></Label>
                    <img src="/vaccineCalander.svg" />
                </div>
                <div className={styles.noteBtn}>
                    <Label text="알림설정" css="noteBtn"></Label>
                    <img src="/vaccineAlarm.svg" />
                </div>
            </div> */}
            <Label text="예방접종 자세히 보기" css="metricsValue" />
            <VaccineCount vacntnInfo={vacntnInfo} />
        </>
    );
};

export default App;
