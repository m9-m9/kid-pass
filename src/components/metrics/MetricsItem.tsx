import React from 'react';
import { Flex, Text, Collapse, ActionIcon, Group } from '@mantine/core';
import {
	IconChevronUp,
	IconChevronDown,
	IconCirclePlus,
} from '@tabler/icons-react';

// MetricsItem 컴포넌트
type MetricsItemProps = {
	title: string;
	isOpen: boolean;
	onToggle: () => void;
	children: React.ReactNode;
};

const MetricsItem: React.FC<MetricsItemProps> = ({
	title,
	isOpen,
	onToggle,
	children,
}) => {
	return (
		<Flex
			p="md"
			bg="white"
			direction="column"
			gap={16}
			styles={{
				root: {
					boxShadow: '0px 0px 15px 0px rgba(0, 0, 0, 0.15)',
					borderRadius: '8px',
				},
			}}
		>
			<Flex justify="space-between" align="center">
				<Group gap="lg">
					<Text fw={600} fz={16} c="#222222">
						{title}
					</Text>
					<ActionIcon
						variant="transparent"
						onClick={onToggle}
						aria-label={isOpen ? '접기' : '펼치기'}
					>
						{isOpen ? (
							<IconChevronUp size={18} />
						) : (
							<IconChevronDown size={18} />
						)}
					</ActionIcon>
				</Group>
				<ActionIcon variant="transparent">
					<IconCirclePlus size={20} />
				</ActionIcon>
			</Flex>

			<Collapse in={isOpen}>
				<Flex align="center" gap="md">
					{children}
				</Flex>
			</Collapse>
		</Flex>
	);
};

export { MetricsItem };
