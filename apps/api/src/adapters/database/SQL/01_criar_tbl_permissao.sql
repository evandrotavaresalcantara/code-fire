CREATE TABLE IF NOT EXISTS permissao (
  id UUID PRIMARY KEY,
  nome VARCHAR(50) NOT NULL,
  descricao VARCHAR(150) NOT NULL,
  data_criacao TIMESTAMPTZ NOT NULL,
  ativo BOOLEAN DEFAULT TRUE NOT NULL
);