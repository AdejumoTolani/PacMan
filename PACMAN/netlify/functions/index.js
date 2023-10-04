const express = require("express");
const { Router } = require ('express')
const serverless = require('serverless-http')
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const LeaderBoard = require("./Models/Leaderboard");
const app = express();
const router = Router();

dotenv.config();


const origins = ["http://127.0.0.1:5501"];
app.use(
  cors({
    origin: origins,
  })
);


const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected!");
  } catch (err) {
    console.log(err);
  }
};
connect();
app.use(express.json());
app.use('/api/', router)
const port = process.env.PORT || 5500;

// Add your routes and middleware here

router.post("/addScore", async (req, res) => {
  try {
    if (!req.body) {
      return res
        .status(400)
        .json({ error: "something went wrong but im not sure what" });
    }

    const newEntry = await LeaderBoard.create(req.body);
    res.status(201).json({ entry: newEntry });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

router.get("/leaderboard", async (req, res) => {
  try {
    const board = await LeaderBoard.find().sort({ score: -1 }).limit(10);
    // const { name, score, ...details} = board
    res.status(200).json(board);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// export const handler = serverless(app)
module.exports.handler = serverless(app);
