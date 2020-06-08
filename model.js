let db = require("./configs/db");
let { normaliseString } = require("./configs/type");
function findHistory() {
  let sql = `
  SELECT *
  FROM messages
  `;
  return db.query(sql).then(function({ rows }) {
    return normaliseString(rows);
  });
}
function getAllUsers() {
  let sql = `
  SELECT *
  FROM account
  `;
  return db.query(sql).then(function({rows}){
    return normaliseString(rows);
  })
}
function sendMessage(username,message,time) {
  let sql = `
  INSERT INTO messages(username, message,chat_time)
  VALUES ($1, $2, $3)
  `;
  return db.query(sql, [username,message,time] ,function(err,res){
    if (err) throw err;
  });
}

function createAccount(username,password){
  let sql='INSERT INTO account VALUES ($1, $2)';
  return db.query(sql, [username,password])
  .catch(function(err){
    throw {code:"INVALID_INFO", detail:"Tài khoản đã tồn tại"};
  });
}

function checkAccount(username,password)
{
  let sql='SELECT * FROM account WHERE username=$1';
  return db.query(sql,[username]).then(function({rows}){
    if (rows.length!=1) {
      throw {code:"INVALID_INFO", detail:"Tài khoản không tồn tại"};
    }
    let user=rows[0];
    if (user.password==password) 
      return user;
      else throw {code:"INVALID_INFO", detail:"Sai mật khẩu"};
  });
}
module.exports = {
  findHistory,
  sendMessage,
  createAccount,
  checkAccount,
  getAllUsers
};
