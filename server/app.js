const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const connectDB = require("./Config/db");
const userRoutes = require("./Routes/userRoutes");
const boardRoutes = require("./Routes/boardRoutes");
const taskRoutes = require("./Routes/taskRoutes");
const tasklistRoutes = require("./Routes/tasklistRoutes");

// .env configuration
dotenv.config();

// Database connection
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
const origins = "http://localhost:5173"; //'https://trackly-codenik07.netlify.app'
app.use(
  cors({
    origin: origins,
    credentials: true,
  })
);

// routes
app.use("/api/users", userRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/tasklists", tasklistRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.info("Server running on port: ", PORT);
});


