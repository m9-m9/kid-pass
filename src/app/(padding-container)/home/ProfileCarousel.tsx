import CarouselContainer from "@/components/carousel/CarouselContainer";
import ProfileMetrics from "@/components/metrics/ProfileMetrics";
import Container from "@/elements/container/Container";
import { Label } from "@/elements/label/Label";
import ArrowIcon from "@/elements/svg/Arrow";

const ProfileCarousel: React.FC = () => {
    const profiles = [
        {
            name: "김아기",
            birthDate: "2024.09.28",
            age: "36일, 5주 1일",
            weight: "5.1kg",
            height: "51.0cm",
            headCircumference: "36.9cm",
        },
        {
            name: "이아기",
            birthDate: "2024.08.28",
            age: "66일, 9주 3일",
            weight: "6.2kg",
            height: "54.0cm",
            headCircumference: "38.2cm",
        },
    ];

    return (
        <CarouselContainer
            options={{
                slidesToScroll: 1, // 한 번에 스크롤할 슬라이드 수
                containScroll: "trimSnaps", // 끝에서 스크롤 제한
            }}
            slideClassName="slide-ratio-90"
        >
            {profiles.map((profile) => (
                <Container className="profile" key={profile.name}>
                    <div className="horizonFlexbox space-between">
                        <div className="verticalFlexbox gap-18 space-between">
                            <ProfileMetrics
                                label={`${profile.birthDate} 출생`}
                                value={profile.name}
                            />
                            <ProfileMetrics
                                label="나이 (만)"
                                value={profile.age}
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
                        <ProfileMetrics label="몸무게" value={profile.weight} />
                        <ProfileMetrics label="키" value={profile.height} />
                        <ProfileMetrics
                            label="머리 둘레"
                            value={profile.headCircumference}
                        />
                    </div>
                </Container>
            ))}
        </CarouselContainer>
    );
};

export default ProfileCarousel;
