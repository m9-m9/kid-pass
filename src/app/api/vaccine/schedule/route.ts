import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { VACCINE_LIST } from '@/utils/vaccine'; // 업로드한 백신 데이터 경로 조정 필요

const prisma = new PrismaClient();

// 아이 등록 시 또는 백신 일정 생성 시 호출되는 API
export async function POST(request: Request) {
	try {
		const { childId, birthDate } = await request.json();

		if (!childId || !birthDate) {
			return NextResponse.json(
				{ message: '아이 ID와 생년월일이 필요합니다.' },
				{ status: 400 }
			);
		}

		// 아이 정보 확인
		const child = await prisma.child.findUnique({
			where: { id: childId },
		});

		if (!child) {
			return NextResponse.json(
				{ message: '아이 정보를 찾을 수 없습니다.' },
				{ status: 404 }
			);
		}

		// 생년월일 Date 객체로 변환
		const birthDateObj = new Date(birthDate);

		// 백신 일정 생성
		const vaccineSchedules = [];

		// VACCINE_LIST에서 모든 백신 정보 처리
		for (const diseaseGroup of VACCINE_LIST) {
			for (const vaccine of diseaseGroup.vaccines) {
				for (const dose of vaccine.doses) {
					// 접종일 계산: 생년월일 + dayOffset (일)
					const vaccinationDate = new Date(birthDateObj);
					vaccinationDate.setDate(
						vaccinationDate.getDate() + dose.dayOffset
					);

					// ISO 형식으로 변환 (YYYY-MM-DD)
					const formattedDate = vaccinationDate
						.toISOString()
						.split('T')[0];

					const vaccineInfo = {
						vacntnId: diseaseGroup.id.toString(),
						vacntnIctsd: vaccine.code,
						vacntnDoseNumber: dose.doseNumber,
						vacntnInoclDt: formattedDate,
						childId: childId,
						isCompleted: false, // 명시적으로 미완료 상태로 설정
						actualDate: null, // 실제 접종일은 null로 초기화
					};

					vaccineSchedules.push(vaccineInfo);
				}
			}
		}

		// 백신 일정 일괄 저장
		const createdSchedules = await prisma.vacntnInfo.createMany({
			data: vaccineSchedules,
		});

		return NextResponse.json(
			{
				message: '백신 일정이 생성되었습니다.',
				count: createdSchedules.count,
			},
			{ status: 201 }
		);
	} catch (error) {
		console.error('백신 일정 생성 에러:', error);
		return NextResponse.json(
			{ message: '백신 일정 생성 중 오류가 발생했습니다.' },
			{ status: 500 }
		);
	}
}

// 특정 아이의 백신 일정을 조회하는 API
export async function GET(request: Request) {
	try {
		const url = new URL(request.url);
		const childId = url.searchParams.get('childId');
		const year = url.searchParams.get('year');
		const month = url.searchParams.get('month');

		if (!childId) {
			return NextResponse.json(
				{ message: '아이 ID가 필요합니다.' },
				{ status: 400 }
			);
		}

		// 기본 쿼리 조건
		const whereCondition: any = { childId };

		// 년도와 월이 제공된 경우 해당 기간의 백신 일정만 필터링
		if (year && month) {
			const startDate = `${year}-${month.padStart(2, '0')}-01`;

			// 마지막 날짜 계산
			const lastDay = new Date(
				parseInt(year),
				parseInt(month),
				0
			).getDate();
			const endDate = `${year}-${month.padStart(2, '0')}-${lastDay}`;

			whereCondition.vacntnInoclDt = {
				gte: startDate,
				lte: endDate,
			};
		}

		// 백신 일정 조회
		const vaccineSchedules = await prisma.vacntnInfo.findMany({
			where: whereCondition,
			orderBy: { vacntnInoclDt: 'asc' },
		});

		// 백신 일정에 백신 이름 등 추가 정보 매핑
		const enhancedSchedules = vaccineSchedules.map((schedule) => {
			const diseaseGroup = VACCINE_LIST.find(
				(disease: any) => disease.id.toString() === schedule.vacntnId
			);

			const vaccine = diseaseGroup?.vaccines.find(
				(v: any) => v.code === schedule.vacntnIctsd
			);

			return {
				...schedule,
				diseaseName: diseaseGroup?.name || '',
				vaccineName: vaccine?.name || '',
			};
		});

		return NextResponse.json({
			message: '백신 일정을 조회했습니다.',
			data: enhancedSchedules,
		});
	} catch (error) {
		console.error('백신 일정 조회 에러:', error);
		return NextResponse.json(
			{ message: '백신 일정 조회 중 오류가 발생했습니다.' },
			{ status: 500 }
		);
	}
}

// 백신 접종 완료 상태 업데이트 API
export async function PATCH(request: Request) {
	try {
		const { id, vacntnInoclDt, isCompleted, actualDate } =
			await request.json();

		if (!id) {
			return NextResponse.json(
				{ message: '백신 정보 ID가 필요합니다.' },
				{ status: 400 }
			);
		}

		// 업데이트할 데이터 구성
		const updateData: any = {
			updatedAt: new Date(),
		};

		// 선택적으로 필드 업데이트
		if (vacntnInoclDt !== undefined) {
			updateData.vacntnInoclDt = vacntnInoclDt;
		}

		if (isCompleted !== undefined) {
			updateData.isCompleted = isCompleted;
		}

		if (actualDate !== undefined) {
			updateData.actualDate = actualDate;
		}

		// 백신 접종 정보 업데이트
		const updatedVaccine = await prisma.vacntnInfo.update({
			where: { id },
			data: updateData,
		});

		return NextResponse.json({
			message: '백신 접종 정보가 업데이트 되었습니다.',
			data: updatedVaccine,
		});
	} catch (error) {
		console.error('백신 접종 정보 업데이트 에러:', error);
		return NextResponse.json(
			{ message: '백신 접종 정보 업데이트 중 오류가 발생했습니다.' },
			{ status: 500 }
		);
	}
}
