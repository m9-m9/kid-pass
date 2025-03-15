import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { VACCINE_LIST, getVaccineTotalCount } from '@/utils/vaccine';

const prisma = new PrismaClient();

// 특정 백신의 접종 상세 정보 조회
export async function GET(request: Request) {
	try {
		// URL에서 아이 ID와 백신 ID 추출
		const url = new URL(request.url);
		const chldrnNo = url.searchParams.get('chldrnNo');
		const vaccineId = url.searchParams.get('vaccineId');

		if (!chldrnNo || !vaccineId) {
			return NextResponse.json(
				{ message: '아이 ID와 백신 ID가 필요합니다.' },
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
						vacntnDoseNumber: 'asc',
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

		// 백신 ID에 해당하는 VACCINE_LIST의 데이터 찾기
		const vaccineData = VACCINE_LIST.find(
			(v) => v.id === parseInt(vaccineId)
		);

		if (!vaccineData) {
			return NextResponse.json(
				{ message: '유효하지 않은 백신 정보입니다.' },
				{ status: 404 }
			);
		}

		// 해당 백신의 접종 기록만 필터링
		const vaccineRecords = child.vacntnInfo.filter(
			(record) => record.vacntnId === vaccineId
		);

		// 백신의 총 접종 횟수 계산
		const totalDoses = getVaccineTotalCount(parseInt(vaccineId));

		// 완료된 접종 횟수
		const completedDoses = vaccineRecords.length;

		// 각 접종 차수별 상태 계산
		const doseStatus = [];
		let currentDoseNumber = 1;

		// 모든 백신 종류와 접종 차수 순회
		for (const vaccine of vaccineData.vaccines) {
			for (const dose of vaccine.doses) {
				// 해당 차수의 접종 기록 찾기
				const record = vaccineRecords.find(
					(r) =>
						r.vacntnDoseNumber === dose.doseNumber &&
						r.vacntnIctsd === vaccine.code
				);

				doseStatus.push({
					doseNumber: currentDoseNumber,
					vaccineCode: vaccine.code,
					vaccineName: vaccine.name,
					isCompleted: !!record,
					vaccinationDate: record?.vacntnInoclDt || null,
					recordId: record?.id || null,
				});

				currentDoseNumber++;
			}
		}

		// 다음 접종에 사용할 백신 정보 계산
		let nextVaccineInfo = null;
		if (completedDoses < totalDoses) {
			const nextDoseNumber = completedDoses + 1;

			// 백신과 차수에 맞는 코드 찾기
			let nextVaccineCode = '';
			let foundDose = false;

			for (const vaccine of vaccineData.vaccines) {
				for (const dose of vaccine.doses) {
					if (dose.doseNumber === nextDoseNumber) {
						nextVaccineCode = vaccine.code;
						foundDose = true;
						break;
					}
				}
				if (foundDose) break;
			}

			// 백신 코드를 찾지 못했으면 첫 번째 백신 코드 사용
			if (!nextVaccineCode && vaccineData.vaccines.length > 0) {
				nextVaccineCode = vaccineData.vaccines[0].code;
			}

			nextVaccineInfo = {
				vaccineCode: nextVaccineCode,
				doseNumber: nextDoseNumber,
			};
		}

		return NextResponse.json({
			message: '백신 상세 정보를 조회했습니다.',
			data: {
				vaccineId: parseInt(vaccineId),
				vaccineName: vaccineData.name,
				totalDoses,
				completedDoses,
				doseStatus,
				nextVaccineInfo,
				vaccineRecords,
			},
		});
	} catch (error) {
		console.error('백신 상세 정보 조회 에러:', error);
		return NextResponse.json(
			{ message: '백신 상세 정보 조회 중 오류가 발생했습니다.' },
			{ status: 500 }
		);
	}
}

// 백신 접종 정보 등록
export async function POST(request: Request) {
	try {
		const { childId, vaccinationData } = await request.json();

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

		// 백신 접종 정보 등록
		const vacntnInfo = await prisma.vacntnInfo.create({
			data: {
				vacntnId: vaccinationData.vacntnId,
				vacntnIctsd: vaccinationData.vacntnIctsd,
				vacntnDoseNumber: vaccinationData.vacntnDoseNumber,
				vacntnInoclDt: vaccinationData.vacntnInoclDt,
				childId: childId,
			},
		});

		return NextResponse.json(
			{
				message: '백신 접종 정보가 등록되었습니다.',
				data: { vacntnInfo },
			},
			{ status: 201 }
		);
	} catch (error) {
		console.error('백신 접종 정보 등록 에러:', error);
		return NextResponse.json(
			{ message: '백신 접종 정보 등록 중 오류가 발생했습니다.' },
			{ status: 500 }
		);
	}
}
