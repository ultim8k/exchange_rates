import { NextFunction, type Request, type Response } from "express";

import {
  baseCurrency as defaultBaseCurrency,
  comparedCurrencies as defaultComparedCurrencies,
} from "../config/index.js";

import { getExchangeRates, mockExchangeRateResponse } from "../data/index.js";
import { formatRatesResponse } from "../utils/index.js";
import { RatesRequestProps } from "../types/index.js";

export const handleRatesRequest = async (
  req: Request<RatesRequestProps>,
  res: Response,
  next: NextFunction
) => {
  const baseCurrency = (req.query.base || defaultBaseCurrency).toString();
  const comparedCurrencies = (req.query.compared || defaultComparedCurrencies)
    .toString()
    .split(",")
    .map((currency) => currency.trim());

  try {
    const ratesAPIResponse = await getExchangeRates({
      baseCurrency,
      comparedCurrencies,
    });

    const response = formatRatesResponse(ratesAPIResponse);
    res.locals.responseData = response;
    next();

    res.statusCode = 200;
    res.json(response);
  } catch (error) {
    console.error(error);

    res.statusCode = 500;
    res.send("Something went wrong");
  }
};

export const handleMockRatesRequest = async (_req: Request, res: Response) => {
  res.statusCode = 200;
  res.json(mockExchangeRateResponse);
};

export const handleDragonsRequest = (_req: Request, res: Response) => {
  res.statusCode = 418;
  res.send("Here be 🐉 drinking ☕️ from a 🫖");
};
