//modules
const express = require("express");
const setUp = require("./setUp.js");
//const test = require("./test.js");

// const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost/shopping_app_db")


const userRouter = require("./controller/user-controller.js")
const cartRouter = require("./controller/cart-controller.js")

//server initialization
const app = express();

//port
const PORT = 8000;
//port settings
app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log(`Example app listening at http://localhost:${PORT}`);
});

//
app.use(express.json());

//default route
app.get("/", (req, res) => {
    res.send("- Shopping app -")
})

//routes, must be defined before other routes
app.use("/user", userRouter);
app.use("/cart", cartRouter);


//all other routes
app.get("/*", (req, res) => {
    res.send("Unknown path!");
});


