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

    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET!);

    return NextResponse.json({ valid: true });
  } catch (error) {
    return NextResponse.json({ valid: false }, { status: 401 });
  }
}

export async function POST(request: Request) {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}

export async function PUT(request: Request) {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}

export async function DELETE(request: Request) {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
