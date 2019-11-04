const db = require("../data/dbConfig");

function get() {
  return db("accounts");
}

function getById(id) {
  return db("accounts").where({ id: id });
}

function createAccount(account) {
  return db("accounts").insert(account);
}

function updateAccount(id, updates) {
  return db("accounts")
    .where({ id: id })
    .update(updates);
}

function deleteAccount(id) {
  return db("accounts")
    .where({ id: id })
    .del();
}

module.exports = {
  get,
  getById,
  createAccount,
  updateAccount,
  deleteAccount
};
