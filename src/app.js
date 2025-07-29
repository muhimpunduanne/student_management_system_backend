// src/app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const studentRoutes = require("./routes/studentRoutes");

const userRoutes = require('./routes/userRoutes');
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/students", studentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
