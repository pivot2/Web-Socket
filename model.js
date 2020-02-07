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

function sendMessage(username,message) {
  let sql = `
  INSERT INTO messages(username, message)
  VALUES ($1, $2)
  `;
  db.query(sql, [username,message] ,function(err,res){
    if (err) throw err;
  });
}

module.exports = {
  findHistory,
  sendMessage
};
