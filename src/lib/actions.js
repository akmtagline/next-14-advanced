"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export async function authenticate(prevState, formData) {
  try {
    const url = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    if (url) {
      const { searchParams } = new URL(url);
      const callbackUrl = searchParams.get("callbackUrl");
      const { pathname } = new URL(callbackUrl);
      if (callbackUrl) redirect(pathname);
    } else {
      redirect("/dashboard");
    }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
