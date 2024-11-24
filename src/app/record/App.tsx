import Container from "../../elements/container/Container";
import { Label } from "../../elements/label/Label";
import styles from "./record.module.css";

const App: React.FC = () => {
    return (
        <>
            <div className="horizonFlexbox align-center gap-16 mb-24">
                <Label text="2024.10.31.(목)" css="recordDate" />
                <div className="divider"></div>
                <Label text="D+32" css="visitDay" />
            </div>
            <Container className="record">
                <div className="verticalFlexbox gap-8">
                    <Label text="배변" css="metricsValue" />
                    <Label text="두 번째" css="frequency" />
                    <Label text="1시간 전" css="metricsRecord" />
                </div>
                <div className="verticalFlexbox gap-8">
                    <Label text="배변" css="metricsValue" />
                    <Label text="두 번째" css="frequency" />
                    <Label text="1시간 전" css="metricsRecord" />
                </div>
                <div className="verticalFlexbox gap-8">
                    <Label text="배변" css="metricsValue" />
                    <Label text="두 번째" css="frequency" />
                    <Label text="1시간 전" css="metricsRecord" />
                </div>
            </Container>
            <Container className="addRecord">
                <div className="horizonFlexbox align-center space-between">
                    <Label text="특이 증상" css="symtomMetrics" />
                    <Label text="리포트에 추가" css="addReport" />
                </div>
                <div className="horizonFlexbox align-center gap-8">
                    <Label text="영아산통" css="symtompValue" />
                    <Label text="설사" css="symtompValue" />
                </div>
            </Container>
            <Container className="addSymptom">
                <Label text="일정을 잊지는 않으셨나요?" css="category" />
                <Container className="addSymptom_record">
                    <Label text="배변" css="symtompPlaceholder" />
                    <Label text="소변" css="symtompPlaceholder" />
                    <Label text="2:00PM" css="symtompPlaceholder" />
                    <div className="horizonFlexbox align-center">
                        <div className={styles.addSymptom_record_plusBtn}></div>
                        <div className="verticalFlexbox">
                            <Label text="기록으로" css="symtompAdd" />
                            <Label text="등록하기" css="symtompAdd" />
                        </div>
                    </div>
                </Container>
                <Label text="오늘의 김아이에 대해 기록해요" css="category" />
                <Container className="symptomArea">
                    <Container className="symptomList">
                        <Label text="특이증상" css="symtompList" />
                    </Container>
                    <Container className="symptomList">
                        <Label text="특이증상" css="symtompList" />
                    </Container>
                    <Container className="symptomList">
                        <Label text="특이증상" css="symtompList" />
                    </Container>
                    <Container className="symptomList">
                        <Label text="특이증상" css="symtompList" />
                    </Container>
                    <Container className="symptomList">
                        <Label text="특이증상" css="symtompList" />
                    </Container>
                    <Container className="symptomList">
                        <Label text="특이증상" css="symtompList" />
                    </Container>
                </Container>
            </Container>
        </>
    );
};

export default App;
