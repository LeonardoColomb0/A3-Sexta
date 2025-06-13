const checkApiKey = require('./middleware/auth'); 
const checkJwt = require('./middleware/checkJwt'); 

app.use('/times', checkApiKey, checkJwt, timesRouter);
app.use('/jogadores', checkApiKey, checkJwt, jogadoresRouter);

