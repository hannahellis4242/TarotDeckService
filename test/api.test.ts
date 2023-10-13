import request from "supertest";
import app from "../src/app";

describe("api", () => {
  describe("card", () => {
    test("can get card information", async () => {
      const response = await request(app).get("/card/0");
      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({ id: 0, pip: "0 The Fool" });
    });
    test("must have a number", async () => {
      const response = await request(app).get("/card");
      expect(response.statusCode).toBe(404);
    });
    test("must be a number", async () => {
      const response = await request(app).get("/card/hello");
      expect(response.statusCode).toBe(400);
      expect(response.body).toBe("");
    });
  });
});
