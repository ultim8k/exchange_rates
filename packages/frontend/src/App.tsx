import { useEffect, useState } from "react";
import "./App.css";
import { currenciesDictionary } from "./constants";
import { FlagIcon } from "./components/FlagIcon";
import { type RatesData, type CurrencyCode } from "./types";
import { RateRow } from "./components/RateRow";
import { getDateAsDDMMMMYYYY } from "./utils";

const baseCurrencyCode: CurrencyCode =
  import.meta.env.VITE_BASE_CURRENCY_CODE || "GBP";

const fetchRates = async (): Promise<RatesData> => {
  const enpoint = import.meta.env.VITE_BACKEND_ENDPOINT;
  return await fetch(enpoint).then((res) => res.json());
};

const App = () => {
  const [ratesData, setRatesData] = useState<RatesData | null>(null);
  const [isAutofetchEnabled, setIsAutofetchEnabled] = useState<boolean>(false);
  const { rates, lastUpdated } = ratesData || {};
  const baseCurrencyFlag = currenciesDictionary[baseCurrencyCode]["flag"];
  const baseCurrencyName = currenciesDictionary[baseCurrencyCode]["name"];
  const formattedDate = lastUpdated && getDateAsDDMMMMYYYY(lastUpdated);

  const getRates = async () => {
    const response = await fetchRates();
    setRatesData(response);
  };

  const handleAutofetchOptionChange = () => {
    setIsAutofetchEnabled(!isAutofetchEnabled);
  };

  const handleRefreshRatesClick = () => {
    getRates();
  };

  useEffect(() => {
    getRates();
  }, []);

  useEffect(() => {
    if (!isAutofetchEnabled) {
      return;
    }

    const interval = setInterval(() => {
      getRates();
    }, 60000);

    return () => clearInterval(interval);
  }, [isAutofetchEnabled]);

  return (
    <>
      <a title="Exchange Rates web app" href="/" className="logo">
        <img src="/blob.svg" alt="logo" />
      </a>
      <h1 className="page-title">Exchange Rates</h1>
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
          Autofetch every minute?{" "}
          <input
            type="checkbox"
            onChange={handleAutofetchOptionChange}
            checked={isAutofetchEnabled}
          />
        </label>
      </p>
      <p>
        <button onClick={handleRefreshRatesClick}>Refresh rates</button>
      </p>
      {import.meta.env.VITE_KOSTAS_IS_AWESOME && <span className="☺️">☺️</span>}
    </>
  );
};

export default App;
