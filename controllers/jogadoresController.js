const db = require('../db');

const arrJogadores = [
  {
    id: 100,
    nome: 'Vinicius Júnior',
    posicao: 'Atacante',
    idade: 24,
    time_id: 1
  },
  {
    id: 101,
    nome: 'Martin Braithwaite',
    posicao: 'Atacante',
    idade: 33,
    time_id: 2
  }
];


function getAllJogadores(req, res) {
  const sql = 'SELECT * FROM jogadores';
  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    const todosJogadores = rows.concat(arrJogadores);
    res.json(todosJogadores);
  });
}


function getJogadorById(req, res) {
  const id = parseInt(req.params.id);
  const sql = 'SELECT * FROM jogadores WHERE id = ?';

  db.get(sql, [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (row) return res.json(row);

    const jogadorManual = arrJogadores.find(j => j.id === id);
    if (!jogadorManual) return res.status(404).json({ error: 'Jogador não encontrado' });
    res.json(jogadorManual);
  });
}


function createJogador(req, res) {
  const { nome, idade, posicao, time_id } = req.body;
  const sql = 'INSERT INTO jogadores (nome, idade, posicao, time_id) VALUES (?, ?, ?, ?)';

  db.run(sql, [nome, idade, posicao, time_id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, nome, idade, posicao, time_id });
  });
}


function updateJogador(req, res) {
  const id = parseInt(req.params.id);
  const { nome, idade, posicao, time_id } = req.body;
  const sql = 'UPDATE jogadores SET nome = ?, idade = ?, posicao = ?, time_id = ? WHERE id = ?';

  db.run(sql, [nome, idade, posicao, time_id, id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Jogador não encontrado para atualizar' });
    res.json({ id, nome, idade, posicao, time_id });
  });
}


function deleteJogador(req, res) {
  const id = parseInt(req.params.id);
  const sql = 'DELETE FROM jogadores WHERE id = ?';

  db.run(sql, [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Jogador não encontrado para deletar' });
    res.status(204).send();
  });
}

module.exports = {
  getAllJogadores,
  getJogadorById,
  createJogador,
  updateJogador,
  deleteJogador,
};