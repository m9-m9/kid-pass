import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "인증이 필요합니다." },
        { status: 401 }
      );
    }

    const refreshToken = authHeader.split(" ")[1];
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET!) as {
      userId: string;
    };

    const accessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    return NextResponse.json({ accessToken });
  } catch (error) {
    return NextResponse.json(
      { message: "토큰 갱신에 실패했습니다." },
      { status: 401 }
    );
  }
}
