import { NextRequest, NextResponse } from "next/server";
import { decrypt, getRequestHeaders } from "./lib";

export async function middleware(req: NextRequest) {
	const cookie = req.cookies.get("email")?.value;

	const userIp = await getRequestHeaders(req);

	if (cookie) {
		const session = await decrypt(cookie);

		if (!session) {
			const res = NextResponse.next();
			res.cookies.delete("email");
			return res;
		}
	}

	const res = NextResponse.next();

	res.cookies.set("ipAgent", JSON.stringify(userIp), {
		httpOnly: true,
		expires: new Date(Date.now() + 60 * 60 * 1000),
	});

	return res;
}
