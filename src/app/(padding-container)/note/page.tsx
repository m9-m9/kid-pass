import Button from "../../../elements/button/Button";
import Container from "../../../elements/container/Container";
import { Label } from "../../../elements/label/Label";
import VaccineCount from "./VaccineCount";

const App = () => {
    return (
        <>
            <div className="horizonFlexbox align-center gap-8 mb-16">
                <Label text="김아기" css="babyName" />
                <Label text="12주" css="babyAge" />
            </div>
            <Container className="dueDate mb-16">
                <Label text="결핵" css="dueDate" />
                <div className="vertivalFlexbox gap-8">
                    <Label text="D-DAY + 5" css="dueDate" />
                    <Label text="접종일이 지났습니다" css="dueDate" />
                </div>
            </Container>
            <Container className="vaccination">
                <Label text="B형 간염 3차" css="vaccination" />
                <Label text="D-Day" css="vaccination" />
            </Container>
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
