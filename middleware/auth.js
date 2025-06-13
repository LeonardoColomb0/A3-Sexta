const API_KEY = 'gremio';

function checkApiKey(req, res, next) {
  const apiKey = req.header('x-api-key');
  if (!apiKey) {
    return res.status(401).json({ error: 'Acesso negado: API Key ausente' });
  }
  if (apiKey !== API_KEY) {
    return res.status(401).json({ error: 'Acesso negado: API Key inválida' });
  }
  next();
}

module.exports = checkApiKey;
