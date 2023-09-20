interface RatesResponse {
  success: boolean;
  timestamp: number;
  base: string;
  date: string;
  rates: {
    [key: string]: number;
  };
}

interface FormatedRatesResponse {
  base: string;
  rates: {
    currencyCode: string;
    rateValue: number;
  }[];
  lastUpdated: string;
}

export const formatRatesResponse = ({
  base,
  rates: rawRates,
  timestamp,
}: RatesResponse): FormatedRatesResponse => {
  const rates = Object.entries(rawRates).map(([currencyCode, rateValue]) => ({
    currencyCode,
    rateValue,
  }));

  return {
    base,
    rates,
    lastUpdated: new Date(timestamp).toISOString(),
  };
};
