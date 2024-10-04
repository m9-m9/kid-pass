import Button from "../../elements/button/Button";
import Label from "../../elements/label/Label";
import styles from "./record.module.css";

const App: React.FC = () => {
    const colors = ["#FFCCA3", "#b6ffd2", "#F4F4F4", "#D9D9D9"];

    return (
        <>
            <div className={styles.recordHeader}>
                <div className="horizonFlexbox_8">
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
            </div>
            <div className="horizonFlexbox_16 mb-24">
                <Label text="오늘" css="metrics" />
                <Label text="2024.10.31.(목)" css="recordDate" />
                <div className="divider"></div>
                <Label text="D+32" css="recordDate" />
            </div>
            <div className="horizonFlexbox_16 ">
                <div className="horizonFlexbox_8">
                    <Label text="수면" css="recordDate" />
                    <Label text="7시간 4회" css="metricsDate" />
                </div>
                <div className="horizonFlexbox_8">
                    <Label text="식사" css="recordDate" />
                    <Label text="7시간 4회" css="metricsDate" />
                </div>
            </div>
            <div className={styles.recordContainer}>
                <div className={styles.record}>
                    <div className="horizonFlexbox_8">
                        <Label text="11:47" css="metrics" />
                        <Label text="AM" css="metricsDate" />
                    </div>
                    <Label text="2시간 32분" css="metrics" />
                </div>
                <div className={styles.record}>
                    <div className="horizonFlexbox_8">
                        <Label text="11:47" css="metrics" />
                        <Label text="AM" css="metricsDate" />
                    </div>
                    <Label text="2시간 32분" css="metrics" />
                </div>
            </div>
        </>
    );
};

export default App;
