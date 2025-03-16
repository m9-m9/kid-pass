import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email, code, newPassword } = await request.json();

    // 사용자 존재 여부 확인
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "존재하지 않는 사용자입니다." },
        { status: 404 }
      );
    }

    // 유효한 인증 코드인지 확인
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
        { message: "유효하지 않거나 만료된 인증 코드입니다." },
        { status: 400 }
      );
    }

    // 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 트랜잭션으로 비밀번호 업데이트와 인증 코드 검증 상태 변경
    await prisma.$transaction([
      // 비밀번호 업데이트
      prisma.user.update({
        where: { email },
        data: { password: hashedPassword },
      }),
      // 인증 코드 사용 완료 처리
      prisma.emailVerification.update({
        where: { id: verification.id },
        data: { verified: true },
      }),
    ]);

    return NextResponse.json({
      message: "비밀번호가 성공적으로 변경되었습니다.",
    });
  } catch (error) {
    console.error("비밀번호 재설정 에러:", error);
    return NextResponse.json(
      { message: "비밀번호 재설정 중 오류가 발생했습니다." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
