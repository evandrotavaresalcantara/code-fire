CREATE TABLE IF NOT EXISTS perfil (
  id UUID PRIMARY KEY,
  nome VARCHAR(50) NOT NULL,
  descricao VARCHAR(150) NOT NULL,
  data_criacao TIMESTAMPTZ NOT NULL,
  ativo BOOLEAN DEFAULT TRUE NOT NULL
);

CREATE TABLE IF NOT EXISTS perfil_permissoes (
  perfil_id UUID NOT NULL REFERENCES perfil(id) ON DELETE CASCADE,
  permissao_id UUID NOT NULL REFERENCES permissao(id) ON DELETE CASCADE,
  PRIMARY KEY (perfil_id, permissao_id)
);
