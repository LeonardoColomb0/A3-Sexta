const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const db = require('../db');

const JWT_SECRET = 'seusegredojwtseguro';

function register(req, res) {
  const { nome, email, senha } = req.body;

  bcrypt.hash(senha, 10, (err, senhaHash) => {
    if (err) return res.status(500).json({ error: 'Erro ao gerar hash da senha' });

    userModel.criarUsuario(nome, email, senhaHash, (err, usuario) => {
      if (err) return res.status(500).json({ error: 'Erro ao criar usuário' });
      res.status(201).json(usuario);
    });
  });
}

function login(req, res) {
  const { email, senha } = req.body;

  userModel.buscarPorEmail(email, (err, usuario) => {
    if (err || !usuario) return res.status(401).json({ error: 'Usuário não encontrado' });

    bcrypt.compare(senha, usuario.senha, (err, isMatch) => {
      if (!isMatch) return res.status(401).json({ error: 'Senha incorreta' });

      const token = jwt.sign({ id: usuario.id, email: usuario.email }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    });
  });
}

module.exports = {
  register,
  login
};
