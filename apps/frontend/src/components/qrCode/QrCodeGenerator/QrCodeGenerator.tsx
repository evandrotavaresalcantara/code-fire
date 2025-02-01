"use client";
import Image from "next/image";
import QRCode from "qrcode";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface QrCodeGeneratorProps {
  token: string;
  width: number;
  msgNoQrCode: string;
}

export function QrCodeGenerator(props: QrCodeGeneratorProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);

  useEffect(() => {
    if (props.token) {
      // Gera o QR Code a partir do token
      QRCode.toDataURL(props.token, { width: props.width }, (err, url) => {
        if (err) {
          console.error("Erro ao gerar QR Code:", err);
          toast.error(`Erro ao gerar QR Code: ${err}`);
          return;
        }
        setQrCodeUrl(url);
      });
    }
  }, [props.token, props.width]);

  return (
    <div>
      {qrCodeUrl ? (
        <Image
          src={qrCodeUrl}
          alt="QR Code"
          width={props.width}
          height={props.width}
        />
      ) : (
        <h3
          className={`text-center text-xl font-semibold italic h-[${props.width}px]`}
        >
          {props.msgNoQrCode}
        </h3>
      )}
    </div>
  );
}
