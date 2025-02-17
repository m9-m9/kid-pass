// app/api/child/vacntnInfo/route.ts
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

interface VaccinationInfo {
    id: string;
    vacntnTotalCnt: number;
    vacntnEra: string;
    vacntnIctsd: string;
    vacntnInoclDt: string[];
    vacntnOdr: number;
    childId: string;
    createdAt: Date;
    updatedAt: Date;
}

export async function GET(request: Request) {
    try {
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

        // URL에서 childId 파라미터 추출
        const url = new URL(request.url);
        const childId = url.searchParams.get('chldrnNo');

        if (!childId) {
            return NextResponse.json(
                { message: '아이 정보가 필요합니다.' },
                { status: 400 }
            );
        }

        // 예방접종 정보 조회
        const vaccinationInfo = await prisma.vacntnInfo.findMany({
            where: {
                childId: childId,
            },
            orderBy: {
                vacntnOdr: 'asc',
            },
        });

        // 접종 횟수 합계 계산
        const totalVacntnOdr = vaccinationInfo.reduce(
            (sum: number, info: VaccinationInfo) => sum + info.vacntnOdr,
            0
        );

        return NextResponse.json({
            message: '예방접종 정보를 성공적으로 가져왔습니다.',
            data: {
                vacntnInfo: vaccinationInfo,
                totalVacntnOdr: totalVacntnOdr,
            },
        });
    } catch (error) {
        console.error('예방접종 정보 조회 실패:', error);
        return NextResponse.json(
            { message: '예방접종 정보를 가져오는 중 오류가 발생했습니다.' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
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

        const body = await request.json();
        const { childId, vaccinationData } = body;

        const newVaccination = await prisma.vacntnInfo.create({
            data: {
                childId,
                vacntnTotalCnt: vaccinationData.vacntnTotalCnt,
                vacntnEra: vaccinationData.vacntnEra,
                vacntnIctsd: vaccinationData.vacntnIctsd,
                vacntnInoclDt: vaccinationData.vacntnInoclDt,
                vacntnOdr: vaccinationData.vacntnOdr,
            },
        });

        return NextResponse.json({
            message: '새로운 예방접종 정보가 추가되었습니다.',
            data: newVaccination,
        });
    } catch (error) {
        console.error('예방접종 정보 추가 실패:', error);
        return NextResponse.json(
            { message: '예방접종 정보를 추가하는 중 오류가 발생했습니다.' },
            { status: 500 }
        );
    }
}
