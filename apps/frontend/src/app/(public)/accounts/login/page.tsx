import { LoginForm } from "@/components/forms/loginForm/login-form";
import { PATH_PAGE_HOME } from "@/lib";
import { decrypt } from "@/lib/JWT/verifyToken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { next: string };
}) {
  const token = cookies().get("tokenId");
  const user = token ? await decrypt(token.value) : null;
  // Redireciona para /home se o usuário estiver autenticado
  if (user) {
    redirect(PATH_PAGE_HOME);
  }

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Suspense fallback={<div>Carregando...</div>}>
        <LoginForm next={searchParams.next} />
      </Suspense>
    </div>
  );
}
