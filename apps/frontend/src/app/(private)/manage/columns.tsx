"use client";

import { Usuario } from "@/types/Entities";
import { ColumnDef } from "@tanstack/react-table";
import {
  IconThumbUp,
  IconThumbDown,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";

import Link from "next/link";
import { PATH_PAGE_MANAGE } from "@/lib";

export function columns(
  handleCancel: (id: string) => void
): ColumnDef<Usuario>[] {
  return [
    {
      accessorKey: "nome",
      header: "Nome",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "ativo",
      header: "Ativo",
      cell: ({ row }) => {
        const isActive = row.getValue<boolean>("ativo");
        return <div>{isActive ? <IconThumbUp /> : <IconThumbDown />}</div>;
      },
    },
    {
      id: "acoes",
      header: "Ações",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Link href={`${PATH_PAGE_MANAGE}/${row.original.id}`}>
            <button className="text-blue-500 hover:underline">
              <IconEdit />
            </button>
          </Link>

          <button
            className="text-red-500 hover:underline"
            onClick={() => handleCancel(row.original.id!)}
          >
            <IconTrash />
          </button>
        </div>
      ),
    },
  ];
}
