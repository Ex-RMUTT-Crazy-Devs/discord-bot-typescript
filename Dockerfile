FROM oven/bun:canary-alpine AS base
WORKDIR /app

FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lock /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# copy node_modules from temp directory
# then copy all (non-ignored) project files into the image
FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY src src
COPY tsconfig.json package.json bun.lock ./

# Build
ENV NODE_ENV=production
RUN bun build --compile --sourcemap --bytecode src/index.ts --outfile executable

# copy production dependencies and source code into final image
FROM alpine:latest AS release
WORKDIR /app
RUN apk add --no-cache libgcc libstdc++ tini tzdata

# Set timezone based on the TZ environment variable
ENV TZ=UTC
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY --from=prerelease /app/executable executable

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["./executable"]