const db = require('../db');

const arrTimes = [
  {
    id: 100,
    nome: 'Grêmio',
    cores: 'Azul, preto e branco',
    estadio: 'Arena do Grêmio',
    cidade: 'Porto Alegre',
  },
  {
    id: 101,
    nome: 'Real Madrid',
    cores: 'Dourado, azul e branco',
    estadio: 'Santiago Bernabéu',
    cidade: 'Madrid',
  }
];


function getAllTimes(req, res) {
  const sql = 'SELECT * FROM times';
  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    const todosTimes = rows.concat(arrTimes);
    res.json(todosTimes);
  });
}


function getTimeById(req, res) {
  const id = parseInt(req.params.id);
  const sql = 'SELECT * FROM times WHERE id = ?';

  db.get(sql, [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (row) return res.json(row);

    const timeManual = arrTimes.find(t => t.id === id);
    if (!timeManual) return res.status(404).json({ error: 'Time não encontrado' });
    res.json(timeManual);
  });
}


function createTime(req, res) {
  const { nome, cores, estadio, cidade } = req.body;
  const sql = 'INSERT INTO times (nome, cores, estadio, cidade) VALUES (?, ?, ?, ?)';

  db.run(sql, [nome, cores, estadio, cidade], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, nome, cores, estadio, cidade });
  });
}


function updateTime(req, res) {
  const id = parseInt(req.params.id);
  const { nome, cores, estadio, cidade } = req.body;
  const sql = 'UPDATE times SET nome = ?, cores = ?, estadio = ?, cidade = ? WHERE id = ?';

  db.run(sql, [nome, cores, estadio, cidade, id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Time não encontrado para atualizar' });
    res.json({ id, nome, cores, estadio, cidade });
  });
}


function deleteTime(req, res) {
  const id = parseInt(req.params.id);
  const sql = 'DELETE FROM times WHERE id = ?';

  db.run(sql, [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Time não encontrado para deletar' });
    res.status(204).send();
  });
}

module.exports = {
  getAllTimes,
  getTimeById,
  createTime,
  updateTime,
  deleteTime,
};