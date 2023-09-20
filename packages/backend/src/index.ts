import express, { Request } from "express";
import { getExchangeRates } from "./data/exchangeRates.js";
import { formatRatesResponse } from "./utils/index.js";
import cors from "cors";
import { mockExchangeRateResponse } from "./data/mockExchangeRates.js";
import {
  baseCurrency as defaultBaseCurrency,
  comparedCurrencies as defaultComparedCurrencies,
  frontendDistPath,
  port,
} from "./config/index.js";

const app = express();
app.use(cors());

app.use(express.static(frontendDistPath));

app.get("/dragons", (_req, res) => {
  res.statusCode = 418;
  res.send("Here be 🐉");
});

app.get("/mock-rates", async (_req, res) => {
  res.send(mockExchangeRateResponse);
});

app.get(
  "/rates",
  async (
    req: Request<{ base: string | undefined; compared: string | undefined }>,
    res
  ) => {
    const baseCurrency = (req.query.base || defaultBaseCurrency).toString();
    const comparedCurrencies = (req.query.compared || defaultComparedCurrencies)
      .toString()
      .split(",")
      .map((currency) => currency.trim());

    try {
      const ratesResponse = await getExchangeRates({
        baseCurrency,
        comparedCurrencies,
      });

      const rates = formatRatesResponse(ratesResponse);

      res.send(rates);
    } catch (error) {
      console.log(error);

      res.statusCode = 500;
      res.send("Something went wrong");
    }
  }
);

app.listen(port, () => {
  console.log(`Rates Exchanger API listening on http://localhost:${port}`);
});
