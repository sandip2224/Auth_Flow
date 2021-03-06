const express = require("express")
const colors = require("colors")
const path = require("path")
require("dotenv").config({ path: "./.env" })

const app = express()

const connectDB = require("./src/helpers/db")

// Connect to database
connectDB()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).json({
        msg: "Server up and running!"
    })
})

// Mounting routes
app.use("/api/v1/user", require("./src/routes/user.route"))

const server = app.listen(process.env.PORT || 3000, console.log(`Server running on port ${process.env.PORT || 3000}`.green.bold))

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
    console.log(`Error: ${err.message}`.red)
    server.close(() => process.exit(1))
})