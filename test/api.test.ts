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
  describe("deck", () => {
    Date.now = jest.fn(() => 1);
    test("default call", async () => {
      const response = await request(app).get("/deck");
      expect(response.status).toBe(200);
      console.log(response.body);
      expect(response.body.time).toBe(1);
      expect(response.body.deck).toStrictEqual([
        { id: 18, pip: "XVIII The Moon", reversed: false },
        { id: 28, pip: "Seven", suit: "Wands", reversed: false },
        { id: 71, pip: "Eight", suit: "Pentacles", reversed: false },
        { id: 1, pip: "I The Magician", reversed: true },
        { id: 6, pip: "VI The Lovers", reversed: true },
        { id: 77, pip: "King", suit: "Pentacles", reversed: true },
        { id: 2, pip: "II The High Priestess", reversed: true },
        { id: 30, pip: "Nine", suit: "Wands", reversed: false },
        { id: 65, pip: "Two", suit: "Pentacles", reversed: false },
        { id: 11, pip: "XI Justice", reversed: true },
        { id: 55, pip: "Six", suit: "Swords", reversed: false },
        { id: 59, pip: "Ten", suit: "Swords", reversed: false },
        { id: 44, pip: "Nine", suit: "Cups", reversed: false },
        { id: 37, pip: "Two", suit: "Cups", reversed: true },
        { id: 24, pip: "Three", suit: "Wands", reversed: false },
        { id: 21, pip: "XXI The World", reversed: true },
        { id: 9, pip: "IX The Hermit", reversed: false },
        { id: 25, pip: "Four", suit: "Wands", reversed: false },
        { id: 7, pip: "VII The Chariot", reversed: false },
        { id: 0, pip: "0 The Fool", reversed: true },
        { id: 4, pip: "IV The Emperor", reversed: false },
        { id: 27, pip: "Six", suit: "Wands", reversed: true },
        { id: 46, pip: "Page", suit: "Cups", reversed: false },
        { id: 14, pip: "XIV Temperance", reversed: false },
        { id: 35, pip: "King", suit: "Wands", reversed: false },
        { id: 26, pip: "Five", suit: "Wands", reversed: true },
        { id: 43, pip: "Eight", suit: "Cups", reversed: true },
        { id: 12, pip: "XII The Hanged Man", reversed: true },
        { id: 67, pip: "Four", suit: "Pentacles", reversed: true },
        { id: 56, pip: "Seven", suit: "Swords", reversed: true },
        { id: 48, pip: "Queen", suit: "Cups", reversed: true },
        { id: 29, pip: "Eight", suit: "Wands", reversed: false },
        { id: 33, pip: "Knight", suit: "Wands", reversed: false },
        { id: 22, pip: "Ace", suit: "Wands", reversed: true },
        { id: 47, pip: "Knight", suit: "Cups", reversed: false },
        { id: 54, pip: "Five", suit: "Swords", reversed: false },
        { id: 68, pip: "Five", suit: "Pentacles", reversed: false },
        { id: 62, pip: "Queen", suit: "Swords", reversed: false },
        { id: 17, pip: "XVII The Star", reversed: false },
        { id: 72, pip: "Nine", suit: "Pentacles", reversed: true },
        { id: 50, pip: "Ace", suit: "Swords", reversed: true },
        { id: 69, pip: "Six", suit: "Pentacles", reversed: true },
        { id: 74, pip: "Page", suit: "Pentacles", reversed: true },
        { id: 8, pip: "VIII Strength", reversed: true },
        { id: 34, pip: "Queen", suit: "Wands", reversed: false },
        { id: 45, pip: "Ten", suit: "Cups", reversed: true },
        { id: 3, pip: "III The Empress", reversed: true },
        { id: 58, pip: "Nine", suit: "Swords", reversed: false },
        { id: 20, pip: "XX Judgement", reversed: true },
        { id: 38, pip: "Three", suit: "Cups", reversed: false },
        { id: 10, pip: "X The Wheel of Fortune", reversed: false },
        { id: 76, pip: "Queen", suit: "Pentacles", reversed: true },
        { id: 31, pip: "Ten", suit: "Wands", reversed: false },
        { id: 52, pip: "Three", suit: "Swords", reversed: false },
        { id: 70, pip: "Seven", suit: "Pentacles", reversed: false },
        { id: 23, pip: "Two", suit: "Wands", reversed: false },
        { id: 15, pip: "XV The Devil", reversed: false },
        { id: 13, pip: "XIII Death", reversed: true },
        { id: 53, pip: "Four", suit: "Swords", reversed: true },
        { id: 5, pip: "V The Hierophant", reversed: true },
        { id: 19, pip: "XIX The Sun", reversed: false },
        { id: 57, pip: "Eight", suit: "Swords", reversed: true },
        { id: 75, pip: "Knight", suit: "Pentacles", reversed: true },
        { id: 63, pip: "King", suit: "Swords", reversed: false },
        { id: 41, pip: "Six", suit: "Cups", reversed: false },
        { id: 32, pip: "Page", suit: "Wands", reversed: false },
        { id: 49, pip: "King", suit: "Cups", reversed: false },
        { id: 16, pip: "XVI The Tower", reversed: false },
        { id: 40, pip: "Five", suit: "Cups", reversed: false },
        { id: 64, pip: "Ace", suit: "Pentacles", reversed: true },
        { id: 42, pip: "Seven", suit: "Cups", reversed: false },
        { id: 36, pip: "Ace", suit: "Cups", reversed: true },
        { id: 66, pip: "Three", suit: "Pentacles", reversed: false },
        { id: 73, pip: "Ten", suit: "Pentacles", reversed: true },
        { id: 61, pip: "Knight", suit: "Swords", reversed: false },
        { id: 51, pip: "Two", suit: "Swords", reversed: false },
        { id: 39, pip: "Four", suit: "Cups", reversed: true },
        { id: 60, pip: "Page", suit: "Swords", reversed: false },
      ]);
    });
  });
});
