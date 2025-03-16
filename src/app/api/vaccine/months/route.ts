import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

// 특정 아이의 백신 일정이 있는 모든 달 정보 조회 API
export async function GET(request: Request) {
	try {
		const url = new URL(request.url);
		const childId = url.searchParams.get('childId');

		if (!childId) {
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
				id: childId,
				userId: user.id,
			},
		});

		if (!child) {
			return NextResponse.json(
				{ message: '아이 정보를 찾을 수 없거나 접근 권한이 없습니다.' },
				{ status: 404 }
			);
		}

		// 백신 일정 조회
		const vaccineRecords = await prisma.vacntnInfo.findMany({
			where: {
				childId: childId,
			},
			select: {
				vacntnInoclDt: true,
			},
		});

		// 모든 연/월 정보 추출 및 중복 제거
		const uniqueMonths = new Map<string, { year: number; month: number }>();

		vaccineRecords.forEach((record) => {
			const date = new Date(record.vacntnInoclDt);
			const year = date.getFullYear();
			const month = date.getMonth() + 1; // JavaScript는 0부터 시작하므로 +1

			const key = `${year}-${month}`;
			if (!uniqueMonths.has(key)) {
				uniqueMonths.set(key, { year, month });
			}
		});

		// 결과 배열 생성 및 정렬
		const vaccineMonths = Array.from(uniqueMonths.values()).sort((a, b) => {
			if (a.year !== b.year) return a.year - b.year;
			return a.month - b.month;
		});

		return NextResponse.json({
			message: '백신 일정이 있는 달 정보를 조회했습니다.',
			data: vaccineMonths,
		});
	} catch (error) {
		console.error('백신 일정 월 조회 에러:', error);
		return NextResponse.json(
			{ message: '백신 일정 월 조회 중 오류가 발생했습니다.' },
			{ status: 500 }
		);
	}
}
