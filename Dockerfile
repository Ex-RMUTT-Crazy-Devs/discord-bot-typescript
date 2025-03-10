FROM oven/bun:alpine AS base
WORKDIR /app

FROM base AS install
WORKDIR /temp/prod
COPY package.json ./
RUN bun install --production

FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY . .

ENTRYPOINT [ "bun", "run", "src/index.ts" ]