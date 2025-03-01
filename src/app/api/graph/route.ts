import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dayjs from "dayjs";
import { MealType } from "@/app/record/components/fields/FeedingFields";
const prisma = new PrismaClient();

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
    const type = searchParams.get("type");
    const period = searchParams.get("period") || "month"; // month, quarter, year

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

    // 기간 설정
    let startDate: Date;
    switch (period) {
      case "month":
        startDate = dayjs().subtract(1, "month").toDate();
        break;
      case "quarter":
        startDate = dayjs().subtract(3, "month").toDate();
        break;
      case "year":
        startDate = dayjs().subtract(1, "year").toDate();
        break;
      default:
        startDate = dayjs().subtract(1, "month").toDate();
    }

    // 그래프 데이터 조회 로직
    const graphData = await getGraphData(childId!, type!, startDate);

    return NextResponse.json({
      message: "그래프 데이터를 조회했습니다.",
      data: graphData,
    });
  } catch (error) {
    console.error("그래프 데이터 조회 에러:", error);
    return NextResponse.json(
      { message: "그래프 데이터 조회 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

// 그래프 데이터 추출 함수
async function getGraphData(childId: string, type: string, startDate: Date) {
  switch (type) {
    case "GROWTH":
      return await getGrowthGraphData(childId, startDate);
    case "FEEDING":
      return await getFeedingGraphData(childId, startDate);
    case "SLEEP":
      return await getSleepGraphData(childId, startDate);
    default:
      throw new Error("지원되지 않는 그래프 타입입니다.");
  }
}

// 성장 그래프 데이터 추출
async function getGrowthGraphData(childId: string, startDate: Date) {
  const records = await prisma.record.findMany({
    where: {
      childId,
      type: "GROWTH",
      startTime: {
        gte: startDate,
      },
    },
    select: {
      startTime: true,
      weight: true,
      height: true,
      headSize: true,
    },
    orderBy: {
      startTime: "asc",
    },
  });

  return {
    weight: records
      .filter((record) => record.weight !== null)
      .map((record) => ({
        date: record.startTime,
        value: record.weight,
      })),
    height: records
      .filter((record) => record.height !== null)
      .map((record) => ({
        date: record.startTime,
        value: record.height,
      })),
    headSize: records
      .filter((record) => record.headSize !== null)
      .map((record) => ({
        date: record.startTime,
        value: record.headSize,
      })),
  };
}

// 수유 그래프 데이터 추출
async function getFeedingGraphData(childId: string, startDate: Date) {
  const records = await prisma.record.findMany({
    where: {
      childId,
      type: "FEEDING",
      startTime: {
        gte: startDate,
      },
    },
    select: {
      startTime: true,
      amount: true,
      mealType: true,
    },
    orderBy: {
      startTime: "asc",
    },
  });

  // 일별 총 수유량 계산
  const dailyFeedingData = records.reduce((acc, record) => {
    const date = dayjs(record.startTime).format("YYYY-MM-DD");
    if (!acc[date]) {
      acc[date] = {
        totalAmount: 0,
        count: 0,
        milkAmount: 0,
        milkCount: 0,
        directAmount: 0,
        directCount: 0,
      };
    }

    if (record.amount) {
      acc[date].totalAmount += record.amount;
      acc[date].count++;

      if (record.mealType === MealType.MHRSM) {
        acc[date].milkAmount += record.amount;
        acc[date].milkCount++;
      } else if (record.mealType === MealType.FOMULA) {
        acc[date].directAmount += record.amount;
        acc[date].directCount++;
      } else if (record.mealType === MealType.BABYFD) {
        acc[date].babyfdAmount += record.amount;
        acc[date].babyfdCount++;
      } else if (record.mealType === MealType.MIXED) {
        acc[date].mixedAmount += record.amount;
        acc[date].mixedCount++;
      }
    }

    return acc;
  }, {} as Record<string, any>);

  // 데이터 포맷팅
  return {
    total: Object.entries(dailyFeedingData).map(([date, data]) => ({
      date,
      amount: data.totalAmount,
      count: data.count,
    })),
    milk: Object.entries(dailyFeedingData).map(([date, data]) => ({
      date,
      amount: data.milkAmount,
      count: data.milkCount,
    })),
    formula: Object.entries(dailyFeedingData).map(([date, data]) => ({
      date,
      amount: data.directAmount,
      count: data.directCount,
    })),
    babyfd: Object.entries(dailyFeedingData).map(([date, data]) => ({
      date,
      amount: data.babyfdAmount,
      count: data.babyfdCount,
    })),
    mixed: Object.entries(dailyFeedingData).map(([date, data]) => ({
      date,
      amount: data.mixedAmount,
      count: data.mixedCount,
    })),
  };
}

// 수면 그래프 데이터 추출
async function getSleepGraphData(childId: string, startDate: Date) {
  const records = await prisma.record.findMany({
    where: {
      childId,
      type: "SLEEP",
      startTime: {
        gte: startDate,
      },
    },
    select: {
      startTime: true,
      endTime: true,
      sleepType: true,
    },
    orderBy: {
      startTime: "asc",
    },
  });

  // 일별 수면 데이터 계산
  const dailySleepData = records.reduce((acc, record) => {
    const date = dayjs(record.startTime).format("YYYY-MM-DD");
    if (!acc[date]) {
      acc[date] = {
        totalSleepTime: 0,
        dayTimeSleep: 0,
        nightTimeSleep: 0,
        naps: 0,
      };
    }

    // 수면 시간 계산 (분 단위)
    if (record.startTime && record.endTime) {
      const sleepDuration = dayjs(record.endTime).diff(
        record.startTime,
        "minute"
      );
      acc[date].totalSleepTime += sleepDuration;

      if (record.sleepType === "낮잠") {
        acc[date].dayTimeSleep += sleepDuration;
        acc[date].naps++;
      } else if (record.sleepType === "밤잠") {
        acc[date].nightTimeSleep += sleepDuration;
      }
    }

    return acc;
  }, {} as Record<string, any>);

  // 데이터 포맷팅
  return {
    total: Object.entries(dailySleepData).map(([date, data]) => ({
      date,
      sleepTime: data.totalSleepTime,
    })),
    dayTime: Object.entries(dailySleepData).map(([date, data]) => ({
      date,
      sleepTime: data.dayTimeSleep,
      naps: data.naps,
    })),
    nightTime: Object.entries(dailySleepData).map(([date, data]) => ({
      date,
      sleepTime: data.nightTimeSleep,
    })),
  };
}
