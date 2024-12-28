import Warning from "@/elements/svg/Warning";
import Button from "../../../elements/button/Button";
import Container from "../../../elements/container/Container";
import { Label } from "../../../elements/label/Label";
import InfoBar from "./InfoBar";
import VaccineCount from "./VaccineCount";
import styles from "./note.module.css";

const App = () => {
    return (
        <>
            <InfoBar />
            <Label text="다가오는 예방접종일" css="metricsValue" />
            <Container className="dueDate mt-12 mb-36">
                <div className="horizonFlexbox gap-12">
                    <Warning />
                    <div className="verticalFlexbox space-between">
                        <div className="horizonFlexbox gap-4">
                            <Label text="결핵" css="vaccineName" />
                            <div className={styles.vaccineCount}>
                                <Label text="2차" css="" />
                            </div>
                        </div>
                        <Label text="접종일이 지났어요!" css="vaccineWarning" />
                    </div>
                </div>
                <div className="verticalFlexbox space-between">
                    <Label text="24.10.30" css="vaccineDate" />
                    <Label text="D+5일" css="vaccineCount" />
                </div>
            </Container>
            <Label text="예방접종 진행률" css="metricsValue" />
            <Container className="vaccinationRate">
                <Label text="예방접종률" css="symtomLabel" />
                <div className="horizonFlexbox align-center gap-16">
                    <div className="verticalFlexbox">
                        <Label text="미접종 15" css="vaccinationResult" />
                        <Label text="완료 50" css="vaccinationResult" />
                    </div>
                    <Label text="30%" css="vaccinationRate" />
                </div>
            </Container>
            <div className="horizonFlexbox align-center gap-8 space-around">
                <Button css="noteBtn" label="달력보기"></Button>
                <Button css="noteBtn" label="알림설정"></Button>
            </div>
            <VaccineCount />
        </>
    );
};

export default App;
