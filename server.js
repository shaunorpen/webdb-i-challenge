const express = require("express");
const budgetRouter = require("./budgetRouter");

const server = express();

server.use(express.json());
server.use("/api/accounts", budgetRouter);

server.get("*", (req, res) => {
  res.json("API up and running!");
});

module.exports = server;
