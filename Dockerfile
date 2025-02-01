# Use a lightweight Node.js image with TypeScript support
FROM node:18-bookworm-slim AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copiar apenas os arquivos necessários para instalar as dependências
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
COPY packages/ ./packages/
COPY apps/api/package.json ./apps/api/package.json

# Instalar dependências dos workspaces
RUN \
  npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

# Copiar node_modules e código fonte
COPY --from=deps /app/node_modules ./node_modules
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
COPY packages/ ./packages/
COPY apps/api/ ./apps/api/

# Build do projeto
RUN \
  npm run prisma \
  npm run build

# Production image, copy all the files and run express
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 express

RUN apt-get update && apt-get upgrade -y && \
  apt-get install -y tzdata locales netcat-openbsd vim file && \
  ln -fs /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime && \
  sed -i 's/# pt_BR.UTF-8 UTF-8/pt_BR.UTF-8 UTF-8/' /etc/locale.gen && \
  locale-gen && \
  update-locale LANG=pt_BR.UTF-8

# Copiar apenas os arquivos necessários para rodar a aplicação
COPY --from=builder --chown=express:nodejs /app/apps/api/dist ./apps/api/dist
COPY --from=builder --chown=express:nodejs /app/packages ./packages
COPY --from=builder --chown=express:nodejs /app/node_modules ./node_modules
COPY --chown=express:nodejs apps/api/package.json ./apps/api/package.json
COPY --chown=express:nodejs package.json .

# USER express

EXPOSE 8000

# Start the application
CMD [ "npm", "--prefix", "apps/api", "start" ]