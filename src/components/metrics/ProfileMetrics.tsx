import { Stack, Text } from '@mantine/core';

const ProfileMetrics = ({
	label,
	value,
}: {
	label: string;
	value: string | number;
}) => (
	<Stack gap={5}>
		<Text
			fz="var(--font-size-13)"
			fw="var(--font-weight-medium)"
			c="#646464"
		>
			{label}
		</Text>
		<Text fz="var(--font-size-18)" fw="var(--font-weight-bold)" c="#000000">
			{String(value)}
		</Text>
	</Stack>
);
