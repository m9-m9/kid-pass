'use client';

import MobileLayout from '@/components/mantine/MobileLayout';
import { useRouter } from 'next/navigation';

const App = () => {
	const router = useRouter();

	const handleBack = () => router.back();

	return (
		<MobileLayout
			showHeader={true}
			headerType="back"
			title="리포트 상세보기"
			showBottomNav={true}
			onBack={handleBack}
		>
			리포트페이지
		</MobileLayout>
	);
};

export default App;
