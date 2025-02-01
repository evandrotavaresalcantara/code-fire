"use client";

import { Html5Qrcode, Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";

export function QrScanner() {
  const scannerRef = useRef<HTMLDivElement | null>(null);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Inicializa o scanner da câmera
  // useEffect(() => {
  //   if (!scannerRef.current) return;

  //   const scanner = new Html5QrcodeScanner(
  //     "qr-reader",
  //     {
  //       fps: 10, // Quadros por segundo
  //       qrbox: { width: 250, height: 250 },
  //     },
  //     false
  //   );

  //   scanner.render(
  //     (decodedText) => handleScan(decodedText),
  //     (errorMessage) => console.warn(errorMessage)
  //   );

  //   return () => scanner.clear();
  // }, []);
  useEffect(() => {
    if (!scannerRef.current) return;
    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10, // Quadros por segundo
        qrbox: { width: 250, height: 250 },
      },
      false
    );
    scanner.render(
      (decodedText) => handleScan(decodedText),
      (errorMessage) => console.warn(errorMessage)
    );
    return () => {
      scanner
        .clear()
        .catch((err) => console.error("Erro ao limpar scanner:", err));
    };
  }, []);

  // Função para lidar com a leitura do QR Code
  const handleScan = async (decodedText: string) => {
    setScanResult(decodedText);
    // try {
    //   const response = await axios.post("/api/auth/qr-login", {
    //     token: decodedText,
    //   });
    //   console.log("Login bem-sucedido!", response.data);
    //   alert("Login realizado com sucesso!");
    // } catch (err) {
    //   console.error("Erro ao validar o token:", err);
    //   setError("Token inválido ou expirado");
    // }
  };

  // Função para processar o upload de uma imagem contendo um QR Code
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const html5QrCode = new Html5Qrcode("qr-reader");

    try {
      const decodedText = await html5QrCode.scanFile(file, false);
      handleScan(decodedText);
    } catch (err) {
      console.error("Erro ao ler QR Code da imagem:", err);
      setError("Não foi possível ler o QR Code da imagem.");
    }
  };

  return (
    <div>
      <h1>Escaneie o QR Code ou faça Upload</h1>

      {/* Scanner da Câmera */}
      <div id="qr-reader" ref={scannerRef} style={{ width: "300px" }}></div>

      {/* Upload de Imagem */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
      />

      {scanResult && <p>Token Capturado: {scanResult}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
