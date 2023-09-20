import { type Request, type Response, type NextFunction } from "express";
import { getCachedItem, setCachedItem } from "../cache/index.js";
import { RatesRequestProps, RatesResponse } from "../types/index.js";
import { getKeyFromParams } from "../utils/index.js";

export const getCachedRates = async (
  req: Request<RatesRequestProps>,
  res: Response<RatesResponse>,
  next: NextFunction
) => {
  try {
    const { base, compared } = req.query;
    const key = getKeyFromParams(
      base as RatesRequestProps["base"],
      compared as RatesRequestProps["compared"]
    );
    const cachedData = await getCachedItem(key);
    console.log("Response from cache:", cachedData);

    if (!cachedData || !Object.keys(cachedData).length) {
      return next();
    }

    res.setHeader("X-From-Cache", "true");
    res.statusCode = 200;
    res.json(cachedData as RatesResponse);
  } catch (error) {
    console.error(error);
    next();
  }
};

export const setCachedRates = async (
  req: Request<RatesRequestProps>,
  res: Response<RatesResponse>,
  next: NextFunction
) => {
  try {
    const { base, compared } = req.query;
    const { responseData } = res.locals;
    const key = getKeyFromParams(
      base as RatesRequestProps["base"],
      compared as RatesRequestProps["compared"]
    );
    if (!responseData) {
      return next();
    }

    console.log("Store to cache:", key, responseData);

    await setCachedItem(key, responseData);
  } catch (error) {
    console.error(error);
  }
  return next();
};
