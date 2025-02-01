"use client";

import { Html5QrcodePlugin } from "@/components/qrCode";
import { useAuth } from "@/context";
import { handleError } from "@/lib";

interface LoginQrCodeFormProps {
  next?: string;
}

export function LoginQrCodeForm(props: LoginQrCodeFormProps) {
  const { loginQrCode } = useAuth();

  async function onNewScanResult(decodedText: string) {
    try {
      await loginQrCode(decodedText, props.next);
    } catch (error) {
      handleError(error);
    }
  }

  return (
    <div className="w-full flex justify-center mx-auto mt-4">
      <Html5QrcodePlugin
        fps={10}
        qrbox={250}
        disableFlip={false}
        qrCodeSuccessCallback={onNewScanResult}
      />
    </div>
  );
}
