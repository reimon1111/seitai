import { NextResponse } from "next/server";

const RESERVE_USE_DUMMY = process.env.RESERVE_USE_DUMMY === "true";
const RESERVE_FORM_ACTION = process.env.RESERVE_FORM_ACTION ?? "";

export async function POST(request: Request) {
  if (RESERVE_USE_DUMMY) {
    return NextResponse.json({ ok: true });
  }
  const body = await request.json();

  if (RESERVE_FORM_ACTION) {
    const res = await fetch(RESERVE_FORM_ACTION, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      return NextResponse.json(
        { error: "送信に失敗しました" },
        { status: 502 }
      );
    }
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ ok: true });
}
