import { createClient } from "redis";
import { UnknownObject } from "../types/index.js";
import {
  redisCacheTimeSeconds,
  redisConnectionString,
} from "../config/index.js";

export const redisClient = createClient({
  url: redisConnectionString,
});

redisClient.on("error", (error: any) => console.error(`Error : ${error}`));

await redisClient.connect();

export const getCachedItem = async (key: string): Promise<unknown> => {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }

    const result = await redisClient.get(key);

    if (!result) {
      throw new Error("No cached item found");
    }

    return JSON.parse(result);
  } catch (error) {
    console.error(error);
    throw new Error("Error while getting cache");
  }
};

export const setCachedItem = async (key: string, value: UnknownObject) => {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }

    await redisClient.setEx(
      key,
      redisCacheTimeSeconds as number,
      JSON.stringify(value)
    );

    return;
  } catch (error) {
    console.error(error);
    throw new Error("Error while setting cache");
  }
};
