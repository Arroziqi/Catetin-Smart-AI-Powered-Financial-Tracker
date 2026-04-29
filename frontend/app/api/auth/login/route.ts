import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();

    const token = body.access_token;

    if (!token) {
        return NextResponse.json(
            { message: "Token tidak ada" },
            { status: 400 }
        );
    }

    const response = NextResponse.json({
        success: true,
    });

    response.cookies.set("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 1, // 1 hari
    });

    return response;
}