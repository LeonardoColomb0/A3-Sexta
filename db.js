const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./banco.sqlite', (err) => {
  if (err) {
    console.error('Erro ao conectar no banco de dados:', err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite!');
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS campeonatos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      temporada TEXT NOT NULL,
      tipo TEXT,
      regiao TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS times (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      cores TEXT,
      estadio TEXT,
      cidade TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS jogadores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      posicao TEXT,
      idade INTEGER,
      time_id INTEGER,
      FOREIGN KEY (time_id) REFERENCES times(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS partidas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      horario TEXT,
      placar TEXT,
      estadio TEXT,
      tipo TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      senha TEXT NOT NULL
    )
  `);
});

module.exports = db;
