"use client";
import React, { useEffect, useState } from "react";
import { columnsPermissionTable } from "./columns";
import BarraDePesquisa from "@/components/shared/tabela/BarraDePesquisa";
import { DataTable } from "@/components/shared/tabela/data-table";
import NewPermissionsModal from "@/components/modals/newPermissionsModal";
import { usePermissionsStore } from "@/hooks/store/permissionsStore";
import ConfirmationDialog from "@/components/ui/custom/confirmationDialog";
import useConfirmDialog from "@/hooks/useConfirmDialog";
import { toast } from "sonner";

export default function PermissoesPage() {
  const { permissions, findPermissions, deletePermission } = usePermissionsStore();
  const { showDialog, handleConfirm, handleCancel } = useConfirmDialog();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handlerDelete = async (id:string) => {
    const confirm = await showDialog(setIsDeleteDialogOpen);
    if(confirm){
       await deletePermission(id)
       const {error} = usePermissionsStore.getState();
      if(error){
        toast.error(error)
        findPermissions()
      }else{
        toast.success("Permissão deletada com Sucesso!")
      }
    }
  }


  useEffect(() => {
    findPermissions();
  }, [findPermissions]);


  const sheach = (
    <BarraDePesquisa
      title="Pesquisar Permissões"
      placeholder="Procurar por nome..."
    >
      <NewPermissionsModal />
    </BarraDePesquisa>
  );

  return (
    <div className="w-full h-full container">
      <DataTable
        columns={columnsPermissionTable(handlerDelete)}
        data={permissions}
        searchBar={sheach}
        searchFor="nome"
      />
      <ConfirmationDialog
        open={isDeleteDialogOpen}
        onClose={() => handleCancel(setIsDeleteDialogOpen)}
        onConfirm={() => handleConfirm(setIsDeleteDialogOpen)}
        description="Deseja realmente deletar esta Permissão? Ao confirmar, esta permissão será DELETADA permanentemente."
      />
    </div>
  );
}
