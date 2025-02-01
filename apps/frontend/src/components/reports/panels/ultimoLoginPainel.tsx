import { Card } from "@/components/ui/card";
import UltimoLoginItem from "../LogUltimoLogin/ultimoLoginItem";

export default function UltimoLoginPainel({ email }: { email: string }) {
  return (
    <Card className="mx-auto py-4 px-4 sm:px-16 bg-[#09090b] border-none text-white w-full">
        <UltimoLoginItem email={email}/>
    </Card>
  );
}
