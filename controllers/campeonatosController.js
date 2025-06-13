const db = require('../db');

const arrCampeonatos = [
  {
    id: 100, 
    nome: 'brasileirão',
    temporada: '2025',
    tipo: 'Pontos Corridos',
    regiao: 'Brasil',
  },
  {
    id: 101,
    nome: 'Libertadores da América',
    temporada: '2025',
    tipo: 'Fase de Grupos/Mata Mata',
    regiao: 'internacional',
  }
];


function getAllCampeonatos(req, res) {
  const sql = 'SELECT * FROM campeonatos';
  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    const todosCampeonatos = rows.concat(arrCampeonatos);
    res.json(todosCampeonatos);
  });
}


function getCampeonatoById(req, res) {
  const id = parseInt(req.params.id);
  const sql = 'SELECT * FROM campeonatos WHERE id = ?';

  db.get(sql, [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (row) return res.json(row);

    
    const campeonatoManual = arrCampeonatos.find(c => c.id === id);
    if (!campeonatoManual) return res.status(404).json({ error: 'Campeonato não encontrado' });
    res.json(campeonatoManual);
  });
}


function createCampeonato(req, res) {
  const { nome, temporada, tipo, regiao } = req.body;
  const sql = 'INSERT INTO campeonatos (nome, temporada, tipo, regiao) VALUES (?, ?, ?, ?)';

  db.run(sql, [nome, temporada, tipo, regiao], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, nome, temporada, tipo, regiao });
  });
}


function updateCampeonato(req, res) {
  const id = parseInt(req.params.id);
  const { nome, temporada, tipo, regiao } = req.body;
  const sql = 'UPDATE campeonatos SET nome = ?, temporada = ?, tipo = ?, regiao = ? WHERE id = ?';

  db.run(sql, [nome, temporada, tipo, regiao, id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Campeonato não encontrado para atualizar' });
    res.json({ id, nome, temporada, tipo, regiao });
  });
}


function deleteCampeonato(req, res) {
  const id = parseInt(req.params.id);
  const sql = 'DELETE FROM campeonatos WHERE id = ?';

  db.run(sql, [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Campeonato não encontrado para deletar' });
    res.status(204).send();
  });
}

module.exports = {
  getAllCampeonatos,
  getCampeonatoById,
  createCampeonato,
  updateCampeonato,
  deleteCampeonato,
};