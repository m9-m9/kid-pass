import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { userId, email, password, name } = await request.json();
    console.log("받은 회원가입 데이터:", { userId, email, password, name }); // 디버깅용 로그

    // 아이디 중복 체크
    const existingId = await prisma.user.findFirst({
      where: { userId },
    });

    if (existingId) {
      return NextResponse.json(
        { message: "이미 존재하는 아이디입니다." },
        { status: 400 }
      );
    }

    // 이메일 중복 체크
    const existingEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (existingEmail) {
      return NextResponse.json(
        { message: "이미 존재하는 이메일입니다." },
        { status: 400 }
      );
    }

    // 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(password, 10);

    // 사용자 생성
    const user = await prisma.user.create({
      data: {
        userId,
        email,
        password: hashedPassword,
        name,
      },
    });

    // 비밀번호 제외하고 반환
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      {
        message: "회원가입이 완료되었습니다.",
        user: userWithoutPassword,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("회원가입 에러:", error);
    return NextResponse.json(
      { message: "회원가입 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
