"use server";

import { revalidatePath } from "next/cache";

export async function revalidateRoute(route: string) {
  revalidatePath(route);
}