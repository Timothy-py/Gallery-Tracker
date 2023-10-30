const request = require("supertest");
const path = require("path");
const mongoose = require("mongoose");

const { expect } = require("chai");
const app = require("../app");
const Company = require("../src/models/companyModel");
const Auth = require("../src/models/authModel");
const Image = require("../src/models/imageModel");

describe("Image Upload API", () => {
  const imageFilePath = path.join(__dirname, "u_say.jpeg");
  let companyToken;
  let companyID;
  after(async () => {
    // Clear the Company and Auth collection before each test
    await Company.deleteMany({});
    await Auth.deleteMany({});
    await Image.deleteMany({});
    // Disconnect from the test database
    await mongoose.disconnect();
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

    // save data
    companyToken = response.body.data.token;
    companyID = response.body.data.model._id;
  });

  // *********************************************************************************
  it("should successfully upload an image", async () => {
    const response = await request(app)
      .post("/api/v1/images/upload")
      .set("authorization", `Bearer ${companyToken}`)
      .field("title", "Test Image")
      .field("description", "This is a test image")
      .attach("image", imageFilePath);

    expect(response.status).to.equal(201);
    expect(response.body.status).to.equal("success");
    expect(response.body.data.imageUrl).to.be.a("string");
  });

  // *********************************************************************************
  describe("Get Images API", () => {
    it("should retrieve images for a valid company", async () => {
      const response = await request(app).get(`/api/v1/images/${companyID}`);

      expect(response.status).to.equal(200);
      expect(response.body.status).to.equal("success");
      expect(response.body.data).to.be.an("array");
    });

    // *********************************************************************************
    it("should handle invalid company ID", async () => {
      // An invalid or non-existent company ID
      const invalidCompanyID = "653ae983099632ff90000000";

      const response = await request(app).get(
        `/api/v1/images/${invalidCompanyID}`
      );

      expect(response.status).to.equal(404);
      expect(response.body.status).to.equal("fail");
      expect(response.body.data.message).to.equal("Company not found");
    });
  });
});
