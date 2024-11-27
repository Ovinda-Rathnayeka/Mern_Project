const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const userRoutes = require("./Routes/UserRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // Allow your frontend's origin
    credentials: true, // Allow credentials (cookies)
  })
);

// Configure session
app.use(
  session({
    secret: "your-secret-key", // Replace with a strong secret
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://sahan:sahan@cluster.y1ymy.mongodb.net/Application", // MongoDB connection
      ttl: 3600, // Session expiration time in seconds
    }),
    cookie: {
      maxAge: 3600000, // 1 hour
      secure: false, // Set to true if using HTTPS
      httpOnly: true, // Prevents client-side script access
    },
  })
);

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://sahan:sahan@cluster.y1ymy.mongodb.net/Application", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .then(() => {
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((err) => console.log(err));

// Use routes
app.use("/user", userRoutes);
