"use client";

import Warning from "@/elements/svg/Warning";
import Button from "../../../elements/button/Button";
import Container from "../../../elements/container/Container";
import { Label } from "../../../elements/label/Label";
import InfoBar from "./InfoBar";
import VaccineCount from "./VaccineCount";
import styles from "./note.module.css";
import ProgressBar from "@/components/progressBar/progressBar";

const App = () => {
    return (
        <>
            <InfoBar />
            <Label text="다가오는 예방접종일" css="metricsValue" />
            <Container className="noteContainer" backgroundColor="#ff5555">
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
            <Container className="noteContainer" backgroundColor="#F4F4F4">
                <div className="horizonFlexbox space-between">
                    <div className="horizonFlexbox gap-4">
                        <Container
                            className="vaccinationRate"
                            backgroundColor="#729BED"
                        >
                            <Label text="완료" css="vaccinationTF" />
                            <Label text="50" css="vaccinationTF" />
                        </Container>
                        <Container
                            className="vaccinationRate"
                            backgroundColor="#BFBFBF"
                        >
                            <Label text="미접종" css="vaccinationTF" />
                            <Label text="15" css="vaccinationTF" />
                        </Container>
                    </div>
                    <Label text="30%" css="vaccineRate" />
                </div>

                <ProgressBar completed={40} total={10} />
            </Container>
            <div className="horizonFlexbox gap-8">
                <div className={styles.noteBtn}>
                    <Label text="달력보기" css="noteBtn"></Label>
                    <img src="/vaccineCalander.svg" />
                </div>
                <div className={styles.noteBtn}>
                    <Label text="알림설정" css="noteBtn"></Label>
                    <img src="/vaccineAlarm.svg" />
                </div>
            </div>
            <Label text="예방접종 자세히 보기" css="metricsValue" />
            <VaccineCount />
        </>
    );
};

export default App;
