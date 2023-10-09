const express = require("express");
const cors = require("cors");
const app = express();
const corsOptions = {
  origin: "http://localhost:8080",
};

app.use(cors(corsOptions));

app.listen(8081, () => console.log("Server running!"));
