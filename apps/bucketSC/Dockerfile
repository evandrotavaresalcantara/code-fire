# Use a lightweight Node.js image with TypeScript support
FROM node:18-bookworm-slim AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

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

COPY --from=builder --chown=express:nodejs /app/dist ./dist
# COPY ./src/assets/images /app/src/assets/images
COPY --from=builder --chown=express:nodejs /app/node_modules ./node_modules
COPY --chown=express:nodejs package.json ./

USER express

EXPOSE 7000

# Start the application
CMD [ "npm", "start" ]