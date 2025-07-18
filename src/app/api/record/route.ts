import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(request: Request) {
	try {
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

		const {
			childId,
			type,
			startTime,
			endTime,
			memo,
			// 수유 관련
			mealType,
			amount,
			unit,
			// 기저귀 관련
			diaperType,
			diaperColor,
			diaperShape,
			diaperAmount,
			// 수면 관련
			sleepType,
			// 체온 관련
			temperature,
			// 성장 관련
			weight,
			height,
			headSize,
			// 나머지 필드들...
			emotion,
			special,
			symptom,
			severity,
			medicine,
			category,
			behavior,
			diagnoses,
			hospital,
			doctor,
			treatmentMethod,
		} = await request.json();

		// 사용자 확인 및 아이와의 관계 확인
		const child = await prisma.child.findFirst({
			where: {
				id: childId,
				user: {
					userId: decoded.userId,
				},
			},
		});

		if (!child) {
			return NextResponse.json(
				{ message: '해당 아이를 찾을 수 없습니다.' },
				{ status: 404 }
			);
		}

		// 트랜잭션을 사용하여 원자적 작업 보장
		const result = await prisma.$transaction(async (tx) => {
			// 1. 기록 생성
			const record = await tx.record.create({
				data: {
					childId,
					type,
					startTime: new Date(startTime),
					endTime: endTime ? new Date(endTime) : null,
					memo,
					// 수유 관련
					mealType,
					amount: amount ? parseFloat(amount) : null,
					unit,
					// 기저귀 관련
					diaperType,
					diaperColor,
					diaperShape,
					diaperAmount,
					// 수면 관련
					sleepType,
					// 체온 관련
					temperature: temperature ? parseFloat(temperature) : null,
					// 성장 관련
					headSize: headSize ? parseFloat(headSize) : null,
					weight: weight ? parseFloat(weight) : null,
					height: height ? parseFloat(height) : null,
					// 감정 관련
					emotion,
					special,
					// 특이증상 관련
					symptom,
					severity,
					// 약 관련
					medicine,
					// 기타 관련
					category,
					behavior,
					// 병원 관련
					diagnoses,
					hospital,
					doctor,
					treatmentMethod,
				},
			});

			// 2. 성장 관련 데이터가 있으면 Child 모델도 업데이트
			if (weight || height || headSize) {
				// 업데이트할 데이터 객체 생성
				const childUpdateData: any = {};

				if (weight !== undefined && weight !== null) {
					childUpdateData.weight = parseFloat(weight);
				}

				if (height !== undefined && height !== null) {
					childUpdateData.height = parseFloat(height);
				}

				if (headSize !== undefined && headSize !== null) {
					// Child 모델에서는 headCircumference 필드명 사용
					childUpdateData.headCircumference = parseFloat(headSize);
				}

				// Child 모델 업데이트
				if (Object.keys(childUpdateData).length > 0) {
					await tx.child.update({
						where: { id: childId },
						data: childUpdateData,
					});
				}
			}

			return record;
		});

		return NextResponse.json(
			{
				message: '기록이 등록되었습니다.',
				data: result,
			},
			{ status: 201 }
		);
	} catch (error) {
		console.error('기록 등록 에러:', error);
		return NextResponse.json(
			{ message: '기록 등록 중 오류가 발생했습니다.' },
			{ status: 500 }
		);
	}
}

export async function GET(request: Request) {
	try {
		// JWT 토큰 검증
		const authHeader = request.headers.get('authorization');
		if (!authHeader?.startsWith('Bearer ')) {
			return NextResponse.json(
				{ message: '인증이 필요합니다.' },
				{ status: 401 }
			);
		}

		const token = authHeader.split(' ')[1];

		// 토큰이 비어있거나 유효하지 않은 경우 처리
		if (!token) {
			return NextResponse.json(
				{ message: '유효하지 않은 토큰입니다.' },
				{ status: 401 }
			);
		}

		let decoded;
		try {
			decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
				userId: string;
			};
		} catch (error) {
			console.error('토큰 검증 오류:', error);
			return NextResponse.json(
				{ message: '유효하지 않은 토큰입니다.' },
				{ status: 401 }
			);
		}

		// URL에서 쿼리 파라미터 추출
		const { searchParams } = new URL(request.url);
		const childId = searchParams.get('childId');
		const startDate = searchParams.get('startDate');
		const type = searchParams.get('type');

		// childId나 startDate가 없는 경우 처리
		if (!childId || !startDate) {
			return NextResponse.json(
				{ message: '필수 파라미터가 누락되었습니다.' },
				{ status: 400 }
			);
		}

		// 사용자 확인 및 아이와의 관계 확인
		const child = await prisma.child.findFirst({
			where: {
				id: childId!,
				user: {
					userId: decoded.userId,
				},
			},
		});

		if (!child) {
			return NextResponse.json(
				{ message: '해당 아이를 찾을 수 없습니다.' },
				{ status: 404 }
			);
		}

		// startDate를 기준으로 이전 7일의 날짜 계산
		const endDate = new Date(startDate!);
		endDate.setHours(23, 59, 59, 999); // 해당 일자의 마지막 시간으로 설정

		const beginDate = new Date(startDate!);
		beginDate.setDate(beginDate.getDate() - 7); // 7일 전 날짜
		beginDate.setHours(0, 0, 0, 0); // 시작일의 처음 시간으로 설정

		// 기록 조회
		const records = await prisma.record.findMany({
			where: {
				childId: childId!,
				type: type || undefined,
				startTime: {
					gte: beginDate, // 7일 전부터
					lte: endDate, // 선택한 날짜까지
				},
			},
			orderBy: {
				startTime: 'desc', // 최신 순으로 정렬
			},
		});

		// 날짜별로 그룹화
		const groupedRecords = records.reduce((acc, record) => {
			const date = record.startTime.toISOString().split('T')[0];
			if (!acc[date]) {
				acc[date] = [];
			}
			acc[date].push({
				id: record.id,
				type: record.type,
				startTime: record.startTime,
				endTime: record.endTime,
				mealType: record?.mealType,
				unit: record?.unit,
				amount: record?.amount,
				diaperType: record?.diaperType,
				sleepType: record?.sleepType,
				temperature: record?.temperature,
				headSize: record?.headSize,
				weight: record?.weight,
				height: record?.height,
				emotion: record?.emotion,
				medicine: record?.medicine,
				symptom: record?.symptom,
				severity: record?.severity,
				memo: record?.memo,
			});
			return acc;
		}, {} as Record<string, any[]>);

		return NextResponse.json({
			message: '기록을 조회했습니다.',
			data: groupedRecords,
		});
	} catch (error) {
		console.error('기록 조회 에러:', error);
		return NextResponse.json(
			{ message: '기록 조회 중 오류가 발생했습니다.' },
			{ status: 500 }
		);
	}
}
