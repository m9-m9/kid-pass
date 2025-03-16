'use client';

import React, { useState } from 'react';
import { ChapterProps } from '@/hook/useChapter';
import { useChldrnInfoStore } from '@/store/useChldrnInfoStore';
import { bottomModalTheme } from '@/utils/mantine.theme';
import { Box, Button, Text, Textarea } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useRouter } from 'next/navigation';

const Chapter6: React.FC<ChapterProps> = ({ onNext }) => {
	const router = useRouter();
	const [etcInput, setEtcInput] = useState('');
	const setEtc = useChldrnInfoStore((state) => state.setEtc);

	const openRegisterModal = () => {
		const modalId = modals.open({
			...bottomModalTheme,
			title: '오늘의 아이 기록하기',
			children: (
				<Box>
					<Box m={24} ta="center">
						<Text fz="xl" fw={600} lh={1.2}>
							김아기 프로필
							<br />
							등록완료!
						</Text>
					</Box>
					<Box mb={48} ta="center">
						<Text fz="1.125rem" fw={500} c="#d9d9d9" lh={1.2}>
							아이가 더 효과적인 치료를
							<br />
							받을 수 있게 도와드릴게요!
						</Text>
					</Box>
					<Button
						fullWidth
						c="#FFFFFF"
						onClick={() => {
							modals.close(modalId);
							router.push('/');
						}}
					>
						작성완료
					</Button>
				</Box>
			),
		});
	};

	const handleNext = () => {
		setEtc(etcInput);
		onNext();
		openRegisterModal();
	};

	return (
		<Box>
			<Text fz="xl" c="#222222" fw={700}>
				아이에 대해
				<br />더 알려줄 것이 있나요?
			</Text>
			<Box mt={54} mb={120}>
				<Textarea
					placeholder="병원에서 미리 알아두면 좋을&#10;특이 사항이 있다면 적어주세요"
					value={etcInput}
					onChange={(e) => setEtcInput(e.target.value)}
					minRows={10}
					styles={{
						input: {
							border: '1px solid #d9d9d9',
							borderRadius: '10px',
							padding: '20px',
							minHeight: '280px',
							'&::placeholder': {
								fontSize: '16px',
								fontWeight: 500,
								color: '#d9d9d9',
							},
						},
					}}
				/>
			</Box>
			<Button onClick={handleNext} fullWidth c="#FFFFFF">
				작성 완료
			</Button>
		</Box>
	);
};

export default Chapter6;
