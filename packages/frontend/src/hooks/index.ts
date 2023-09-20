import useSWR from "swr";
import { ratesFetcher } from "../utils";
import { RatesData } from "../types";

const url = import.meta.env.VITE_BACKEND_ENDPOINT || "";
const refreshInterval =
  import.meta.env.VITE_REFRESH_INTERVAL_MILLISECONDS || 1000 * 60;

interface UseExchangeRatesOptions {
  autoRefresh?: boolean;
}
export const useExchangeRates = ({
  autoRefresh,
}: UseExchangeRatesOptions = {}) => {
  const options = autoRefresh ? { refreshInterval } : {};
  const { data, error, isLoading, mutate } = useSWR<RatesData, Error>(
    url,
    ratesFetcher,
    options
  );

  return {
    ratesData: data,
    error,
    isLoading,
    refresh: () => mutate(),
  };
};
