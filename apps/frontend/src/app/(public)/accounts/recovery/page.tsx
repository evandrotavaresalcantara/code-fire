import { PasswordRecoveryForm } from "@/components/forms/passwordRecoveryForm";
import { PATH_PAGE_HOME } from "@/lib";
import { decrypt } from "@/lib/JWT/verifyToken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function RecoveryPage() {
  const token = cookies().get("tokenId");
  const user = token ? await decrypt(token.value) : null;
  // Redireciona para /home se o usuário estiver autenticado
  if (user) {
    redirect(PATH_PAGE_HOME);
  }
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <PasswordRecoveryForm />
    </div>
  );
}
