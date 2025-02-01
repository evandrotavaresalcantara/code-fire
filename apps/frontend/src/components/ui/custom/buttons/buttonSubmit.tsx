import React from "react";
import { Button } from "../../button";
import { Loader2 } from "lucide-react";
import clsx from "clsx";

export default function ButtonSubmit({
  title = "Salvar",
  isSubmitting = false,
  wfull = false,
  form
}: {
  title?: string;
  isSubmitting?: boolean;
  wfull?: boolean;
  form?: string;
}) {
  return (
    <Button
      form={form}
      type="submit"
      className={clsx("w-full btn-primary text-white text-xl font-bold py-6", {"max-w-[206px]" : !wfull})}
    >
      {isSubmitting ? (
        <>
          <Loader2 className="animate-spin" />
          salvando...
        </>
      ) : (
        title
      )}
    </Button>
  );
}
