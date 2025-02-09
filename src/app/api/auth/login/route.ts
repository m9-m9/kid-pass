import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { userId, password } = await request.json();

    // 사용자 찾기
    const user = await prisma.user.findUnique({
      where: { userId },
    });

    if (!user) {
      return NextResponse.json(
        { message: "아이디 또는 비밀번호가 일치하지 않습니다." },
        { status: 401 }
      );
    }

    // 비밀번호 확인
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return NextResponse.json(
        { message: "아이디 또는 비밀번호가 일치하지 않습니다." },
        { status: 401 }
      );
    }

    // JWT 토큰 생성
    const accessToken = jwt.sign(
      { userId: user.userId },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      { userId: user.userId },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    return NextResponse.json(
      {
        message: "로그인 성공",
        data: {
          accessToken,
          refreshToken,
          user: {
            userId: user.userId,
            name: user.name,
            email: user.email,
          },
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("로그인 에러:", error);
    return NextResponse.json(
      { message: "로그인 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
