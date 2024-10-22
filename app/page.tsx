import { getHeaders, getSession, login, logout } from "@/lib";

export default async function Home() {
	const session = await getSession();
	const headers = await getHeaders();

	return (
		<section className="p-6">
			<form
				action={async (FormData) => {
					"use server";
					await login(FormData);
				}}>
				<input
					type="email"
					placeholder="Email"
					name="email"
					className="border"
				/>
				<br />
				<button
					type="submit"
					className="bg-gray-200 rounded-md mt-2 border">
					Login
				</button>
			</form>
			<form
				action={async () => {
					"use server";
					await logout();
				}}>
				<button
					type="submit"
					className="bg-gray-200 rounded-md mt-2 border">
					Logout
				</button>
			</form>

			<br />
			<pre>{JSON.stringify(session, null, 2)}</pre>
			<br />
			<pre>{JSON.stringify(headers, null, 2)}</pre>
		</section>
	);
}
