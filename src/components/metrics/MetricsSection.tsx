import React from 'react';
import { MetricsItem } from './MetricsItem';
import Container from '@/elements/container/Container';
import ProfileMetrics from './ProfileMetrics';
import { Text } from '@mantine/core';

interface MetricsDetail {
	label: string;
	value: string;
}

interface MetricsSectionProps {
	labelText: string;
	metricsData: {
		title: string;
		isOpen: boolean;
		onToggle: () => void;
		details?: MetricsDetail[]; // 세부사항
		bodyTempComponent?: React.ReactNode; // BodyTemp 컴포넌트와 같은 특별한 컴포넌트
	}[];
}

const MetricsSection: React.FC<MetricsSectionProps> = ({
	labelText,
	metricsData,
}) => {
	return (
		<Container className="sectionContainer">
			<Text fw={700} fz={20}>
				{labelText}
			</Text>
			{metricsData.map((metric) => (
				<MetricsItem
					key={`metric-${metric.title}`}
					title={metric.title}
					isOpen={metric.isOpen}
					onToggle={metric.onToggle}
				>
					{metric.bodyTempComponent ??
						metric.details?.map((detail) => (
							<ProfileMetrics
								key={`detail-${detail.label}`}
								label={detail.label}
								value={detail.value}
							/>
						))}
				</MetricsItem>
			))}
		</Container>
	);
};

export { MetricsSection };
