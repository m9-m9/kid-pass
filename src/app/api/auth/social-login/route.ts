import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { provider, user } = await request.json();

    // 기존 사용자 확인
    let dbUser = await prisma.user.findFirst({
      where: {
        AND: [{ socialId: user.id }, { provider: provider }],
      },
    });

    if (!dbUser) {
      // 이메일로 기존 사용자 확인
      if (user.email) {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (existingUser) {
          return NextResponse.json(
            { message: "이미 가입된 이메일입니다." },
            { status: 400 }
          );
        }
      }

      // 새로운 사용자 생성
      dbUser = await prisma.user.create({
        data: {
          socialId: user.id,
          provider,
          userId: `${provider}_${user.id}`,
          email: user.email || `${user.id}@${provider}.user`,
          name: user.name || "사용자",
          password: null, // 소셜 로그인 사용자는 비밀번호 없음
          profileImage: user.photoURL,
        },
      });
    }

    // JWT 토큰 생성
    const accessToken = jwt.sign(
      { userId: dbUser.id },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    return NextResponse.json({
      message: "로그인 성공",
      data: {
        accessToken,
        user: dbUser,
      },
    });
  } catch (error) {
    console.error("소셜 로그인 에러:", error);
    return NextResponse.json(
      { message: "로그인 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
