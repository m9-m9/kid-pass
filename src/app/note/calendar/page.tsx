'use client';

import React, { useState } from 'react';
import {
	Box,
	Group,
	Title,
	Button,
	SegmentedControl,
	Grid,
	Text,
	Container,
	useMantineTheme,
} from '@mantine/core';
import { IconChevronUp, IconChevronDown } from '@tabler/icons-react';
import WeeklyDatePicker from '@/components/datePicker/WeekCarousel';
import dayjs from 'dayjs';
import MobileLayout from '@/components/mantine/MobileLayout';

const Calendar = () => {
	const [viewType, setViewType] = useState('calendar');
	const [currentDate, setCurrentDate] = useState(new Date());
	const theme = useMantineTheme();

	const year = currentDate.getFullYear();
	const month = currentDate.getMonth();

	const firstDay = new Date(year, month, 1);
	const lastDay = new Date(year, month + 1, 0);

	// 이전 달의 마지막 날 정보
	const prevMonthLastDay = new Date(year, month, 0);
	const prevMonthLastDate = prevMonthLastDay.getDate();

	const firstDayOfWeek = firstDay.getDay();
	const lastDate = lastDay.getDate();

	const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
	const monthNames = [
		'1월',
		'2월',
		'3월',
		'4월',
		'5월',
		'6월',
		'7월',
		'8월',
		'9월',
		'10월',
		'11월',
		'12월',
	];

	// 달력에 표시할 날짜 배열 생성
	const getDatesArray = () => {
		const dates = [];

		// 이전 달의 날짜 추가
		for (let i = 0; i < firstDayOfWeek; i++) {
			const prevDate = prevMonthLastDate - firstDayOfWeek + i + 1;
			dates.push({
				day: prevDate,
				type: 'prev',
			});
		}

		// 현재 달의 날짜 추가
		for (let i = 1; i <= lastDate; i++) {
			dates.push({
				day: i,
				type: 'current',
			});
		}

		// 다음 달의 날짜 추가 (7x6=42 그리드를 채우기 위해)
		const remainingDays = 42 - dates.length;
		for (let i = 1; i <= remainingDays; i++) {
			dates.push({
				day: i,
				type: 'next',
			});
		}

		return dates;
	};

	const getWeeksArray = () => {
		const dates = getDatesArray();
		const weeks = [];

		for (let i = 0; i < dates.length; i += 7) {
			weeks.push(dates.slice(i, i + 7));
		}

		return weeks;
	};

	const handlePrevMonth = () => {
		setCurrentDate(new Date(year, month - 1, 1));
	};

	const handleNextMonth = () => {
		setCurrentDate(new Date(year, month + 1, 1));
	};

	return (
		<MobileLayout title="접종 달력">
			<Container size="sm" p={0}>
				<Group justify="space-between" mb="md" px="16">
					<Group gap="xs">
						<Title order={4}>
							{year}년 {monthNames[month]}
						</Title>
						<Box>
							<Button
								variant="subtle"
								p={0}
								h={24}
								style={{ all: 'unset', cursor: 'pointer' }}
								onClick={handlePrevMonth}
							>
								<IconChevronUp size={20} />
							</Button>
							<Button
								variant="subtle"
								p={0}
								h={24}
								style={{ all: 'unset', cursor: 'pointer' }}
								onClick={handleNextMonth}
							>
								<IconChevronDown size={20} />
							</Button>
						</Box>
					</Group>

					<SegmentedControl
						value={viewType}
						onChange={setViewType}
						data={[
							{ value: 'calendar', label: '달력' },
							{ value: 'list', label: '목록' },
						]}
						styles={{
							root: {
								backgroundColor: theme.colors.gray[1],
								padding: 0,
								overflow: 'hidden',
								boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
							},
							indicator: {
								backgroundColor: theme.white,
								borderRadius: theme.radius.md,
								boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
							},

							label: {
								fontSize: theme.fontSizes.sm,
								fontWeight: 600,
								color: 'black',
								padding: '8px 16px',
								height: '100%',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							},
							control: {
								border: 'none',
								height: '100%',
							},
						}}
					/>
				</Group>

				{viewType === 'calendar' ? (
					<>
						<Grid columns={7} gutter="xs" mb="xs">
							{weekDays.map((day) => (
								<Grid.Col span={1} key={day}>
									<Text
										ta="center"
										size="sm"
										fw={600}
										c="dimmed"
									>
										{day}
									</Text>
								</Grid.Col>
							))}
						</Grid>

						<Box>
							{getWeeksArray().map((week, weekIndex) => (
								<Grid
									key={weekIndex}
									columns={7}
									gutter="xs"
									style={{
										borderTop:
											'1px solid ' + theme.colors.gray[3],
										height: '4rem',
									}}
								>
									{week.map((date, dateIndex) => (
										<Grid.Col span={1} key={dateIndex}>
											<Box
												pt="xs"
												style={{
													textAlign: 'center',
													color:
														date.type !== 'current'
															? theme.colors
																	.gray[3]
															: theme.colors
																	.dark[8],
												}}
											>
												<Text size="md" fw={600}>
													{date.day}
												</Text>
											</Box>
										</Grid.Col>
									))}
								</Grid>
							))}
						</Box>
					</>
				) : (
					<WeeklyDatePicker
						currentDate={dayjs(currentDate)}
						onSelect={(date) => {
							setCurrentDate(date.toDate());
							// 필요한 경우 여기서 추가 작업 수행
						}}
					/>
				)}
			</Container>
		</MobileLayout>
	);
};

export default Calendar;
