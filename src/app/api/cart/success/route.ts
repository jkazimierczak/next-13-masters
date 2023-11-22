import { type NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
	const sessionId = request.nextUrl.searchParams.get("sessionId");

	if (!sessionId) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	cookies().set("cartId", "");

	return NextResponse.redirect(new URL(`/cart/success?sessionId=${sessionId}`, request.url));
}
