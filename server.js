const express = require("express");

const db = require("./data/dbConfig.js");

const server = express();

server.use(express.json());

server.get("*", (req, res) => {
  res.json("API up and running!");
});

module.exports = server;
