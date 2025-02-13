import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "인증이 필요합니다." },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
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
      diaperState,
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
        { message: "해당 아이를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    // 기록 생성
    const record = await prisma.record.create({
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
        diaperState,
      },
    });

    return NextResponse.json(
      {
        message: "기록이 등록되었습니다.",
        data: record,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("기록 등록 에러:", error);
    return NextResponse.json(
      { message: "기록 등록 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    // JWT 토큰 검증
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "인증이 필요합니다." },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    // URL에서 쿼리 파라미터 추출
    const { searchParams } = new URL(request.url);
    const childId = searchParams.get("childId");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const type = searchParams.get("type");

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
        { message: "해당 아이를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    // 기록 조회
    const records = await prisma.record.findMany({
      where: {
        childId: childId!,
        type: type || undefined,
        startTime: {
          gte: startDate ? new Date(startDate) : undefined,
          lte: endDate ? new Date(endDate) : undefined,
        },
      },
      orderBy: {
        startTime: "desc",
      },
    });

    // 날짜별로 그룹화
    const groupedRecords = records.reduce((acc, record) => {
      const date = record.startTime.toISOString().split("T")[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push({
        id: record.id,
        type: record.type,
        startTime: record.startTime,
        endTime: record.endTime,
        memo: record.memo,
        mealType: record.mealType,
        amount: record.amount,
        unit: record.unit,
        diaperType: record.diaperType,
        diaperState: record.diaperState,
      });
      return acc;
    }, {} as Record<string, any[]>);

    return NextResponse.json({
      message: "기록을 조회했습니다.",
      data: groupedRecords,
    });
  } catch (error) {
    console.error("기록 조회 에러:", error);
    return NextResponse.json(
      { message: "기록 조회 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
