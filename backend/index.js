require("dotenv").config();
const express = require("express");
const finnhub = require("finnhub");
const fs = require("fs");
const cors = require("cors");

const api_key = process.env.API_KEY;
const finnhubClient = new finnhub.DefaultApi(api_key);

const app = express();
app.use(cors());

const aboutData = fs.readFileSync(`${__dirname}/about-data/data.json`, "utf-8");

let newsData = [];
finnhubClient.marketNews("general", {}, (error, data, response) => {
  if (error) {
    console.error("Finnhub API error:", error);
  } else {
    newsData = data;
  }
});

app.get("/posts", async (_, res) => {
  return res.status(200).json({
    message: "Success",
    data: newsData,
  });
});

app.get("/about", async (_, res) => {
  return res.status(200).json({
    message: "Success",
    data: JSON.parse(aboutData),
  });
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
