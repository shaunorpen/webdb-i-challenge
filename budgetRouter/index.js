const express = require("express");
const db = require("../data/dbConfig");

const router = express.Router();

router.get("/", (req, res) => {
  db("accounts")
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      res.status(500).json("Something went wrong: " + error.message);
    });
});

router.get("/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .then(data => {
      res.status(200).json(data[0]);
    })
    .catch(error => {
      res.status(500).json("Something went wrong: " + error.message);
    });
});

router.post("/", (req, res) => {
  db("accounts")
    .insert({ name: req.body.name, budget: req.body.budget })
    .then(data => {
      res.status(201).json(data[0]);
    })
    .catch(error => {
      res.status(500).json("Something went wrong: " + error.message);
    });
});

router.put("/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .update(req.body)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      res.status(500).json("Something went wrong: " + error.message);
    });
});

router.delete("/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .del()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      res.status(500).json("Something went wrong: " + error.message);
    });
});

module.exports = router;
