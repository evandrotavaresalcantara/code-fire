"use server";

import { cookies } from "next/headers";

export async function createCookie(
  name: string,
  value: string,
  maxAge = 2 * 60 * 60
) {
  cookies().set({
    name,
    value,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
    maxAge,
  });
}

export async function deleteCookie(name: string) {
  cookies().delete(name);
}

export async function getCookie(name: string) {
  const cookieStore = cookies();
  return cookieStore.get(name);
}
