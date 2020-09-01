import express from "express";
import { json, urlencoded } from "body-parser";
import logger from "morgan";

import { signUp, signIn, guard } from "./utils/auth";
import userRouter from "./resources/user/user.router";
import listRouter from "./resources/list/list.router";
import taskRouter from "./resources/task/task.router";

const app = express();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));

app.post("/signup", signUp);
app.post("/signin", signIn);

app.use("/api", guard);
app.use("/api/user", userRouter);
app.use("/api/list/", listRouter);
app.use("/api/task/", taskRouter);

app.use((error, req, res, next) => {
  console.error(error);

  return res.status(error.status || 500).json({
    error: {
      status: error.status || 500,
      message: error.message || "Internal Server Error",
    },
  });
});

export default app;
