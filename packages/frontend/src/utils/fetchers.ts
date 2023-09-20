import { type Fetcher } from "swr";
import { CurrencyCode, RatesData } from "../types";

export const ratesFetcher: Fetcher<RatesData> = (url: string) =>
  fetch(url).then((res) => res.json());

const mockResponse: RatesData = {
  base: "GBP",
  rates: [
    {
      currencyCode: "USD",
      rateValue: 1.362,
    },
    {
      currencyCode: "EUR",
      rateValue: 1.161,
    },
    {
      currencyCode: "Pi" as CurrencyCode,
      rateValue: 3.14159,
    },
  ],
  lastUpdated: "1970-01-01T00:00:00.000Z",
};

export const mockRatesFetcher: Fetcher<RatesData> = () =>
  Promise.resolve(mockResponse);
