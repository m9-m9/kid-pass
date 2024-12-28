import { Label } from "@/elements/label/Label";
import Profile from "@/elements/svg/Profile";

const InfoBar = () => {
    return (
        <>
            <div className="horizonFlexbox align-center mb-32 space-between">
                <div className="horizonFlexbox gap-8 align-center">
                    <Label text="김아기," css="babyName" />
                    <Label text="12주" css="babyName" />
                    <div className="divider"></div>
                    <Label text="김아기 D+32" css="countDown"></Label>
                </div>
                <div>
                    <Profile />
                </div>
            </div>
        </>
    );
};

export default InfoBar;
