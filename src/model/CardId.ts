import { z } from "zod";

export const CardIdSchema = z.coerce
  .number({
    invalid_type_error: "card id must be a number",
    required_error: "must give a card id",
    description: "the card id for the card you want details on",
  })
  .int({ message: "the card id must be a whole number" })
  .nonnegative("the card id must be positive or zero")
  .max(77, "the card id must be less than 78");

type CardId = z.infer<typeof CardIdSchema>;
export default CardId;
