const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("./config/database");

const cors = require('cors');


dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/account", require("./routes/accountRoutes"));
app.use("/api/transactions", require("./routes/transactionRoutes"));

app.use("/api/manageusers", require("./routes/userRoutes"));

app.listen(5000, () => console.log("Server running on port 5000"));
