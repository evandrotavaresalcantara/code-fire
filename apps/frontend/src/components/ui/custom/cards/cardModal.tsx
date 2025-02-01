import React, { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../card";

interface CardModalProps {
  children: ReactNode;
  title?: string;
}

const CardModal = ({title, children }: CardModalProps) => {
  return (
    <Card className="w-full text-white rounded-xl">
      <CardHeader className="bg-[#27272A] rounded-t-xl">
        <CardTitle className="text-center text-lg font-semibold">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center py-8 px-12">
      <div className="w-full">
        {children}
      </div>
      </CardContent>
    </Card>
  );
};

export default CardModal;
