"use server";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const key = "secret";
const secret = new TextEncoder().encode(key);

export async function encrypt(payload: any) {
	const res = await new SignJWT({ email: payload.email, name: "demo" })
		.setProtectedHeader({ alg: "HS256" })
		.setExpirationTime("1h")
		.sign(secret);

	return res;
}

export async function decrypt(token: string) {
	try {
		const { payload } = await jwtVerify(token, secret, {
			algorithms: ["HS256"],
		});
		return payload;
	} catch {
		return null;
	}
}

export async function login(formData: FormData) {
	const email = { email: formData.get("email") };

	if (!email.email) {
		return {
			success: false,
			error: "Email is required",
		};
	}

	const session = await encrypt(email);

	const expires = new Date(Date.now() + 60 * 60 * 1000);

	cookies().set("email", session, { expires, httpOnly: true });

	return {
		success: true,
	};
}

export async function logout() {
	cookies().delete("email");
}

export async function getSession() {
	const cookie = cookies().get("email")?.value;

	if (!cookie) return null;

	const res = await decrypt(cookie);

	return res;
}

export async function getRequestHeaders(req: NextRequest) {
	const userIp = req.headers.get("x-forwarded-for");
	const host = req.headers.get("host");
	const region = req.geo?.region;
	const latitude = req.geo?.latitude;
	const longitude = req.geo?.longitude;
	const country = req.geo?.country;
	const city = req.geo?.city;

	const name = {
		region,
		latitude,
		longitude,
		country,
		city,
	};

	const integrity = req.integrity;

	const userAgent = req.headers.get("user-agent");

	return { userIp, name, host, userAgent, integrity };
}

export async function getHeaders() {
	const cookie = cookies().get("ipAgent")?.value;
	return JSON.parse(cookie!);
}
