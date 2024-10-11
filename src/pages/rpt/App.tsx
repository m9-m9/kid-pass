import { useState } from "react";
import Button from "../../elements/button/Button";
import BodyTemp from "../../elements/charts/BodyTemp";
import Label from "../../elements/label/Label";
import styles from "./rpt.module.css";

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
                <div
                    className={`${styles.profileContainer} ${styles.containerBase}`}
                >
                    <Label text="2024. 10. 31" css="profileDate" />
                    <div>
                        <Label text="2024.09.28 출생" css="metricsType" />
                        <Label text="김아기" css="profileMetrics" />
                    </div>
                    <div>
                        <Label text="나이 (만)" css="metricsType" />
                        <Label text="36일, 5주 1일" css="profileMetrics" />
                    </div>
                    <div className={styles.metricsArea}>
                        <div>
                            <Label text="몸무게" css="metricsType" />
                            <Label text="5.1kg" css="profileMetrics" />
                        </div>
                        <div>
                            <Label text="키" css="metricsType" />
                            <Label text="51.0cm" css="profileMetrics" />
                        </div>
                        <div>
                            <Label text="머리 둘레" css="metricsType" />
                            <Label text="36.9cm" css="profileMetrics" />
                        </div>
                    </div>
                </div>

                <div className={styles.symptomContainer}>
                    <Label text="지금 아기의 증상은요" css="category" />
                    <div className="horizonFlexbox gap_8">
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
                <div className={styles.metricsContainer}>
                    <Label text="지난 3일 동안의 아기의 상태" css="category" />
                    <div
                        className={`${styles.metrics} ${styles.containerBase}`}
                    >
                        <div className={`${styles.metrics}`}>
                            <div className={styles.metircsTitle}>
                                <Label text="체온기록" css="metrics" />
                                <svg
                                    width="22"
                                    height={openStates.temp ? "10" : "9"}
                                    viewBox={
                                        openStates.temp
                                            ? "0 0 22 10"
                                            : "0 0 22 9"
                                    }
                                    fill="none"
                                    onClick={() => toggleMetricsArea("temp")}
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d={
                                            openStates.temp
                                                ? "M1 1L10.5 8.5L21 1"
                                                : "M21 8.5L11.5 0.999999L1 8.5"
                                        }
                                        stroke="black"
                                    />
                                </svg>
                            </div>
                            <div
                                className={`${styles.metricsArea} ${
                                    !openStates.temp && styles.closed
                                }`}
                            >
                                <BodyTemp />
                            </div>
                        </div>
                    </div>

                    <div
                        className={`${styles.metrics} ${styles.containerBase}`}
                    >
                        <div className={styles.metircsTitle}>
                            <Label text="수면패턴" css="metrics" />
                            <svg
                                width="22"
                                height={openStates.sleep ? "10" : "9"}
                                viewBox={
                                    openStates.sleep ? "0 0 22 10" : "0 0 22 9"
                                }
                                fill="none"
                                onClick={() => toggleMetricsArea("sleep")}
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d={
                                        openStates.sleep
                                            ? "M1 1L10.5 8.5L21 1"
                                            : "M21 8.5L11.5 0.999999L1 8.5"
                                    }
                                    stroke="black"
                                />
                            </svg>
                        </div>
                        <div
                            className={`${styles.metricsArea} ${
                                !openStates.sleep && styles.closed
                            }`}
                        >
                            <div className={styles.metricsDetail}>
                                <Label text="간격" css="metricsType" />
                                <Label text="3회" css="profileMetrics" />
                            </div>
                            <div className={styles.metricsDetail}>
                                <Label text="횟수" css="metricsType" />
                                <Label text="6회" css="profileMetrics" />
                            </div>
                        </div>
                    </div>

                    <div
                        className={`${styles.metrics} ${styles.containerBase}`}
                    >
                        <div className={styles.metircsTitle}>
                            <Label text="식사패턴" css="metrics" />
                            <svg
                                width="22"
                                height={openStates.meal ? "10" : "9"}
                                viewBox={
                                    openStates.meal ? "0 0 22 10" : "0 0 22 9"
                                }
                                fill="none"
                                onClick={() => toggleMetricsArea("meal")}
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d={
                                        openStates.meal
                                            ? "M1 1L10.5 8.5L21 1"
                                            : "M21 8.5L11.5 0.999999L1 8.5"
                                    }
                                    stroke="black"
                                />
                            </svg>
                        </div>
                        <div
                            className={`${styles.metricsArea} ${
                                !openStates.meal && styles.closed
                            }`}
                        >
                            <div className={styles.metricsDetail}>
                                <Label text="간격" css="metricsType" />
                                <Label text="2시간" css="profileMetrics" />
                            </div>
                            <div className={styles.metricsDetail}>
                                <Label text="횟수" css="metricsType" />
                                <Label text="6회" css="profileMetrics" />
                            </div>
                        </div>
                    </div>

                    <div
                        className={`${styles.metrics} ${styles.containerBase}`}
                    >
                        <div className={styles.metircsTitle}>
                            <Label text="배뇨 횟수" css="metrics" />
                            <svg
                                width="22"
                                height={openStates.urination ? "10" : "9"}
                                viewBox={
                                    openStates.urination
                                        ? "0 0 22 10"
                                        : "0 0 22 9"
                                }
                                fill="none"
                                onClick={() => toggleMetricsArea("urination")}
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d={
                                        openStates.urination
                                            ? "M1 1L10.5 8.5L21 1"
                                            : "M21 8.5L11.5 0.999999L1 8.5"
                                    }
                                    stroke="black"
                                />
                            </svg>
                        </div>
                        <div
                            className={`${styles.metricsArea} ${
                                !openStates.urination && styles.closed
                            }`}
                        >
                            <div className={styles.metricsDetail}>
                                <Label text="대변" css="metricsType" />
                                <Label text="6회" css="profileMetrics" />
                            </div>
                            <div className={styles.metricsDetail}>
                                <Label text="소변" css="metricsType" />
                                <Label text="6회" css="profileMetrics" />
                            </div>
                            <div className={styles.metricsDetail}>
                                <Label text="대변색깔" css="metricsType" />
                                <Label text="묽은 변" css="profileMetrics" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.prescriptionContainer}>
                    <Label text="아기가 치료받은 기록이에요" css="category" />
                    <div
                        className={`${styles.metrics} ${styles.containerBase}`}
                    >
                        <div className={styles.metricsArea}>
                            <Label text="2024.10.05" css="metricsDate" />
                            <Label
                                text="땡땡땡 산부인과"
                                css="prescriptionMetrics"
                            />
                        </div>

                        <div className={styles.metricsArea}>
                            <Label text="신생아 검진" css="metrics" />
                            <Label text="병명 없음" css="diagnosisMetrics" />
                        </div>
                        <div className={styles.tearLine} />
                        <div className={styles.metricsArea}>
                            <Label
                                text="의사소견 없음"
                                css="diagnosisMetrics"
                            />
                        </div>
                    </div>
                    <div
                        className={`${styles.metrics} ${styles.containerBase}`}
                    >
                        <div className={styles.metricsArea}>
                            <Label text="2024.10.05" css="metricsDate" />
                            <Label
                                text="땡땡땡 약국"
                                css="prescriptionMetrics"
                            />
                        </div>
                        <div className={styles.metricsArea}>
                            <Label text="땡땡정(20ml)" css="metrics" />
                            <Label text="땡땡약(30ml)" css="metrics" />
                        </div>
                        <div className={styles.tearLine} />
                        <div className={styles.metricsArea}>
                            <img
                                className={styles.prescriptionImg}
                                src="//ecimg.cafe24img.com/pg541b69650982094/nash888/web/wholesum/open/lemon/PD_m_KV_01.jpg"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.vaccineContainer}>
                <Label text="아기의 예방접종 이력이에요" css="category" />
                <div className={styles.vaccine}>
                    <Label text="2024.10.03" css="metricsDate" />
                    <Label text="BCG" css="vaccine" />
                </div>
                <div className={styles.vaccine}>
                    <Label text="2024.10.03" css="metricsDate" />
                    <Label text="B형 간염(1차)" css="vaccine" />
                </div>
            </div>
            <div className={styles.commentsContainer}>
                <Label text="특이사항" css="category" />
                <div className="horizonFlexbox gap_8">
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
