import {
  exchangeratesApiKey,
  exchangeratesApiUrl,
  exchangeratesApiRatesEndpoint,
  exchangeratesApiIsNotFreeTier,
} from "../config/index.js";

export const getExchangeRates = async ({
  baseCurrency,
  comparedCurrencies = [],
}: {
  baseCurrency: string;
  comparedCurrencies: string[];
}) => {
  const paramsBase = {
    access_key: exchangeratesApiKey,
    symbols: comparedCurrencies.join(","),
  };

  const params = new URLSearchParams(
    exchangeratesApiIsNotFreeTier ? { ...paramsBase, baseCurrency } : paramsBase
  );

  // @ts-ignore fetch type definition is missing in Node.js
  const response = await fetch(
    `${exchangeratesApiUrl}${exchangeratesApiRatesEndpoint}?${params.toString()}`
  );

  const data = await response.json();

  return data;
};
