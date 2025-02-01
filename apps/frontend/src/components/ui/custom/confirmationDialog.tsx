"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../alert-dialog";

interface ConfirmationDialogProps {
  open: boolean;
  onClose?: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
}

export default function ConfirmationDialog({
  open,
  onClose,
  onConfirm,
  title = "Confirmação necessária",
  description = "Por favor, confirme se deseja prosseguir com esta ação.",
}: ConfirmationDialogProps) {

  function handleClose(){
    if(!onClose){
      return () => open=false
    }
    return onClose
  } 
  
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleClose}>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Confirmar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
