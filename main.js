import "dotenv/config";
import express from "express";
import { log } from "./middlewares/logger.js";
import usersRouter from "./routes/users.js";

const app = express();

app.use(express.json());

app.use(log);

app.use("/users", usersRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.listen(3000, () => {
  console.log("Running on port 3000");
});
