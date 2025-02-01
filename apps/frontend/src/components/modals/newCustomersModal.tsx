import { IconPlus } from "@tabler/icons-react";
import ModalTrigger from "../ui/custom/buttons/modalTrigger";
import { Button } from "../ui/button";
import CardModal from "../ui/custom/cards/cardModal";
import NewUsersForm from "../forms/customers/newCustomer/newUsers-form";
import ButtonSubmit from "../ui/custom/buttons/buttonSubmit";
import ButtonCloseModal from "../ui/custom/buttons/buttonCloseModal";

export default function NewCustomersModal() {
  return (
    <ModalTrigger
      trigger={
        <Button className="btn-primary text-white items-center gap-2">
          <IconPlus />
          Novo Usuário
        </Button>
      }
    >
      {(onclose) => (
        <CardModal title="Criar Usuário">
          <div className="flex flex-col gap-8">
            <NewUsersForm onClose={onclose} />
            <div className="flex gap-4 justify-end">
              <ButtonCloseModal
                resetForm={() => {
                  onclose();
                }}
              />
              <ButtonSubmit form="newUserForm" />
            </div>
          </div>
        </CardModal>
      )}
    </ModalTrigger>
  );
}
