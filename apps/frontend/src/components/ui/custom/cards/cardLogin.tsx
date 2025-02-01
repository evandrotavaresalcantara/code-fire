import { ReactNode } from "react";
import { Card } from "../../card";

const CardLogin = ({ children }: { children: ReactNode }) => {
  return (
    <Card className="mx-auto py-2 px-1 sm:px-16 bg-[#18181B] border-none text-white w-[631px]">
      {children}
    </Card>
  );
};

export default CardLogin;
