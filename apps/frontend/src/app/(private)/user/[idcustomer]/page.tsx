import UpdateUserForm from "@/components/forms/user/updateUser/updateUser-form";
import UltimoLoginPainel from "@/components/reports/panels/ultimoLoginPainel";
import { Button } from "@/components/ui/button";
import { findUserID } from "@/services";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function UserIdPage({
  params,
}: {
  params: { idcustomer: string };
}) {
  const cookieStore = cookies();
  const tokenId = cookieStore.get("tokenId");
  const response = await findUserID({
    id: params.idcustomer,
    token: tokenId?.value,
  });

  if (!response) {
    notFound();
  }

  return (
    <div className="flex flex-col w-full gap-4 container">
      <div className="flex w-full justify-between">
        <div className="flex items-center font-bold text-2xl text-zinc-300 ">
          SecurityAdmin
        </div>
        <Button
          form="updateUserForm"
          type="submit"
          className=" btn-primary text-white px-8"
        >
          Salvar
        </Button>
      </div>
      <UpdateUserForm user={response} />
      <div className="flex items-center font-bold text-xl text-zinc-400 gap-2">
        Histórico de Login{" "}
        <span className="text-xs text-zinc-500">(ultimo login)</span>
      </div>
      <UltimoLoginPainel email={response.email} />
    </div>
  );
}
