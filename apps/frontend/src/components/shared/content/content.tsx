"use client"
import { useSidebar } from "@/components/ui/sidebar";
import React, { memo, ReactNode } from "react";
import Cabecalho from "../cabecalho/Cabecalho";
import clsx from "clsx";
import { useAuth } from "@/context";
import { Loader2 } from "lucide-react";

interface ContentProps {
  children?: ReactNode;
}

function Content({ children }: ContentProps) {
  const sidebar = useSidebar();
  const {loading} = useAuth()

  return (
    <div className={clsx("flex flex-col flex-1 px-6 pb-11 md:px-11", {"md:pl-0": sidebar.open})}>
      <Cabecalho />
      <main className="flex flex-1 justify-center bg-[#18181b] rounded-xl p-8">
        {loading? ContentSkeleton() :
        children
        }
      </main>
    </div>
  );
}


const ContentSkeleton = () => {
  return (
    <div className="flex flex-col w-full h-full gap-4 justify-center items-center">
      <Loader2 className="animate-spin size-8 text-zinc-600" />
    </div>
  )
}

// const ContentSkeleton = () => {
//   return (
//     <div className="flex flex-col w-full h-full gap-4">
//       <div className="flex justify-between">
//         <Skeleton className=" h-8 w-40"/> 
//         <Skeleton className=" h-8 w-40"/> 
//       </div>
//       <div className="flex flex-grow">
//         <Skeleton className="h-full w-full animate-spin"/>
//       </div>
//     </div>
//   )
// }

export default memo(Content);
