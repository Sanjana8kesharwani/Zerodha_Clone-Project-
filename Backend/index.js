require("dotenv").config();


const express = require("express");

const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser")
const authRoute = require("./server/routes/AuthRoute");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");


const { MONGO_URL, PORT } = process.env;


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());


app.get("/", (req, res) => {
    res.send("Hello from the server");
}
);

app.use("/", authRoute);

app.get('/allHoldings', async (req, res) => {
    let allHoldings = await HoldingsModel.find({});
    res.json(allHoldings);
});

app.get('/allPositions', async (req, res) => {
    let allPositions = await PositionsModel.find({});
    res.json(allPositions);
});

app.post("/newOrder", async (req, res) => {
    let newOrder = new OrdersModel({
        name: req.body.name,
        qty: req.body.qty,
        price: req.body.price,
        mode: req.body.mode,
    });

    newOrder.save();

    res.send("Order saved!");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

    mongoose
        .connect(MONGO_URL)
        .then(() => console.log("MongoDB is  connected successfully"))
        .catch((err) => console.error(err));
});


