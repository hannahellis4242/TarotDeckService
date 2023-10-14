import { Router } from "express";
import cards from "../model/Cards";
import { StatusCodes } from "http-status-codes";
import { CardIdSchema } from "../model/CardId";

const cardRouter = Router();
cardRouter.get("/:cardId", (req, res) => {
  const result = CardIdSchema.safeParse(req.params.cardId);
  if (!result.success) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send(result.error.issues.map((issue) => `${issue}`).join("\n"));
    return;
  }
  const card = cards.at(result.data);
  if (!card) {
    res.sendStatus(StatusCodes.BAD_REQUEST);
    return;
  }
  res.json(card);
});
export default cardRouter;
