import { Label } from "@/elements/label/Label";
import Button from "../../elements/button/Button";
import useUsrStore from "../../store/useUsrStore";
import sendToRn from "../../utils/sendToRn";
import Container from "@/elements/container/Container";
import ProfileMetrics from "@/components/ProfileMetrics";
import ArrowIcon from "@/elements/svg/Arrow";
import PlusIcon from "@/elements/svg/Plus";
import styles from "./home.module.css";

const App: React.FC = () => {
    const usr = useUsrStore((state) => state);

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
                        <ProfileMetrics
                            label="2024.09.28 출생"
                            value="김아기"
                        />
                        <ProfileMetrics
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
                    <ProfileMetrics label="몸무게" value="5.1kg" />
                    <ProfileMetrics label="키" value="51.0cm" />
                    <ProfileMetrics label="머리 둘레" value="36.9cm" />
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
            <div className="horizonFlexbox gap-16">
                <Container className="homepage_2">
                    <Label text="지금 문 연 병원/약국" css="home_2" />
                    <img src="https://heidimoon.cafe24.com/renwal/test2/Group.png" />
                </Container>
                <Container className="homepage_2">
                    <Label text="진료받은 기록" css="home_2" />
                    <img src="https://heidimoon.cafe24.com/renwal/test2/OBJECTS.png" />
                </Container>
            </div>
        </>
    );
};

export default App;
