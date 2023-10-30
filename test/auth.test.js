const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const { before, beforeEach } = require("mocha");
const User = require("../src/models/userModel");
const { expect } = require("chai");
const Auth = require("../src/models/authModel");

describe("User Signup API Tests", () => {
  before(async () => {
    // Establish a connection to the test database
  });

  after(async () => {
    // Clear the User and Auth collection before each test
    await User.deleteMany({});
    await Auth.deleteMany({});
    // Disconnect from the test database
    // await mongoose.disconnect();
  });

  beforeEach(async () => {
  });

  // *********************************************************************************
  it("should register a new user successfully", async () => {
    const userData = {
      email: "testuser@mail.com",
      username: "testuser",
      password: "Test@442pass",
    };

    const response = await request(app)
      .post("/api/v1/auth/signup")
      .set("Accept", "application/json")
      .send(userData);

    expect(response.status).to.equal(201);
  });

  // *********************************************************************************
  it("should return an error if the user already exists", async () => {
    const userData = {
        email: "testuser@mail.com",
        username: "testuser",
        password: "Test@442pass",
      };

    const response = await request(app)
      .post("/api/v1/auth/signup")
      .set("Accept", "application/json")
      .send(userData);

    expect(response.status).to.equal(409);
  });

  // *********************************************************************************
  it("should return a validation error for invalid input", async () => {
    const invalidUserData = {
      // Missing required password field
      username: "testuser",
      email: "testuser@mail.com"
    };

    const response = await request(app)
      .post("/api/v1/auth/signup")
      .set("Accept", "application/json")
      .send(invalidUserData);

    expect(response.status).to.equal(400);
    expect(response.body).to.be.an("array");
  });
});
