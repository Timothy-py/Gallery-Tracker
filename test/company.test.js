const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const { before, beforeEach } = require("mocha");
const Company = require("../src/models/companyModel");
const { expect } = require("chai");
const Auth = require("../src/models/authModel");


describe("Company registration API Tests", () => {
  before(async () => {
    // Establish a connection to the test database
  });

  after(async () => {
    // Clear the Company and Auth collection before each test
    await Company.deleteMany({});
    await Auth.deleteMany({});
  });

  beforeEach(async () => {
  });

  // *********************************************************************************
  it("should register a new company successfully", async () => {
    const companyData = {
      email: "testcompany@mail.com",
      name: "testcompany",
      password: "Test@442pass",
    };

    const response = await request(app)
      .post("/api/v1/companies/register")
      .set("Accept", "application/json")
      .send(companyData);

    expect(response.status).to.equal(201);
  });

  // *********************************************************************************
  it("should return an error if the company already exists", async () => {
    const companyData = {
        email: "testcompany@mail.com",
        name: "testcompany",
        password: "Test@442pass",
      };

    const response = await request(app)
      .post("/api/v1/companies/register")
      .set("Accept", "application/json")
      .send(companyData);

    expect(response.status).to.equal(409);
  });

  // *********************************************************************************
  it("should return a validation error for invalid input", async () => {
    const invalidCompanyData = {
        email: "testcompany@mail.com",
        // missing company name
        password: "Test@442pass",
      };

    const response = await request(app)
      .post("/api/v1/auth/signup")
      .set("Accept", "application/json")
      .send(invalidCompanyData);

    expect(response.status).to.equal(400);
    expect(response.body).to.be.an("array");
  });

  // *********************************************************************************
  it("should sign in the company successfully", async () => {
    const companyData = {
      email: "testcompany@mail.com",
      password: "Test@442pass",
    };

    const response = await request(app)
      .post("/api/v1/companies/signin")
      .set("Accept", "application/json")
      .send(companyData);

    expect(response.status).to.equal(200);
    expect(response.body.status).to.equal("success");
  });
});
