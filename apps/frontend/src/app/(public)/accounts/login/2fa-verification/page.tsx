import { OtpForm } from "@/components/forms/loginForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { verifyOtpExists } from "@/services";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function Page({
  searchParams,
}: {
  searchParams: { email: string; next: string; login_type: string };
}) {
  const response = await verifyOtpExists(searchParams.email);
  if (response.status === 200 && response.data.expired_at)
    return (
      <div className="w-full h-full flex flex-col justify-center items-center p-12 gap-8">
        <Card className="w-full sm:w-[350px]">
          <CardHeader>
            <CardTitle>Autenticação 2 Fatores</CardTitle>
            <CardDescription>{searchParams.email}</CardDescription>
          </CardHeader>
          <CardContent className="w-full flex items-center justify-center h-full">
            <Suspense fallback={<div>Carregando...</div>}>
              <OtpForm
                next={searchParams.next}
                email={searchParams.email}
                expired_at={response.data.expired_at}
                loginType={searchParams.login_type}
              />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    );
  notFound();
}
