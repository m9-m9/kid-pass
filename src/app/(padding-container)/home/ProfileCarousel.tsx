import CarouselContainer from "@/components/carousel/CarouselContainer";
import ProfileMetrics from "@/components/metrics/ProfileMetrics";
import Container from "@/elements/container/Container";
import { Label } from "@/elements/label/Label";
import ArrowIcon from "@/elements/svg/Arrow";
import { KidProfile } from "./page";

interface ProfileCarouselProps {
    profiles: KidProfile[];
    isLoading: boolean;
}

const ProfileCarousel: React.FC<ProfileCarouselProps> = ({
    profiles,
    isLoading,
}) => {
    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <CarouselContainer
            options={{
                slidesToScroll: 1,
                containScroll: "trimSnaps",
            }}
            slideClassName={
                profiles.length > 1 ? "slide-ratio-90" : "slide-ratio-100"
            }
        >
            {profiles.map((profile) => {
                const [physicalStats] = profile.chldrnInfoList;

                return (
                    <Container className="profile" key={profile.atchCode}>
                        <div className="horizonFlexbox space-between">
                            <div className="verticalFlexbox gap-18 space-between">
                                <ProfileMetrics
                                    label={`${profile.age} 출생`}
                                    value={profile.chldrnNm}
                                />
                                <ProfileMetrics
                                    label="나이 (만)"
                                    value={profile.age}
                                />
                            </div>

                            <div className="verticalFlexbox gap-7">
                                <div className="horizonFlexbox align-center">
                                    <Label
                                        text="리포트 업데이트"
                                        css="rptUpdate"
                                    />
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
                            <ProfileMetrics
                                label="몸무게"
                                value={`${physicalStats.chldrnBdwgh}kg`}
                            />
                            <ProfileMetrics
                                label="키"
                                value={`${physicalStats.chldrnHeight}cm`}
                            />
                            <ProfileMetrics
                                label="머리 둘레"
                                value={`${physicalStats.chldrnHead}cm`}
                            />
                        </div>
                    </Container>
                );
            })}
        </CarouselContainer>
    );
};

export default ProfileCarousel;
