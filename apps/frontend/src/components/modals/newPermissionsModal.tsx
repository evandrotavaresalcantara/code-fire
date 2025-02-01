import { IconPlus } from "@tabler/icons-react";

import PermissionsForm from "../forms/Permissions/Permissions-form";
import { Button } from "../ui/button";
import ModalTrigger from "../ui/custom/buttons/modalTrigger";

export default function NewPermissionsModal() {
  return (
    <ModalTrigger
      trigger={
        <Button className="btn-primary text-white items-center gap-2">
          <IconPlus />
          Nova Permissão
        </Button>
      }
    >
      <PermissionsForm />
    </ModalTrigger>
  );
}
