import express, { json } from "express";
import cards from "./model/Cards";
import cardRouter from "./routes/card";
import deckRouter from "./routes/deckRouter";
import morgan from "morgan";

const app = express();
app.use(json());
app.use(morgan("combined"));

app.use("/card", cardRouter);
app.use("/deck", deckRouter);

app.listen(8080, "0.0.0.0", () =>
  console.log("tarot deck server is listening")
);
