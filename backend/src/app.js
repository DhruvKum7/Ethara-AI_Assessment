const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

app.use(cors());
app.use(express.json({ type: "*/*" }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("EtharaFlow API is running successfully");
});

app.post("/test", (req, res) => {
  console.log("TEST BODY:", req.body);
  res.json({ body: req.body });
});

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use(errorMiddleware);

module.exports = app;