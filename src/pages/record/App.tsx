import {Label} from "../../elements/label/Label";
import styles from "./record.module.css";

const App: React.FC = () => {
    return (
        <>
            <div className="horizonFlexbox gap-16 mb-24">
                <Label text="2024.10.31.(목)" css="recordDate_black" />
                <div className="divider"></div>
                <Label text="D+32" css="recordDate_gray" />
            </div>
            <div className={styles.metrics}>
                <div className="verticalFlexbox gap-8">
                    <Label text="배변" css="metrics" />
                    <Label text="두 번째" css="symptomOrder" />
                    <Label text="1시간 전" css="eventTimeAgo" />
                </div>
                <div className="verticalFlexbox gap-8">
                    <Label text="배변" css="metrics" />
                    <Label text="두 번째" css="symptomOrder" />
                    <Label text="1시간 전" css="eventTimeAgo" />
                </div>
                <div className="verticalFlexbox gap-8">
                    <Label text="배변" css="metrics" />
                    <Label text="두 번째" css="symptomOrder" />
                    <Label text="1시간 전" css="eventTimeAgo" />
                </div>
            </div>
            <div className={styles.addReportContainer}>
                <div className="horizonFlexbox space-between">
                    <Label text="특이 증상" css="metrics" />
                    <Label text="리포트에 추가" css="addReport" />
                </div>
                <div className="horizonFlexbox gap-8">
                    <Label text="영아산통" css="eventTimeAgo" />
                    <Label text="설사" css="eventTimeAgo" />
                </div>
            </div>
            <div className={styles.addSymptomContainer}>
                <Label
                    text="일정을 잊지는 않으셨나요?"
                    css="symptomTitleLabel"
                />
                <div className={styles.forgetSymptom}>
                    <Label text="배변" css="symptomOrder" />
                    <Label text="소변" css="symptomOrder" />
                    <Label text="2:00PM" css="symptomOrder" />
                    <div className="horizonFlexbox">
                        <div className={styles.plus}></div>
                        <div className="verticalFlexbox">
                            <Label text="기록으로" css="metrics" />
                            <Label text="등록하기" css="metrics" />
                        </div>
                    </div>
                </div>
                <Label
                    text="오늘의 김아이에 대해 기록해요"
                    css="symptomTitleLabel"
                />
                <div className={styles.symptomArea}>
                    <div className={styles.symptoms}>
                        <Label text="특이증상" css="symptomContent" />
                    </div>
                    <div className={styles.symptoms}>
                        <Label text="특이증상" css="symptomContent" />
                    </div>
                    <div className={styles.symptoms}>
                        <Label text="특이증상" css="symptomContent" />
                    </div>
                    <div className={styles.symptoms}>
                        <Label text="특이증상" css="symptomContent" />
                    </div>
                    <div className={styles.symptoms}>
                        <Label text="특이증상" css="symptomContent" />
                    </div>
                    <div className={styles.symptoms}>
                        <Label text="특이증상" css="symptomContent" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default App;
