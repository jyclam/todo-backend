import express from "express";
import { json, urlencoded } from "body-parser";
import logger from "morgan";

import indexRouter from "./routes/index";

const app = express();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));

app.use("/", indexRouter);

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      status: error.status || 500,
      message: error.message || "Internal Server Error",
    },
  });
});

export default app;
