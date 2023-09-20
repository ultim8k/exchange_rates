export interface UnknownObject {
  [key: string]: any;
}

export interface Rate {
  currencyCode: string;
  rateValue: number;
}

export interface RatesResponse {
  base: string;
  rates: Rate[];
  lastUpdated: string;
}

export interface RatesRequestProps {
  base: string | undefined;
  compared: string | undefined;
}

export interface ExchangeRatesAPIRatesResponse {
  success: boolean;
  timestamp: number;
  base: string;
  date: string;
  rates: {
    [key: string]: number;
  };
}
