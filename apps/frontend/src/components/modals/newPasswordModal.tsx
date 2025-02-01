import React from "react";
import ModalTrigger from "../ui/custom/buttons/modalTrigger";
import { Button } from "../ui/button";
import CardModal from "../ui/custom/cards/cardModal";
import PasswordReplaceForm from "../forms/passwordReplaceForm/passwordReplaceForm";
import { IconLockCode } from "@tabler/icons-react";
import PasswordCustomerReplaceForm from "../forms/customers/passwordCustomerReplaceForm/passwordCustomerReplaceForm";

export default function NewPasswordModal({
  userID,
  isLogin = false,
}: {
  userID: string;
  isLogin?: boolean;
}) {
  return (
    <ModalTrigger
      trigger={
        <Button className="items-center gap-2 bg-zinc-900 border-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-800 hover:text-white">
          <IconLockCode />
          Alterar Senha
        </Button>
      }
    >
      {(onclose) => (
        <CardModal title="Alterar Senha">
          <div className="flex flex-col gap-8">
            {isLogin ? (
              <PasswordReplaceForm userID={userID} onClose={onclose} />
            ) : (
              <PasswordCustomerReplaceForm userID={userID} onClose={onclose} />
            )}
          </div>
        </CardModal>
      )}
    </ModalTrigger>
  );
}
