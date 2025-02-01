CREATE TABLE IF NOT EXISTS usuario (
  id UUID PRIMARY KEY,
  nome VARCHAR(150) NOT NULL,
  email VARCHAR(250) NOT NULL UNIQUE,
  senha VARCHAR(60) NOT NULL,
  data_criacao TIMESTAMPTZ NOT NULL,
  ativo BOOLEAN DEFAULT TRUE NOT NULL,
  refresh_token VARCHAR(2024),
  data_expiracao_refresh_token TIMESTAMPTZ,
  recuperar_senha_token UUID,
  data_expiraca_recuperar_senha_token TIMESTAMPTZ,
  dois_fatores BOOLEAN DEFAULT FALSE NOT NULL,
  telefone VARCHAR(11),
  imagem_perfil VARCHAR(250),
  sis_admin BOOLEAN DEFAULT FALSE NOT NULL
);

CREATE TABLE IF NOT EXISTS usuario_perfils (
  perfil_id UUID  NOT NULL REFERENCES perfil(id) ON DELETE CASCADE ON UPDATE CASCADE,
  usuario_id UUID  NOT NULL REFERENCES usuario(id) ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY (perfil_id, usuario_id)
);

CREATE TABLE IF NOT EXISTS otp (
  email VARCHAR(250) PRIMARY KEY,
  codigo CHAR(64) NOT NULL,
  expira_em TIMESTAMPTZ NOT NULL
);

CREATE TABLE IF NOT EXISTS qr_code_login (
  email VARCHAR(250) PRIMARY KEY,
  codigo CHAR(64) NOT NULL,
  expira_em TIMESTAMPTZ NOT NULL,
  token VARCHAR(650)
);

-- Inserção do usuário inicial admin
INSERT INTO usuario (
  id,
  nome,
  email,
  senha,
  data_criacao,
  ativo,
  dois_fatores,
  imagem_perfil,
  sis_admin
)
SELECT
  gen_random_uuid(),
  'Administrador',
  'admin@admin.com',
  '$2b$10$6hDAQ.phQHaZXWD9HT.E0.2YRfbaGqb7BD9vrpB0NJ1Ajh5N8THuC', -- Senha hasheada genSenhaParaUsuario.ts
  NOW(),
  true,
  false,
  'http://localhost:7000/v1/static/images/f_webp/admin.png',
  true
WHERE NOT EXISTS (
  SELECT 1 FROM usuario WHERE email = 'admin@admin.com'
);
