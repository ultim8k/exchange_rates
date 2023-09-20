FROM node:20-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS ci

COPY . /usr/src/
WORKDIR /usr/src/

FROM ci AS prod-deps

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm --filter ./packages/backend install --node-linker=hoisted --prod --frozen-lockfile

FROM ci AS build

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run -r build

FROM base AS server

COPY --from=prod-deps /usr/src/node_modules /usr/src/node_modules
COPY --from=build /usr/src/packages/backend/dist /usr/src/dist
COPY --from=build /usr/src/packages/frontend/dist /usr/src/dist/public_html
COPY --from=build /usr/src/packages/backend/package.json /usr/src/package.json

WORKDIR /usr/src/

ENV FRONTEND_DIST_PATH=/usr/src/dist/public_html

EXPOSE 3000

CMD [ "pnpm", "start" ]