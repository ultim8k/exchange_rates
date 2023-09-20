import { useState } from "react";
import { currenciesDictionary } from "../../constants";
import { type CurrencyCode } from "../../types";
import { getDateAsDDMMMMYYYY } from "../../utils";
import { useExchangeRates } from "../../hooks";
import { FlagIcon } from "../FlagIcon";
import { RateRow } from "./RateRow";

import "./RatesTable.css";

const baseCurrencyCode: CurrencyCode =
  import.meta.env.VITE_BASE_CURRENCY_CODE || "GBP";

const refreshInterval =
  import.meta.env.VITE_REFRESH_INTERVAL_MILLISECONDS || 1000 * 60;

const RatesTable = () => {
  const [isAutoRefreshEnabled, setIsAutoRefreshEnabled] =
    useState<boolean>(false);
  const { ratesData, error, isLoading, refresh } = useExchangeRates({
    autoRefresh: isAutoRefreshEnabled,
  });
  const { rates, lastUpdated } = ratesData || {};
  const baseCurrencyFlag = currenciesDictionary[baseCurrencyCode]["flag"];
  const baseCurrencyName = currenciesDictionary[baseCurrencyCode]["name"];
  const formattedDate = lastUpdated && getDateAsDDMMMMYYYY(lastUpdated);

  const handleAutofetchOptionChange = () => {
    setIsAutoRefreshEnabled(!isAutoRefreshEnabled);
  };

  const handleRefreshRatesClick = () => {
    refresh();
  };

  if (isLoading) {
    return <p className="loader">Loading...</p>;
  }

  if (error) {
    return <p className="error">Something went wrong: {error?.message}</p>;
  }

  return (
    <>
      <table className="rates-table">
        <caption>
          <FlagIcon name={baseCurrencyName} flagIdentifier={baseCurrencyFlag} />{" "}
          {baseCurrencyName} Rates
        </caption>
        <thead className="base-currency">
          <tr>
            <th colSpan={3}>1 {baseCurrencyCode} =</th>
          </tr>
        </thead>
        <tbody>
          {rates &&
            rates.map(({ currencyCode, rateValue }) => (
              <RateRow
                key={currencyCode}
                currencyCode={currencyCode}
                rateValue={rateValue}
              />
            ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3}>Rates {formattedDate}</td>
          </tr>
        </tfoot>
      </table>
      <p>
        <label>
          Autofetch every ${refreshInterval / 1000} seconds?{" "}
          <input
            type="checkbox"
            onChange={handleAutofetchOptionChange}
            checked={isAutoRefreshEnabled}
          />
        </label>
      </p>
      <p>
        <button onClick={handleRefreshRatesClick}>Refresh rates</button>
      </p>
    </>
  );
};

export default RatesTable;
