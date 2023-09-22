# The Exchanger Widget

## Introduction

This is a simple widget that displays the exchange rates of a few well-known currencies to GBP.

It is written in TypeScript and uses React + Vite on the frontend & Node.js + Express on the backend side.

The exchange rate data come from [exchangeratesapi.io](https://exchangeratesapi.io).

>**Important Note**: The free plan of `exchangeratesapi.io` doesn't allow specifying currency in the request The default is `EUR`. Also it doesn't allow `https` but only plain `http`.

## How to run locally

### Prerequisites

To start working on the app you need to have:

- [Node.js](https://nodejs.org/en/)
- [pnpm](https://pnpm.io/installation)
- [Bun](https://bun.sh/)
- [Redis](https://redis.io/)
- [An API key from exchangeratesapi.io](https://exchangeratesapi.io)

Once you have an api key from exchangeratesapi.io, you need to go to the `packages/backend` directory, copy the `.env.example` file as `.env` and add your api key to the `EXCHANGE_RATES_API_KEY` variable.

Once you have the mentioned tools installed, you can run the following commands to start the app:

```sh
pnpm install
pnpm run -r dev
```

This will start the frontend and backend servers in development mode.
You can view the app at [http://localhost:5173](http://localhost:5173) (Backend runs on [http://localhost:3000](http://localhost:3000)).

## How to run for production

### Using Docker Compose (Recommended)

Simply add your api key to the `EXCHANGE_RATES_API_KEY` variable in the `docker-compose.yml` file and run the following command:

```sh
docker-compose up --build
```

This will build and run the app.

>**Important Note**: In some machines *Docker BuilKit* is not enabled by default.
If you get an error while building the image, you can try to enable it by setting the following environment variables before running `docker-compose`:

```sh
export DOCKER_BUILDKIT=1 # or configure in daemon.json
export COMPOSE_DOCKER_CLI_BUILD=1
```

### Using Docker run

To build the app for production you will need to have:

- [Docker](https://www.docker.com/)
- [Redis](https://redis.io/) (Not required if you use docker-compose)
- [An API key from exchangeratesapi.io](https://exchangeratesapi.io)

Once you have an api key from exchangeratesapi.io, you need to go to the `packages/backend` directory, copy the `.env.docker` file as `.env` and add your api key to the `EXCHANGE_RATES_API_KEY` variable.
Mind that this .env file has to have `FRONTEND_DIST_PATH=/usr/src/dist/public_html` variable set.

Once you have Docker installed, you can run the following commands to build and run the app:

```sh
docker build --no-cache --progress=plain .
```

This will build the docker image.
Then you can run the following command to start the app:

```sh
redis-server &
docker run --env-file ./packages/backend/.env.docker -p 3000:3000 --rm -it $(docker build -q .)
```

>**Important Note**: In some machines *Docker BuilKit* is not enabled by default.
If you get an error while building the image, you can try to enable it by setting the following environment variables before running `docker buld`:

```sh
export DOCKER_BUILDKIT=1 # or configure in daemon.json
```
