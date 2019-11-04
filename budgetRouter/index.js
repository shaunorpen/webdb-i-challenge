const express = require("express");
const accounts = require("./helpers");
const router = express.Router();

const handleError = error => () => {
  res.status(500).json("Something went wrong: " + error.message);
};

router.get("/", (req, res) => {
  accounts
    .get()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(handleError);
});

router.get("/:id", (req, res) => {
  accounts
    .getById(req.params.id)
    .then(data => {
      res.status(200).json(data[0]);
    })
    .catch(handleError);
});

router.post("/", (req, res) => {
  accounts
    .createAccount({
      name: req.body.name,
      budget: req.body.budget
    })
    .then(data => {
      res.status(201).json(data[0]);
    })
    .catch(handleError);
});

router.put("/:id", (req, res) => {
  accounts
    .updateAccount(req.params.id, req.body)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(handleError);
});

router.delete("/:id", (req, res) => {
  accounts
    .deleteAccount(req.params.id)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(handleError);
});

module.exports = router;
