const express = require("express");
const accounts = require("./helpers");
const router = express.Router();

const handleError = error => (_req, res) => {
  res.status(500).json("Something went wrong: " + error.message);
};

router.get("/", (_req, res) => {
  accounts
    .get()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(handleError);
});

router.get("/:id", validateAccountId, (req, res) => {
  accounts
    .getById(req.params.id)
    .then(data => {
      res.status(200).json(data[0]);
    })
    .catch(handleError);
});

router.post("/", validateNewAccount, (req, res) => {
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

router.put("/:id", validateAccountId, validateUpdatedAccount, (req, res) => {
  accounts
    .updateAccount(req.params.id, req.body)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(handleError);
});

router.delete("/:id", validateAccountId, (req, res) => {
  accounts
    .deleteAccount(req.params.id)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(handleError);
});

function validateAccountId(req, res, next) {
  accounts
    .getById(req.params.id)
    .then(data => {
      if (data.length) {
        next();
      } else {
        res.status(404).json("There is no account with that ID");
      }
    })
    .catch(handleError);
}

function validateNewAccount(req, res, next) {
  if (!req.body.name || !req.body.budget) {
    res
      .status(400)
      .json("Please provide a name and a budget for the new account");
  } else {
    next();
  }
}

function validateUpdatedAccount(req, res, next) {
  if (!req.body.name && !req.body.budget) {
    res.status(400).json("Please update either the account name or budget");
  } else {
    next();
  }
}

module.exports = router;
