import { createIPX, ipxFSStorage } from "ipx";
import path from "path";

const imagesDirectory = path.resolve(__dirname, "../../public", "images");

// Configurar o IPX
export const ipxConfig = createIPX({
  storage: ipxFSStorage({ dir: imagesDirectory }), // Diretório base das imagens
  // httpStorage: ipxHttpStorage({ domains: [] }), // Configurar os domínios permitidos se você estiver processando imagens de URLs externas
  alias: {}, // Configurações de alias para atalhos
});
