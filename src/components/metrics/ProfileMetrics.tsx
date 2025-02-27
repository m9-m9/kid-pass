import { Stack, Text } from '@mantine/core';

// ProfileMetrics를 Mantine 컴포넌트로 변환
const ProfileMetrics = ({
	label,
	value,
}: {
	label: string;
	value: string | number;
}) => (
	<Stack gap={5}>
		<Text fz="xs" fw="600" c="#646464">
			{label}
		</Text>
		<Text fz="xl" fw="700" c="#000000">
			{String(value)}
		</Text>
	</Stack>
);

export default ProfileMetrics;
