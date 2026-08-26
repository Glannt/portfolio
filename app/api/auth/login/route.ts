import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    const expectedUser = process.env.ADMIN_USER || "admin";
    const expectedPassword = process.env.ADMIN_PASSWORD || "thanhdo_devops_2026!";

    if (username === expectedUser && password === expectedPassword) {
      // Generate simple session token
      const secret = process.env.ADMIN_SECRET_KEY || "devops-handbook-secret-token-key-2026-auth";
      const token = Buffer.from(`${username}:${secret}:${Date.now()}`).toString("base64");

      const response = NextResponse.json({
        success: true,
        user: username,
        token,
      });

      // Set auth cookie
      response.cookies.set("admin_session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });

      return response;
    }

    return NextResponse.json(
      { error: "Invalid username or password. Please check your credentials." },
      { status: 401 },
    );
  } catch {
    return NextResponse.json(
      { error: "Internal server error during authentication." },
      { status: 500 },
    );
  }
}
