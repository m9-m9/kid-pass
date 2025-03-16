import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // 인증코드 생성 (6자리 숫자)
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // 이메일 발송 설정
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // 이메일 발송
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "[오늘의아이] 이메일 인증",
      html: `<p>인증 코드: ${verificationCode}</p>`,
    });

    // DB에 인증 정보 저장
    await prisma.emailVerification.create({
      data: {
        email,
        code: verificationCode,
        expiresAt: new Date(Date.now() + 30 * 60 * 1000), // 30분 후 만료
        verified: false,
      },
    });

    // 개발 환경에서 이메일 발송 대신 콘솔에 출력
    if (process.env.NODE_ENV === "development") {
      console.log("인증 코드:", verificationCode);
      // 이메일 발송 성공으로 처리
      return NextResponse.json({ message: "인증코드가 발송되었습니다." });
    }

    return NextResponse.json({ message: "인증코드가 발송되었습니다." });
  } catch (error) {
    console.error("인증코드 발송 에러:", error);
    return NextResponse.json(
      { message: "인증코드 발송 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
