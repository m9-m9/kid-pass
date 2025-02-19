import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

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

// 아이의 백신 접종 정보 조회
export async function GET(request: Request) {
    try {
        // URL에서 아이 ID 추출
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

        return NextResponse.json({
            message: '백신 접종 정보를 조회했습니다.',
            data: {
                vacntnInfo: child.vacntnInfo,
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
