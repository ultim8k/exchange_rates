export const exchangeratesApiKey = process.env.EXCHANGERATES_API_KEY || "";
export const exchangeratesApiUrl = process.env.EXCHANGERATES_API_URL || "";
export const exchangeratesApiRatesEndpoint =
  process.env.EXCHANGERATES_API_RATES_ENDPOINT || "/latest";
export const exchangeratesApiIsNotFreeTier =
  process.env.EXCHANGERATES_API_IS_NOT_FREE_TIER || false;
export const baseCurrency = process.env.BASE_CURRENCY || "GBP";
export const comparedCurrencies = process.env.COMPARED_CURRENCIES || "USD,EUR";
export const port = process.env.PORT || 3000;
export const frontendDistPath =
  process.env.FRONTEND_DIST_PATH || "../frontend/dist";
