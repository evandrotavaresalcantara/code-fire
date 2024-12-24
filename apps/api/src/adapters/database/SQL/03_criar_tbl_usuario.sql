CREATE TABLE IF NOT EXISTS usuario (
  id UUID PRIMARY KEY,
  nome VARCHAR(150) NOT NULL,
  email VARCHAR(250) NOT NULL,
  senha VARCHAR(20) NOT NULL,
  data_criacao TIMESTAMPTZ NOT NULL,
  ativo BOOLEAN DEFAULT TRUE NOT NULL,
  refresh_token CHAR(1172),
  data_expiracao_refresh_token TIMESTAMPTZ,
  recuperar_senha_token UUID,
  data_expiraca_recuperar_senha_token TIMESTAMPTZ,
  dois_fatores BOOLEAN DEFAULT FALSE NOT NULL,
  telefone VARCHAR(11),
  imagem_perfil VARCHAR(250)
);

CREATE TABLE IF NOT EXISTS usuario_perfils (
  perfil_id UUID  NOT NULL REFERENCES perfil(id) ON DELETE CASCADE ON UPDATE CASCADE,
  usuario_id UUID  NOT NULL REFERENCES usuario(id) ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY (perfil_id, usuario_id)
);
