process.env.NODE_ENV = "test";

const { get } = require("superagent");
const request = require("supertest");

const { 
    schemaObj, 
    bogusRequest 
  } = require('./testingData');

const app = require("../app");

describe("POST /confirmation", () => {
  test("creating a confirmation email", async() => {
    const resp = await request(app).post("/api/mc/confirmation").send(schemaObj);
    expect(resp.statusCode).toBe(201);
    expect(resp.body.email).toBeTruthy();
  });

  test("Schema error handling", async () => {
    const resp = await request(app).post("/api/mc/confirmation").send(bogusRequest);
    expect(resp.statusCode).toBe(400);
  });

  test("empty POST request", async () => {
    const resp = await request(app).post("/api/mc/confirmation").send(bogusRequest);
    expect(resp.statusCode).toBe(400);
  })
});
