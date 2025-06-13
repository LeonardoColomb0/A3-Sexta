const db = require('../db');

const arrPartidas = [
  {
    id: 100,
    placar: 'Grêmio x Real Madrid',
    horario: '17:00',
    estadio: 'Arena do Grêmio',
    tipo: 'Final do Mundial',
  },
  {
    id: 101,
    placar: 'Barcelona x Real Madrid',
    horario: '21:00',
    estadio: 'Camp Nou',
    tipo: '20º Rodada da LaLiga',
  }
];


function getAllPartidas(req, res) {
  const sql = 'SELECT * FROM partidas';
  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    const todasPartidas = rows.concat(arrPartidas);
    res.json(todasPartidas);
  });
}


function getPartidaById(req, res) {
  const id = parseInt(req.params.id);
  const sql = 'SELECT * FROM partidas WHERE id = ?';

  db.get(sql, [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (row) return res.json(row);

    const partidaManual = arrPartidas.find(p => p.id === id);
    if (!partidaManual) return res.status(404).json({ error: 'Partida não encontrada' });
    res.json(partidaManual);
  });
}


function createPartida(req, res) {
  const { horario, placar, estadio, tipo } = req.body;
  const sql = 'INSERT INTO partidas (horario, placar, estadio, tipo) VALUES (?, ?, ?, ?)';

  db.run(sql, [horario, placar, estadio, tipo], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, horario, placar, estadio, tipo });
  });
}


function updatePartida(req, res) {
  const id = parseInt(req.params.id);
  const { horario, placar, estadio, tipo } = req.body;
  const sql = 'UPDATE partidas SET horario = ?, placar = ?, estadio = ?, tipo = ? WHERE id = ?';

  db.run(sql, [horario, placar, estadio, tipo, id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Partida não encontrada para atualizar' });
    res.json({ id, horario, placar, estadio, tipo });
  });
}


function deletePartida(req, res) {
  const id = parseInt(req.params.id);
  const sql = 'DELETE FROM partidas WHERE id = ?';

  db.run(sql, [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Partida não encontrada para deletar' });
    res.status(204).send();
  });
}

module.exports = {
  getAllPartidas,
  getPartidaById,
  createPartida,
  updatePartida,
  deletePartida,
};