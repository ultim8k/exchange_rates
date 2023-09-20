import { currenciesDictionary } from "../constants";

export type CurrencyCode = keyof typeof currenciesDictionary;

export interface Rate {
  currencyCode: CurrencyCode;
  rateValue: number;
}

export interface RatesData {
  base: CurrencyCode;
  rates: Rate[];
  lastUpdated: string;
}
