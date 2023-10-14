import { Router } from "express";
import cards from "../model/Cards";
import { StatusCodes } from "http-status-codes";
import { MersenneTwister19937, bool, shuffle } from "random-js";
import stringToSeedArray from "../utils/stringToSeedArray";
import Card from "../model/Card";
import { DrawSchema } from "../model/Draw";

const deckRouter = Router();
deckRouter.get("/", (req, res) => {
  const result = DrawSchema.safeParse(req.query);
  if (!result.success) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send(result.error.issues.map((issue) => `${issue}`).join("\n"));
    return;
  }
  const { seed, num } = result.data;
  const time = Date.now();
  const engine = MersenneTwister19937.seedWithArray(
    stringToSeedArray(seed || time.toLocaleString())
  );
  const reversal = bool();
  const deck = cards.map(
    ({ id, pip, suit }) => new Card(id, pip, suit, reversal(engine))
  );
  shuffle(engine, deck);
  if (!num) {
    res.json({ time, seed, deck });
    return;
  }
  const draw = deck.slice(0, num);
  res.json({ time, seed, deck: draw });
});
export default deckRouter;
