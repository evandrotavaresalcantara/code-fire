import { API_PERFIS } from "@/lib";
import { Perfil } from "@/types/Entities";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export function columnsPerfilTable(handleCancel: (id: string) => void) {
  const data: ColumnDef<Perfil>[] = [
    {
      accessorKey: "nome",
      header: "Nome",
      cell: ({ row }) => (
        <div className="select-none lg:min-w-32 xl:min-w-40 whitespace-normal">
          {row.original.nome}
        </div>
      ),
    },
    {
      accessorKey: "descricao",
      header: "Descrição",
      cell: ({ row }) => (
        <div
          className="select-none
        md:min-w-20 
        lg:min-w-40 lg: max-w-sm
        xl:min-w-56 xl:max-w-lg
        max-h-32 line-clamp-5
        lg:max-h-16 lg:line-clamp-3 overflow-hidden"
        >
          {row.original.descricao}
        </div>
      ),
    },

    {
      id: "acoes",
      header: "Ações",
      cell: ({ row }) => (
        <div className="flex gap-2">
            <Link href={`${API_PERFIS}/${row.original.id}`}>
              <button className="text-blue-500 hover:underline">
                <IconEdit />
              </button>
            </Link>

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
