import { useEffect, useState } from "react";
import "./RatesTable.css";
import { currenciesDictionary } from "../../constants";
import { FlagIcon } from "../FlagIcon";
import { type RatesData, type CurrencyCode } from "../../types";
import { RateRow } from "./RateRow";
import { getDateAsDDMMMMYYYY } from "../../utils";
import {
  envBackendEndpoint,
  envBaseCurrencyCode,
  envRefreshIntervalMilliseconds,
} from "../../config";

const baseCurrencyCode: CurrencyCode = envBaseCurrencyCode;
const refreshInterval = envRefreshIntervalMilliseconds;
const enpoint: string = envBackendEndpoint;

const fetchRates = async (): Promise<RatesData> => {
  return await fetch(enpoint).then((res) => res.json());
};

const RatesTable = () => {
  const [ratesData, setRatesData] = useState<RatesData | null>(null);
  const [isAutoRefreshEnabled, setIsAutoRefreshEnabled] =
    useState<boolean>(false);
  const { rates, lastUpdated } = ratesData || {};
  const baseCurrencyFlag = currenciesDictionary[baseCurrencyCode]["flag"];
  const baseCurrencyName = currenciesDictionary[baseCurrencyCode]["name"];
  const formattedDate = lastUpdated && getDateAsDDMMMMYYYY(lastUpdated);

  const getRates = async () => {
    const response = await fetchRates();
    setRatesData(response);
  };

  const handleAutofetchOptionChange = () => {
    setIsAutoRefreshEnabled(!isAutoRefreshEnabled);
  };

  const handleRefreshRatesClick = () => {
    getRates();
  };

  useEffect(() => {
    getRates();
  }, []);

  useEffect(() => {
    if (!isAutoRefreshEnabled) {
      return;
    }

    const interval = setInterval(() => {
      getRates();
    }, 10000);

    return () => clearInterval(interval);
  }, [isAutoRefreshEnabled]);

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
