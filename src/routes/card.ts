import { Router } from "express";
import cards from "../model/Cards";
import { StatusCodes } from "http-status-codes";

const cardRouter = Router();
cardRouter.get("/:cardId", (req, res) => {
  const index = parseInt(req.params.cardId);
  if (isNaN(index)) {
    res.sendStatus(StatusCodes.BAD_REQUEST);
    return;
  }
  const card = cards.at(index);
  if (!card) {
    res.sendStatus(StatusCodes.BAD_REQUEST);
    return;
  }
  res.json(card);
});
export default cardRouter;
