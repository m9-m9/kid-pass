import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const {
      name,
      birthDate,
      gender,
      weight,
      height,
      headCircumference,
      ageType,
      allergies,
      symptoms,
      memo,
    } = await request.json();

    // JWT 토큰에서 사용자 정보 가져오기
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

    // 사용자 찾기
    const user = await prisma.user.findUnique({
      where: { userId: decoded.userId },
    });

    if (!user) {
      return NextResponse.json(
        { message: "사용자를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    // 아이 정보 등록
    const child = await prisma.child.create({
      data: {
        name,
        birthDate: new Date(birthDate),
        gender,
        weight: weight ? parseFloat(weight) : null,
        height: height ? parseFloat(height) : null,
        headCircumference: headCircumference
          ? parseFloat(headCircumference)
          : null,
        ageType,
        allergies,
        symptoms,
        memo,
        userId: user.id,
      },
    });

    return NextResponse.json(
      {
        message: "아이 정보가 등록되었습니다.",
        data: child,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("아이 정보 등록 에러:", error);
    return NextResponse.json(
      { message: "아이 정보 등록 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

// GET 요청 처리 (사용자의 아이 목록 조회)
export async function GET(request: Request) {
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

    const user = await prisma.user.findUnique({
      where: { userId: decoded.userId },
      include: {
        children: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "사용자를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "아이 목록을 조회했습니다.",
      data: user.children,
    });
  } catch (error) {
    console.error("아이 목록 조회 에러:", error);
    return NextResponse.json(
      { message: "아이 목록 조회 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
