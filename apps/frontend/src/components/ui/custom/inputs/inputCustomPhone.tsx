/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconPhone } from "@tabler/icons-react";
import React from "react";
import { Control, useController } from "react-hook-form";
import { IMaskInput } from "react-imask";

interface InputCustomPhoneProps {
  control: Control<any>;
  name: string;
}

export default function InputCustomPhone({
  control,
  name,
}: InputCustomPhoneProps) {
  const { field } = useController({ name, control });

  return (
    <div className="bg-black rounded-lg relative flex items-center">
      <IMaskInput
        mask={["(00) 0 0000-0000", "(00) 0000-0000"]}
        dispatch={(appended, dynamicMasked) => {
          const value = (dynamicMasked.value + appended).replace(/\D/g, "");
          return value.length > 10
            ? dynamicMasked.compiledMasks[0]
            : dynamicMasked.compiledMasks[1];
        }}
        unmask={true}
        value={field.value}
        onAccept={(value) => field.onChange(value.replace(/\D/g, ""))}
        onBlur={field.onBlur}
        className="bg-transparent pl-11 flex-1 peer h-12 flex w-full rounded-md border-none px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        placeholder="(11) 99999-9999"
      />
      <IconPhone className="absolute left-3 text-zinc-600 peer-focus:text-zinc-300 pointer-events-none" />
    </div>
  );
}
