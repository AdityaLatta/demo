"use client";

import Link from "next/link";
import Button from "../_components/Button";
import Input from "../_components/Input";
import { signuphandler } from "../actions/authActions";
import { useFormState } from "react-dom";

const Page = () => {
	const [signupState, signup] = useFormState(signuphandler, undefined);

	return (
		<section className="bg-gray-50 dark:bg-gray-900">
			<div className="mx-auto flex h-screen flex-col items-center justify-center px-6 py-8 lg:py-0">
				<div className="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0 dark:border dark:border-gray-700 dark:bg-gray-800">
					<div className="space-y-4 p-6 sm:p-8 md:space-y-6">
						<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
							Create new account
						</h1>
						<form
							action={signup}
							className="space-y-4 md:space-y-6">
							<Input
								type="text"
								placeholder="Enter Your Name"
								name="name">
								Name
							</Input>
							{signupState?.errors?.name && (
								<p className="text-red-500 text-xs">
									{signupState.errors.name}
								</p>
							)}
							<Input
								type="email"
								placeholder="Enter Your Email"
								name="email">
								Email
							</Input>
							{signupState?.errors?.email && (
								<p className="text-red-500 text-xs">
									{signupState.errors.email}
								</p>
							)}
							<Input
								type="password"
								placeholder="Enter Your Password"
								name="password">
								Password
							</Input>
							{signupState?.errors?.password && (
								<p className="text-red-500 text-xs">
									{signupState.errors.password}
								</p>
							)}
							<Button type="submit">Sign up</Button>
							<p className="text-sm font-light text-gray-500 dark:text-gray-400">
								Already have an account?{" "}
								<Link
									href="/login"
									className="font-medium text-primary-600 hover:underline dark:text-primary-500">
									Sign in
								</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Page;
