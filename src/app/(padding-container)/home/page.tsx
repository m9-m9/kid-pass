"use client";

import { Label } from "@/elements/label/Label";
import Button from "../../../elements/button/Button";
import sendToRn from "../../../utils/sendToRn";
import Container from "@/elements/container/Container";
import PlusIcon from "@/elements/svg/Plus";
import styles from "./home.module.css";
import { useEffect, useState } from "react";
import { MetricsSection } from "@/components/metrics/MetricsSection";
import Link from "next/link";
import ProfileCarousel from "./ProfileCarousel";
import useAuth from "@/hook/useAuth";
import { useRouter } from "next/navigation";
import useFetch from "@/hook/useFetch";

type OpenStates = {
    sleep: boolean;
    meal: boolean;
    urination: boolean;
    temp: boolean;
};

const App: React.FC = () => {
    const { getToken } = useAuth();
    const router = useRouter();

    const { sendRequest, responseData, loading } = useFetch<any>();

    const fetchChildernInfo = (token: string) => {
        console.log(token);
        sendRequest({
            url: "authenticate/reissue",
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            credentials: "include",
        });
    };

    useEffect(() => {
        const token = getToken();
        if (!token) {
            router.push("auth/login");
            return;
        }

        fetchChildernInfo(token);
    }, []);

    // responseData 처리
    useEffect(() => {
        if (responseData) {
            console.log(responseData);
        }
    }, [responseData]);

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
            <Button label="Home" />

            <Button
                label="login"
                onClick={() => sendToRn({ type: "NAV", data: { uri: "auth" } })}
            />
            <div className="horizonFlexbox align-center space-between">
                <Label text="오늘의아이" css="Logo" />
                <img src="https://heidimoon.cafe24.com/renwal/test2/Bell.svg" />
            </div>
            <ProfileCarousel />
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
                    <Link
                        href={"/map"}
                        className="verticalFlexbox justify-center"
                    >
                        <Label text="지금 문 연" css="home_2" />
                        <Label text="병원/약국" css="home_2" />
                    </Link>

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
