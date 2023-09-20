# The Exchanger Widget

## Introduction

This is a simple widget that displays the exchange rates of a few well-known currencies to GBP.

It is written in TypeScript and uses React + Vite on the frontend & Node.js + Express on the backend side.

The exchange rate data come from [exchangeratesapi.io](https://exchangeratesapi.io).

## How to run

### Prerequisites

To start working on the app you need to have:

- [Node.js](https://nodejs.org/en/)
- [pnpm](https://pnpm.io/installation)
- [Bun](https://bun.sh/)
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

To build the app for production you will need to have:

- [Docker](https://www.docker.com/)
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
docker run --env-file ./packages/backend/.env.docker -p 3000:3000 --rm -it $(docker build -q .)
```

An alternative to docker run is to use docker-compose.

Simply add your api key to the `EXCHANGE_RATES_API_KEY` variable in the `docker-compose.yml` file and run the following command:

```sh
docker-compose up --build
```

This will build and run the app.
