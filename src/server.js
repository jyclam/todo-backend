import app from "./app";
import { connect } from "./utils/db";

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connect("mongodb://localhost:27017/todo-api");
  } catch (e) {
    console.error("Error connecting to DB: ", e);
  }

  app.listen(PORT, () => {
    console.log("API listening on: ", PORT);
  });
};

start();
