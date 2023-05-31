import { Router } from "express";
import cards from "../model/Cards";
import { StatusCodes } from "http-status-codes";
import { MersenneTwister19937, shuffle } from "random-js";
import { Hash } from "crypto";
import stringToSeedArray from "../utils/stringToSeedArray";

const deckRouter = Router();
deckRouter.get("/", (req, res) => {
  const time = Date.now();
  const rawSeed = req.query.seed;
  const seed = rawSeed ? rawSeed.toString() : time.toLocaleString();
  const engine = MersenneTwister19937.seedWithArray(stringToSeedArray(seed));
  const deck = [...cards];
  shuffle(engine, deck);
  const rawNum = req.query.num;
  if (!rawNum) {
    res.json({ time, seed, deck });
    return;
  }
  const numStr = rawNum.toString();
  const num = parseInt(numStr);
  if (isNaN(num)) {
    res.sendStatus(StatusCodes.BAD_REQUEST);
    return;
  }
  const draw = deck.slice(0, num);
  res.json({ time, seed, deck: draw });
});
export default deckRouter;
