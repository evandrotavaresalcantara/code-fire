"use client";
import PermissionsForm from "@/components/forms/Permissions/Permissions-form";
import ModalTrigger from "@/components/ui/custom/buttons/modalTrigger";
import { Permissao } from "@/types/Entities";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";

export function columnsPermissionTable(handleCancel: (id: string) => void) {
  const data: ColumnDef<Permissao>[] = [
    {
      accessorKey: "nome",
      header: "Nome",
    },
    {
      accessorKey: "descricao",
      header: "Descrição",
    },
    {
      id: "acoes",
      header: "Ações",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <ModalTrigger
            trigger={
              <button className="text-blue-500 hover:underline">
                <IconEdit />
              </button>
            }
          >
            <PermissionsForm id={row.original.id} />
          </ModalTrigger>

          <button
            className="text-red-500 hover:underline"
            onClick={() => handleCancel(row.original.id)}
          >
            <IconTrash />
          </button>
        </div>
      ),
    },
  ];
  return data;
}
