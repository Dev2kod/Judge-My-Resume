const express = require("express")
const authRouter = require("./routes/authRoutes")

const app = express()
app.use(express.json())
 
app.use("/api/auth",require(authRouter))




module.exports = app;