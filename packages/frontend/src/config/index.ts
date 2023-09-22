export const envBackendEndpoint =
  import.meta.env.VITE_BACKEND_ENDPOINT || "http://localhost:3000/rates";
export const envBaseCurrencyCode =
  import.meta.env.VITE_BASE_CURRENCY_CODE || "EUR";
export const envRefreshIntervalMilliseconds =
  import.meta.env.VITE_REFRESH_INTERVAL_MILLISECONDS || 10000;
export const envKostasIsAwesome =
  import.meta.env.VITE_KOSTAS_IS_AWESOME || false;
