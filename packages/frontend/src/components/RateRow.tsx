import { currenciesDictionary } from "../constants";
import { Rate } from "../types";
import { FlagIcon } from "./FlagIcon";

export const RateRow = ({ currencyCode, rateValue }: Rate) => {
  const { flag, name: currencyName } = currenciesDictionary[currencyCode] || {};

  return (
    <tr key={currencyCode}>
      <td>{flag && <FlagIcon name={currencyName} flagIdentifier={flag} />}</td>
      <td>{currencyName}</td>
      <td>{rateValue}</td>
    </tr>
  );
};
