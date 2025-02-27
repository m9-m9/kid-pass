import React from 'react';
import { AppShell, Box } from '@mantine/core';
import BottomNavigation from './BottomNavigation';
import Header from './Header';

interface MobileLayoutProps {
	children: React.ReactNode;
	showHeader?: boolean;
	headerType?: 'back' | 'profile';
	title?: string;
	showBottomNav?: boolean;
	currentRoute?: string;
	onBack?: () => void;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({
	children,
	showHeader = true,
	headerType = 'back',
	title = '',
	showBottomNav = true,
	currentRoute = '/',
	onBack,
}) => {
	return (
		<AppShell
			padding={0}
			header={showHeader ? { height: 60 } : undefined}
			footer={showBottomNav ? { height: 60 } : undefined}
		>
			{showHeader && (
				<AppShell.Header>
					<Header type={headerType} title={title} onBack={onBack} />
				</AppShell.Header>
			)}

			<AppShell.Main>
				<Box
					pt={showHeader ? 60 : 0}
					pb={showBottomNav ? 60 : 0}
					style={
						{
							minHeight: '100vh',
							lineHeight: 1,
							'--mantine-line-height-md': '1',
						} as React.CSSProperties
					}
				>
					{children}
				</Box>
			</AppShell.Main>

			{showBottomNav && (
				<AppShell.Footer>
					<BottomNavigation currentRoute={currentRoute} />
				</AppShell.Footer>
			)}
		</AppShell>
	);
};

export default MobileLayout;
