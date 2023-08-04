const db = require("../config/postgres");

const checkEmail = (email) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT email FROM users WHERE email = $1";
    db.query(sql, [email], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};

const storeUser = (body) => {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO users (email,password,role) VALUES ($1,$2,'user')";
    db.query(sql, [body.email, body.pass], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};

const checkForLogin = (email) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT email,password,role FROM users where email = $1";
    db.query(sql, [email], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};

module.exports = { checkEmail, storeUser, checkForLogin };
