const express = require("express");
const cors = require("cors");
const { v4 } = require("uuid");
const bodyParser = require("body-parser");

const PORT = 3000;

const app = express();
const jsonParser = bodyParser.json();
app.use(cors());

const data = [
  {
    id: v4(),
    isDone: false,
    isEdit: false,
    text: "First step",
  },
  {
    id: v4(),
    isDone: true,
    isEdit: false,
    text: "Second step",
  },
  {
    id: v4(),
    isDone: false,
    isEdit: false,
    text: "Third step",
  },
];

app.listen(PORT, () => {
  console.log(`Server starting on port ${PORT}`);
});

app.get("/todos", (req, res) => {
  res.json(data);
});

app.post("/addTodo", jsonParser, (req, res) => {
  if (req.body) {
    data.push(req.body.todo);
    res.json(data);
  }
});

app.post("/removeTodo", jsonParser, (req, res) => {
  if (req.body) {
    const dataItem = data.findIndex((item) => item.id === req.body.id);
    data.splice(dataItem, 1);
    res.json(data);
  }
});

app.post("/editTodo", jsonParser, (req, res) => {
  if (req.body) {
    const dataItem = data.findIndex((item) => item.id === req.body.id);
    if (req.body.text) data[dataItem].text = req.body.text;
    data[dataItem].isEdit = !data[dataItem].isEdit;
    res.json(data);
  }
});

app.post("/doTodo", jsonParser, (req, res) => {
  if (req.body) {
    const dataItem = data.findIndex((item) => item.id === req.body.id);
    data[dataItem].isDone = !data[dataItem].isDone;
    res.json(data);
  }
});
