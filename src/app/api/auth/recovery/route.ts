import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { type, name, email, userId } = await request.json();

    // 아이디 찾기
    if (type === "id") {
      const user = await prisma.user.findFirst({
        where: {
          name,
          email,
        },
        select: {
          userId: true,
        },
      });

      if (!user) {
        return NextResponse.json(
          { message: "일치하는 사용자가 없습니다." },
          { status: 404 }
        );
      }

      return NextResponse.json({
        message: "아이디를 찾았습니다.",
        userId: user.userId,
      });
    }

    // 비밀번호 찾기
    if (type === "password") {
      // 이메일 인증 확인
      const verification = await prisma.emailVerification.findFirst({
        where: {
          email,
          verified: true,
          expiresAt: {
            gt: new Date(),
          },
        },
      });

      if (!verification) {
        return NextResponse.json(
          { message: "이메일 인증이 필요합니다." },
          { status: 400 }
        );
      }

      // 사용자 찾기
      const user = await prisma.user.findFirst({
        where: {
          userId,
          email,
        },
      });

      if (!user) {
        return NextResponse.json(
          { message: "일치하는 사용자가 없습니다." },
          { status: 404 }
        );
      }

      // 임시 비밀번호 생성 (8자리)
      const tempPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(tempPassword, 10);

      // 비밀번호 업데이트
      await prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword },
      });

      // 이메일 발송 설정
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      // 임시 비밀번호 이메일 발송
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "[오늘의아이] 임시 비밀번호가 발급되었습니다",
        html: `
          <h3>임시 비밀번호가 발급되었습니다.</h3>
          <p>임시 비밀번호: <strong>${tempPassword}</strong></p>
          <p>로그인 후 반드시 비밀번호를 변경해주세요.</p>
        `,
      });

      return NextResponse.json({
        message: "임시 비밀번호가 이메일로 전송되었습니다.",
      });
    }

    return NextResponse.json(
      { message: "잘못된 요청입니다." },
      { status: 400 }
    );
  } catch (error) {
    console.error("계정 찾기 에러:", error);
    return NextResponse.json(
      { message: "계정 찾기 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
