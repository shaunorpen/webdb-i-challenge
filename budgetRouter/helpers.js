const db = require("../data/dbConfig");

function get(options) {
  const {
    limit: limit = 10,
    sortby: sortby = "id",
    sortdir: sortdir = "asc"
  } = options;
  return db("accounts")
    .orderBy(sortby, sortdir)
    .limit(limit);
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
