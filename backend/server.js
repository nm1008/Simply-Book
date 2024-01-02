const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const app = express();

//PORT
const PORT = process.env.PORT || 8000;

//MIDDLEWARE
app.use(express.json());
app.use(
  cors({
    origin: "https://capstone-mern-front.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.options("/api/users/login", (req, res) => {
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.status(200).send();
});

//connecting to mongoDB database and listening to port (whatever that is stored in the .env or default 8000 and the server cannot connect to the server it will log the error message)
mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// routes
const courseRoutes = require("./routes/course");
app.use("/api/courses", courseRoutes);

const userRoutes = require("./routes/user");
app.use("/api/users", userRoutes);
