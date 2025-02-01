"use client";
import { useState } from "react";



export default function useConfirmDialog() {
  const [resolvePromise, setResolvePromise] = useState<((value: boolean) => void) | null>(null);

  const showDialog = (setIsDialogOpen : (value: boolean) => void): Promise<boolean> => {
    setIsDialogOpen(true);
    return new Promise((resolve) => setResolvePromise(() => resolve));
  };

  const handleConfirm = (setIsDialogOpen : (value: boolean) => void) => {
    if (resolvePromise) resolvePromise(true);
    setIsDialogOpen(false);
  };

  const handleCancel = (setIsDialogOpen : (value: boolean) => void) => {
    if (resolvePromise) resolvePromise(false);
    setIsDialogOpen(false);
  };

  return {
    showDialog,
    handleConfirm,
    handleCancel,
  };
}
