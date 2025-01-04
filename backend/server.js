const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bookingRoutes = require("./routes/bookingRoutes");
const app = express();
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Failed to connect to MongoDB', err));

app.use("/api/bookings", bookingRoutes);

app.get("/", (req, res) => {
    res.send("API is configuring.")
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
