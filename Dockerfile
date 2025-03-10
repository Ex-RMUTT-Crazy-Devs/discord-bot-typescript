FROM oven/bun:alpine AS base
WORKDIR /app

FROM base AS install
WORKDIR /temp/dev
COPY package.json bun.lockb .
RUN bun install --frozen-lockfile

FROM base AS production
WORKDIR /temp/prod
COPY package.json bun.lockb .
RUN bun install --frozen-lockfile --production

FROM base AS build
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

# Build
RUN bun build ./src/index.ts --outdir ./ --format esm --target bun --sourcemap

FROM base
WORKDIR /app
COPY --from=build /app/index.js .
COPY --from=production /temp/prod/node_modules node_modules
COPY . .
ENTRYPOINT [ "bun", "index.js" ]