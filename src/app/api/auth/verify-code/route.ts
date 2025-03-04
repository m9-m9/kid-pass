import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email, code } = await request.json();

    const verification = await prisma.emailVerification.findFirst({
      where: {
        email,
        code,
        verified: false,
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    if (!verification) {
      return NextResponse.json(
        { message: "유효하지 않은 인증코드입니다." },
        { status: 400 }
      );
    }

    // 인증 완료 처리
    await prisma.emailVerification.update({
      where: { id: verification.id },
      data: { verified: true },
    });

    return NextResponse.json({ message: "이메일 인증이 완료되었습니다." });
  } catch (error) {
    console.error("인증코드 확인 에러:", error);
    return NextResponse.json(
      { message: "인증코드 확인 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
