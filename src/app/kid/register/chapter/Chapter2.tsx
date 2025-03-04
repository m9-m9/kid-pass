'use client';

import React from 'react';
import { useChldrnInfoStore } from '@/store/useChldrnInfoStore';
import { ChapterProps } from '@/hook/useChapter';
import Spacer from '@/elements/spacer/Spacer';
import { Flex, Text, Grid, useMantineTheme, Image, Stack } from '@mantine/core';

const Item = ({
	children,
	index,
	handleSexSelection,
	theme,
}: {
	children: React.ReactNode;
	index: number;
	handleSexSelection: (index: number) => void;
	theme: any;
}) => (
	<Flex
		direction="column"
		justify="center"
		align="center"
		bg="#ffffff"
		gap={24}
		styles={{
			root: {
				border: `1px solid ${theme.colors[theme.primaryColor][6]}`,
				borderRadius: '10px',
			},
		}}
		ta="center"
		lh={1.2}
		p="40px 0 16px 0"
		onClick={() => handleSexSelection(index)}
	>
		{children}
	</Flex>
);

const Chapter2: React.FC<ChapterProps> = ({ onNext }) => {
	const theme = useMantineTheme();

	const setChldrnSexdstn = useChldrnInfoStore(
		(state) => state.setChldrnSexdstn
	);
	const chldrnSexdstnType = ['M', 'F'] as const;

	const texts = [
		<Stack gap={12} justify="center" key="male">
			<Image
				src="/boySign.png"
				style={{
					width: '80px',
					height: 'auto',
					alignSelf: 'center',
				}}
				alt="남자 아이콘"
			/>
			<Text c={theme.colors[theme.primaryColor][6]} fz="lg" fw={700}>
				남자
			</Text>
		</Stack>,
		<Stack gap={12} justify="center" key="female">
			<Image
				src="/girlSign.png"
				style={{
					width: '80px',
					height: 'auto',
					alignSelf: 'center',
				}}
				alt="여자 아이콘"
			/>
			<Text c={theme.colors[theme.primaryColor][6]} fz="lg" fw={700}>
				여자
			</Text>
		</Stack>,
	];

	const handleSexSelection = (index: number) => {
		setChldrnSexdstn(chldrnSexdstnType[index]);
		onNext();
	};

	return (
		<Flex direction="column">
			<Text fz="xl" c="#222222" fw={700}>
				아이의 성별은
				<br />
				무엇인가요?
			</Text>
			<Spacer height={48} />
			<Grid gutter="md">
				{texts.map((text, index) => (
					<Grid.Col span={6} key={chldrnSexdstnType[index]}>
						<Item
							index={index}
							handleSexSelection={handleSexSelection}
							theme={theme}
						>
							{text}
						</Item>
					</Grid.Col>
				))}
			</Grid>
		</Flex>
	);
};

export default Chapter2;
