// Exchange rates API options
export const exchangeratesApiKey = process.env.EXCHANGERATES_API_KEY || "";
export const exchangeratesApiUrl =
  process.env.EXCHANGERATES_API_URL || "http://api.exchangeratesapi.io/v1";
export const exchangeratesApiRatesEndpoint =
  process.env.EXCHANGERATES_API_RATES_ENDPOINT || "/latest";
export const exchangeratesApiIsNotFreeTier =
  process.env.EXCHANGERATES_API_IS_NOT_FREE_TIER || false;

// Default currency exhcange options
export const baseCurrency = process.env.BASE_CURRENCY || "GBP";
export const comparedCurrencies = process.env.COMPARED_CURRENCIES || "USD,EUR";

// Backend sever port
export const port = process.env.PORT || 3000;

// Serving frontend html & assets via backend
export const frontendDistPath =
  process.env.FRONTEND_DIST_PATH || "../frontend/dist";

// Redis cache options
export const redisConnectionString =
  process.env.REDIS_CONNECTION_STRING || "redis://localhost:6379";
export const redisCacheTimeSeconds =
  process.env.REDIS_CACHE_TIME_SECONDS || 2 * 60; // Default 2 minutes
