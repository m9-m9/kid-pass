import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function DELETE(request: Request) {
  try {
    // 토큰에서 사용자 정보 가져오기
    const accessToken = request.headers.get("Authorization")?.split(" ")[1];

    if (!accessToken) {
      return NextResponse.json(
        { message: "인증이 필요합니다." },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET!) as {
      userId: string;
    };

    if (!decoded) {
      return NextResponse.json(
        { message: "유효하지 않은 토큰입니다." },
        { status: 401 }
      );
    }

    // 사용자 삭제
    await prisma.user.delete({
      where: { id: decoded.userId },
    });

    return NextResponse.json({
      message: "회원탈퇴가 완료되었습니다.",
      status: 200,
    });
  } catch (error) {
    console.error("회원탈퇴 에러:", error);
    return NextResponse.json(
      { message: "회원탈퇴 중 오류가 발생했습니다." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
