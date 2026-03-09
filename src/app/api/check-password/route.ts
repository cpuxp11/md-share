import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    const correctPassword = process.env.MD_SHARE_PASSWORD;

    if (!correctPassword) {
      // No password set = no protection
      return NextResponse.json({ ok: true });
    }

    if (password === correctPassword) {
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
