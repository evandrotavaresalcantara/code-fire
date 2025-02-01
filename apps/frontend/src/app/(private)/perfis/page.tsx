"use client";
import NewPerfilModal from "@/components/modals/newPerfilModal";
import BarraDePesquisa from "@/components/shared/tabela/BarraDePesquisa";
import { DataTable } from "@/components/shared/tabela/data-table";
import ConfirmationDialog from "@/components/ui/custom/confirmationDialog";
import { usePerfilStore } from "@/hooks/store/perfisStore";
import useConfirmDialog from "@/hooks/useConfirmDialog";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { columnsPerfilTable } from "./columns";

export default function PerfisPage() {
  const { perfis, findPerfis, deletePerfil } = usePerfilStore();
  const { showDialog, handleConfirm, handleCancel } = useConfirmDialog();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handlerDelete = async (id: string) => {
    const confirm = await showDialog(setIsDeleteDialogOpen);
    if (confirm) {
      await deletePerfil(id);
      const { error } = usePerfilStore.getState();
      if (error) {
        toast.error(error);
      } else {
        toast.success("Perfil deletado com Sucesso!");
      }
    }
  };

  useEffect(() => {
    findPerfis();
  }, [findPerfis]);

  const sheach = (
    <BarraDePesquisa
      title="Pesquisar Perfis"
      placeholder="Procurar por nome..."
    >
      <NewPerfilModal />
    </BarraDePesquisa>
  );

  return (
    <div className="w-full h-full container">
      <DataTable
        columns={columnsPerfilTable(handlerDelete)}
        data={perfis}
        searchBar={sheach}
        searchFor="nome"
      />
      <ConfirmationDialog
        open={isDeleteDialogOpen}
        onClose={() => handleCancel(setIsDeleteDialogOpen)}
        onConfirm={() => handleConfirm(setIsDeleteDialogOpen)}
        description="Deseja realmente deletar este Perfil? Ao confirmar, o Perfil será DELETADO permanentemente."
      />
    </div>
  );
}
