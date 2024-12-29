"use client";

import { useState } from "react";
import Button from "../../elements/button/Button";
import { Label } from "../../elements/label/Label";
import styles from "./rpt.module.css";
import Container from "../../elements/container/Container";
import { MetricsSection } from "@/components/metrics/MetricsSection";
import ProfileMetrics from "@/components/metrics/ProfileMetrics";

type OpenStates = {
    sleep: boolean;
    meal: boolean;
    urination: boolean;
    temp: boolean;
};

const App: React.FC = () => {
    const [openStates, setOpenStates] = useState<OpenStates>({
        sleep: true,
        meal: true,
        urination: true,
        temp: true,
    });

    // 상태를 토글하는 공통 함수
    const toggleMetricsArea = (type: keyof OpenStates) => {
        setOpenStates((prevState) => ({
            ...prevState,
            [type]: !prevState[type],
        }));
    };

    return (
        <>
            <div>
                <Button css="button" label="Report" onClick={() => {}} />
                <Container className="profile">
                    <Label text="2024. 10. 31" css="profileDate" />
                    <ProfileMetrics label="2024.09.28 출생" value="김아기" />
                    <ProfileMetrics label="나이 (만)" value="36일, 5주 1일" />
                    <div className="horizonFlexbox align-center space-between">
                        <ProfileMetrics label="몸무게" value="5.1kg" />
                        <ProfileMetrics label="키" value="51.0cm" />
                        <ProfileMetrics label="머리 둘레" value="36.9cm" />
                    </div>
                </Container>

                <div className={styles.sectionContainer}>
                    <Label text="지금 아기의 증상은요" css="category" />
                    <div className="horizonFlexbox align-center gap-8">
                        <Button
                            css="symptomButton"
                            label="고열"
                            onClick={() => {}}
                        />
                        <Button
                            css="symptomButton"
                            label="두드러기"
                            onClick={() => {}}
                        />
                        <Button
                            css="symptomButton"
                            label="설사"
                            onClick={() => {}}
                        />
                    </div>
                </div>

                <MetricsSection
                    labelText="지난 3일 동안의 아기의 상태"
                    metricsData={[
                        {
                            title: "체온기록",
                            isOpen: openStates.temp,
                            onToggle: () => toggleMetricsArea("temp"),
                        },
                        {
                            title: "수면패턴",
                            isOpen: openStates.sleep,
                            onToggle: () => toggleMetricsArea("sleep"),
                            details: [
                                { label: "간격", value: "3회" },
                                { label: "횟수", value: "6회" },
                            ],
                        },
                        {
                            title: "식사패턴",
                            isOpen: openStates.meal,
                            onToggle: () => toggleMetricsArea("meal"),
                            details: [
                                { label: "간격", value: "2시간" },
                                { label: "횟수", value: "6회" },
                            ],
                        },
                        {
                            title: "식사패턴",
                            isOpen: openStates.urination,
                            onToggle: () => toggleMetricsArea("urination"),
                            details: [
                                { label: "대변", value: "6회" },
                                { label: "소변", value: "6회" },
                                { label: "대변색깔", value: "묽은 변" },
                            ],
                        },
                    ]}
                />
                <div className={styles.sectionContainer}>
                    <Label text="아기가 치료받은 기록이에요" css="category" />
                    <Container
                        className="report prescription"
                        backgroundColor="#f4f4f4"
                    >
                        <div className="horizonFlexbox align-center gap-24">
                            <Label text="2024.10.05" css="prescriptionDate" />
                            <Label text="땡땡땡 산부인과" css="facilityName" />
                        </div>

                        <div className="horizonFlexbox align-center gap-24">
                            <Label text="신생아 검진" css="treatmentType" />
                            <Label text="병명 없음" css="diagnosisResult" />
                        </div>
                        <div className={styles.tearLine} />
                        <div>
                            <Label text="의사소견 없음" css="diagnosisResult" />
                        </div>
                    </Container>
                    <Container className="report" backgroundColor="#f4f4f4">
                        <div className="horizonFlexbox align-center gap-24">
                            <Label text="2024.10.05" css="prescriptionDate" />
                            <Label text="땡땡땡 약국" css="facilityName" />
                        </div>
                        <div className="horizonFlexbox align-center gap-8">
                            <Label text="땡땡정(20ml)" css="drugName" />
                            <Label text="땡땡약(30ml)" css="drugName" />
                        </div>
                        <div className={styles.tearLine} />
                        <div>
                            <img
                                className={styles.prescriptionImg}
                                src="//ecimg.cafe24img.com/pg541b69650982094/nash888/web/wholesum/open/lemon/PD_m_KV_01.jpg"
                            />
                        </div>
                    </Container>
                </div>
            </div>
            <div className={styles.sectionContainer}>
                <Label text="아기의 예방접종 이력이에요" css="category" />
                <div className="verticalFlexbox gap-8">
                    <Label text="2024.10.03" css="metricsDate" />
                    <Label text="BCG" css="vaccine" />
                </div>
                <div className="verticalFlexbox gap-8">
                    <Label text="2024.10.03" css="metricsDate" />
                    <Label text="B형 간염(1차)" css="vaccine" />
                </div>
            </div>
            <div className={styles.sectionContainer}>
                <Label text="특이사항" css="category" />
                <div className="horizonFlexbox align-center gap-8">
                    <Button
                        css="commentsButton"
                        label="출산 시 합병증"
                        onClick={() => {}}
                    />
                    <Button
                        css="commentsButton"
                        label="가족력 있음"
                        onClick={() => {}}
                    />
                </div>
            </div>
        </>
    );
};

export default App;
