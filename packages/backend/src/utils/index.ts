import { baseCurrency, comparedCurrencies } from "../config/index.js";
import {
  ExchangeRatesAPIRatesResponse,
  RatesResponse,
} from "../types/index.js";

export const formatRatesResponse = ({
  base,
  rates: rawRates,
  date,
}: ExchangeRatesAPIRatesResponse): RatesResponse => {
  const rates = Object.entries(rawRates).map(([currencyCode, rateValue]) => ({
    currencyCode,
    rateValue,
  }));

  return {
    base,
    rates,
    lastUpdated: new Date(date).toISOString(),
  };
};

export const getKeyFromParams = (
  base: string = baseCurrency,
  compared: string = comparedCurrencies
) => `rates-${base}-${compared}`;
