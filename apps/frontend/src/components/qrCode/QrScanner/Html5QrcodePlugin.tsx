import { Html5QrcodeScanner } from "html5-qrcode";
import { QrDimensions } from "html5-qrcode/esm/core";
import { useEffect } from "react";

const qrcodeRegionId = "html5qr-code-full-region";

interface Html5QrcodePluginProps {
  fps?: number;
  qrbox?: number | QrDimensions;
  aspectRatio?: number;
  disableFlip?: boolean;
  verbose?: boolean;
  qrCodeSuccessCallback: (decodedText: string, decodedResult: unknown) => void;
  qrCodeErrorCallback?: (errorMessage: string) => void;
}

// Função para criar a configuração do scanner
const createConfig = (props: Html5QrcodePluginProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const config: any = {};
  if (props.fps) {
    config.fps = props.fps;
  }
  if (props.qrbox) {
    config.qrbox = props.qrbox;
  }
  if (props.aspectRatio) {
    config.aspectRatio = props.aspectRatio;
  }
  if (props.disableFlip !== undefined) {
    config.disableFlip = props.disableFlip;
  }
  return config;
};

export function Html5QrcodePlugin(props: Html5QrcodePluginProps) {
  useEffect(() => {
    const config = createConfig(props);
    const verbose = props.verbose === true;
    if (!props.qrCodeSuccessCallback) {
      throw new Error("qrCodeSuccessCallback is required callback.");
    }
    const html5QrcodeScanner = new Html5QrcodeScanner(
      qrcodeRegionId,
      config,
      verbose
    );
    html5QrcodeScanner.render(
      props.qrCodeSuccessCallback,
      props.qrCodeErrorCallback || (() => {})
    );
    // Cleanup quando o componente desmontar
    return () => {
      html5QrcodeScanner.clear().catch((error) => {
        console.error("Failed to clear html5QrcodeScanner.", error);
      });
    };
  }, [props]);

  return <div id={qrcodeRegionId} style={{ width: "300px" }} />;
}
