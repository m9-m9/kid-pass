import React from 'react';
import { Carousel } from '@mantine/carousel';
import {
	Box,
	Flex,
	Text,
	Image,
	Stack,
	Group,
	useMantineTheme,
} from '@mantine/core';
import { KidRecord } from './page';
import ArrowIcon from '@/elements/svg/Arrow';

interface ProfileCarouselProps {
	profiles: KidRecord[];
	onSlideChange: (index: number) => void;
}

// ProfileMetrics를 Mantine 컴포넌트로 변환
const ProfileMetrics = ({
	label,
	value,
}: {
	label: string;
	value: string | number;
}) => (
	<Stack gap={2}>
		<Text fz="sm" fw="500" c="#646464">
			{label}
		</Text>
		<Text fz="xl" fw="700" c="#000000">
			{String(value)}
		</Text>
	</Stack>
);

const ProfileCarousel: React.FC<ProfileCarouselProps> = ({
	profiles,
	onSlideChange,
}) => {
	const theme = useMantineTheme();
	return (
		<Carousel
			slideSize="95%"
			slidesToScroll={1}
			dragFree={false}
			containScroll="keepSnaps" // "trimSnaps" 대신 "keepSnaps" 사용
			skipSnaps={false}
			loop={false}
			onSlideChange={onSlideChange}
			withControls={false}
			styles={{
				root: {
					width: '100%',
				},
				viewport: {
					overflow: 'hidden',
					width: '100%',
				},
				container: {
					display: 'flex',
					width: '100%',
					gap: '8px', // 슬라이드 간겨
				},
				slide: {
					flex: '0 0 auto',
					width: profiles.length > 1 ? 'calc(95% - 8px)' : '100%',
				},
			}}
		>
			{profiles.map((kidRecord) => {
				const { profile } = kidRecord;
				const [physicalStats] = profile.chldrnInfoList;

				return (
					<Carousel.Slide key={profile.chldrnNo}>
						<Box
							style={{
								borderRadius: '8px',
								backgroundColor: theme.colors.brand[0],
								padding: '16px',
							}}
						>
							<Flex justify="space-between">
								<Stack>
									<ProfileMetrics
										label={`${profile.age} 출생`}
										value={profile.chldrnNm}
									/>
									<ProfileMetrics
										label="나이 (만)"
										value={profile.age}
									/>
								</Stack>

								<Stack>
									<Group align="center" gap={6}>
										<Text
											fz="var(--font-size-12)"
											fw="var(--font-weight-semiBold)"
											c="#9e9e9e"
										>
											리포트 업데이트
										</Text>
										<ArrowIcon
											direction="right"
											color="#9e9e9e"
											size={16}
										/>
									</Group>
									<Flex align="end" justify="end">
										<Image
											src="https://heidimoon.cafe24.com/renwal/test2/barcode.png"
											width={76}
											height={76}
											alt="바코드"
										/>
									</Flex>
								</Stack>
							</Flex>

							<Flex align="center" justify="space-between">
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
							</Flex>
						</Box>
					</Carousel.Slide>
				);
			})}
		</Carousel>
	);
};

export default ProfileCarousel;
