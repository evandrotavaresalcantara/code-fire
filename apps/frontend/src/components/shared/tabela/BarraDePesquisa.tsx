"use client"
import { Input } from "@/components/ui/input";
import React from "react";

interface BarraDePesquisaProps {
  title: string;
  placeholder: string;
  filterValue?: string;
  setFilterValue?: (value: string) => void;
  children?: React.ReactNode;
}

export default function BarraDePesquisa({
  title,
  placeholder,
  filterValue = "",
  setFilterValue = () => {},
  children,
}: BarraDePesquisaProps) {
  return (
    <>
      <div className="flex flex-grow items-center justify-between px-4 py-2 rounded max-w-[600px] bg-zinc-800 my-0">
        <p>{title}</p>
        <Input
          placeholder={placeholder}
          value={filterValue}
          onChange={(event) => setFilterValue(event.target.value)}
          className="max-w-sm"
        />
      </div>
      <div>
        {children && <div>{children}</div>}
      </div>
    </>
  );
}
