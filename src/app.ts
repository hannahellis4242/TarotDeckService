import express, { json } from "express";
import cardRouter from "./routes/card";
import deckRouter from "./routes/deckRouter";
import morgan from "morgan";

const app = express();
app.use(json());
app.use(morgan("combined"));

app.use("/card", cardRouter);
app.use("/deck", deckRouter);

export default app;
