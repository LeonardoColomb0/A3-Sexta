const express = require('express');
const app = express();
const db = require('./db');
const authRoutes = require('./routes/authRoutes');
const verifyToken = require('./middleware/verifyToken');
const checkApiKey = require('./middleware/auth');

const campeonatosRouter = require('./routes/campeonatos');
const jogadoresRouter = require('./routes/jogadores');
const timesRouter = require('./routes/times');
const partidasRouter = require('./routes/partidas');

app.use(express.json());

app.use('/auth', authRoutes);

//app.use(checkApiKey);

app.use('/jogadores', jogadoresRouter);
app.use('/campeonatos', campeonatosRouter);
app.use('/times', timesRouter);
app.use('/partidas', checkApiKey, partidasRouter);

app.get('/', (req, res) => {
  res.send('API funcionando!');
});

app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
