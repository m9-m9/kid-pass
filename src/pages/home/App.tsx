import { Label } from "@/elements/label/Label";
import Button from "../../elements/button/Button";
import useUsrStore from "../../store/useUsrStore";
import sendToRn from "../../utils/sendToRn";
import Container from "@/elements/container/Container";

import ArrowIcon from "@/elements/svg/Arrow";
import PlusIcon from "@/elements/svg/Plus";
import styles from "./home.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainMetrics from "@/components/metrics/MainMetrics";
import { MetricsSection } from "@/components/metrics/MetricsSection";

type OpenStates = {
    sleep: boolean;
    meal: boolean;
    urination: boolean;
    temp: boolean;
};

const App: React.FC = () => {
    const navigate = useNavigate();
    const usr = useUsrStore((state) => state);

    const goToMap = () => {
        navigate("/map");
    };

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
            {usr.name}
            <Button
                label="Home"
                onClick={() => {
                    usr.setName("Lee");
                }}
            />

            <Button
                label="login"
                onClick={() => sendToRn({ type: "NAV", data: { uri: "auth" } })}
            />
            <div className="horizonFlexbox align-center space-between">
                <Label text="오늘의아이" css="Logo" />
                <img src="https://heidimoon.cafe24.com/renwal/test2/Bell.svg" />
            </div>
            <Container className="profile">
                <div className="horizonFlexbox space-between">
                    <div className="verticalFlexbox gap-18 space-between">
                        <MainMetrics
                            label="2024.09.28 출생"
                            value="김아기"
                        />
                        <MainMetrics
                            label="나이 (만)"
                            value="36일, 5주 1일"
                        />
                    </div>

                    <div className="verticalFlexbox gap-7">
                        <div className="horizonFlexbox align-center">
                            <Label text="리포트 업데이트" css="rptUpdate" />
                            <ArrowIcon
                                direction="right"
                                color="#9e9e9e"
                                size={16}
                            />
                        </div>
                        <div className="horizonFlexbox align-center justify-center">
                            <img
                                src="https://heidimoon.cafe24.com/renwal/test2/barcode.png"
                                width="76px"
                                height="76px"
                            />
                        </div>
                    </div>
                </div>

                <div className="horizonFlexbox align-center space-between">
                    <MainMetrics label="몸무게" value="5.1kg" />
                    <MainMetrics label="키" value="51.0cm" />
                    <MainMetrics label="머리 둘레" value="36.9cm" />
                </div>
            </Container>
            <Container className="homepage_1 gap-4">
                <PlusIcon color="#FFFFFF" size={12} strokeWidth={4} />
                <Label text="오늘의 아이 증상 기록하기" css="home_1" />
                <img
                    className={styles.homepage_image_1}
                    src="https://heidimoon.cafe24.com/renwal/test2/Frame%2039.png"
                />
            </Container>
            <div className="horizonFlexbox gap-16 align-center">
                <Container className="homepage_2">
                    <div
                        className="verticalFlexbox justify-center"
                        onClick={goToMap}
                    >
                        <Label text="지금 문 연" css="home_2" />
                        <Label text="병원/약국" css="home_2" />
                    </div>

                    <img src="https://heidimoon.cafe24.com/renwal/test2/Group.png" />
                </Container>
                <Container className="homepage_2">
                    <div className="verticalFlexbox justify-center">
                        <Label text="진료받은" css="home_2" />
                        <Label text="기록" css="home_2" />
                    </div>

                    <img src="https://heidimoon.cafe24.com/renwal/test2/OBJECTS.png" />
                </Container>
            </div>
            <MetricsSection
                labelText="오늘의 김아이 기록이에요"
                metricsData={[
                    // {
                    //     title: "체온기록",
                    //     isOpen: openStates.temp,
                    //     onToggle: () => toggleMetricsArea("temp"),
                    //     bodyTempComponent: <BodyTemp />, // BodyTemp 컴포넌트 추가
                    // },
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
        </>
    );
};

export default App;
