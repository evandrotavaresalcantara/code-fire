import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../../card";
import { PATH_PAGE_ACCOUNTS_LOGIN } from "@/lib";

const CardRegister = () => {
  return (
    <Card className="mx-auto py-2 px-1 sm:px-16 bg-[#18181B] border-none text-white w-[631px]">
      <CardHeader>
        <div className="w-full flex flex-col justify-center items-center gap-8">
          <CardTitle className="text-2xl">Cadastrar</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="px-[68px]">
        {/* chamar formulario */}
        <div className=" text-center text-sm">
          <span>
            Já possui conta?{" "}
            {
              <Link
                href={PATH_PAGE_ACCOUNTS_LOGIN}
                className="text-green-500 hover:text-green-400"
              >
                Faça Login
              </Link>
            }
          </span>
          <br />
        </div>
      </CardContent>
    </Card>
  );
};

export default CardRegister;
