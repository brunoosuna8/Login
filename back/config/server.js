const express = require("express");
const cors = require("cors");
const middleware = require("../middleware");
const app = express();

const port = 5000;
app.use(cors());

app.use(middleware.decodeToken);

app.get("/api/todos", (req, res) => {
  return res.json({
    todos: [{ tittle: "task1" }, { tittle: "task2" }, { tittle: "task3" }],
  });
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
