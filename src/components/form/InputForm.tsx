import { memo, useCallback, useMemo, useState, type ChangeEvent } from 'react';
import { TextInput, Button, Stack, Group, Text } from '@mantine/core';
import { Label } from '@/elements/label/Label';

interface InputFormProps {
	labelText: string;
	labelCss: string;
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	required?: boolean;
	errorMessage?: string;
	type?: 'text' | 'password' | 'email' | 'number';
	showPasswordToggle?: boolean;
	unit?: string;
}

const PasswordToggleButton = memo(
	({
		showPassword,
		onClick,
	}: {
		showPassword: boolean;
		onClick: () => void;
	}) => (
		<Button
			variant="transparent"
			onClick={onClick}
			p={0}
			style={{ border: 'none', boxShadow: 'none' }}
			type="button"
		>
			<Group gap={4}>
				<i
					className={`ri-${
						showPassword ? 'eye-off-line' : 'eye-line'
					}`}
				/>
				<Text size="sm">비밀번호 가리기</Text>
			</Group>
		</Button>
	)
);

PasswordToggleButton.displayName = 'PasswordToggleButton';

const InputForm = memo(
	({
		labelText,
		labelCss,
		value,
		onChange,
		placeholder,
		required,
		errorMessage,
		type = 'text',
		showPasswordToggle = false,
		unit,
	}: InputFormProps) => {
		const [showPassword, setShowPassword] = useState(false);

		const togglePasswordVisibility = useCallback(() => {
			setShowPassword((prev) => !prev);
		}, []);

		const handleChange = useCallback(
			(e: ChangeEvent<HTMLInputElement>) => {
				onChange(e.target.value);
			},
			[onChange]
		);

		const inputType = useMemo(() => {
			if (type === 'password' && showPassword) {
				return 'text';
			}
			return type;
		}, [type, showPassword]);

		const passwordToggleButton = useMemo(() => {
			if (showPasswordToggle && type === 'password') {
				return (
					<PasswordToggleButton
						showPassword={showPassword}
						onClick={togglePasswordVisibility}
					/>
				);
			}
			return null;
		}, [showPasswordToggle, type, showPassword, togglePasswordVisibility]);

		return (
			<Stack gap={8}>
				<Label text={labelText} css={labelCss} />
				<div style={{ position: 'relative' }}>
					<div
						style={{
							position: 'relative',
							display: 'flex',
							alignItems: 'center',
							width: '100%',
						}}
					>
						<TextInput
							type={inputType}
							value={value}
							onChange={handleChange}
							placeholder={placeholder}
							required={required}
							error={errorMessage}
							styles={{
								input: {
									paddingRight: unit ? '40px' : undefined,
								},
							}}
							w="100%"
						/>
						{unit && (
							<Text
								style={{
									position: 'absolute',
									pointerEvents: 'none',
								}}
								right={12}
								c="#666"
								size="md"
							>
								{unit}
							</Text>
						)}
					</div>
					{passwordToggleButton}
				</div>
				{errorMessage && (
					<Text size="14px" fw={600} c="#FF6969">
						{errorMessage}
					</Text>
				)}
			</Stack>
		);
	}
);

InputForm.displayName = 'InputForm';

export default InputForm;
