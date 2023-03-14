require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const ticketRoutes = require('./routes/tickets.js');
const userRoutes = require("./routes/user.js");


//create express app
const app = express();

// middleware
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})
app.use(express.json())

// routes
app.use("/api/tickets", ticketRoutes)
app.use("/api/user", userRoutes)
//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for reqs
        app.listen(process.env.PORT, () => {
        console.log("connected to db and listening on 4000")
})
    })
    .catch((error) => {
        console.log(error)
    })


