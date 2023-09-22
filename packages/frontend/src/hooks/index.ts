import useSWR from "swr";
import { ratesFetcher } from "../utils";
import { RatesData } from "../types";
import { envBackendEndpoint, envRefreshIntervalMilliseconds } from "../config";

const url = envBackendEndpoint;
const refreshInterval = envRefreshIntervalMilliseconds;

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
