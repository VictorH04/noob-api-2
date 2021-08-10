const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.options("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Aceess-Control-Allow-Methods", "GET,PUT,POST,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, Content-Length, X-Requested-With"
  );
  res.send(200);
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});
app.use(express.static("public"));
app.use(express.static("CSS"));

const timeRoutes = require("./routes/time");
app.use("/routes/time", timeRoutes);

const nameRoutes = require("./routes/name");
app.use("/routes/name", nameRoutes);

const jsonRoutes = require("./routes/json");
app.use("/routes/json", jsonRoutes);

const echoAllRoutes = require("./routes/echo-all");
app.use("/routes/echo-all", echoAllRoutes);

// Handlers
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/form", (req, res) => {
  res.sendFile(__dirname + "/views/form.html");
});

app.get("/:word/echo", (req, res) => {
  res.json({ echo: req.params.word });
});

app.all("*", (req, res) => {
  res.status(404).send("Invalid route - 404");
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
