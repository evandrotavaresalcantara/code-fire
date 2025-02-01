import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ButtonToLoginPage from "@/components/ui/custom/buttons/buttonToLoginPage";
import { IconProgressCheck } from "@tabler/icons-react";

export default function RecoverySuccessPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Card className="flex flex-col py-4 sm:px-6 bg-[#18181B] border-none max-w-[500px]">
        <CardHeader className="flex flex-col justify-center items-center gap-4">
          <IconProgressCheck
            width="90px"
            height="90px"
            className="text-green-500"
          />
          <CardTitle className="text-2xl font-semibold text-gray-200">
            E-mail enviado com sucesso!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300 mb-6">
            Verifique sua caixa de entrada. Enviamos um link para recuperação de
            senha. Caso não encontre, verifique a pasta de spam.
          </p>
          <div>
            <ButtonToLoginPage />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
