import { IconPlus } from "@tabler/icons-react";
import { Button } from "../ui/button";
import ModalTrigger from "../ui/custom/buttons/modalTrigger";
import ADDPerfilForm from "../forms/perfil/addPerfil/addPerfil-form";

export default function NewPerfilModal() {
  return (
    <ModalTrigger
      trigger={
        <Button className="btn-primary text-white items-center gap-2">
          <IconPlus />
          Novo Perfil
        </Button>
      }
    >
          <ADDPerfilForm />
      
    </ModalTrigger>
  );
}
