import { z } from "zod";

export const DrawSchema = z.object({
  num: z.coerce
    .number({
      invalid_type_error: "num must be a number",
      required_error: "num is required",
      description:
        "the number of cards to draw, if not included draws the whole deck",
    })
    .int("num must be a whole number")
    .positive("num must be positive")
    .max(78, "num cannot be larger than the number of cards in the deck")
    .optional(),
  seed: z
    .string({
      invalid_type_error: "seed must be a string",
      required_error: "seed is required",
      description:
        "the seed to use when generating a shuffled deck, if no provided then will use a seed based on the time of the request",
    })
    .min(1, "seed cannot be empty")
    .optional(),
});

type Draw = z.infer<typeof DrawSchema>;
export default Draw;
