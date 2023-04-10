const express = require("express");
const app = express(),
  bodyParser = require("body-parser");
app.use(bodyParser.json());
app.post("/api/todo", async (req, res) => {
  console.log(req.body);
});
app.listen(8000, () => {
  console.log("server is running at port 8000");
});
