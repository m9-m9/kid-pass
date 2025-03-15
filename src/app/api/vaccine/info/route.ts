import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { VACCINE_LIST, getTotalRequiredVaccinations } from '@/utils/vaccine';

const prisma = new PrismaClient();

// 아이의 백신 접종 정보 조회
export async function GET(request: Request) {
	try {
		// URL에서 아이 ID 추출 (기존 파라미터명 유지)
		const url = new URL(request.url);
		const chldrnNo = url.searchParams.get('chldrnNo');

		if (!chldrnNo) {
			return NextResponse.json(
				{ message: '아이 ID가 필요합니다.' },
				{ status: 400 }
			);
		}

		// JWT 토큰에서 사용자 정보 가져오기
		const authHeader = request.headers.get('authorization');
		if (!authHeader?.startsWith('Bearer ')) {
			return NextResponse.json(
				{ message: '인증이 필요합니다.' },
				{ status: 401 }
			);
		}

		const token = authHeader.split(' ')[1];
		const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
			userId: string;
		};

		// 사용자 찾기
		const user = await prisma.user.findUnique({
			where: { userId: decoded.userId },
		});

		if (!user) {
			return NextResponse.json(
				{ message: '사용자를 찾을 수 없습니다.' },
				{ status: 404 }
			);
		}

		// 아이 정보 확인 및 본인의 아이인지 검증
		const child = await prisma.child.findUnique({
			where: {
				id: chldrnNo,
				userId: user.id,
			},
			include: {
				vacntnInfo: {
					orderBy: {
						createdAt: 'asc',
					},
				},
			},
		});

		if (!child) {
			return NextResponse.json(
				{ message: '아이 정보를 찾을 수 없거나 접근 권한이 없습니다.' },
				{ status: 404 }
			);
		}

		// 전체 필요한 접종 횟수 계산
		const totalRequiredDoses = getTotalRequiredVaccinations();

		// 완료된 접종 횟수
		const completedDoses = child.vacntnInfo.length;

		// 완료율 계산 (반올림하여 백분율로)
		const completionPercentage = Math.round(
			(completedDoses / totalRequiredDoses) * 100
		);

		// 각 백신별 상태 계산
		const vaccineStatusMap: Record<string, any> = {};

		// 모든 백신에 대해 상태 정보 계산
		VACCINE_LIST.forEach((vaccine) => {
			// 해당 백신의 접종 기록 찾기
			const vaccineRecords = child.vacntnInfo.filter(
				(record) => record.vacntnId === vaccine.id.toString()
			);

			// 해당 백신의 총 접종 횟수 계산
			const totalDoses = vaccine.vaccines.reduce(
				(sum, v) => sum + v.doses.length,
				0
			);

			// 현재까지 완료된 접종 횟수
			const completedDoses = vaccineRecords.length;

			// 백신 상태 정보 저장
			vaccineStatusMap[vaccine.id.toString()] = {
				vaccineName: vaccine.name,
				totalDoses,
				completedDoses,
				vaccineRecords,
			};
		});

		return NextResponse.json({
			message: '백신 접종 정보를 조회했습니다.',
			data: {
				vacntnInfo: child.vacntnInfo,
				totalCompletedDoses: completedDoses,
				totalRequiredDoses: totalRequiredDoses,
				completionPercentage: completionPercentage,
				vaccineStatusMap: vaccineStatusMap,
			},
		});
	} catch (error) {
		console.error('백신 접종 정보 조회 에러:', error);
		return NextResponse.json(
			{ message: '백신 접종 정보 조회 중 오류가 발생했습니다.' },
			{ status: 500 }
		);
	}
}
