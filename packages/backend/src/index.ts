import express from "express";
import cors from "cors";

import { frontendDistPath, port } from "./config/index.js";
import {
  handleDragonsRequest,
  handleMockRatesRequest,
  handleRatesRequest,
} from "./handlers/index.js";
import { getCachedRates, setCachedRates } from "./middleware/index.js";

const app = express();
app.use(cors());
app.set("query parser", "simple");

app.use(express.static(frontendDistPath));

app.get("/dragons", handleDragonsRequest);
app.get("/mock-rates", handleMockRatesRequest);
app.get("/rates", getCachedRates, handleRatesRequest, setCachedRates);

app.listen(port, () => {
  console.log(`💹 Rates Exchanger API listening on http://localhost:${port}`);
});
