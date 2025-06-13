const db = require('../db');

function criarUsuario(nome, email, senha, callback) {
  const sql = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
  db.run(sql, [nome, email, senha], function(err) {
    if (err) return callback(err);
    callback(null, { id: this.lastID, nome, email });
  });
}

function buscarPorEmail(email, callback) {
  const sql = 'SELECT * FROM usuarios WHERE email = ?';
  db.get(sql, [email], (err, row) => {
    if (err) return callback(err);
    callback(null, row);
  });
}

module.exports = {
  criarUsuario,
  buscarPorEmail
};
