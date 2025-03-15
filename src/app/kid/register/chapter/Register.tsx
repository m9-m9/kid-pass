'use client';

import React, { useEffect, useState } from 'react';
import useChapter from '@/hook/useChapter';
import Chapter1 from './Chapter1';
import Chapter2 from './Chapter2';
import Chapter3 from './Chapter3';
import Chapter4 from './Chapter4';
import Chapter5 from './Chapter5';
import useAuth from '@/hook/useAuth';
import Chapter6 from './Chapter6';
import { useChldrnInfoStore } from '@/store/useChldrnInfoStore';
import MobileLayout from '@/components/mantine/MobileLayout';

const Register: React.FC = () => {
	const { getToken } = useAuth();
	const [token, setToken] = useState();

	useEffect(() => {
		const fetchToken = async () => {
			const accessToken = await getToken();
			setToken(accessToken);
		};

		fetchToken();
	}, []);

	const { chapter, nextChapter, goToChapter } = useChapter({
		totalChapters: 6,
		onComplete: async () => {
			try {
				const store = useChldrnInfoStore.getState();
				const [
					chldrnNm,
					chldrnBrthdy,
					chldrnBdwgh,
					chldrnHeight,
					chldrnHead,
				] = store.details;

				// YYYYMMDD 형식을 YYYY-MM-DD로 변환
				const formattedBirthday = `${chldrnBrthdy.substring(
					0,
					4
				)}-${chldrnBrthdy.substring(4, 6)}-${chldrnBrthdy.substring(
					6,
					8
				)}`;

				const response = await fetch('/api/child/register', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({
						name: chldrnNm,
						birthDate: formattedBirthday,
						gender: store.chldrnSexdstn,
						weight: parseFloat(chldrnBdwgh),
						height: parseFloat(chldrnHeight),
						headCircumference: parseFloat(chldrnHead),
						ageType: store.age,
						allergies: store.allergic,
						symptoms: store.symptom,
						memo: store.etc,
					}),
				});

				const data = await response.json();

				if (response.ok) {
					const childId = data.data.id;
					localStorage.setItem('currentKid', childId);
				} else {
					throw new Error(data.message);
				}
			} catch (error) {
				console.error('아이 등록 에러:', error);
				alert('아이 정보 등록에 실패했습니다.');
			}
		},
	});

	return (
		<MobileLayout
			showHeader={true}
			headerType="profile"
			title="홈"
			showBottomNav={true}
			currentRoute="/"
		>
			<div>
				{chapter === 1 && (
					<Chapter1 onNext={nextChapter} goToChapter={() => {}} />
				)}
				{chapter === 2 && (
					<Chapter2 onNext={nextChapter} goToChapter={() => {}} />
				)}
				{chapter === 3 && (
					<Chapter3 onNext={nextChapter} goToChapter={() => {}} />
				)}
				{chapter === 4 && (
					<Chapter4 onNext={nextChapter} goToChapter={goToChapter} />
				)}
				{chapter === 5 && (
					<Chapter5 onNext={nextChapter} goToChapter={() => {}} />
				)}
				{chapter === 6 && (
					<Chapter6 onNext={nextChapter} goToChapter={() => {}} />
				)}
			</div>
		</MobileLayout>
	);
};

export default Register;
