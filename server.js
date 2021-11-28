/////////////////////////////////////////
// DEPENDENCIES
/////////////////////////////////////////

// get .env variables
require("dotenv").config()
// pull PORT from .env and give default value of 3000
// also, pull MONGODB_URL from .env
const { PORT = 3000, MONGODB_URL } = process.env
// import express
const express = require("express")
// create application object
const app = express()
// import mongoose 
const mongoose = require("mongoose")
// import middleware
const cors = require("cors")
const morgan = require("morgan")



/////////////////////////////////////////
// DATABASE CONNECTION
/////////////////////////////////////////

// establish the connection
mongoose.connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
// connection events
mongoose.connection
    .on("open", () => console.log("Your are connected to mongoose"))
    .on("close", () => console.log("Your are disconnected from mongoose"))
    .on("error", (error) => console.log(error))



/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

const CheeseSchema = new mongoose.Schema({
    name: String,
    image: String,
    title: String,
})

const Cheese = mongoose.model("Cheese", CheeseSchema)



/////////////////////////////////////////
// MIDDLEWARE
/////////////////////////////////////////

app.use(cors()) // to prevent cors errors, open access to all origins
app.use(morgan("dev")) // logging
app.use(express.json()) // parse json bodies



/////////////////////////////////////////
// ROUTES
/////////////////////////////////////////

// create a test route
app.get("/", (req, res) => {
    res.send("hello world")
})

// CHEESE INDEX route
app.get("/cheese", async (req, res) => {
    try {
        // send all cheese
        res.json(await Cheese.find({}))
    } catch (error) {
        // send error
        res.status(400).json(error)
    }
})

// CHEESE CREATE route
app.post("/cheese", async (req, res) => {
    try {
        // send all cheese
        res.json(await Cheese.find.create(req.body))
    } catch (error) {
        // send error
        res.status(400).json(error)
    }
})

// 
app.put("/cheese/:id", async (req, res) => {
    try {
      // send all cheese
      res.json(
        await Cheese.findByIdAndUpdate(req.params.id, req.body, { new: true })
      );
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });
  
  // 
  app.delete("/cheese/:id", async (req, res) => {
    try {
      // send all cheese
      res.json(await Cheese.findByIdAndRemove(req.params.id));
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });

/////////////////////////////////////////
// LISTENER
/////////////////////////////////////////

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`))