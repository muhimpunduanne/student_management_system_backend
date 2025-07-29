require('dotenv').config();
const express = require('express');
const cors = require('cors');
const studentRoutes = require("./routes/studentRoutes");
const userRoutes = require('./routes/userRoutes');

const app = express();

const allowedOrigins = ['http://localhost:5173', 'https://sms-sable-one.vercel.app/'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/students", studentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
