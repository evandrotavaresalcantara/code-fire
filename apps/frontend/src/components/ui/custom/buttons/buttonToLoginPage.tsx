"use client";
import { PATH_PAGE_ACCOUNTS_LOGIN } from "@/lib";
import { useRouter } from "next/navigation";
import { Button } from "../../button";

export default function ButtonToLoginPage() {
  const router = useRouter();
  return (
    <Button
      className="btn-primary text-white p-4 w-full"
      onClick={() => router.push(PATH_PAGE_ACCOUNTS_LOGIN)}
    >
      Voltar para o Login
    </Button>
  );
}
