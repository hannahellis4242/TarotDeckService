import request from "supertest";
import app from "../src/app";

describe("api", () => {
  describe("card", () => {
    test("can get card information", async () => {
      const response = await request(app).get("/card/0");
      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({ id: 0, pip: "0 The Fool" });
    });
    describe("400 responses", () => {
      [
        [
          "must have a number",
          "/card",
          "please provide a card index using url /card/{index}",
        ],
        ["must be a number", "/card/hello", "card id must be a number"],
        [
          "must be positive number",
          "/card/-1",
          "the card id must be positive or zero",
        ],
        [
          "must be less than 78",
          "/card/78",
          "the card id must be less than 78",
        ],
        [
          "must be a whole number",
          "/card/51.5",
          "the card id must be a whole number",
        ],
      ].forEach(([description, url, expected]) =>
        test(description, async () => {
          const response = await request(app).get(url);
          expect(response.statusCode).toBe(400);
          expect(response.type).toBe("text/plain");
          expect(response.text).toBe(expected);
        })
      );
    });
  });
});
