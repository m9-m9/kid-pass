import Button from "../../elements/button/Button";
import Container from "../../elements/container/Container";
import { Label } from "../../elements/label/Label";
import styles from "./record.module.css";

const App: React.FC = () => {
    const colors = ["#FFCCA3", "#b6ffd2", "#F4F4F4", "#D9D9D9"];

    return (
        <>
            <Container className="recordMetrics">
                <div className="horizonFlexbox align-center gap-8">
                    {["수면", "식사", "배변", "운동", "기타"].map(
                        (label, index) => (
                            <Button
                                key={index}
                                label={label}
                                backgroundColor={colors[index % colors.length]}
                                color="black"
                                onClick={() => {}}
                                css="metricsBtn"
                            />
                        ),
                    )}
                    <div className={styles["circle-plus"]}></div>
                </div>
                <Button
                    css="typeBtn"
                    label="그래프로 보기"
                    onClick={() => {}}
                />
            </Container>
            <div className="horizonFlexbox align-center mb-24 gap-16">
                <Label text="오늘" css="recordDate" />
                <Label text="2024.10.31.(목)" css="visitDay" />
                <div className="divider"></div>
                <Label text="D+32" css="visitDay" />
            </div>
            <div className="horizonFlexbox align-center gap-16">
                <div className="horizonFlexbox align-center gap-8">
                    <Label text="수면" css="visitDay" />
                    <Label text="7시간 4회" css="metricsDate" />
                </div>
                <div className="horizonFlexbox align-center gap-8">
                    <Label text="식사" css="visitDay" />
                    <Label text="7시간 4회" css="metricsDate" />
                </div>
            </div>
            <div className={styles.recordContainer}>
                <div className={styles.record}>
                    <div className="horizonFlexbox align-center gap-8">
                        <Label text="11:47" css="detailTime" />
                        <Label text="AM" css="metricsDate" />
                    </div>
                    <Label text="2시간 32분" css="detailTime" />
                </div>
                <div className={styles.record}>
                    <div className="horizonFlexbox align-center gap-8">
                        <Label text="11:47" css="detailTime" />
                        <Label text="AM" css="metricsDate" />
                    </div>
                    <Label text="2시간 32분" css="detailTime" />
                </div>
            </div>
        </>
    );
};

export default App;
