import { Router } from "express";
import cards from "../model/Cards";
import { StatusCodes } from "http-status-codes";
import { CardIdSchema } from "../model/CardId";

const cardRouter = Router();
cardRouter.get("/", (_, res) => {
  res
    .status(StatusCodes.BAD_REQUEST)
    .type("text/plain")
    .send("please provide a card index using url /card/{index}");
});
cardRouter.get("/:cardId", (req, res) => {
  const result = CardIdSchema.safeParse(req.params.cardId);
  if (!result.success) {
    const error = result.error.issues.map(({ message }) => message).join("\n");
    res.status(StatusCodes.BAD_REQUEST).type("text/plain").send(error);
    return;
  }
  const card = cards.at(result.data);
  if (!card) {
    res.status(StatusCodes.BAD_REQUEST).send("out of range");
    return;
  }
  res.json(card);
});
export default cardRouter;
