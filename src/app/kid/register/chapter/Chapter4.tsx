'use client';

import React, { useState } from 'react';
import { ChapterProps } from '@/hook/useChapter';
import { Text, Flex, Box, Grid, useMantineTheme } from '@mantine/core';

const Chapter4: React.FC<ChapterProps> = ({ goToChapter }) => {
	const theme = useMantineTheme();
	const [selectedItem, setSelectedItem] = useState<number | null>(null);

	const handleItemClick = (index: number, targetChapter: number) => {
		setSelectedItem(index);
		// 약간의 지연 후 다음 챕터로 이동 (시각적 피드백을 위해)
		setTimeout(() => {
			goToChapter(targetChapter);
		}, 300);
	};

	const getItemStyle = (index: number) => {
		const isSelected = selectedItem === index;

		return {
			color: isSelected ? theme.colors[theme.primaryColor][6] : '#D9D9D9',
			borderColor: isSelected
				? theme.colors[theme.primaryColor][6]
				: '#D9D9D9',
		};
	};

	return (
		<Box>
			<Text fz="xl" c="#222222" fw={700}>
				과거 증상과
				<br />
				진료 기록을 알려주세요
			</Text>

			<Box mt={48}>
				<Text fz="lg" fw={700} c={theme.other.fontColors.sub2}>
					과거에 진단받은 질환이 있나요?
				</Text>

				<Grid gutter="sm" mt={12}>
					<Grid.Col span={6}>
						<Flex
							justify="center"
							align="center"
							h={80}
							bg="#ffffff"
							c={getItemStyle(0).color}
							style={{
								border: `1px solid ${
									getItemStyle(0).borderColor
								}`,
								borderRadius: '10px',
								padding: '60px 0',
								transition: 'all 0.2s ease',
							}}
							onClick={() => handleItemClick(0, 5)}
						>
							<Text fz={24} fw={700}>
								있어요
							</Text>
						</Flex>
					</Grid.Col>
					<Grid.Col span={6}>
						<Flex
							justify="center"
							align="center"
							h={80}
							bg="#ffffff"
							c={getItemStyle(1).color}
							style={{
								border: `1px solid ${
									getItemStyle(1).borderColor
								}`,
								borderRadius: '10px',
								padding: '60px 0',
								transition: 'all 0.2s ease',
							}}
							onClick={() => handleItemClick(1, 6)}
						>
							<Text fz={24} fw={700}>
								없어요
							</Text>
						</Flex>
					</Grid.Col>
				</Grid>
			</Box>
		</Box>
	);
};

export default Chapter4;
