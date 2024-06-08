const express = require("express");
const app = express();
const PORT = 4000;
const user = require("./Users/user")
const cors = require("cors")


app.use(express.json())
app.use(cors())
app.use("/vote", user)

app.listen(PORT, () => {
    console.log(`your server is running on the port number ${PORT}`)
})