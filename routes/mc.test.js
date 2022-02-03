process.env.NODE_ENV = "test";

const { get } = require("superagent");
const request = require("supertest");

const { 
    schemaObj, 
    expectedResponseObject 
  } = require('./testingData');

const app = require("../app");

describe("POST /confirmation", () => {
  test("Sending a confirmation email", async() => {
    debugger;
    const resp = await request(app).post("/api/mc/confirmation").send(schemaObj);
    expect(resp.statusCode).toBe(201);
    expect(resp.body).toEqual({email: expectedResponseObject});
  });
  test("Schema error handling", async () => {
    const resp = await request(app).post("/api/mc/confirmation").send();
    expect(resp.statusCode).toBe(400);
  });
});
